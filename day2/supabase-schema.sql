-- Create todos table
create table todos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) <= 120),
  description text,
  due_date date,
  priority text not null default 'med' check (priority in ('low','med','high')),
  completed boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table todos enable row level security;

-- RLS Policies
-- Users can only see their own todos
create policy "Users can view own todos"
  on todos for select
  using (auth.uid() = user_id);

-- Users can insert their own todos
create policy "Users can insert own todos"
  on todos for insert
  with check (auth.uid() = user_id);

-- Users can update their own todos
create policy "Users can update own todos"
  on todos for update
  using (auth.uid() = user_id);

-- Users can delete their own todos
create policy "Users can delete own todos"
  on todos for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_todos_updated_at
  before update on todos
  for each row
  execute function update_updated_at_column();
