create extension if not exists pgcrypto;

-- Per-user saved results for every sourcing tool. One row is one saved
-- analysis; the tool-specific result is stored verbatim as JSON.
create table if not exists public.saved_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool text not null check (
    tool in ('quote', 'specs', 'cost', 'hscode', 'email')
  ),
  title text not null check (char_length(title) between 1 and 200),
  payload jsonb not null,
  created_at timestamptz not null default now(),
  -- Guard against oversized documents landing in the row store.
  constraint saved_analyses_payload_size check (
    pg_column_size(payload) <= 262144
  )
);

create index if not exists saved_analyses_user_created_idx
  on public.saved_analyses (user_id, created_at desc);

alter table public.saved_analyses enable row level security;

-- No anon access. Authenticated users may only read and manage their own rows.
revoke all privileges on table public.saved_analyses from anon, authenticated;
grant select, insert, delete on table public.saved_analyses to authenticated;

create policy "Users read their own analyses"
  on public.saved_analyses
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert their own analyses"
  on public.saved_analyses
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users delete their own analyses"
  on public.saved_analyses
  for delete
  to authenticated
  using (auth.uid() = user_id);

comment on table public.saved_analyses is
  'Per-user saved sourcing-tool results. Row-level security restricts every row to its owner.';
