import React,{useEffect,useRef,useId} from 'react';
import {createPortal} from 'react-dom';
import {X,FilePenLine,Trash2,ArrowRight} from 'lucide-react';
import './AdminConfirm.css';
export default function AdminConfirm({request,onCancel,onConfirm}){
 const dialog=useRef(null),cancel=useRef(null),title=useId(),description=useId();
 useEffect(()=>{const node=dialog.current;node.showModal();cancel.current?.focus();return()=>node.close()},[]);
 const danger=request.kind==='delete';
 return createPortal(<dialog ref={dialog} className="admin-confirm" role="alertdialog" aria-labelledby={title} aria-describedby={description} onCancel={e=>{e.preventDefault();onCancel()}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onCancel()}}>
 <button className="admin-confirm-close" aria-label="Close dialog" onClick={onCancel}><X size={18}/></button>
 <div className={'admin-confirm-icon '+(danger?'danger':'')}>{danger?<Trash2 size={25}/>:<FilePenLine size={25}/>}</div>
 <span className="admin-confirm-kicker">KWANGYA STUDIO</span>
 <h2 id={title}>{request.title}</h2><p id={description}>{request.description}</p>
 <div className="admin-confirm-actions"><button ref={cancel} className="admin-confirm-cancel" onClick={onCancel}>{request.cancelLabel}</button><button className={'admin-confirm-proceed '+(danger?'danger':'')} onClick={onConfirm}>{request.confirmLabel}{danger?<Trash2 size={15}/>:<ArrowRight size={16}/>}</button></div>
 </dialog>,document.body);
}
