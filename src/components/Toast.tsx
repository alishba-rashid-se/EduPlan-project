import { useToast } from '../contexts/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-up ${
            toast.type === 'success'
              ? 'bg-accent-500 text-white'
              : toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-primary-500 text-white'
          }`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {toast.type === 'info' && <Info className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-80 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
