import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useRole } from '../context/RoleContext'
import logo from '../assets/logo.png'

function NavLink({ to, children, exact }) {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)
  return (
    <Link
      to={to}
      className={`relative font-medium text-sm transition-all duration-300 px-3 py-2 rounded-full ${
        isActive ? 'text-blue-500' : 'text-text-secondary hover:text-blue-500'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 h-0.5 rounded-full bg-blue-500 transition-all duration-300 ease-in-out origin-center ${
          isActive ? 'w-4 -translate-x-1/2 opacity-100' : 'w-0 -translate-x-1/2 opacity-0 group-hover:w-4 group-hover:opacity-100'
        }`}
      />
    </Link>
  )
}

function Navbar({ isLanding, isLoginOrPayment }) {
  const { followingIds } = useApp()
  const { setRole } = useRole()
  const navigate = useNavigate()
  const path = useLocation().pathname
  const isPlayerArea = path === '/player' || path === '/payment' || path === '/activity' || path.startsWith('/profile') || path.startsWith('/turf') || path === '/create-request'
  const isProviderArea = path === '/provider' || path.startsWith('/provider/')

  const handleLogout = () => {
    setRole(null)
    navigate('/', { replace: true })
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-100 shadow-sm transition-all duration-300 min-h-[72px] md:min-h-[80px] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-4 w-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center shrink-0 transition-transform duration-300 ease-in-out hover:scale-105" aria-label="Home">
            <img src={logo} alt="" className="h-[50px] w-auto md:h-[64px] object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            {isLoginOrPayment ? (
              <Link to="/" className="text-sm font-medium text-text-secondary hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full">
                Home
              </Link>
            ) : isLanding ? (
              <>
                <Link to="/login/player" className="text-sm font-medium text-text-secondary hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full">
                  Login as Player
                </Link>
                <Link to="/login/provider" className="font-semibold text-white bg-[#60A5FA] hover:bg-[#3B82F6] active:scale-95 px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Login as Provider
                </Link>
              </>
            ) : isPlayerArea ? (
              <>
                <nav className="hidden md:flex items-center gap-1">
                  <span className="group"><NavLink to="/player">Dashboard</NavLink></span>
                  <span className="group"><NavLink to="/activity">Activity</NavLink></span>
                  <span className="group"><NavLink to="/profile/me" exact>Profile</NavLink></span>
                </nav>
                <span className="text-sm text-text-secondary px-2 hidden md:inline">{followingIds.length} following</span>
                <Link to="/player" className="font-semibold text-white bg-[#60A5FA] hover:bg-[#3B82F6] active:scale-95 px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Browse Turfs
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-text-secondary border border-blue-100 bg-white/80 hover:border-blue-500 hover:text-blue-500 px-4 py-2 rounded-full transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : isProviderArea ? (
              <>
                <nav className="hidden md:flex items-center gap-1">
                  <span className="group"><NavLink to="/provider">Dashboard</NavLink></span>
                  <span className="group"><NavLink to="/provider/slots">Slot Monitoring</NavLink></span>
                  <span className="group"><NavLink to="/provider/reviews">Reviews</NavLink></span>
                  <span className="group"><NavLink to="/provider/ai-insights">AI Insights</NavLink></span>
                </nav>
                <Link to="/provider/manage" className="font-semibold text-white bg-[#60A5FA] hover:bg-[#3B82F6] active:scale-95 px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Manage
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-text-secondary border border-blue-100 bg-white/80 hover:border-blue-500 hover:text-blue-500 px-4 py-2 rounded-full transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
