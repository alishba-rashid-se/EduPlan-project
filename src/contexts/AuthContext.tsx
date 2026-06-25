import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Task } from '../types';
import { mockUser, mockTasks } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  tasks: Task[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  demoLogin: () => void;
  updateUser: (updates: Partial<User>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('eduplan_user', null);
  const [tasks, setTasks] = useLocalStorage<Task[]>('eduplan_tasks', []);

  const isAuthenticated = user !== null;

  const login = async (email: string, _password: string): Promise<boolean> => {
    if (email) {
      setUser({
        ...mockUser,
        email,
      });
      setTasks(mockTasks);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    if (name && email) {
      setUser({
        ...mockUser,
        name,
        email,
      });
      setTasks([]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
  };

  const demoLogin = () => {
    setUser(mockUser);
    setTasks(mockTasks);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
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
