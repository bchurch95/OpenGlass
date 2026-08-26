import AppLayout from '../../components/AppLayout';
import { apiGet } from '../../lib/api';

type Site = { id:number; name:string; description:string|null };

export default async function SitesPage(){
  let sites:Site[] = [];
  let error:string|null = null;
  try{
    sites = await apiGet<Site[]>('/sites');
  }catch(e:any){ error = e.message; }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Sites</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {!sites.length ? <p className="text-gray-500">Loading...</p> : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sites.map(s=>(
            <div key={s.id} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 hover:border-white/20 transition">
              <div className="text-xl font-semibold mb-1">{s.name}</div>
              <p className="text-sm text-gray-400">{s.description || 'No description'}</p>
              <div className="mt-4 text-xs text-gray-500">ID: {s.id}</div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
