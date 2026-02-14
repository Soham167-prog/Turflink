import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

function LoginPlayer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { setRole } = useRole()

  const handleSubmit = (e) => {
    e.preventDefault()
    setRole('player')
    navigate('/player')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-blue-100 shadow-md shadow-sm p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h1 className="text-2xl font-semibold text-text-primary mb-6">Player Access</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-text-secondary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-blue-100 bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder:text-text-secondary"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Continue to Dashboard
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

export default LoginPlayer
