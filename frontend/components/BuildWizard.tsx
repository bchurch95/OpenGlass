export default function BuildWizard(){
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">New Image Build</h2>
        <form className="space-y-3">
          <input placeholder="Target model" className="w-full bg-gray-800 p-2 rounded"/>
          <input placeholder="OpenWrt version" className="w-full bg-gray-800 p-2 rounded"/>
          <input placeholder="Variant" className="w-full bg-gray-800 p-2 rounded"/>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 rounded bg-gray-700">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-600">Start Build</button>
          </div>
        </form>
      </div>
    </div>
  );
}
