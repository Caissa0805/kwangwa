import {supabase} from './supabase';
export const heroDefaults={interval:7,slides:[
 ['karina','/images/karina.jpg','KARINA','A little more Karina.'],
 ['winter','/images/winter.jpg','WINTER','A little more Winter.'],
 ['aespa','/images/aespa.jpg','AESPA','Your aespa universe.'],
 ['karina-red','/images/karina-red.jpg','KARINA','After dark.']
].map(([id,image,artist,cardTitle])=>({id,image,cardImage:image,enabled:true,eyebrow:'A WORLD ON YOUR SCREEN',headlineTop:'Your bias.',headlinePrefix:'Your',headlineAccent:'universe.',description:'K-pop moments, made for your screen.\nFind your favorite. Make it yours.',primaryLabel:'Explore wallpapers',secondaryLabel:'Meet your next wallpaper',signatureLabel:'THE AESPA EDIT',artist,subtitle:'A different kind of energy.',cardEyebrow:'ON YOUR LOCK SCREEN',cardTitle,cardCta:'Make it yours',clock:'09:41'}))};
export const studioDefaults={label:'WALLPAPER STUDIO',headline:'Same bias.\nDifferent dimensions.',description:'One photo. Every screen. Choose your format, move the frame, and find your perfect fit.',button:'Make a wallpaper',note:'Have your own photo? You can use that too.',desktopImage:'/images/aespa.jpg',phoneImage:'/images/karina.jpg',desktopCaption:'YOUR WORLD, WIDER.',phoneDate:'Friday, November 13',phoneTime:'09:41',desktopLabel:'16:9 DESKTOP',phoneLabel:'9:16 MOBILE'};
export async function readContent(key){const {data,error}=await supabase.from('site_content').select('value').eq('key',key).maybeSingle();if(error)throw error;return data?.value||structuredClone(key==='hero'?heroDefaults:studioDefaults)}
export const contentWallpaper=(image,title,id)=>({id,image,title,name:title,group:'Featured',description:'',orientation:'portrait'});
