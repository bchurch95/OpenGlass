import AppLayout from '../../components/AppLayout';
import { apiGet } from '../../lib/api';

type Build = { id:number; target:string; version:string; variant:string|null; status:string; artifact_url:string|null };

export default async function ImagesPage(){
  let builds:Build[] = [];
  let error:string|null = null;
  try{
    builds = await apiGet<Build[]>('/image-builds');
  }catch(e:any){ error = e.message; }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Image Builds</h1>
      {error && <p className="text-red-400">{error}</p>}
      {!builds.length ? <p>Loading...</p> : (
        <div className="bg-gray-900 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left border-b border-gray-800">
              <tr><th className="p-3">Target</th><th>Version</th><th>Variant</th><th>Status</th><th>Artifact</th></tr>
            </thead>
            <tbody>
              {builds.map(b=>(
                <tr key={b.id} className="border-b border-gray-800">
                  <td className="p-3">{b.target}</td>
                  <td className="p-3">{b.version}</td>
                  <td className="p-3">{b.variant}</td>
                  <td className="p-3">{b.status}</td>
                  <td className="p-3">{b.artifact_url ? <a className="text-blue-400" href={b.artifact_url}>download</a> : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="mt-4 bg-blue-600 px-4 py-2 rounded">New Build</button>
    </AppLayout>
  );
}
