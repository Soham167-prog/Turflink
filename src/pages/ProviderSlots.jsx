import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getNextDays } from '../data/mockData'
import { useProvider } from '../context/ProviderContext'

const TIME_SLOTS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
]

function ProviderSlots() {
  const { activeLocation } = useProvider()
  const days = getNextDays()
  const [grid, setGrid] = useState(() => {
    const g = {}
    days.forEach((d) => {
      g[d.date] = TIME_SLOTS.reduce((acc, t) => {
        acc[t] = true
        return acc
      }, {})
    })
    return g
  })

  const toggle = (date, time) => {
    setGrid((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [time]: !prev[date]?.[time],
      },
    }))
  }

  if (!activeLocation) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
        <Link to="/provider" className="text-primary hover:underline font-medium mb-6 inline-block">← Back to Dashboard</Link>
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-12 text-center shadow-sm">
          <p className="text-text-secondary">Please select or add a location first.</p>
          <Link to="/provider/manage" className="inline-block mt-4 text-primary font-medium hover:underline">Manage Locations</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/provider"
        className="text-primary hover:text-[#4338CA] font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>
      <h1 className="text-xl font-semibold text-text-primary mb-1">Slot Management</h1>
      <p className="text-sm text-text-secondary mb-2">{activeLocation.turfName} — {activeLocation.city}</p>
      <p className="text-sm text-text-secondary mb-8">Toggle slot availability. Green = available, Gray = unavailable.</p>

      <div className="space-y-8">
        {days.map((d) => (
          <div key={d.date} className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-4">
              {d.day} — {d.label}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {TIME_SLOTS.map((time) => {
                const available = grid[d.date]?.[time] !== false
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggle(d.date, time)}
                    className={`px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      available
                        ? 'bg-success/10 text-success border border-success/20 hover:bg-success/20'
                        : 'bg-slate-100 text-text-secondary border border-blue-100 shadow-md hover:bg-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProviderSlots
