'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '../app/config';

type Template = { profile:string; packages:string[]; version:string };

export default function BuildForm(){
  const [templates,setTemplates]=useState<Record<string,Template>>({});
  const [target,setTarget]=useState('');
  const [version,setVersion]=useState('');
  const [variant,setVariant]=useState('');

  useEffect(()=>{
    fetch(`${API_BASE}/builder-templates`).then(r=>r.json()).then(setTemplates);
  },[]);

  useEffect(()=>{
    if(target && templates[target]){
      setVersion(templates[target].version);
    }
  },[target,templates]);

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    await fetch(`${API_BASE}/image-builds`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({target, version, variant})
    });
    window.location.href='/images';
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-900 rounded p-4 space-y-3 max-w-md">
      <input list="targets" placeholder="Target model" className="w-full bg-gray-800 p-2 rounded" value={target} onChange={e=>setTarget(e.target.value)}/>
      <datalist id="targets">
        {Object.keys(templates).map(t=> <option key={t} value={t}/>)}
      </datalist>
      <input placeholder="OpenWrt version" className="w-full bg-gray-800 p-2 rounded" value={version} onChange={e=>setVersion(e.target.value)}/>
      <input placeholder="Variant" className="w-full bg-gray-800 p-2 rounded" value={variant} onChange={e=>setVariant(e.target.value)}/>
      <button className="bg-blue-600 px-4 py-2 rounded">Start Build</button>
      {target && templates[target] && (
        <div className="text-sm text-gray-400">
          Profile: {templates[target].profile}<br/>
          Packages: {templates[target].packages.join(', ')}
        </div>
      )}
    </form>
  );
}
