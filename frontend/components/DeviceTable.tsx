type Device = {
  id:number;
  hostname:string;
  vendor:string;
  model:string|null;
  ip_address:string|null;
  status:string;
  site_id:number|null;
};

export default function DeviceTable({devices}:{devices:Device[]}){
  return (
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
          {devices.map(d=>(
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
  );
}
