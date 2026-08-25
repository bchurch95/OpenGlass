import { API_BASE } from '../config';
import AppLayout from '../../components/AppLayout';

async function fetchJSON(path:string){
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if(!res.ok) throw new Error(`Failed ${path}`);
  return res.json();
}

export default async function DevicesPage(){
  let devices:any[] = [];
  let error: string | null = null;
  try {
    devices = await fetchJSON('/devices');
  } catch(e:any){
    error = e.message;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Devices</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {!devices.length ? <p>Loading...</p> : (
        <div className="bg-gray-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left border-b border-gray-800 bg-gray-800/50">
              <tr>
                <th className="p-3">Hostname</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Model</th>
                <th className="p-3">IP</th>
                <th className="p-3">Status</th>
                <th className="p-3">Site</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d:any)=>(
                <tr key={d.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-3"><a className="text-blue-400 hover:underline" href={`/devices/${d.id}`}>{d.hostname}</a></td>
                  <td className="p-3">{d.vendor}</td>
                  <td className="p-3">{d.model}</td>
                  <td className="p-3">{d.ip_address}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${d.status==='online'?'bg-green-900 text-green-300':'bg-gray-700'}`}>{d.status}</span>
                  </td>
                  <td className="p-3">{d.site_id ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
}
