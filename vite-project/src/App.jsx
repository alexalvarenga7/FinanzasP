import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transacciones from './pages/Transacciones';
import Reportes from './pages/Reportes';
import Login from './pages/Login';

export default function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem('token'));

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  return (
  <div className="flex min-h-screen bg-dash-bg font-sans">
  <Sidebar />
  <div className="flex-1 ml-64">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transacciones" element={<Transacciones />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
    </div>
  </div>
  );
}