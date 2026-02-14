-- Smart Bookmark App - Production SQL setup
-- Run this in Supabase SQL Editor for your project.

create extension if not exists pgcrypto;

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  url text not null check (char_length(trim(url)) > 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists bookmarks_user_id_created_at_idx
  on public.bookmarks (user_id, created_at desc);

alter table public.bookmarks enable row level security;
alter table public.bookmarks force row level security;

-- Only authenticated users can read their own bookmarks
create policy "bookmarks_select_own"
  on public.bookmarks
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Only authenticated users can insert their own bookmarks
create policy "bookmarks_insert_own"
  on public.bookmarks
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Only authenticated users can update their own bookmarks
create policy "bookmarks_update_own"
  on public.bookmarks
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Only authenticated users can delete their own bookmarks
create policy "bookmarks_delete_own"
  on public.bookmarks
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.bookmarks to authenticated;
revoke all on public.bookmarks from anon;

alter table public.bookmarks replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'bookmarks'
  ) then
    alter publication supabase_realtime add table public.bookmarks;
  end if;
end $$;
