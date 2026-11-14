import React,{useEffect,useRef,useState} from 'react';
import {motion,useAnimationControls,useReducedMotion} from 'framer-motion';
import BrandMark from './BrandMark';
import './opening.css';
export default function OpeningReveal({children}){
 const reduce=useReducedMotion(),star=useAnimationControls(),mask=useAnimationControls(),light=useAnimationControls(),label=useAnimationControls(),dot=useAnimationControls();
 const content=useRef(null),[done,setDone]=useState(false),[revealing,setRevealing]=useState(false);
 useEffect(()=>{
  let live=true;
  if(reduce){setDone(true);return}
  const prevent=e=>e.preventDefault();
  window.addEventListener('wheel',prevent,{passive:false});
  const readyImage=new Image();readyImage.src=location.pathname==='/admin'?'/images/admin-karina.jpg':'/images/karina.jpg';
  readyImage.decode().catch(()=>{});
  async function open(){
   const center={x:innerWidth/2-16,y:innerHeight/2-16};
   star.set({...center,opacity:0,scale:.025});
   light.set({opacity:0,scale:.2});
   label.set({opacity:1,y:0});
   dot.set({opacity:0,scale:.2});
   await Promise.all([
    dot.start({opacity:[0,1,0],scale:[.2,1,1.5],transition:{duration:.5,times:[0,.15,1],ease:'easeOut'}}),
    star.start({opacity:[0,1,1],scale:[.025,.45,1],transition:{duration:.65,times:[0,.45,1],ease:[.22,1,.36,1]}}),
    light.start({opacity:1,scale:1,transition:{duration:.65,ease:'easeOut'}})
   ]);
   if(!live)return;
   const anchor=content.current?.querySelector('[data-reveal-logo]');
   if(!anchor){setDone(true);return}
   const box=anchor.getBoundingClientRect();
   const x=box.left+box.width/2,y=box.top+box.height/2;
   const bounds=content.current.getBoundingClientRect();
   const originX=x-bounds.left,originY=y-bounds.top;
   mask.set({clipPath:'circle(0px at '+originX+'px '+originY+'px)'});
   await Promise.all([
    label.start({opacity:0,y:-4,transition:{duration:.22,ease:'easeIn'}}),
    light.start({opacity:0,scale:1.12,transition:{duration:.42,ease:'easeOut'}}),
    star.start({x:x-16,y:y-16,scale:box.width/32,transition:{duration:.7,ease:[.22,.65,.3,1]}})
   ]);
   if(!live)return;
   setRevealing(true);
   const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+4;
   await mask.start({clipPath:'circle('+radius+'px at '+originX+'px '+originY+'px)',transition:{duration:.85,ease:[.76,0,.24,1]}});
   if(live){await mask.set({clipPath:'none'});setDone(true);window.removeEventListener('wheel',prevent)}
  }
  open();
  return()=>{live=false;star.stop();mask.stop();light.stop();label.stop();dot.stop();window.removeEventListener('wheel',prevent)};
 },[reduce,star,mask,light,label,dot]);
 const finished=done||reduce;
 return <div className="opening-root" data-intro-active={finished?undefined:''}>
 {!finished&&<div className="opening-dark" aria-hidden="true"/>}
 <motion.div ref={content} className="opening-content" inert={finished?undefined:true} initial={reduce?false:{clipPath:'circle(0px at 0px 0px)'}} animate={mask} style={{willChange:finished?'auto':'clip-path'}}>{children}</motion.div>
 {!finished&&<div className="opening-guard" style={{background:revealing?'transparent':'#080e15'}} aria-hidden="true"><div className="opening-center"><motion.div className="opening-halo" initial={{opacity:0}} animate={light}/><motion.div className="opening-dot" initial={{opacity:0}} animate={dot}/><motion.div className="opening-label" initial={{opacity:1,y:0}} animate={label}>kwangya</motion.div></div><motion.div className="opening-star" initial={{opacity:0}} animate={star}><BrandMark style={{width:32,height:32}}/></motion.div></div>}
 </div>
}

