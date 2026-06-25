import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import {
  User,
  Mail,
  BookOpen,
  Save,
  Moon,
  Sun,
  Bell,
  Shield,
  ChevronRight,
} from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  major?: string;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    major: user?.major || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    updateUser({
      name: formData.name,
      email: formData.email,
      major: formData.major,
    });

    addToast('Profile updated successfully!', 'success');
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const preferences = [
    {
      icon: isDark ? Moon : Sun,
      title: 'Dark Mode',
      description: 'Toggle between light and dark theme',
      action: (
        <button
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isDark ? 'bg-primary-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
      ),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      action: <ChevronRight className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />,
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your account security',
      action: <ChevronRight className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Profile Settings
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Manage your account information and preferences
        </p>
      </div>

      {/* User Info Card */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
            {formData.name.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formData.name || 'Your Name'}
            </h2>
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              {formData.email || 'your@email.com'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
          </div>

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
              Major / Field of Study
            </label>
            <div className="relative">
              <BookOpen className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={formData.major}
                onChange={(e) => handleChange('major', e.target.value)}
                placeholder="e.g., Computer Science, Mathematics"
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.major ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.major && <p className="mt-2 text-sm text-red-400">{errors.major}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Profile
              </>
            )}
          </button>
        </form>
      </div>

      {/* Preferences Section */}
      <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Preferences
          </h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Customize your experience
          </p>
        </div>

        <div className="divide-y divide-slate-800 lg:divide-gray-200">
          {preferences.map((pref, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 ${
                pref.action.type !== 'button'
                  ? isDark
                    ? 'hover:bg-slate-800'
                    : 'hover:bg-gray-50'
                  : ''
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${
                  isDark ? 'bg-slate-800' : 'bg-gray-100'
                } flex items-center justify-center`}>
                  <pref.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {pref.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    {pref.description}
                  </p>
                </div>
              </div>
              {pref.action}
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900/50 border border-slate-800' : 'bg-gray-50 border border-gray-200'}`}>
        <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Account Information
        </h3>
        <div className={`space-y-2 text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
          <p>Account created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
          <p>Account ID: {user?.id || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
