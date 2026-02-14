import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Button from './Button'

const RATING_LABELS = ['Poor', 'Fair', 'Good', 'Great', 'Excellent']

function PostGameModal() {
  const { postGameModal, closePostGameModal, addActivity } = useApp()
  const { open, game } = postGameModal
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const summary = notes.trim()
      ? notes
      : `Had a ${RATING_LABELS[rating - 1]?.toLowerCase() || 'good'} game of ${game?.sport || 'sport'}!`
    addActivity({
      type: 'feedback',
      userId: 'me',
      userName: 'You',
      sport: game?.sport || 'sport',
      summary,
      rating,
      timestamp: 'Just now',
    })
    setSubmitted(true)
    setTimeout(() => {
      closePostGameModal()
      setRating(0)
      setNotes('')
      setSubmitted(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-400/20 backdrop-blur-sm"
        onClick={closePostGameModal}
        aria-hidden
      />
      <div className="relative bg-card rounded-2xl shadow-xl max-w-md w-full p-6 border border-blue-100 shadow-md animate-modal-in">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-text-primary">Thanks for your feedback!</p>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">Your summary has been shared.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-text-primary mb-1">How was your game?</h3>
            {game && (
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                {game.sport} at {game.turfName}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Overall rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                        rating >= n ? 'bg-primary text-white' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-text-secondary mt-1">{RATING_LABELS[rating - 1]}</p>
                )}
              </div>
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">
                  Quick summary (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Great match! Solid teamwork."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-blue-100 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none bg-surface text-text-primary placeholder:text-text-secondary"
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={closePostGameModal} className="flex-1">
                  Skip
                </Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={rating === 0}>
                  Share
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default PostGameModal
