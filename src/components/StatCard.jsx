function StatCard({ label, value, change, changeType }) {
  return (
    <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <p className="text-sm text-text-secondary font-medium mb-1">{label}</p>
      <p className="text-primary font-semibold text-2xl">{value}</p>
      {change && (
        <p className={`text-sm mt-2 leading-relaxed ${changeType === 'positive' ? 'text-success' : 'text-error'}`}>
          {change} from last month
        </p>
      )}
    </div>
  )
}

export default StatCard
