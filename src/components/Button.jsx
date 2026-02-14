function Button({ children, variant = 'primary', size = 'md', fullWidth = false, disabled = false, className = '', ...props }) {
  const base = 'font-semibold rounded-full inline-flex items-center justify-center transition-all duration-300 ease-in-out min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 active:scale-95 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 relative overflow-hidden'
  const variants = {
    primary: 'bg-[#60A5FA] hover:bg-[#3B82F6] text-white px-6 py-2',
    secondary: 'bg-[#86EFAC] hover:bg-[#4ADE80] text-slate-800 px-6 py-2',
    ghost: 'bg-white border border-blue-200 hover:bg-blue-50 text-text-primary shadow-none hover:shadow-md hover:translate-y-0',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px] md:min-h-0 shadow-md hover:shadow-lg',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  }
  const widthClass = fullWidth ? 'w-full' : ''
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} btn-ripple ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
