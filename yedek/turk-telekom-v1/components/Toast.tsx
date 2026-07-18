'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

/**
 * Toast bildirim sistemi
 *
 * Kullanım:
 *   const toast = useToast();
 *   toast.error('Başvuru gönderilemedi');
 *   toast.success('Başvurunuz alındı');
 *
 * Özellikler:
 * - Mobil dostu: alttan slide-in, dokunmatik dismiss
 * - iOS safe area desteği
 * - Otomatik dismiss (varsayılan 5 saniye)
 * - Tıklayınca kapanır
 */

type ToastType = 'success' | 'error' | 'info';
type ToastItem = { id: number; type: ToastType; message: string };

type ToastContextValue = {
  show: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message }]);
      // Otomatik dismiss
      setTimeout(() => remove(id), 5000);
    },
    [remove]
  );

  const value: ToastContextValue = {
    show,
    success: (m) => show('success', m),
    error: (m) => show('error', m),
    info: (m) => show('info', m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed inset-x-0 z-[3000] flex flex-col items-center gap-2 px-4 pointer-events-none"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
        }}
      >
        {toasts.map((t) => (
          <ToastBubble key={t.id} toast={t} onDismiss={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastBubble({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide-in animation
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    success: 'bg-success text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-ink-900 text-white',
  };

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div
      role="alert"
      onClick={onDismiss}
      className={`pointer-events-auto max-w-md w-full rounded-2xl shadow-2xl px-4 py-3.5 flex items-start gap-3 cursor-pointer transition-all duration-300 ${
        styles[toast.type]
      } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
      <p className="flex-1 text-sm font-semibold leading-relaxed">{toast.message}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        aria-label="Kapat"
        className="flex-shrink-0 -mr-1 p-1 rounded-full hover:bg-white/10 transition"
      >
        <X className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Provider olmadan da safe çağrı (ör. SSR)
    return {
      show: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
    };
  }
  return ctx;
}
