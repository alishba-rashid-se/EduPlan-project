import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GraduationCap, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark
          ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800'
          : 'bg-white/80 backdrop-blur-lg border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduPlan AI</span>
          </NavLink>

          <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? isDark
                      ? 'text-white bg-slate-800'
                      : 'text-gray-900 bg-gray-100'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25"
            >
              Get Started
            </NavLink>
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
        </div>
      </div>
    </nav>
  );
}
