import { useEffect, useState } from 'react';
import { getTransacciones } from '../services/Api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#06b6d4'];

export default function Reportes() {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    getTransacciones().then(data => setTransacciones(data));
  }, []);

  // Datos para gráfica de barras (ingresos vs gastos)
  const totalIngresos = transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((acc, t) => acc + parseFloat(t.monto), 0);

  const totalGastos = transacciones
    .filter(t => t.tipo === 'gasto')
    .reduce((acc, t) => acc + parseFloat(t.monto), 0);

  const barData = [
    { name: 'Ingresos', monto: totalIngresos },
    { name: 'Gastos', monto: totalGastos },
  ];

  // Datos para gráfica de pastel (por descripción)
  const pieData = transacciones
    .filter(t => t.tipo === 'gasto')
    .map(t => ({ name: t.descripcion, value: parseFloat(t.monto) }));

  const ingresosData = transacciones
  .filter(t => t.tipo === 'ingreso')
  .map(t => ({ name: t.descripcion, value: parseFloat(t.monto) }));

  return (
    <main className="flex-1 p-8 md:p-12">
      <h1 className="text-3xl font-bold mb-8">Reportes</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Gráfica de barras */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Ingresos vs Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `L ${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="monto" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de pastel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Distribución de Gastos</h3>
          {pieData.length === 0 ? (
            <p className="text-slate-400">No hay gastos registrados.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `L ${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Distribución de Ingresos</h3>
            {ingresosData.length === 0 ? (
              <p className="text-slate-400">No hay ingresos registrados.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={ingresosData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {ingresosData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `L ${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
</div>
      </div>
    </main>
  );
}