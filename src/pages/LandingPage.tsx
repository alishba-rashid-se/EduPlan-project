import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Brain,
  CalendarCheck,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const { isDark } = useTheme();

  const features = [
    {
      icon: CalendarCheck,
      title: 'Smart Tracking',
      description:
        'Effortlessly track all your assignments, deadlines, and study sessions in one unified dashboard.',
    },
    {
      icon: Brain,
      title: 'AI Scheduling',
      description:
        'Get personalized study schedules powered by AI, optimized for your learning style and goals.',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description:
        'Visualize your progress with detailed analytics and insights to stay motivated and on track.',
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-400">
                  AI-Powered Learning
                </span>
              </div>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Master Your Studies with{' '}
                <span className="gradient-text">AI-Driven Efficiency</span>
              </h1>
              <p
                className={`text-lg sm:text-xl mb-8 ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                Transform complex study schedules into achievable goals. EduPlan AI
                creates personalized study plans, tracks your progress, and helps you
                stay ahead of deadlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold ${
                    isDark
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-all hover:-translate-y-0.5`}
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="glass rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>Total Tasks</span>
                    </div>
                    <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-400" />
                      </div>
                      <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>Completed</span>
                    </div>
                    <p className={`text-3xl font-bold text-green-400`}>8</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Weekly Progress
                    </span>
                    <span className="text-accent-400 font-semibold">78%</span>
                  </div>
                  <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 w-3/4" />
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'} mb-3`}>
                    Upcoming Deadlines
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>Data Structures</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                        Tomorrow
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>Algorithms</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                        In 3 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Everything You Need to{' '}
              <span className="gradient-text">Excel</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Powered by intelligent algorithms, EduPlan AI adapts to your unique
              learning needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl ${
                  isDark
                    ? 'bg-slate-900 border border-slate-800 hover:border-primary-500/50'
                    : 'bg-white border border-gray-200 hover:border-primary-300'
                } transition-all hover:-translate-y-1 card-shadow-dark`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6">
                <Zap className="w-4 h-4 text-accent-400" />
                <span className="text-sm font-medium text-accent-400">Our Vision</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Personalized, Data-Backed Study Pacing
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                We believe every student deserves a study plan tailored to their unique
                learning style, schedule, and goals. EduPlan AI analyzes your progress,
                understands your study patterns, and creates optimized schedules that
                maximize retention and minimize stress.
              </p>
              <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Whether you're preparing for exams, managing multiple courses, or
                learning new skills, our AI adapts to help you achieve more with less
                guesswork.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className={`text-3xl font-bold gradient-text`}>10,000+</p>
                  <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>Students</p>
                </div>
                <div className={`w-px h-12 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />
                <div>
                  <p className={`text-3xl font-bold gradient-text`}>95%</p>
                  <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>Success Rate</p>
                </div>
                <div className={`w-px h-12 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />
                <div>
                  <p className={`text-3xl font-bold gradient-text`}>50+</p>
                  <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>Subjects</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AI-Powered Insights
                    </h3>
                    <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                      Learning optimized for you
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>
                      Analyzes your study patterns
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>
                      Adapts to your schedule
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>
                      Optimizes for retention
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>
                      Tracks your progress
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Transform Your Study Habits?
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Join thousands of students who've improved their academic performance
            with EduPlan AI.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
          >
            Start Learning Smarter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
