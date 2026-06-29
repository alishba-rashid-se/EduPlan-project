import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Task } from '../types';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, tasks } = useAuth();
  const { isDark } = useTheme();

  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const totalTasks = tasks.length;

  const today = new Date();
  const upcomingDeadlines = tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10';
      case 'low':
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Mock data for the weekly study hours chart
  const weeklyData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 2 },
  ];
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          {today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
          </div>
          <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalTasks}
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Total Tasks</p>
        </div>

        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">
              +{completedTasks} this week
            </span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {completedTasks}
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Completed Tasks</p>
        </div>

        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-medium">
              Action needed
            </span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {pendingTasks}
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Pending Tasks</p>
        </div>

        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 font-medium">
              Urgent
            </span>
          </div>
          <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {tasks.filter(t => !t.completed && new Date(t.deadline).getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000).length}
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Upcoming Deadlines</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Study Hours Chart */}
        <div className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Study Hours This Week
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Your daily study activity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">
                {weeklyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h
              </span>
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>total</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-48">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-accent-500 transition-all duration-500`}
                  style={{
                    height: `${(data.hours / maxHours) * 100}%`,
                    minHeight: '20px',
                  }}
                />
                <div className="text-center">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {data.hours}h
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    {data.day}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Rate */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Completion Rate
          </h2>

          <div className="relative flex justify-center mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke={isDark ? '#334155' : '#e5e7eb'}
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${completionRate * 4.4} 440`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold gradient-text">{completionRate}%</span>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Complete
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>Completed</span>
              </div>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {completedTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>Pending</span>
              </div>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {pendingTasks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upcoming Deadlines
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Your next {upcomingDeadlines.length} pressing tasks
              </p>
            </div>
          </div>
        </div>

        {upcomingDeadlines.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl ${
                  isDark ? 'bg-slate-800' : 'bg-gray-50'
                } border-l-4 ${
                  task.priority === 'high'
                    ? 'border-red-500'
                    : task.priority === 'medium'
                      ? 'border-amber-500'
                      : 'border-gray-400'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {task.subject}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                  <span className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    {formatDate(task.deadline)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No pending deadlines. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
}
