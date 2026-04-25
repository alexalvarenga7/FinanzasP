import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="flex min-h-screen bg-dash-bg font-sans">
      <Sidebar />
      <Dashboard />
    </div>
  );
}