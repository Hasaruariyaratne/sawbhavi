-- =========================================================
-- STRICT BILL NUMBERING FIX (GAP-FREE)
-- =========================================================
-- This script switches the bill numbering system from "Sequences" (Fast, but allows gaps)
-- to "Strict Counting" (Guarantees 1, 2, 3, 4...).
-- It also cleans up ghost data and renumbers existing bills to fix the current mess.

-- 1. CLEANUP GHOST SALES (Optional: Remove empty test sales that might be taking up numbers)
-- remove sales with 0 total and no items (adjust logic if you have legitimate 0 value sales)
DELETE FROM sales 
WHERE total = 0 
AND (items_json IS NULL OR items_json::text = '[]' OR items_json::text = 'null');

-- 2. RESET & RENUMBER EXISTING SALE HISTORY
-- This forces all current bills to be 0001, 0002, 0003... in chronological order.
DO $$
DECLARE
    cust RECORD;
    sale_rec RECORD;
    v_counter integer;
BEGIN
    -- A. Renumber Special Customers (Each has their own sequence)
    FOR cust IN SELECT id FROM customers LOOP
        v_counter := 1;
        FOR sale_rec IN SELECT id FROM sales WHERE customer_id = cust.id ORDER BY created_at ASC LOOP
            UPDATE sales SET bill_no = lpad(v_counter::text, 4, '0') WHERE id = sale_rec.id;
            v_counter := v_counter + 1;
        END LOOP;
        
        -- Update the customer's sequence tracker
        UPDATE customers SET bill_sequence = (v_counter - 1) WHERE id = cust.id;
    END LOOP;

    -- B. Renumber Normal Walk-in Sales (Global Sequence)
    v_counter := 1;
    FOR sale_rec IN SELECT id FROM sales WHERE customer_id IS NULL ORDER BY created_at ASC LOOP
        UPDATE sales SET bill_no = lpad(v_counter::text, 4, '0') WHERE id = sale_rec.id;
        v_counter := v_counter + 1;
    END LOOP;
    
    -- Update global tracker
    UPDATE settings SET normal_bill_sequence = (v_counter - 1) WHERE id = 'global';
END $$;

-- 3. REPLACE GENERATOR FUNCTION (STRICT MODE)
-- Removes Sequences, uses Locking + Count Max to prevent gaps.
CREATE OR REPLACE FUNCTION public.get_next_bill_number(p_customer_id uuid DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_next_val integer;
BEGIN
    -- Lock table to prevent race conditions (Simultaneous clicks)
    -- This ensures if two people click "Print" at the same time, one waits for the other.
    LOCK TABLE sales IN SHARE ROW EXCLUSIVE MODE; 
    
    IF p_customer_id IS NOT NULL THEN
        -- Special Customer: Get Max Bill No for THIS customer
        SELECT COALESCE(MAX(NULLIF(regexp_replace(bill_no, '\D','','g'), '')::int), 0) + 1
        INTO v_next_val 
        FROM sales 
        WHERE customer_id = p_customer_id;
        
        -- Update tracker for reference
        UPDATE customers SET bill_sequence = v_next_val WHERE id = p_customer_id;
    ELSE
        -- Normal Customer: Get Max Bill No for GLOBAL walk-ins
        SELECT COALESCE(MAX(NULLIF(regexp_replace(bill_no, '\D','','g'), '')::int), 0) + 1
        INTO v_next_val 
        FROM sales 
        WHERE customer_id IS NULL;
        
        -- Update tracker for reference
        UPDATE settings SET normal_bill_sequence = v_next_val WHERE id = 'global';
    END IF;
    
    RETURN v_next_val;
END;
$$;

-- 4. REPLACE PEEK FUNCTION (Consistent with new logic)
CREATE OR REPLACE FUNCTION public.peek_next_bill_number(p_customer_id uuid DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_max integer;
BEGIN
    IF p_customer_id IS NOT NULL THEN
        SELECT COALESCE(MAX(NULLIF(regexp_replace(bill_no, '\D','','g'), '')::int), 0)
        INTO v_max FROM sales WHERE customer_id = p_customer_id;
    ELSE
        SELECT COALESCE(MAX(NULLIF(regexp_replace(bill_no, '\D','','g'), '')::int), 0)
        INTO v_max FROM sales WHERE customer_id IS NULL;
    END IF;
    
    RETURN v_max + 1;
END;
$$;
