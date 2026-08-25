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
      <a href="/" className="text-blue-400 hover:underline">← Back</a>
      {error ? <p className="text-red-400 mt-4">{error}</p> : !device ? <p>Loading...</p> : (
        <>
          <h1 className="text-2xl font-bold mt-4">{device.hostname}</h1>
          <div className="mt-4 bg-gray-900 rounded p-4 space-y-2">
            <p><strong>ID:</strong> {device.id}</p>
            <p><strong>Vendor:</strong> {device.vendor}</p>
            <p><strong>Model:</strong> {device.model}</p>
            <p><strong>MAC:</strong> {device.mac_address}</p>
            <p><strong>IP:</strong> {device.ip_address}</p>
            <p><strong>Status:</strong> {device.status}</p>
            <p><strong>Site ID:</strong> {device.site_id}</p>
            <p><strong>Last seen:</strong> {device.last_seen}</p>
          </div>
        </>
      )}
    </AppLayout>
  );
}
