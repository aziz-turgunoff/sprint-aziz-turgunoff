-- Create onboarding_submissions table
create table if not exists onboarding_submissions (
  id uuid primary key default uuid_generate_v4(),
  payload jsonb not null,
  status text not null default 'received',
  created_at timestamptz default now()
);

-- Enable RLS
alter table onboarding_submissions enable row level security;

-- Allow anonymous inserts (for form submissions)
create policy "Allow anonymous inserts"
  on onboarding_submissions
  for insert
  to anon
  with check (true);

-- Only service role can read
create policy "Service role can read all"
  on onboarding_submissions
  for select
  to service_role
  using (true);
