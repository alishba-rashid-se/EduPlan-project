import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { Task, Priority } from '../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
  X,
  Calendar,
  Filter,
} from 'lucide-react';

type FilterType = 'all' | 'high' | 'medium' | 'low' | 'completed';

interface TaskFormData {
  title: string;
  subject: string;
  deadline: string;
  priority: Priority;
}

interface FormErrors {
  title?: string;
  subject?: string;
  deadline?: string;
}

export default function PlannerPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useAuth();
  const { isDark } = useTheme();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    subject: '',
    deadline: '',
    priority: 'medium',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      switch (filter) {
        case 'high':
        case 'medium':
        case 'low':
          matchesFilter = !task.completed && task.priority === filter;
          break;
        case 'completed':
          matchesFilter = task.completed;
          break;
        default:
          matchesFilter = !task.completed;
      }

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filter]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task name is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingTask) {
      updateTask(editingTask.id, {
        title: formData.title,
        subject: formData.subject,
        deadline: new Date(formData.deadline).toISOString(),
        priority: formData.priority,
      });
      addToast('Task updated successfully', 'success');
    } else {
      addTask({
        title: formData.title,
        subject: formData.subject,
        deadline: new Date(formData.deadline).toISOString(),
        priority: formData.priority,
      });
      addToast('Task added successfully', 'success');
    }

    resetForm();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      subject: task.subject,
      deadline: new Date(task.deadline).toISOString().slice(0, 16),
      priority: task.priority,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    addToast('Task deleted', 'info');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      deadline: '',
      priority: 'medium',
    });
    setEditingTask(null);
    setIsFormOpen(false);
    setErrors({});
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityBorder = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      case 'low':
        return 'border-l-gray-400';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return 'Overdue';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Study Planner
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Manage your tasks and deadlines
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`relative flex-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium text-sm transition-all ${
                  filter === option.value
                    ? 'bg-primary-500 text-white'
                    : isDark
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div
            className={`w-full max-w-lg p-6 rounded-2xl ${
              isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white'
            } animate-slide-up`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={resetForm}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Task Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Complete Chapter 5 Review"
                  className={`w-full px-4 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Data Structures"
                  className={`w-full px-4 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.subject ? 'border-red-500' : ''
                  }`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.deadline ? 'border-red-500' : ''
                  }`}
                />
                {errors.deadline && <p className="mt-1 text-sm text-red-400">{errors.deadline}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                  className={`w-full px-4 py-3 rounded-xl ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all"
                >
                  {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border-l-4 ${getPriorityBorder(task.priority)} ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-gray-200 shadow-sm'
              } ${task.completed ? 'opacity-75' : ''} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`flex-shrink-0 ${
                    task.completed
                      ? 'text-green-400'
                      : isDark
                        ? 'text-slate-500 hover:text-primary-400'
                        : 'text-gray-400 hover:text-primary-500'
                  } transition-colors`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className={`p-2 rounded-lg ${
                      isDark
                        ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className={`p-2 rounded-lg ${
                      isDark
                        ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3
                className={`font-semibold mb-2 ${
                  task.completed
                    ? isDark
                      ? 'text-slate-500 line-through'
                      : 'text-gray-400 line-through'
                    : isDark
                      ? 'text-white'
                      : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>

              <p
                className={`text-sm mb-3 ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                {task.subject}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                  <span className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    {formatDate(task.deadline)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-16 ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200'
          } rounded-2xl`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary-400" />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No tasks found
          </h3>
          <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            {searchQuery || filter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first task to get started'}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'} flex items-center justify-center gap-8`}>
        <div className="text-center">
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {tasks.length}
          </p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Total</p>
        </div>
        <div className={`w-px h-8 ${isDark ? 'bg-slate-700' : 'bg-gray-300'}`} />
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">{tasks.filter(t => t.completed).length}</p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Done</p>
        </div>
        <div className={`w-px h-8 ${isDark ? 'bg-slate-700' : 'bg-gray-300'}`} />
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-400">{tasks.filter(t => !t.completed).length}</p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Remaining</p>
        </div>
      </div>
    </div>
  );
}
