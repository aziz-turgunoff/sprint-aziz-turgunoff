create extension if not exists "uuid-ossp";

create table orders (
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
