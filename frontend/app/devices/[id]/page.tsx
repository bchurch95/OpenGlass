import { API_BASE } from '../../config';

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

  if(error) return <main style={{padding:24}}><p style={{color:'red'}}>{error}</p><a href="/">Back</a></main>;
  if(!device) return <main style={{padding:24}}><p>Loading...</p></main>;

  return (
    <main style={{fontFamily:'system-ui', padding:24}}>
      <a href="/">← Back</a>
      <h1>{device.hostname}</h1>
      <ul>
        <li>ID: {device.id}</li>
        <li>Vendor: {device.vendor}</li>
        <li>Model: {device.model}</li>
        <li>MAC: {device.mac_address}</li>
        <li>IP: {device.ip_address}</li>
        <li>Status: {device.status}</li>
        <li>Site ID: {device.site_id}</li>
        <li>Last seen: {device.last_seen}</li>
      </ul>
    </main>
  );
}
