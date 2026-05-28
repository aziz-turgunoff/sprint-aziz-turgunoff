-- ============================================================
-- Step 1: Create the orders table (safe to re-run)
-- ============================================================
create extension if not exists "uuid-ossp";

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  product text not null,
  category text not null,
  amount numeric(10,2) not null,
  status text not null check (status in ('pending','paid','refunded','cancelled')),
  region text not null,
  created_at timestamptz not null
);

-- ============================================================
-- Step 2: Seed 500 rows of realistic order data
-- ============================================================
do $$
declare
  i int;
  v_categories text[] := array['Electronics','Apparel','Home','Books'];
  v_statuses   text[] := array['pending','paid','paid','paid','refunded','cancelled'];
  v_regions    text[] := array['NA','EU','APAC','LATAM'];
  v_first_names text[] := array['James','Emma','Liam','Olivia','Noah','Ava','Elijah','Sophia','Lucas','Isabella','Mason','Mia','Logan','Charlotte','Alexander','Amelia','Ethan','Harper','Aiden','Evelyn'];
  v_last_names  text[] := array['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin'];
  v_elec_products text[] := array['Smart Speaker','Wireless Earbuds','4K Monitor','Laptop Stand','USB-C Hub','Mechanical Keyboard','Webcam HD','Bluetooth Mouse','Portable Charger','Smart Watch'];
  v_apparel_products text[] := array['Running Shoes','Denim Jacket','Cotton T-Shirt','Winter Coat','Hiking Boots','Wool Sweater','Sports Shorts','Silk Scarf','Leather Belt','Sun Hat'];
  v_home_products text[] := array['Desk Lamp','Coffee Maker','Air Purifier','Robot Vacuum','Standing Desk','Bookshelf','Throw Pillow','Ceramic Vase','Wall Clock','Candle Set'];
  v_book_products text[] := array['Cookbook','Sci-Fi Novel','Business Guide','History Book','Travel Atlas','Art Book','Poetry Collection','Self-Help Guide','Programming Manual','Biography'];
  v_category text;
  v_product text;
  v_fname text;
  v_lname text;
  v_amount numeric(10,2);
begin
  for i in 1..500 loop
    -- Pick random category
    v_category := v_categories[1 + floor(random() * 4)::int];

    -- Pick product matching category
    case v_category
      when 'Electronics' then v_product := v_elec_products[1 + floor(random() * 10)::int];
      when 'Apparel'     then v_product := v_apparel_products[1 + floor(random() * 10)::int];
      when 'Home'        then v_product := v_home_products[1 + floor(random() * 10)::int];
      when 'Books'       then v_product := v_book_products[1 + floor(random() * 10)::int];
    end case;

    -- Random name
    v_fname := v_first_names[1 + floor(random() * 20)::int];
    v_lname := v_last_names[1 + floor(random() * 20)::int];

    -- Random amount based on category
    case v_category
      when 'Electronics' then v_amount := round((random() * 400 + 50)::numeric, 2);
      when 'Apparel'     then v_amount := round((random() * 200 + 25)::numeric, 2);
      when 'Home'        then v_amount := round((random() * 300 + 30)::numeric, 2);
      when 'Books'       then v_amount := round((random() * 50  + 10)::numeric, 2);
    end case;

    insert into orders (order_number, customer_name, customer_email, product, category, amount, status, region, created_at)
    values (
      'ORD-' || lpad(i::text, 4, '0'),
      v_fname || ' ' || v_lname,
      lower(v_fname) || '.' || lower(v_lname) || i::text || '@example.com',
      v_product,
      v_category,
      v_amount,
      v_statuses[1 + floor(random() * 6)::int],
      v_regions[1 + floor(random() * 4)::int],
      now() - (random() * 180 || ' days')::interval
    );
  end loop;
end $$;
