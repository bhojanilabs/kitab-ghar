import { useCallback, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { ToastContext } from "./toastContext";
import "./Toast.css";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = "info", title, message, duration = 5000 }) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [
        ...current,
        {
          id,
          type,
          title,
          message,
        },
      ]);

      if (duration > 0) {
        window.setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="toast-region"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {toasts.map((toast) => {
          const Icon = icons[toast.type] ?? Info;

          return (
            <div
              key={toast.id}
              className={`kg-toast kg-toast--${toast.type}`}
              role={toast.type === "error" ? "alert" : "status"}
            >
              <span className="kg-toast__icon" aria-hidden="true">
                <Icon />
              </span>

              <div className="kg-toast__content">
                {toast.title && <strong>{toast.title}</strong>}
                {toast.message && <p>{toast.message}</p>}
              </div>

              <button
                type="button"
                className="kg-toast__close"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
              >
                <X aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}