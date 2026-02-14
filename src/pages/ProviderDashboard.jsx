import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProvider } from '../context/ProviderContext'
import {
  providerStats,
  providerSlots,
  providerUpcomingMatches,
  providerReviews,
} from '../data/mockData'

function ProviderDashboard() {
  const { activeLocation } = useProvider()
  const [slots, setSlots] = useState(providerSlots)

  const locationSlots = activeLocation
    ? slots.filter((s) => s.locationId === activeLocation.id)
    : []
  const locationMatches = activeLocation
    ? providerUpcomingMatches.filter((m) => m.locationId === activeLocation.id)
    : []
  const locationReviews = activeLocation
    ? providerReviews.filter((r) => r.locationId === activeLocation.id)
    : []

  const handleMarkUnavailable = (id) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'unavailable', bookedBy: null } : s))
    )
  }

  const handleMarkAvailable = (id) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'available', bookedBy: null } : s))
    )
  }

  if (!activeLocation) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
        <h1 className="text-xl font-semibold text-text-primary mb-6">Provider Dashboard</h1>
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-12 text-center ">
          <p className="text-text-secondary mb-4">Please select or add a location to view dashboard.</p>
          <Link
            to="/provider/manage"
            className="inline-block px-6 py-2.5 rounded-full font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Manage Locations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">{activeLocation.turfName}</h1>
        <p className="text-text-secondary">{activeLocation.city}</p>
        <p className="text-sm text-text-secondary mt-1">Base Price: ₹{activeLocation.basePrice}/hr</p>
      </div>

      {/* SECTION 1 — Overview Stats */}
      <section className="py-6 px-4 rounded-2xl bg-surface-alt/50">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <p className="text-sm text-text-secondary">Total Bookings This Month</p>
            <p className="text-2xl font-semibold text-text-primary mt-1">{providerStats.totalBookingsThisMonth}</p>
          </div>
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <p className="text-sm text-text-secondary">Upcoming Matches</p>
            <p className="text-2xl font-semibold text-text-primary mt-1">{providerStats.upcomingMatches}</p>
          </div>
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <p className="text-sm text-text-secondary">Average Rating</p>
            <p className="text-2xl font-semibold text-text-primary mt-1">{providerStats.averageRating}</p>
          </div>
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            <p className="text-sm text-text-secondary">Revenue This Week</p>
            <p className="text-2xl font-semibold text-text-primary mt-1">₹{providerStats.revenueThisWeek?.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Slot Monitoring */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Slot Monitoring</h2>
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface border-b border-blue-100">
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Time</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Sport</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Booked By</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {locationSlots.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                      No slots for this location.
                    </td>
                  </tr>
                ) : (
                  locationSlots.map((slot) => (
                    <tr key={slot.id} className="border-b border-blue-100 last:border-0 hover:bg-surface transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary">{slot.date}</td>
                      <td className="px-6 py-4 text-sm text-text-primary">{slot.time}</td>
                      <td className="px-6 py-4 text-sm text-text-primary">{slot.sport}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{slot.bookedBy || '—'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-xl text-xs font-medium ${
                            slot.status === 'booked'
                              ? 'bg-success/10 text-success'
                              : slot.status === 'unavailable'
                                ? 'bg-error/10 text-error'
                                : 'bg-slate-100 text-text-secondary'
                          }`}
                        >
                          {slot.status === 'unavailable' ? 'Unavailable' : slot.status === 'booked' ? 'Booked' : 'Available'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {slot.status === 'available' || slot.status === 'unavailable' ? (
                          <button
                            type="button"
                            onClick={() =>
                              slot.status === 'available'
                                ? handleMarkUnavailable(slot.id)
                                : handleMarkAvailable(slot.id)
                            }
                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-slate-100 text-text-primary hover:bg-slate-200 transition-all duration-200"
                          >
                            {slot.status === 'available' ? 'Mark Unavailable' : 'Mark Available'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
                          >
                            View Booking
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-3">
          <Link to="/provider/slots" className="text-primary hover:underline font-medium">
            Manage all slots →
          </Link>
        </p>
      </section>

      {/* SECTION 3 — Upcoming Match Notifications */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Upcoming Match Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locationMatches.length === 0 ? (
            <p className="text-text-secondary col-span-full">No upcoming matches for this location.</p>
          ) : (
            locationMatches.map((match) => (
              <div
                key={match.id}
                className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <h3 className="font-semibold text-text-primary">
                  {match.sport} Match — {match.date}, {match.time}
                </h3>
                <p className="text-sm text-text-secondary mt-2">Booked by: {match.bookedBy}</p>
                <p className="text-sm text-text-secondary mt-1">
                  Players Joined: {match.playersJoined}/{match.playersNeeded}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 4 — Reviews preview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Reviews</h2>
        {locationReviews.length === 0 ? (
          <p className="text-text-secondary">No reviews for this location yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-2">
            {locationReviews.slice(0, 3).map((r) => (
              <span key={r.id} className="text-sm text-text-secondary">
                {r.playerName} — ★{r.rating}
              </span>
            ))}
          </div>
        )}
        <Link to="/provider/reviews" className="text-sm text-primary hover:underline font-medium">
          View all reviews →
        </Link>
      </section>

      {/* SECTION 5 — AI Insights */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">AI Revenue & Maintenance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 ">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-primary text-lg">₹</span>
            </div>
            <h3 className="font-medium text-text-primary mb-2">Pricing</h3>
            <p className="text-sm text-text-secondary">Increase Sunday price by 15% (High demand detected). Saturday 6PM–9PM slots have 90% booking rate.</p>
          </div>
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 ">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
              <span className="text-amber-600 text-lg">!</span>
            </div>
            <h3 className="font-medium text-text-primary mb-2">Maintenance</h3>
            <p className="text-sm text-text-secondary">3 reviews mentioned poor lighting — inspect floodlights. Low cleanliness rating last week — schedule maintenance.</p>
          </div>
          <div className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 ">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-3">
              <span className="text-success text-lg">◉</span>
            </div>
            <h3 className="font-medium text-text-primary mb-2">Availability</h3>
            <p className="text-sm text-text-secondary">Weekday 2PM–4PM low occupancy — reduce price to ₹500. Friday evenings consistently booked — maintain ₹900.</p>
          </div>
        </div>
        <Link to="/provider/ai-insights" className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
          View full AI Insights →
        </Link>
      </section>
    </div>
  )
}

export default ProviderDashboard
