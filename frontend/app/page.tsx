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

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {error && <p className="text-red-400 mb-4">Error loading data: {error}</p>}
      <section className="mb-8">
        <h2 className="text-xl mb-3">Sites</h2>
        {!sites.length ? <p>Loading...</p> : (
          <ul className="space-y-2">
            {sites.map((s:any)=> (
              <li key={s.id} className="bg-gray-900 rounded px-4 py-2">{s.name} - {s.description}</li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-xl mb-3">Devices</h2>
        {!devices.length ? <p>Loading...</p> : (
          <table className="w-full text-sm">
            <thead className="text-left border-b border-gray-800">
              <tr><th className="py-2">Hostname</th><th>Vendor</th><th>Model</th><th>Status</th></tr>
            </thead>
            <tbody>
              {devices.map((d:any)=>(
                <tr key={d.id} className="border-b border-gray-800">
                  <td className="py-2"><a className="text-blue-400 hover:underline" href={`/devices/${d.id}`}>{d.hostname}</a></td>
                  <td>{d.vendor}</td>
                  <td>{d.model}</td>
                  <td>{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppLayout>
  );
}
