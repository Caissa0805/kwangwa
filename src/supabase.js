import {createClient} from '@supabase/supabase-js';
export const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
export const imageUrl=path=>supabase.storage.from('wallpapers').getPublicUrl(path).data.publicUrl;