-- Applied as published_wallpaper_previews. Keep original files private; published
-- posts may also serve their smaller browsing previews. Admin write rules unchanged.
alter policy "Read published wallpaper files" on storage.objects
using (
 bucket_id='wallpapers' and exists(
 select 1 from public.wallpapers w where w.published and (
  w.storage_path=objects.name
  or w.photos @> jsonb_build_array(jsonb_build_object('path',objects.name))
  or w.photos @> jsonb_build_array(jsonb_build_object('preview_path',objects.name))
  )
 )
);
