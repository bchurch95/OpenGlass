'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '../app/config';
import BuildLogs from './BuildLogs';

type Build = { id:number; target:string; version:string; variant:string|null; status:string; artifact_url:string|null };

export default function ImagesClient(){
  const [builds,setBuilds]=useState<Build[]>([]);
  const [expanded,setExpanded]=useState<number|null>(null);
  const fetchBuilds = async ()=>{
    const res = await fetch(`${API_BASE}/image-builds`, {cache:'no-store'});
    setBuilds(await res.json());
  };
  useEffect(()=>{
    fetchBuilds();
    const id = setInterval(fetchBuilds, 3000);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-white/10 bg-white/[0.03]">
          <tr>
            <th className="p-4 font-medium text-gray-300">Target</th>
            <th className="p-4 font-medium text-gray-300">Version</th>
            <th className="p-4 font-medium text-gray-300">Variant</th>
            <th className="p-4 font-medium text-gray-300">Status</th>
            <th className="p-4 font-medium text-gray-300">Artifact</th>
            <th className="p-4 font-medium text-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {builds.map(b=>(
            <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.04] transition">
              <td className="p-4 font-medium">{b.target}</td>
              <td className="p-4 text-gray-300">{b.version}</td>
              <td className="p-4 text-gray-400">{b.variant || '-'}</td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs border ${b.status==='done'?'border-emerald-700/50 bg-emerald-900/40 text-emerald-200':b.status==='building'?'border-amber-700/50 bg-amber-900/40 text-amber-200':'border-gray-700 bg-gray-800/60 text-gray-300'}`}>{b.status}</span>
              </td>
              <td className="p-4">{b.artifact_url ? <a className="text-cyan-300 hover:underline" href={b.artifact_url}>download</a> : <span className="text-gray-500">-</span>}</td>
              <td className="p-4">
                <button onClick={()=>setExpanded(expanded===b.id?null:b.id)} className="text-cyan-300 hover:underline text-sm">logs</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expanded && <div className="p-4 border-t border-white/10 bg-black/30"><BuildLogs buildId={expanded}/></div>}
    </div>
  );
}
