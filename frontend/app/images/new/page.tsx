import AppLayout from '../../../components/AppLayout';
import BuildForm from '../../../components/BuildForm';

export default function NewBuildPage(){
  return (
    <AppLayout>
      <a href="/images" className="text-blue-400">← Back</a>
      <h1 className="text-2xl font-bold mt-4">New Image Build</h1>
      <BuildForm />
    </AppLayout>
  );
}
