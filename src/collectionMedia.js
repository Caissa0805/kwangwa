import {supabase} from './supabase';
export async function mediaUrl(path){if(path.startsWith('/images/'))return path;const {data,error}=await supabase.storage.from('wallpapers').createSignedUrl(path,3600);if(error)throw error;return data.signedUrl}
export async function resolvePhotos(row){const photos=row.photos?.length?row.photos:[{id:row.id,path:row.storage_path,width:row.original_width,height:row.original_height}];return Promise.all(photos.map(async p=>({...p,image:await mediaUrl(p.path)})))}
