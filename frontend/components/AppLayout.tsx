import Sidebar from '../components/Sidebar';

export default function AppLayout({children}:{children:React.ReactNode}){
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
