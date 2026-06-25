import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const { isDark } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        addToast('Welcome back!', 'success');
        navigate('/dashboard');
      }
    } catch {
      addToast('Failed to sign in', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    addToast('Welcome to the demo!', 'success');
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduPlan AI</span>
          </Link>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Continue your learning journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl ${
            isDark
              ? 'bg-slate-900 border border-slate-800'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}
        >
          <div className="space-y-5">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>

          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center ${isDark ? 'text-slate-700' : 'text-gray-200'}`}>
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-gray-500'}`}>
                or
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className={`w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              isDark
                ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            Try Demo Account
          </button>

          <p className={`mt-6 text-center text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
