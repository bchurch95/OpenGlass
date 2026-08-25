'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '../app/config';

export default function BuildLogs({buildId}:{buildId:number}){
  const [logs,setLogs]=useState<string[]>([]);
  useEffect(()=>{
    const fetchLogs = async ()=>{
      const res = await fetch(`${API_BASE}/image-builds/${buildId}/logs`);
      const data = await res.json();
      setLogs(data.logs);
    };
    fetchLogs();
    const id = setInterval(fetchLogs, 2000);
    return ()=>clearInterval(id);
  },[buildId]);
  return (
    <pre className="bg-black text-green-300 p-3 rounded text-xs h-48 overflow-auto">
      {logs.join('\n')}
    </pre>
  );
}
