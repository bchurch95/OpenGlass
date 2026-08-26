import AppLayout from '../../components/AppLayout';
import ImagesClient from '../../components/ImagesClient';

export default function ImagesPage(){
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Image Builds</h1>
        <a href="/images/new" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">+ New Build</a>
      </div>
      <ImagesClient />
    </AppLayout>
  );
}
