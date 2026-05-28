insert into orders (order_number, customer_name, customer_email, product, category, amount, status, region, created_at)
values
('ORD-1001', 'Avery Jones', 'avery.jones@example.com', 'Smart Speaker', 'Electronics', 239.99, 'paid', 'NA', now() - interval '3 days'),
('ORD-1002', 'Mia Patel', 'mia.patel@example.com', 'Running Shoes', 'Apparel', 124.5, 'paid', 'EU', now() - interval '5 days'),
('ORD-1003', 'Noah Kim', 'noah.kim@example.com', 'Desk Lamp', 'Home', 42.95, 'pending', 'APAC', now() - interval '7 days'),
('ORD-1004', 'Emma Garcia', 'emma.garcia@example.com', 'Cookbook', 'Books', 29.99, 'refunded', 'LATAM', now() - interval '2 days'),
('ORD-1005', 'Liam Smith', 'liam.smith@example.com', 'Wireless Earbuds', 'Electronics', 179.99, 'paid', 'NA', now() - interval '10 days');

-- Add more rows locally by duplicating the insert pattern for testing.
