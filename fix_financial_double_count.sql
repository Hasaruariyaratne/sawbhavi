-- =========================================================
-- FIX FINANCIAL DATA (DIVIDE COST BY QTY)
-- =========================================================
-- This script fixes the "Exponential Expense" bug where the Total Cost 
-- was stored in the 'cost' field (Unit Cost) of the JSON.
-- The report view multiplies (qty * cost), resulting in (qty * (qty * unit_cost)).
-- This script Iterates through all sales and fixes the JSON.

CREATE OR REPLACE FUNCTION public.fix_cost_double_counting()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    sale_rec RECORD;
    new_items jsonb;
    item jsonb;
    fixed_item jsonb;
    v_qty numeric;
    v_stored_cost numeric;
    v_real_unit_cost numeric;
BEGIN
    FOR sale_rec IN SELECT id, items_json FROM sales WHERE items_json IS NOT NULL AND jsonb_array_length(items_json) > 0 LOOP
        new_items := '[]'::jsonb;
        
        FOR item IN SELECT * FROM jsonb_array_elements(sale_rec.items_json) LOOP
            v_qty := COALESCE((item->>'quantity')::numeric, 0);
            v_stored_cost := COALESCE((item->>'cost')::numeric, 0);
            
            -- Logic: If Qty > 1, the stored cost IS the total cost (due to the bug).
            -- We need to convert it to Unit Cost.
            -- If Qty = 1, Cost = Total Cost (which is also Unit Cost), so no change needed (div/1).
            -- Check: If stored_cost is 0, ignore.
            
            IF v_qty > 0 THEN
                 -- Calculate Unit Cost
                 v_real_unit_cost := v_stored_cost / v_qty;
            ELSE
                 v_real_unit_cost := 0;
            END IF;
            
            -- Rebuild Item with fixed cost
            fixed_item := item || jsonb_build_object('cost', v_real_unit_cost);
            new_items := new_items || fixed_item;
        END LOOP;
        
        -- Update the sale
        UPDATE sales SET items_json = new_items WHERE id = sale_rec.id;
        
    END LOOP;
END;
$$;

-- Execute the fix
SELECT public.fix_cost_double_counting();

-- Update the aggregate/cache columns on the sales table itself to match the new reality
-- (Only if you rely on sales.cost and sales.profit columns directly, though the View calculates them fresh)
-- But let's recalculate them just in case.
UPDATE sales s
SET 
  cost = (
    SELECT SUM(
      COALESCE((item->>'quantity')::numeric, 0) * 
      COALESCE((item->>'cost')::numeric, 0)
    )
    FROM jsonb_array_elements(s.items_json) item
  ),
  profit = s.total - (
    SELECT SUM(
      COALESCE((item->>'quantity')::numeric, 0) * 
      COALESCE((item->>'cost')::numeric, 0)
    )
    FROM jsonb_array_elements(s.items_json) item
  );
