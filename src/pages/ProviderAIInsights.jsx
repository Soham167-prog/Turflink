import { Link } from 'react-router-dom'

const pricingInsights = [
  { id: 1, text: 'Increase Sunday price by 15% (High demand detected)', icon: '₹' },
  { id: 2, text: 'Offer 10% discount on Independence Day', icon: '₹' },
  { id: 3, text: 'Saturday 6PM–9PM slots have 90% booking rate', icon: '₹' },
]

const maintenanceAlerts = [
  { id: 1, text: '3 reviews mentioned poor lighting — inspect floodlights.' },
  { id: 2, text: '2 players reported uneven turf surface.' },
  { id: 3, text: 'Low cleanliness rating last week — schedule maintenance.' },
]

const availabilityInsights = [
  { id: 1, text: 'Weekday 2PM–4PM low occupancy — reduce price to ₹500.' },
  { id: 2, text: 'Friday evenings consistently booked — maintain ₹900.' },
]

function ProviderAIInsights() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-page-enter">
      <Link
        to="/provider"
        className="text-primary hover:text-[#4338CA] font-medium mb-6 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>
      <h1 className="text-xl font-semibold text-text-primary mb-2">AI Revenue & Maintenance Insights</h1>
      <p className="text-sm text-text-secondary mb-8">Mock insights based on booking and review patterns. No real ML.</p>

      {/* SECTION 1 — Pricing Recommendations */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Pricing Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingInsights.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 shadow-sm hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-primary font-semibold">{item.icon}</span>
              </div>
              <p className="text-text-primary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — Maintenance Alerts */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Maintenance Alerts</h2>
        <div className="space-y-4">
          {maintenanceAlerts.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 shadow-sm hover:scale-[1.02] flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-medium">!</span>
              </div>
              <p className="text-text-primary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Availability Optimization */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Availability Optimization</h2>
        <div className="space-y-4">
          {availabilityInsights.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 shadow-sm hover:scale-[1.02] flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                <span className="text-success font-medium">◉</span>
              </div>
              <p className="text-text-primary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProviderAIInsights
