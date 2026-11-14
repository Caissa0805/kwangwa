create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.wallpapers (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  idol_name text not null,
  group_name text not null,
  era text,
  photo_year integer not null check (photo_year between 2023 and 2026),
  source_url text not null,
  storage_path text not null unique,
  original_width integer not null check (original_width > 0),
  original_height integer not null check (original_height > 0),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.wallpapers enable row level security;
create policy "Admins identify themselves" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create policy "Public reads published wallpapers" on public.wallpapers
  for select to anon, authenticated using (published);
create policy "Admins read all wallpapers" on public.wallpapers
  for select to authenticated using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins insert wallpapers" on public.wallpapers
  for insert to authenticated with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins update wallpapers" on public.wallpapers
  for update to authenticated using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins delete wallpapers" on public.wallpapers
  for delete to authenticated using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('wallpapers', 'wallpapers', false, 26214400, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "Read published wallpaper files" on storage.objects
  for select to anon, authenticated using (bucket_id = 'wallpapers' and exists (select 1 from public.wallpapers where storage_path = name and published));
create policy "Admins upload wallpaper files" on storage.objects
  for insert to authenticated with check (bucket_id = 'wallpapers' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins update wallpaper files" on storage.objects
  for update to authenticated using (bucket_id = 'wallpapers' and exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (bucket_id = 'wallpapers' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins delete wallpaper files" on storage.objects
  for delete to authenticated using (bucket_id = 'wallpapers' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));