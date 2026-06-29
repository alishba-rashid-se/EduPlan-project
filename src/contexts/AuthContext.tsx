import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Task } from '../types';
import { mockTasks } from '../data/mockData';

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  tasks: Task[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  demoLogin: () => void;
  updateUser: (updates: Partial<User>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'demo-account',
  name: 'Demo Student',
  email: 'demo@eduplan.ai',
  major: 'General Studies',
  createdAt: new Date().toISOString(),
};

const DEMO_TASKS: Task[] = mockTasks.map((t, i) => ({
  ...t,
  id: `demo-${i + 1}`,
  userId: DEMO_USER.id,
}));

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const chr = password.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `h_${hash}`;
}

function tasksKey(userId: string): string {
  return `eduplan_tasks_${userId}`;
}

function loadUserTasks(userId: string): Task[] {
  try {
    const raw = window.localStorage.getItem(tasksKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistUserTasks(userId: string, tasks: Task[]): void {
  try {
    window.localStorage.setItem(tasksKey(userId), JSON.stringify(tasks));
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('eduplan_current_user', null);
  const [tasks, setTasks] = useLocalStorage<Task[]>('eduplan_active_tasks', []);

  const isAuthenticated = user !== null;

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return { success: false, error: 'Email is required' };
    }

    try {
      const raw = window.localStorage.getItem('eduplan_users');
      const users: StoredUser[] = raw ? JSON.parse(raw) : [];
      const found = users.find(u => u.email.toLowerCase() === normalizedEmail);

      if (!found) {
        return { success: false, error: 'No account found with this email address' };
      }
      if (found.passwordHash !== hashPassword(password)) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const { passwordHash: _ph, ...publicUser } = found;
      void _ph;
      setUser(publicUser);
      const userTasks = loadUserTasks(publicUser.id);
      setTasks(userTasks);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to sign in. Please try again.' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || !password) {
      return { success: false, error: 'All fields are required' };
    }

    try {
      const raw = window.localStorage.getItem('eduplan_users');
      const users: StoredUser[] = raw ? JSON.parse(raw) : [];
      if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
        return { success: false, error: 'An account with this email already exists' };
      }

      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        major: '',
        createdAt: new Date().toISOString(),
        passwordHash: hashPassword(password),
      };

      users.push(newUser);
      window.localStorage.setItem('eduplan_users', JSON.stringify(users));

      const { passwordHash: _ph, ...publicUser } = newUser;
      void _ph;
      setUser(publicUser);
      setTasks([]);
      persistUserTasks(publicUser.id, []);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    if (user) {
      persistUserTasks(user.id, tasks);
    }
    setUser(null);
    setTasks([]);
  };

  const demoLogin = () => {
    setUser(DEMO_USER);
    setTasks(DEMO_TASKS);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);

    try {
      const raw = window.localStorage.getItem('eduplan_users');
      const users: StoredUser[] = raw ? JSON.parse(raw) : [];
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...updates };
        window.localStorage.setItem('eduplan_users', JSON.stringify(users));
      }
    } catch {
      // ignore
    }
  };

  const persistTasks = (next: Task[]) => {
    setTasks(next);
    if (user) {
      persistUserTasks(user.id, next);
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    persistTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    persistTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: string) => {
    persistTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    persistTasks(
      tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        tasks,
        login,
        signup,
        logout,
        demoLogin,
        updateUser,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
