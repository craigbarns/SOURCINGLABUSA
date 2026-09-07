create extension if not exists pgcrypto;

create table if not exists public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text not null check (
    project_type in ('packaging', 'textile', 'both', 'other')
  ),
  quantity_range text not null check (
    quantity_range in (
      'under_500',
      'from_500_to_2000',
      'from_2000_to_10000',
      'over_10000',
      'not_sure'
    )
  ),
  message text,
  source_path text not null default '/',
  created_at timestamptz not null default now(),
  constraint project_briefs_email_normalized check (
    email = lower(btrim(email))
    and char_length(email) between 3 and 254
  ),
  constraint project_briefs_name_length check (
    char_length(btrim(name)) between 2 and 120
  ),
  constraint project_briefs_message_length check (
    message is null or char_length(message) <= 4000
  )
);

create index if not exists project_briefs_created_at_idx
  on public.project_briefs (created_at desc);

alter table public.project_briefs enable row level security;

revoke all privileges on table public.project_briefs from anon, authenticated;
grant select, insert on table public.project_briefs to service_role;

comment on table public.project_briefs is
  'Server-managed inbound project briefs. No anon or authenticated access is permitted.';
