import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  User,
  LogOut,
  GraduationCap,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/planner', icon: Calendar, label: 'Study Planner' },
    { to: '/recommendations', icon: Sparkles, label: 'AI Recommendations' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col ${
          isDark
            ? 'bg-slate-900 border-r border-slate-800'
            : 'bg-white border-r border-gray-200'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduPlan AI</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-primary-50 text-primary-600 border border-primary-200'
                    : isDark
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 lg:border-gray-200">
          <div
            className={`flex items-center gap-3 mb-4 p-3 rounded-xl ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {user?.name || 'User'}
              </p>
              <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? 'text-slate-400 hover:bg-red-500/10 hover:text-red-400'
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
