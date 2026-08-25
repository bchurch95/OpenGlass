import AppLayout from '../../../components/AppLayout';

export default function NewBuildPage(){
  return (
    <AppLayout>
      <a href="/images" className="text-blue-400">← Back</a>
      <h1 className="text-2xl font-bold mt-4">New Image Build</h1>
      <form className="mt-4 bg-gray-900 rounded p-4 space-y-3 max-w-md">
        <input placeholder="Target model" className="w-full bg-gray-800 p-2 rounded"/>
        <input placeholder="OpenWrt version" className="w-full bg-gray-800 p-2 rounded"/>
        <input placeholder="Variant" className="w-full bg-gray-800 p-2 rounded"/>
        <button className="bg-blue-600 px-4 py-2 rounded">Start Build</button>
      </form>
    </AppLayout>
  );
}
