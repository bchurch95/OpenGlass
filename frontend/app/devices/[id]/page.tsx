import { API_BASE } from '../../config';
import AppLayout from '../../../components/AppLayout';

export async function generateStaticParams(){
  return [];
}

export default async function DevicePage({params}:{params:{id:string}}) {
  const id = params.id;
  let device:any = null;
  let error: string | null = null;
  try {
    const res = await fetch(`${API_BASE}/devices/${id}`, { cache: 'no-store' });
    if(!res.ok) throw new Error('Device not found');
    device = await res.json();
  } catch(e:any){
    error = e.message;
  }

  return (
    <AppLayout>
      <a href="/devices" className="text-cyan-300 hover:underline">← Back to devices</a>
      {error ? <p className="text-red-400 mt-4">{error}</p> : !device ? <p className="text-gray-500 mt-4">Loading...</p> : (
        <>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-3xl font-bold">{device.hostname}</h1>
            <span className={`px-3 py-1 rounded-full text-sm border ${String(device.status).toUpperCase()==='ONLINE'?'border-emerald-700/50 bg-emerald-900/40 text-emerald-200':'border-gray-700 bg-gray-800 text-gray-300'}`}>{device.status}</span>
          </div>
          <div className="mt-4 border-b border-white/10 flex gap-6">
            <a className="py-2 border-b-2 border-cyan-400 text-cyan-300" href={`/devices/${device.id}`}>Overview</a>
            <a className="py-2 text-gray-400 hover:text-white" href={`/devices/${device.id}/config`}>Config</a>
            <a className="py-2 text-gray-400 hover:text-white" href={`/devices/${device.id}/telemetry`}>Telemetry</a>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm text-gray-400 mb-2">Details</div>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-500">ID</span> <span className="ml-2 font-mono">{device.id}</span></div>
                <div><span className="text-gray-500">Vendor</span> <span className="ml-2">{device.vendor}</span></div>
                <div><span className="text-gray-500">Model</span> <span className="ml-2">{device.model}</span></div>
                <div><span className="text-gray-500">MAC</span> <span className="ml-2 font-mono">{device.mac_address}</span></div>
                <div><span className="text-gray-500">IP</span> <span className="ml-2 font-mono">{device.ip_address}</span></div>
                <div><span className="text-gray-500">Site ID</span> <span className="ml-2">{device.site_id}</span></div>
                <div><span className="text-gray-500">Last seen</span> <span className="ml-2">{device.last_seen}</span></div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm text-gray-400 mb-2">Status</div>
              <div className="text-lg">Device is {device.status.toLowerCase()}.</div>
              <div className="mt-4 text-xs text-gray-500">OpenGlass • One plane of glass</div>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}
