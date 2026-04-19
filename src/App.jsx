import React from 'react';

export default function App() {
  return (
    <div className="flex min-h-screen bg-dash-bg font-sans">
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

      <main className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-text-title">Dashboard</h1>
            <p className="text-slate-500">Bienvenido de nuevo.</p>
          </div>
          <button className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            + Exportar Datos
          </button>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Gráfico de Flujo de Efectivo</h3>
            <div className="h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
              [Espacio para Gráfico]
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Transacciones</h3>
            <ul className="space-y-6">
              <li className="flex justify-between border-b pb-4">
                <div><p className="font-medium">Pago Factura</p><p className="text-xs text-slate-400">Ayer</p></div>
                <span className="font-bold text-red-500">-$240</span>
              </li>
              <li className="flex justify-between border-b pb-4">
                <div><p className="font-medium">Ingresos extras</p><p className="text-xs text-slate-400">Hoy</p></div>
                <span className="font-bold text-green-500">+$1,200</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}