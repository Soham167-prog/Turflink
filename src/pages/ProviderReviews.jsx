import { useState } from 'react'
import { Link } from 'react-router-dom'
import { providerReviews } from '../data/mockData'
import { useProvider } from '../context/ProviderContext'
import Button from '../components/Button'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="inline-flex gap-0.5 text-amber-500" aria-label={`${rating} stars`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < full || (i === full && half) ? 'text-amber-500' : 'text-white/30'}>
          ★
        </span>
      ))}
    </span>
  )
}

function ProviderReviews() {
  const { activeLocation } = useProvider()
  const [respondId, setRespondId] = useState(null)
  const [responseText, setResponseText] = useState('')

  const locationReviews = activeLocation
    ? providerReviews.filter((r) => r.locationId === activeLocation.id)
    : []

  const handleOpenRespond = (id) => {
    setRespondId(id)
    setResponseText('')
  }

  const handleCloseRespond = () => {
    setRespondId(null)
    setResponseText('')
  }

  const handleSubmitResponse = () => {
    setRespondId(null)
    setResponseText('')
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
      <h1 className="text-xl font-semibold text-text-primary mb-1">Player Reviews</h1>
      <p className="text-sm text-text-secondary mb-8">{activeLocation.turfName} — {activeLocation.city}</p>

      <div className="space-y-4">
        {locationReviews.length === 0 ? (
          <p className="text-text-secondary">No reviews for this location yet.</p>
        ) : (
          locationReviews.map((review) => (
          <div
            key={review.id}
            className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="font-semibold text-text-primary">{review.playerName}</p>
                <p className="text-sm text-text-secondary">{review.sport} · {review.date}</p>
                <div className="mt-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-text-secondary mt-2 leading-relaxed">"{review.text}"</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleOpenRespond(review.id)}
                className="flex-shrink-0"
              >
                Respond to Review
              </Button>
            </div>
          </div>
          ))
        )}
      </div>

      {respondId !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
            onClick={handleCloseRespond}
            aria-hidden
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 bg-card rounded-2xl border border-blue-100 shadow-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Respond to Review</h3>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Write your response..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 shadow-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-primary resize-none"
            />
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" onClick={handleCloseRespond}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitResponse}>
                Send Response
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProviderReviews
