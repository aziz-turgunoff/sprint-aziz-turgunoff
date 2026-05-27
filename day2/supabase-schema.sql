-- Day 2: Multi-User Todo App Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- Create todos table
create table todos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) <= 120),
  description text,
  due_date date,
  priority text not null default 'med' check (priority in ('low', 'med', 'high')),
  completed boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create index on user_id for faster queries
create index todos_user_id_idx on todos(user_id);

-- Create index on completed for filtering
create index todos_completed_idx on todos(completed);

-- Create index on due_date for sorting
create index todos_due_date_idx on todos(due_date);

-- Enable Row Level Security
alter table todos enable row level security;

-- RLS Policy: Users can only see their own todos
create policy "Users can view own todos"
  on todos for select
  using (auth.uid() = user_id);

-- RLS Policy: Users can insert their own todos
create policy "Users can insert own todos"
  on todos for insert
  with check (auth.uid() = user_id);

-- RLS Policy: Users can update their own todos
create policy "Users can update own todos"
  on todos for update
  using (auth.uid() = user_id);

-- RLS Policy: Users can delete their own todos
create policy "Users can delete own todos"
  on todos for delete
  using (auth.uid() = user_id);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
create trigger update_todos_updated_at
  before update on todos
  for each row
  execute function update_updated_at_column();

-- Verify setup
-- Run these queries to test:
-- select * from todos; -- Should return empty (no data yet)
-- insert into todos (user_id, title) values (auth.uid(), 'Test todo'); -- Should work when authenticated
