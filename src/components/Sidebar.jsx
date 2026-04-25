export default function Sidebar() {
  return (
    <aside className="w-64 bg-dash-sidebar text-white p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <h2 className="text-2xl font-bold mb-10 text-indigo-400">FinanzasP</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl"><span>📊</span> Dashboard</a>
          <a href="#" className="flex items-center gap-3 p-3 opacity-60 hover:opacity-100"><span>💰</span> Transacciones</a>
          <a href="#" className="flex items-center gap-3 p-3 opacity-60 hover:opacity-100"><span>📈</span> Reportes</a>
        </nav>
      </div>
      <div className="bg-white/5 p-4 rounded-2xl text-xs text-center opacity-70">
        Versión 1.0.0
      </div>
    </aside>
  );
}