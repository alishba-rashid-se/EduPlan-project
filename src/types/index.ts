export type Priority = 'high' | 'medium' | 'low';

export type UnderstandingLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  major: string;
  createdAt: string;
}

export interface StudyPlanDay {
  day: string;
  hours: number;
  topics: string[];
  tasks: { time: string; topic: string; duration: string }[];
}

export interface StudyPlan {
  subject: string;
  level: UnderstandingLevel;
  recommendedHoursPerDay: number;
  totalWeeks: number;
  weeklyPlan: StudyPlanDay[];
  coreTopics: string[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
