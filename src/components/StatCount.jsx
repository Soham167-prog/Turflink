import { useState, useEffect, useRef } from 'react'

function StatCount({ value, label, duration = 1200 }) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  const num = typeof value === 'string' ? parseFloat(value) : value
  const isDecimal = typeof value === 'string' && value.includes('.')

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = 0
    const end = num
    const startTime = performance.now()
    let raf
    const tick = (now) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - t) * (1 - t)
      setDisplay(isDecimal ? Math.round(eased * end * 10) / 10 : Math.round(eased * end))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, num, duration, isDecimal])

  return (
    <div ref={ref} className="bg-card/95 rounded-2xl p-8 text-center shadow-md border border-blue-100 hover:shadow-card-glow hover:-translate-y-1 transition-all duration-500 ease-in-out backdrop-blur-sm relative">
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        {isDecimal ? display.toFixed(1) : display}
      </p>
      <p className="text-sm text-text-secondary mt-2">{label}</p>
    </div>
  )
}

export default StatCount
