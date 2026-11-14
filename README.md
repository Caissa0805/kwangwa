# Kwangya wallpaper archive

K-pop fan wallpaper gallery with a private admin interface. The gallery reads published entries from Supabase; the admin uploads original images and edits card details. No payment or checkout is included.

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set the Supabase project URL and publishable key. Never add a service-role key to this frontend.
3. Run `npm run dev`; open the shown local URL. Visit `/admin` for the owner dashboard.

The database and private image bucket are defined in `supabase/migrations/0001_wallpaper_catalog.sql` and have been applied to the Kwangwa Wallpapers project. Sign in to `/admin` by email; an administrator must add that authenticated user's UUID to `public.admin_users` before the account can manage photos. This owner approval step protects the dashboard even if someone else requests a login link. Published gallery entries can be viewed by visitors; draft entries are restricted to administrators.

Upload photos dated 2023-2026 with a source URL and accurate original dimensions. For Karina, use only the specified aespa eras. Exporting through the wallpaper studio crops and sizes an uploaded image for desktop or phone; it does not restore missing original detail. Prefer high resolution originals.

This repository is source code only. No deployment is configured.

