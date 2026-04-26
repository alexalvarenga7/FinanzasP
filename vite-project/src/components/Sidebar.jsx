import { Link } from 'react-router-dom';

export default function Sidebar() {
  const cerrarSesion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-dash-sidebar text-white p-6 flex flex-col justify-between fixed h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-10 text-indigo-400">FinanzasP</h2>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center gap-3 p-3 opacity-60 hover:opacity-100"><span>📊</span> Dashboard</Link>
          <Link to="/transacciones" className="flex items-center gap-3 p-3 opacity-60 hover:opacity-100"><span>💰</span> Transacciones</Link>
          <Link to="/reportes" className="flex items-center gap-3 p-3 opacity-60 hover:opacity-100"><span>📈</span> Reportes</Link>
        </nav>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={cerrarSesion}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl text-sm transition-colors"
        >
        Cerrar sesión
        </button>
        <div className="bg-white/5 p-4 rounded-2xl text-xs text-center opacity-70">
          Versión 1.0.0
        </div>
      </div>
    </aside>
  );
}