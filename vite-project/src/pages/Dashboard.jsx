import { useEffect, useState } from 'react';
import { getTransacciones } from '../services/Api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    getTransacciones().then(data => setTransacciones(data));
  }, []);

  const totalIngresos = transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((acc, t) => acc + parseFloat(t.monto), 0);

  const totalGastos = transacciones
    .filter(t => t.tipo === 'gasto')
    .reduce((acc, t) => acc + parseFloat(t.monto), 0);

  const saldo = totalIngresos - totalGastos;

  const flujoData = transacciones.map(t => ({
    fecha: new Date(t.fecha).toLocaleDateString('es-HN'),
    monto: t.tipo === 'ingreso' ? parseFloat(t.monto) : -parseFloat(t.monto),
  }));
const exportarCSV = () => {
  const encabezado = ['ID', 'Descripcion', 'Monto', 'Tipo', 'Fecha'];
  const filas = transacciones.map(t => [
    t.id,
    t.descripcion,
    t.monto,
    t.tipo,
    new Date(t.fecha).toLocaleDateString('es-HN')
  ]);

  const contenido = [encabezado, ...filas].map(f => f.join(',')).join('\n');
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transacciones.csv';
  link.click();
};
<button
  onClick={exportarCSV}
  className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
>
  + Exportar CSV
</button>

  return (
    <main className="flex-1 p-8 md:p-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-title">Dashboard</h1>
          <p className="text-slate-500"> Bienvenido</p>
        </div>
        <button
          onClick={exportarCSV}
          className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          + Exportar a Excel
        </button>
      </header>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Saldo Total</p>
          <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            L. {saldo.toLocaleString('es-HN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Total Ingresos</p>
          <p className="text-2xl font-bold text-green-500">
            + L. {saldo.toLocaleString('es-HN', { minimumFractionDigits: 2 })}
            </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-400 mb-1">Total Gastos</p>
          <p className="text-2xl font-bold text-red-500">
            -  L. {saldo.toLocaleString('es-HN', { minimumFractionDigits: 2 })}
            </p>
        </div>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Gráfico de Flujo de Efectivo</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={flujoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `L. ${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="monto" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Transacciones</h3>
          {transacciones.length === 0 ? (
            <p className="text-slate-400 text-sm">No hay transacciones aún.</p>
          ) : (
            <ul className="space-y-6">
              {transacciones.map(t => (
                <li key={t.id} className="flex justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{t.descripcion}</p>
                    <p className="text-xs text-slate-400">{new Date(t.fecha).toLocaleDateString('es-HN')}</p>
                  </div>
                  <span className={`font-bold ${t.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}>
                    {t.tipo === 'ingreso' ? '+' : '-'}L. {parseFloat(t.monto).toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}