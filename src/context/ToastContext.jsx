import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

const DEFAULT_DURATION = 3000

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ type = 'info', message, duration = DEFAULT_DURATION }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message, duration }])
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message, options = {}) => addToast({ ...options, message }),
    [addToast]
  )
  toast.success = (message, options = {}) => addToast({ type: 'success', message, ...options })
  toast.error = (message, options = {}) => addToast({ type: 'error', message, ...options })
  toast.info = (message, options = {}) => addToast({ type: 'info', message, ...options })

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
