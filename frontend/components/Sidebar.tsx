export default function Sidebar(){
  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl h-screen p-5">
      <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
        ◈ OpenGlass
      </div>
      <nav className="space-y-1.5">
        {[
          { href:'/', label:'Dashboard', icon:'🏠' },
          { href:'/topology', label:'Topology', icon:'🕸️' },
          { href:'/devices', label:'Devices', icon:'📡' },
          { href:'/sites', label:'Sites', icon:'🏢' },
          { href:'/images', label:'Images', icon:'🖼️' },
        ].map(item=>(
          <a key={item.href} className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition border border-transparent hover:border-white/10" href={item.href}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-gray-200 group-hover:text-white">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-white/10">
        v0.1 • One plane of glass
      </div>
    </aside>
  );
}
