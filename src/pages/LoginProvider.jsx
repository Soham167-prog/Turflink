import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

function LoginProvider() {
  const [turfName, setTurfName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const navigate = useNavigate()
  const { setRole } = useRole()

  const handleSubmit = (e) => {
    e.preventDefault()
    setRole('provider')
    navigate('/provider')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h1 className="text-2xl font-semibold text-text-primary mb-6">Turf Provider Access</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="turfName" className="block text-sm font-medium text-text-secondary mb-1.5">Turf Name</label>
              <input
                id="turfName"
                type="text"
                value={turfName}
                onChange={(e) => setTurfName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-text-secondary"
                placeholder="Your turf name"
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-text-secondary mb-1.5">Contact Email</label>
              <input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-text-secondary"
                placeholder="contact@turf.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Continue to Provider Dashboard
            </button>
          </form>
          <p className="text-sm text-text-secondary mt-6 text-center">
            <Link to="/" className="text-primary hover:underline">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginProvider
