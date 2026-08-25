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
        style: { background: '#1e293b', color: '#fff', borderRadius: 8, padding: 10 }
      });
    });

    // Device nodes
    devices.forEach((d, i) => {
      const siteIdx = sites.findIndex(s => s.id === d.site_id);
      const x = 300 + (i % 3) * 250;
      const y = Math.floor(i / 3) * 150;
      nodesList.push({
        id: `dev-${d.id}`,
        data: { label: `${d.hostname}\n${d.vendor}\n${d.status}` },
        position: { x, y },
        style: {
          background: d.status === 'online' ? '#065f46' : '#7f1d1d',
          color: '#fff',
          borderRadius: 8,
          padding: 10,
          whiteSpace: 'pre'
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
    <div className="h-screen w-screen">
      <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white p-3 rounded">
        <h1 className="text-lg font-bold">Topology Map</h1>
        <p className="text-xs text-gray-400">{sites.length} sites • {devices.length} devices</p>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}
