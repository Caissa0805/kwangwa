create table public.site_content (
 key text primary key check (key in ('hero','studio')),
 value jsonb not null check (jsonb_typeof(value) = 'object'),
 updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
create policy "Anyone reads website displays" on public.site_content for select to anon, authenticated using (true);
create policy "Admins manage website displays" on public.site_content for all to authenticated
 using (exists (select 1 from public.admin_users where user_id=(select auth.uid())))
 with check (exists (select 1 from public.admin_users where user_id=(select auth.uid())));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('site-media','site-media',true,26214400,array['image/jpeg','image/png','image/webp']) on conflict (id) do nothing;
create policy "Admins manage site media" on storage.objects for all to authenticated
 using (bucket_id='site-media' and exists (select 1 from public.admin_users where user_id=(select auth.uid())))
 with check (bucket_id='site-media' and exists (select 1 from public.admin_users where user_id=(select auth.uid())));
