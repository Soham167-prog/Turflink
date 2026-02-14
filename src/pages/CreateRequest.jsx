import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { turfs, getNextDays, TIME_SLOTS_LIST } from '../data/mockData'

function CreateRequest() {
  const [turfId, setTurfId] = useState('')
  const [date, setDate] = useState(getNextDays()[0]?.date || '')
  const [time, setTime] = useState('')
  const [needed, setNeeded] = useState(4)
  const [created, setCreated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCreated(true)
  }

  if (created) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
        <div className="rounded-2xl bg-success/10 border border-success/30 p-8 text-center max-w-md mx-auto">
          <p className="text-lg font-semibold text-success">Request created!</p>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Others can now join your game.
          </p>
          <Link to="/player" className="mt-6 inline-block">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/player"
        className="text-primary hover:underline font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>
      <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 max-w-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <h1 className="text-xl font-semibold text-text-primary mb-6">
          Create Need Players Request
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-primary font-medium text-sm mb-1">Select Turf</label>
            <select
              value={turfId}
              onChange={(e) => setTurfId(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-blue-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text-primary placeholder:text-text-secondary"
            >
              <option value="">Choose turf...</option>
              {turfs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-text-primary font-medium text-sm mb-1">Date</label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-blue-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text-primary placeholder:text-text-secondary"
            >
              {getNextDays().map((d) => (
                <option key={d.date} value={d.date}>
                  {d.day} {d.date}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-text-primary font-medium text-sm mb-1">Time Slot</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-blue-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text-primary placeholder:text-text-secondary"
            >
              <option value="">Choose time...</option>
              {TIME_SLOTS_LIST.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-text-primary font-medium text-sm mb-1">
              Players needed
            </label>
            <input
              type="number"
              min={2}
              max={22}
              value={needed}
              onChange={(e) => setNeeded(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-blue-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface text-text-primary placeholder:text-text-secondary"
            />
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Create Request
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateRequest
