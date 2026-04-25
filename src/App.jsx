import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transacciones from './pages/Transacciones';
import Reportes from './pages/Reportes';

export default function App() {
  return (
    <div className="flex min-h-screen bg-dash-bg font-sans">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </div>
  );
}