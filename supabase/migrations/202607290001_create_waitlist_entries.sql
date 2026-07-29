create extension if not exists pgcrypto;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null check (
    role in (
      'brand_owner_ecommerce',
      'amazon_fba_seller',
      'industrial_sourcing_manager',
      'sourcing_consultant'
    )
  ),
  created_at timestamptz not null default now(),
  constraint waitlist_entries_email_normalized check (
    email = lower(btrim(email))
    and char_length(email) between 3 and 254
  )
);

create unique index if not exists waitlist_entries_email_lower_unique
  on public.waitlist_entries (lower(email));

alter table public.waitlist_entries enable row level security;

revoke all privileges on table public.waitlist_entries from anon, authenticated;
grant select, insert on table public.waitlist_entries to service_role;

comment on table public.waitlist_entries is
  'Server-managed MVP waitlist. No anon or authenticated access is permitted.';
