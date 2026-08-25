import AppLayout from '../../../../components/AppLayout';
import { apiGet } from '../../../../lib/api';

export default async function ConfigHistoryPage({params}:{params:{id:string}}){
  const id = params.id;
  let configs:any[] = [];
  try{
    // placeholder: fetch config versions
    configs = [];
  }catch{}
  return (
    <AppLayout>
      <a href={`/devices/${id}`} className="text-blue-400">← Back</a>
      <h1 className="text-2xl font-bold mt-4">Config History</h1>
      <p className="text-gray-400">Device {id} config versions will appear here.</p>
      <div className="mt-4 bg-gray-900 rounded p-4">No versions yet.</div>
    </AppLayout>
  );
}
