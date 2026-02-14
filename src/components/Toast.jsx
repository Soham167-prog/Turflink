import { useToast } from '../context/ToastContext'

const styleMap = {
  success: 'border-l-4 border-l-green-500 bg-[#ECFDF5]',
  error: 'border-l-4 border-l-red-500 bg-[#FEF2F2]',
  info: 'border-l-4 border-l-blue-500 bg-[#EFF6FF]',
}

export function ToastItem({ id, type, message, onClose }) {
  return (
    <div
      role="alert"
      className={`animate-toast-in rounded-lg shadow-md py-3 pl-4 pr-6 ${styleMap[type] || styleMap.info}`}
      onAnimationEnd={(e) => {
        if (e.animationName === 'toastOut') onClose?.(id)
      }}
    >
      <p className="text-sm font-medium text-text-primary">{message}</p>
    </div>
  )
}

export default function Toast() {
  const { toasts, removeToast } = useToast()
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            id={t.id}
            type={t.type}
            message={t.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  )
}
