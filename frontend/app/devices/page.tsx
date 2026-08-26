import { API_BASE } from '../config';
import AppLayout from '../../components/AppLayout';

async function fetchJSON(path:string){
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if(!res.ok) throw new Error(`Failed ${path}`);
  return res.json();
}

export default async function DevicesPage(){
  let devices:any[] = [];
  let sites:any[] = [];
  let error: string | null = null;
  try {
    [devices, sites] = await Promise.all([
      fetchJSON('/devices'),
      fetchJSON('/sites')
    ]);
  } catch(e:any){
    error = e.message;
  }

  const siteMap = Object.fromEntries(sites.map(s => [s.id, s.name]));

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
        <div className="text-sm text-gray-400">{devices.length} total</div>
      </div>
      {error && <p className="text-red-400 mb-4">Error: {error}</p>}
      {!devices.length ? <p className="text-gray-500">Loading...</p> : (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
          <table className="w-full text-sm">
            <thead className="text-left border-b border-white/10 bg-white/[0.03]">
              <tr>
                <th className="p-4 font-medium text-gray-300">Hostname</th>
                <th className="p-4 font-medium text-gray-300">Vendor</th>
                <th className="p-4 font-medium text-gray-300">Model</th>
                <th className="p-4 font-medium text-gray-300">IP</th>
                <th className="p-4 font-medium text-gray-300">Status</th>
                <th className="p-4 font-medium text-gray-300">Site</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d:any)=>(
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.04] transition">
                  <td className="p-4"><a className="text-cyan-300 hover:underline font-medium" href={`/devices/${d.id}`}>{d.hostname}</a></td>
                  <td className="p-4 text-gray-300">{d.vendor}</td>
                  <td className="p-4 text-gray-300">{d.model}</td>
                  <td className="p-4 font-mono text-gray-400">{d.ip_address}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${String(d.status).toUpperCase()==='ONLINE'?'border-emerald-700/50 bg-emerald-900/40 text-emerald-200':'border-gray-700 bg-gray-800/60 text-gray-300'}`}>{d.status}</span>
                  </td>
                  <td className="p-4 text-gray-300">{siteMap[d.site_id] ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
}
