import React,{useEffect,useRef} from 'react';
export default function WallpaperEditPanel({popup,onClose,children}){
const ref=useRef(null);
useEffect(()=>{if(!popup)return;const el=ref.current,previous=document.activeElement,overflow=document.body.style.overflow;el.showModal();document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=overflow;previous?.focus()}},[popup]);
if(!popup)return children;
return <dialog ref={ref} className="wallpaper-edit-popup" aria-label="Edit wallpaper" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===ref.current)onClose()}}><button className="popup-close" aria-label="Close wallpaper editor" onClick={onClose}>×</button>{children}</dialog>
}
