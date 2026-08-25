import AppLayout from '../../components/AppLayout';
import ImagesClient from '../../components/ImagesClient';

export default function ImagesPage(){
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Image Builds</h1>
      <ImagesClient />
      <a href="/images/new" className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded">New Build</a>
    </AppLayout>
  );
}
