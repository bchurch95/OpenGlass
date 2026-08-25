export default function Sidebar(){
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen p-4 hidden md:block">
      <div className="text-xl font-bold mb-6">OpenGlass</div>
      <nav className="space-y-2">
        <a className="block px-3 py-2 rounded hover:bg-gray-800" href="/">Dashboard</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-800" href="/devices">Devices</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-800" href="/sites">Sites</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-800" href="/images">Images</a>
      </nav>
    </aside>
  );
}
