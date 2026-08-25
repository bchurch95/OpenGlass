import AppLayout from '../../../components/AppLayout';
import { API_BASE } from '../../config';

export default function NewBuildPage(){
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      target: (form.elements.namedItem('target') as HTMLInputElement).value,
      version: (form.elements.namedItem('version') as HTMLInputElement).value,
      variant: (form.elements.namedItem('variant') as HTMLInputElement).value || null,
    };
    await fetch(`${API_BASE}/image-builds`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    window.location.href = '/images';
  }

  return (
    <AppLayout>
      <a href="/images" className="text-blue-400">← Back</a>
      <h1 className="text-2xl font-bold mt-4">New Image Build</h1>
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-900 rounded p-4 space-y-3 max-w-md">
        <input name="target" placeholder="Target model" className="w-full bg-gray-800 p-2 rounded"/>
        <input name="version" placeholder="OpenWrt version" className="w-full bg-gray-800 p-2 rounded"/>
        <input name="variant" placeholder="Variant" className="w-full bg-gray-800 p-2 rounded"/>
        <button className="bg-blue-600 px-4 py-2 rounded">Start Build</button>
      </form>
    </AppLayout>
  );
}
