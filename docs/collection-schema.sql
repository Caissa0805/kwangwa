alter table public.wallpapers add column if not exists photos jsonb not null default '[]'::jsonb check (jsonb_typeof(photos)='array');
alter table public.wallpapers add column if not exists default_device text not null default 'phone' check(default_device in ('phone','desktop'));
alter policy "Read published wallpaper files" on storage.objects using (bucket_id='wallpapers' and exists(select 1 from public.wallpapers w where w.published and (w.storage_path=objects.name or w.photos @> jsonb_build_array(jsonb_build_object('path',objects.name)))));
