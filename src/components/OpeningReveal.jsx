import React,{useEffect,useRef,useState} from 'react';
import {motion,useAnimationControls,useReducedMotion} from 'framer-motion';
import BrandMark from './BrandMark';
import './opening.css';
export default function OpeningReveal({children}){
 const reduce=useReducedMotion(),star=useAnimationControls(),mask=useAnimationControls();
 const content=useRef(null),[done,setDone]=useState(false),[revealing,setRevealing]=useState(false);
 useEffect(()=>{
  let live=true;
  if(reduce){setDone(true);return}
  const prevent=e=>e.preventDefault();
  window.addEventListener('wheel',prevent,{passive:false});
  const readyImage=new Image();readyImage.src=location.pathname==='/admin'?'/images/admin-karina.jpg':'/images/karina.jpg';
  async function open(){
   const center={x:innerWidth/2-16,y:innerHeight/2-16};
   star.set({...center,opacity:0,scale:.8});
   await star.start({opacity:1,scale:1,transition:{duration:.22}});
   await Promise.all([readyImage.decode().catch(()=>{}),document.fonts.ready]);
   if(!live)return;
   const anchor=content.current?.querySelector('[data-reveal-logo]');
   if(!anchor){setDone(true);return}
   const box=anchor.getBoundingClientRect();
   const x=box.left+box.width/2,y=box.top+box.height/2;
   const bounds=content.current.getBoundingClientRect();
   const originX=x-bounds.left,originY=y-bounds.top;
   await mask.set({clipPath:'circle(0px at '+originX+'px '+originY+'px)'});
   await star.start({x:x-16,y:y-16,scale:box.width/32,transition:{duration:.7,ease:[.76,0,.24,1]}});
   if(!live)return;
   setRevealing(true);
   const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+4;
   await mask.start({clipPath:'circle('+radius+'px at '+originX+'px '+originY+'px)',transition:{duration:.85,ease:[.76,0,.24,1]}});
   if(live){await mask.set({clipPath:'none'});setDone(true);window.removeEventListener('wheel',prevent)}
  }
  open();
  return()=>{live=false;star.stop();mask.stop();window.removeEventListener('wheel',prevent)};
 },[reduce,star,mask]);
 const finished=done||reduce;
 return <div className="opening-root" data-intro-active={finished?undefined:''}>
 {!finished&&<div className="opening-dark" aria-hidden="true"/>}
 <motion.div ref={content} className="opening-content" inert={finished?undefined:true} initial={reduce?false:{clipPath:'circle(0px at 0px 0px)'}} animate={mask} style={{willChange:finished?'auto':'clip-path'}}>{children}</motion.div>
 {!finished&&<div className="opening-guard" style={{background:revealing?'transparent':'#080e15'}} aria-hidden="true"><motion.div className="opening-star" initial={{opacity:0}} animate={star}><BrandMark style={{width:32,height:32}}/></motion.div></div>}
 </div>
}
