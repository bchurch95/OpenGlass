import { API_BASE } from './config';

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
    <main style={{fontFamily:'system-ui', padding:24}}>
      <h1>OpenGlass</h1>
      {error && <p style={{color:'red'}}>Error loading data: {error}</p>}
      <section>
        <h2>Sites</h2>
        {!sites.length ? <p>Loading...</p> : (
          <ul>
            {sites.map((s:any)=> <li key={s.id}>{s.name} - {s.description}</li>)}
          </ul>
        )}
      </section>
      <section>
        <h2>Devices</h2>
        {!devices.length ? <p>Loading...</p> : (
          <table border={1} cellPadding={8}>
            <thead><tr><th>Hostname</th><th>Vendor</th><th>Model</th><th>Status</th></tr></thead>
            <tbody>
              {devices.map((d:any)=>(
                <tr key={d.id}>
                  <td><a href={`/devices/${d.id}`}>{d.hostname}</a></td>
                  <td>{d.vendor}</td>
                  <td>{d.model}</td>
                  <td>{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
