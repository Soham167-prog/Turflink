import { useState } from 'react'
import { getNextDays, getSlotsForTurf } from '../data/mockData'
import Button from './Button'

function SlotSelector({ turfId, onBook, disabled, recentBookings = [] }) {
  const days = getNextDays()
  const [selectedDate, setSelectedDate] = useState(days[0]?.date || '')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const baseSlots = selectedDate ? getSlotsForTurf(turfId, selectedDate) : []
  const justBooked = (recentBookings || []).filter((b) => b.date === selectedDate).map((b) => b.time)
  const slots = baseSlots.map((s) => ({
    ...s,
    available: s.available && !justBooked.includes(s.time),
  }))

  const handleBook = () => {
    if (!selectedSlot) return
    onBook?.({ date: selectedDate, time: selectedSlot })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">Select Date & Time</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => {
              setSelectedDate(d.date)
              setSelectedSlot(null)
            }}
            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 min-h-[44px] ${
              selectedDate === d.date
                ? 'bg-[#60A5FA] text-white'
                : 'bg-surface border border-blue-100 text-text-primary hover:border-primary/50'
            }`}
          >
            {d.day}<br />{d.label.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
        {slots.map(({ time, available }) => (
          <button
            key={time}
            onClick={() => available && setSelectedSlot(selectedSlot === time ? null : time)}
            disabled={!available || disabled}
            className={`px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 min-h-[44px] ${
              !available
                ? 'bg-slate-100 text-text-secondary cursor-not-allowed line-through border border-slate-100'
                : selectedSlot === time
                ? 'bg-[#60A5FA] text-white ring-2 ring-[#60A5FA] ring-offset-2 ring-offset-surface'
                : 'bg-surface border border-blue-100 text-text-primary hover:border-primary hover:bg-primary/10'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
      {selectedSlot && (
        <Button variant="primary" fullWidth onClick={handleBook}>
          Book {selectedSlot}
        </Button>
      )}
    </div>
  )
}

export default SlotSelector
