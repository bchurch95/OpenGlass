import { API_BASE } from './config';
import AppLayout from '../components/AppLayout';

async function fetchJSON(path:string){
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if(!res.ok) throw new Error(`Failed ${path}`);
  return res.json();
}

export default async function Page() {
  let sites:any[] = [];
  let devices:any[] = [];
  let error: string | null = null;
  try {
    [sites, devices] = await Promise.all([
      fetchJSON('/sites'),
      fetchJSON('/devices')
    ]);
  } catch(e:any){
    error = e.message;
  }

  const onlineCount = devices.filter(d => String(d.status).toUpperCase() === 'ONLINE').length;
  const totalDevices = devices.length;
  const totalSites = sites.length;

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">Dashboard</h1>
        <div className="text-sm text-gray-400">OpenGlass • One plane of glass</div>
      </div>
      {error && <p className="text-red-400 mb-4">Error loading data: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur p-4 shadow-lg">
          <div className="text-sm text-gray-400">Sites</div>
          <div className="text-3xl font-semibold mt-1">{totalSites}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur p-4 shadow-lg">
          <div className="text-sm text-gray-400">Devices</div>
          <div className="text-3xl font-semibold mt-1">{totalDevices}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-500/0 backdrop-blur p-4 shadow-lg">
          <div className="text-sm text-gray-400">Online</div>
          <div className="text-3xl font-semibold mt-1 text-emerald-300">{onlineCount}/{totalDevices}</div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🏢 Sites</h2>
        {!sites.length ? <p className="text-gray-500">Loading...</p> : (
          <div className="grid gap-4 md:grid-cols-2">
            {sites.map((s:any)=> (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.06] transition">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-400 mt-1">{s.description || 'No description'}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">📡 Devices</h2>
        {!devices.length ? <p className="text-gray-500">Loading...</p> : (
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
            <table className="w-full text-sm">
              <thead className="text-left border-b border-white/10 bg-white/[0.03]">
                <tr><th className="py-3 px-4">Hostname</th><th className="py-3 px-4">Vendor</th><th className="py-3 px-4">Model</th><th className="py-3 px-4">Status</th></tr>
              </thead>
              <tbody>
                {devices.map((d:any)=>(
                  <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.04]">
                    <td className="py-3 px-4"><a className="text-cyan-300 hover:underline" href={`/devices/${d.id}`}>{d.hostname}</a></td>
                    <td className="py-3 px-4">{d.vendor}</td>
                    <td className="py-3 px-4">{d.model}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs border ${String(d.status).toUpperCase()==='ONLINE'?'border-emerald-700/50 bg-emerald-900/40 text-emerald-200':'border-gray-700 bg-gray-800 text-gray-300'}`}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
