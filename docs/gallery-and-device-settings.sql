alter table public.wallpapers add column if not exists gallery_placement text not null default 'auto' check (gallery_placement in ('auto','portrait','landscape','both'));
