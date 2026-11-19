import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { money } from '../../utils/format.js';
import { Status } from './AdminPrimitives.jsx';

export default function Catalog({products,action}) { const [tab,setTab]=useState('Pending review');const rows=products.filter(p=>tab==='All'||p.status===tab);return <><div className="admin-tabs">{['Pending review','Approved','Rejected','All'].map(x=><button className={tab===x?'on':''} key={x} onClick={()=>setTab(x)}>{x}</button>)}</div><div className="catalog-list">{rows.map(p=><article className="admin-card catalog-item" key={p.id}><img src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=400&q=75`} alt=""/><div><Status value={p.status}/><h3>{p.name}</h3><p>{p.shop} · {p.category} · {money(p.price)}</p><div>{p.status==='Pending review'?<><button className="row-button" onClick={()=>action(p.id,'Approved')}><Check size={13}/> Approve</button><button className="row-button danger" onClick={()=>action(p.id,'Rejected')}><X size={13}/> Reject</button></>:<button className="row-button" onClick={()=>action(p.id,'Pending review')}>Return to review</button>}</div></div></article>)}</div>{!rows.length&&<div className="admin-card empty-state">No listings in this queue yet.</div>}</>; }

