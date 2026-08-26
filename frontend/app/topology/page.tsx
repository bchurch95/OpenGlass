'use client';
import { useEffect, useState, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { API_BASE } from '../config';

type Site = { id: number; name: string };
type Device = { id: number; hostname: string; vendor: string; site_id: number | null; status: string };

export default function TopologyPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/sites`).then(r => r.json()).then(setSites);
    fetch(`${API_BASE}/devices`).then(r => r.json()).then(setDevices);
  }, []);

  const { nodes, edges } = useMemo(() => {
    const nodesList = [];
    const edgesList = [];

    // Site nodes
    sites.forEach((s, i) => {
      nodesList.push({
        id: `site-${s.id}`,
        type: 'input',
        data: { label: `🏢 ${s.name}` },
        position: { x: 0, y: i * 180 },
        style: { 
          background: 'linear-gradient(135deg,#1e293b,#0f172a)', 
          color: '#fff', 
          borderRadius: 12, 
          padding: 12,
          border: '1px solid #334155',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }
      });
    });

    // Device nodes
    devices.forEach((d, i) => {
      const siteIdx = sites.findIndex(s => s.id === d.site_id);
      const x = 300 + (i % 3) * 250;
      const y = Math.floor(i / 3) * 150;
      const isOnline = String(d.status).toUpperCase() === 'ONLINE';
      nodesList.push({
        id: `dev-${d.id}`,
        data: { label: `${d.hostname}\n${d.vendor}\n${d.status}` },
        position: { x, y },
        style: {
          background: isOnline ? 'linear-gradient(135deg,#064e3b,#065f46)' : 'linear-gradient(135deg,#7f1d1d,#991b1b)',
          color: '#fff',
          borderRadius: 12,
          padding: 12,
          whiteSpace: 'pre',
          border: `1px solid ${isOnline ? '#10b981' : '#ef4444'}`
          ,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }
      });

      if (d.site_id) {
        edgesList.push({
          id: `e-site-${d.site_id}-dev-${d.id}`,
          source: `site-${d.site_id}`,
          target: `dev-${d.id}`,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: '#94a3b8' }
        });
      }
    });

    return { nodes: nodesList, edges: edgesList };
  }, [sites, devices]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="absolute top-4 left-4 z-10 backdrop-blur-xl bg-white/5 border border-white/10 text-white p-4 rounded-2xl shadow-xl">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">Topology Map</h1>
        <p className="text-xs text-gray-400 mt-1">{sites.length} sites • {devices.length} devices</p>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView className="bg-transparent">
        <Background color="#1e293b" gap={24} />
        <Controls />
        <MiniMap pannable zoomable maskColor="rgba(0,0,0,0.6)" />
      </ReactFlow>
    </div>
  );
}
