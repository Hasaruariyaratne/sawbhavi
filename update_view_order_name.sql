-- Add order_name to the view so it appears in reports
CREATE OR REPLACE VIEW view_sales_financials AS
WITH line_calculations AS (
    SELECT 
        s.id AS sale_id,
        s.bill_no,
        s.order_name, -- Added
        s.created_at,
        s.customer_id,
        s.store_id,
        s.items_json, 
        item.value ->> 'id' as product_id,
        COALESCE((item.value ->> 'quantity')::numeric, 1) as qty,
        COALESCE((item.value ->> 'price')::numeric, 0) as price,
        COALESCE((item.value ->> 'cost')::numeric, p.cost_price, 0) as cost
    FROM sales s,
    LATERAL jsonb_array_elements(
        CASE 
            WHEN jsonb_typeof(s.items_json) = 'array' THEN s.items_json 
            ELSE '[]'::jsonb 
        END
    ) item
    LEFT JOIN products p ON (item.value ->> 'id')::text = p.id::text
)
SELECT 
    sale_id,
    bill_no,
    order_name, -- Added
    created_at,
    customer_id,
    store_id,
    items_json,
    COUNT(*) as item_count,
    SUM(qty * price) as total_income,
    SUM(qty * cost) as total_expense,
    SUM((qty * price) - (qty * cost)) as total_profit
FROM line_calculations
GROUP BY sale_id, bill_no, order_name, created_at, customer_id, store_id, items_json;
