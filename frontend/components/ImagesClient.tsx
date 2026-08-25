'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '../config';

type Build = { id:number; target:string; version:string; variant:string|null; status:string; artifact_url:string|null };

export default function ImagesClient(){
  const [builds,setBuilds]=useState<Build[]>([]);
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
          <tr><th className="p-3">Target</th><th>Version</th><th>Variant</th><th>Status</th><th>Artifact</th></tr>
        </thead>
        <tbody>
          {builds.map(b=>(
            <tr key={b.id} className="border-b border-gray-800">
              <td className="p-3">{b.target}</td>
              <td className="p-3">{b.version}</td>
              <td className="p-3">{b.variant}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3">{b.artifact_url ? <a className="text-blue-400" href={b.artifact_url}>download</a> : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
