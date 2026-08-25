import AppLayout from '../../../../components/AppLayout';

export default function TelemetryPage({params}:{params:{id:string}}){
  return (
    <AppLayout>
      <a href={`/devices/${params.id}`} className="text-blue-400">← Back</a>
      <h1 className="text-2xl font-bold mt-4">Telemetry</h1>
      <p className="text-gray-400">Charts for CPU, memory, traffic will appear here.</p>
    </AppLayout>
  );
}
