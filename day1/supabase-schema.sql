-- Day 1 Waitlist Table
-- Run this in your Supabase SQL Editor

create table day1_waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  role text not null,
  company text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table day1_waitlist enable row level security;

-- Policy: Allow anonymous inserts only
create policy "Allow anonymous inserts"
  on day1_waitlist
  for insert
  to anon
  with check (true);

-- Policy: No select access for anonymous users
create policy "No select for anonymous"
  on day1_waitlist
  for select
  to anon
  using (false);

-- Create index on email for faster duplicate checks
create index day1_waitlist_email_idx on day1_waitlist(email);
