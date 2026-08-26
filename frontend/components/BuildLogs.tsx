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
    <div className="rounded-xl border border-white/10 bg-black/70 p-3">
      <div className="text-xs text-gray-400 mb-2">Build logs • auto-refresh</div>
      <pre className="text-green-300 text-xs h-48 overflow-auto leading-relaxed font-mono">
        {logs.length ? logs.join('\n') : 'No logs yet...'}
      </pre>
    </div>
  );
}
