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
    <div className="bg-gray-900 rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-gray-800">
          <tr><th className="p-3">Target</th><th>Version</th><th>Variant</th><th>Status</th><th>Artifact</th><th></th></tr>
        </thead>
        <tbody>
          {builds.map(b=>(
            <tr key={b.id} className="border-b border-gray-800">
              <td className="p-3">{b.target}</td>
              <td className="p-3">{b.version}</td>
              <td className="p-3">{b.variant}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3">{b.artifact_url ? <a className="text-blue-400" href={b.artifact_url}>download</a> : '-'}</td>
              <td className="p-3"><button onClick={()=>setExpanded(expanded===b.id?null:b.id)} className="text-blue-400">logs</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {expanded && <div className="p-4 border-t border-gray-800"><BuildLogs buildId={expanded}/></div>}
    </div>
  );
}
