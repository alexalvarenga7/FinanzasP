import { useState } from 'react';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [modo, setModo] = useState('login'); // 'login' o 'register'
  const [verPassword, setVerPassword] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const url = `http://localhost:3000/api/auth/${modo === 'login' ? 'login' : 'register'}`;
    const body = modo === 'login'
      ? { email: form.email, password: form.password }
      : { nombre: form.nombre, email: form.email, password: form.password };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    if (modo === 'login') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify({ id: data.id, nombre: data.nombre }));
      onLogin();
    } else {
      setModo('login');
      setError('Registro exitoso, ahora inicia sesión.');
    }
  };

  return (
    <div className="min-h-screen bg-dash-bg flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">FinanzasP</h2>
        <p className="text-slate-500 mb-8">{modo === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}</p>

        {modo === 'register' && (
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre || ''}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="border border-slate-200 rounded-xl p-3 w-full mb-4"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border border-slate-200 rounded-xl p-3 w-full mb-4"
        />
        <div className="relative mb-4">
        <input
            type={verPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border border-slate-200 rounded-xl p-3 w-full"
        />
        <button
            onClick={() => setVerPassword(!verPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
        >
            {verPassword ? 'ocultar' : 'ver'}
        </button>
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-brand text-white px-6 py-3 rounded-xl font-medium w-full hover:bg-indigo-700 transition-colors"
        >
          {modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-slate-400 mt-4">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button onClick={() => setModo(modo === 'login' ? 'register' : 'login')} className="text-indigo-500 ml-1">
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}