import { useEffect, useState } from 'react';
import { getTransacciones, crearTransaccion, eliminarTransaccion, editarTransaccion } from '../services/Api';

export default function Transacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [editando, setEditando] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    tipo: 'gasto',
    categoria_id: 1,
    usuario_id: usuario?.id || 1,
  });

  useEffect(() => {
    getTransacciones().then(data => setTransacciones(data));
  }, []);

  const handleSubmit = async () => {
    if (!form.descripcion || !form.monto) return;
    if (editando) {
      await editarTransaccion(editando, form);
      setEditando(null);
    } else {
      await crearTransaccion(form);
    }
    const data = await getTransacciones();
    setTransacciones(data);
    setForm({ descripcion: '', monto: '', tipo: 'gasto', categoria_id: 1, usuario_id: usuario?.id || 1 });
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta transacción?')) return;
    await eliminarTransaccion(id);
    setTransacciones(transacciones.filter(t => t.id !== id));
  };

  const handleEditar = (t) => {
    setEditando(t.id);
    setForm({ descripcion: t.descripcion, monto: t.monto, tipo: t.tipo, categoria_id: t.categoria_id || 1, usuario_id: usuario?.id || 1 });
  };

  return (
    <main className="flex-1 p-8 md:p-12">
      <h1 className="text-3xl font-bold mb-8">Transacciones</h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">{editando ? 'Editar Transacción' : 'Nueva Transacción'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            className="border border-slate-200 rounded-xl p-3 w-full"
          />
          <input
            type="number"
            placeholder="Monto"
            value={form.monto}
            onChange={e => setForm({ ...form, monto: e.target.value })}
            className="border border-slate-200 rounded-xl p-3 w-full"
          />
          <select
            value={form.tipo}
            onChange={e => setForm({ ...form, tipo: e.target.value })}
            className="border border-slate-200 rounded-xl p-3 w-full"
          >
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            {editando ? '✓ Guardar' : '+ Agregar'}
          </button>
          {editando && (
            <button
              onClick={() => { setEditando(null); setForm({ descripcion: '', monto: '', tipo: 'gasto', categoria_id: 1, usuario_id: usuario?.id || 1 }); }}
              className="bg-slate-100 text-slate-600 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Historial</h3>
        <ul className="space-y-4">
          {transacciones.map(t => (
            <li key={t.id} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium">{t.descripcion}</p>
                <p className="text-xs text-slate-400">{new Date(t.fecha).toLocaleDateString('es-HN')}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${t.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.tipo === 'ingreso' ? '+' : '-'}L. {parseFloat(t.monto).toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                </span>
                <button onClick={() => handleEditar(t)} className="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">Editar</button>
                <button onClick={() => handleEliminar(t.id)} className="bg-red-500 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}