import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { generateStudyPlan } from '../data/mockData';
import { StudyPlan, UnderstandingLevel } from '../types';
import {
  Sparkles,
  Search,
  Clock,
  Target,
  Plus,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function RecommendationsPage() {
  const { addTask } = useAuth();
  const { isDark } = useTheme();
  const { addToast } = useToast();

  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState<UnderstandingLevel>('intermediate');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [addingTasks, setAddingTasks] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!subject.trim()) {
      addToast('Please enter a subject name', 'error');
      return;
    }

    setIsLoading(true);
    setPlan(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generatedPlan = generateStudyPlan(subject.trim(), level);
    setPlan(generatedPlan);
    setIsLoading(false);
    setExpandedDays(generatedPlan.weeklyPlan.slice(0, 3).map(d => d.day));
  };

  const toggleDay = (day: string) => {
    setExpandedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleAddToPlanner = (topic: string, day: string, _duration: string) => {
    const taskKey = `${day}-${topic}`;
    if (addingTasks.includes(taskKey)) return;

    // Calculate deadline based on day
    const today = new Date();
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    const currentDayIndex = today.getDay();
    const daysUntil = (dayIndex - currentDayIndex + 7) % 7;
    const deadline = new Date(today.getTime() + daysUntil * 24 * 60 * 60 * 1000);
    deadline.setHours(17, 0, 0, 0);

    addTask({
      title: `${topic}`,
      subject: plan?.subject || subject,
      deadline: deadline.toISOString(),
      priority: level === 'beginner' ? 'low' : level === 'intermediate' ? 'medium' : 'high',
    });

    setAddingTasks(prev => [...prev, taskKey]);
    addToast(`Added "${topic}" to planner`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          AI Study Recommendations
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Get personalized study plans powered by AI
        </p>
      </div>

      {/* Input Form */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Subject Name
            </label>
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Object-Oriented Programming"
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
            <p className={`mt-2 text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
              Try: Object-Oriented Programming, Discrete Mathematics, or any subject
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              Current Understanding Level
            </label>
            <div className="flex gap-3">
              {(['beginner', 'intermediate', 'advanced'] as UnderstandingLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium capitalize transition-all ${
                    level === l
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-6 w-full md:w-auto px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Study Plan
            </>
          )}
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-12 h-8 rounded-lg" />
                <div className="skeleton w-32 h-6 rounded" />
              </div>
              <div className="space-y-3 pl-4">
                <div className="skeleton w-full h-4 rounded" />
                <div className="skeleton w-3/4 h-4 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generated Plan */}
      {plan && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          {/* Overview Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-400" />
                </div>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Daily Study
                </span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {plan.recommendedHoursPerDay}h
                <span className={`text-sm font-normal ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  /day
                </span>
              </p>
            </div>

            <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent-400" />
                </div>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Duration
                </span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {plan.totalWeeks}
                <span className={`text-sm font-normal ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  weeks
                </span>
              </p>
            </div>

            <div className={`p-5 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Level
                </span>
              </div>
              <p className={`text-2xl font-bold capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {plan.level}
              </p>
            </div>
          </div>

          {/* Core Topics */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Core Topics to Focus On
            </h2>
            <div className="flex flex-wrap gap-2">
              {plan.coreTopics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Suggested Weekly Schedule
            </h2>

            <div className="space-y-3">
              {plan.weeklyPlan.map((dayPlan) => (
                <div
                  key={dayPlan.day}
                  className={`rounded-xl border ${
                    isDark ? 'border-slate-700' : 'border-gray-200'
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => toggleDay(dayPlan.day)}
                    className={`w-full p-4 flex items-center justify-between ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-750'
                        : 'bg-gray-50 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl ${
                        isDark ? 'bg-slate-700' : 'bg-white'
                      } flex items-center justify-center font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        <div className="text-center">
                          <p className="text-xs uppercase text-slate-400">{dayPlan.day.slice(0, 3)}</p>
                          <p className="text-lg font-bold gradient-text">{dayPlan.hours}h</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dayPlan.day}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                          {dayPlan.topics.join(' | ')}
                        </p>
                      </div>
                    </div>
                    {expandedDays.includes(dayPlan.day) ? (
                      <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                    )}
                  </button>

                  {expandedDays.includes(dayPlan.day) && (
                    <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                        Detailed Schedule
                      </p>
                      <div className="space-y-2">
                        {dayPlan.tasks.map((task, idx) => {
                          const taskKey = `${dayPlan.day}-${task.topic}`;
                          const isAdded = addingTasks.includes(taskKey);

                          return (
                            <div
                              key={idx}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                isDark ? 'bg-slate-800' : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-16 text-center ${
                                  isDark ? 'text-slate-400' : 'text-gray-500'
                                }`}>
                                  {task.time}
                                </div>
                                <div>
                                  <p className={`font-medium ${
                                    isDark ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {task.topic}
                                  </p>
                                  <p className={`text-sm ${
                                    isDark ? 'text-slate-500' : 'text-gray-500'
                                  }`}>
                                    {task.duration}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleAddToPlanner(task.topic, dayPlan.day, task.duration)}
                                disabled={isAdded}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                  isAdded
                                    ? 'bg-green-500/20 text-green-400 cursor-default'
                                    : isDark
                                      ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                                      : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4" />
                                    Add to Planner
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
