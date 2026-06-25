import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ToastContainer from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, Sun, Moon } from 'lucide-react';

export default function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="flex">
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? 'text-slate-400 hover:bg-slate-800 hover:text-yellow-400'
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
