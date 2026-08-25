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
      <h1 className="text-2xl font-bold mb-6">Sites</h1>
      {error && <p className="text-red-400">{error}</p>}
      {!sites.length ? <p>Loading...</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {sites.map(s=>(
            <div key={s.id} className="bg-gray-900 rounded p-4">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
