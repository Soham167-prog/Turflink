import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

function Payment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [showSuccess, setShowSuccess] = useState(false)

  const turf = state?.turf || { name: 'Turf', priceDisplay: '₹800/hr', location: '' }
  const slot = state?.slot || { date: '', time: '6:00 PM' }
  const amount = state?.amount ?? 800

  useEffect(() => {
    if (!state) navigate('/player', { replace: true })
  }, [state, navigate])

  const handlePay = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    toast.success('Booking confirmed! See you on the field.')
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    navigate('/player')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link to="/player" className="text-primary hover:underline font-medium mb-6 inline-block transition-colors">
        ← Back
      </Link>
      <div className="max-w-lg mx-auto">
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-8 hover:shadow-xl transition-all duration-300">
          <h1 className="text-xl font-semibold text-text-primary mb-6">Complete Booking</h1>
          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-2xl bg-surface border border-blue-100">
              <p className="text-sm text-text-secondary">Turf</p>
              <p className="font-medium text-text-primary">{turf.name}</p>
              {turf.location && <p className="text-sm text-text-secondary">{turf.location}</p>}
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-blue-100">
              <p className="text-sm text-text-secondary">Slot</p>
              <p className="font-medium text-text-primary">{slot.date} · {slot.time}</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-blue-100 flex justify-between items-center">
              <span className="text-text-secondary">Amount</span>
              <span className="text-xl font-semibold text-primary">₹{amount}</span>
            </div>
          </div>
          <form onSubmit={handlePay} className="space-y-4">
            <p className="text-sm font-medium text-text-secondary">Payment Option</p>
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-blue-100 shadow-md hover:border-primary/50 cursor-pointer transition-all bg-card">
              <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="text-primary accent-primary" />
              <span className="text-text-primary">UPI</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-blue-100 shadow-md hover:border-primary/50 cursor-pointer transition-all bg-card">
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-primary accent-primary" />
              <span className="text-text-primary">Card</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-blue-100 shadow-md hover:border-primary/50 cursor-pointer transition-all bg-card">
              <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="text-primary accent-primary" />
              <span className="text-text-primary">Net Banking</span>
            </label>
            <button type="submit" className="w-full py-3 rounded-full font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 mt-6">
              Pay & Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <>
          <div className="fixed inset-0 bg-slate-400/20 z-50 animate-fade-in" onClick={handleCloseSuccess} aria-hidden />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm mx-4 bg-card rounded-2xl border border-blue-100 shadow-xl p-8 animate-modal-in">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-text-primary mb-2">Booking Confirmed</h2>
              <p className="text-text-secondary mb-6">See you on the field!</p>
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="px-6 py-2.5 rounded-full font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Payment
