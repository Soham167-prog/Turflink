import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import heroVideo from '../assets/hero-video.mp4'
import StatCount from '../components/StatCount'

function MiniTurf() {
  return (
    <div className="absolute right-8 bottom-24 md:right-16 md:bottom-32 w-28 h-20 md:w-36 md:h-24 rounded-xl shadow-lg overflow-hidden pointer-events-none z-10 animate-turf-float" style={{ background: 'linear-gradient(160deg, #BBF7D0 0%, #86EFAC 50%, #4ADE80 100%)' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/90" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/80" />
      <div className="absolute inset-0 rounded-xl border border-white/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white shadow-md animate-ball-drift opacity-90" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
    </div>
  )
}

function Landing() {
  const heroVideoRef = useRef(null)
  const heroContentRef = useRef(null)
  const sectionRefs = useRef([])
  const [parallax, setParallax] = useState({ y: 0 })
  const [revealed, setRevealed] = useState({})

  useEffect(() => {
    let raf
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setParallax({ y })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const observers = sectionRefs.current.filter(Boolean).map((el, i) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setRevealed((p) => ({ ...p, [i]: true }))
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const videoOffset = Math.min(parallax.y * 0.25, 120)
  const contentOffset = Math.min(parallax.y * 0.08, 30)

  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      {/* Fixed ambient video - no blur, light opacity, sharp */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none z-0 video-sharp"
        src={heroVideo}
        aria-hidden
      />
      <div className="fixed inset-0 bg-gradient-to-b from-surface/94 via-surface/88 to-surface/94 pointer-events-none z-[1]" />
      {/* Floating decorative orbs - different speeds */}
      <div className="fixed top-[20%] left-[10%] w-16 h-16 rounded-full bg-primary/10 blur-2xl animate-float-slow-a pointer-events-none z-[1]" />
      <div className="fixed top-[60%] right-[15%] w-24 h-24 rounded-full bg-secondary/15 blur-2xl animate-float-slow-b pointer-events-none z-[1]" />
      <div className="fixed bottom-[25%] left-[20%] w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-float-slow-c pointer-events-none z-[1]" />

      {/* SECTION 1 — Hero with parallax */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-end md:items-center z-10">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 video-sharp"
          style={{ transform: `translateY(${videoOffset * 0.5}px)` }}
          src={heroVideo}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 right-0 h-[28%] bg-gradient-to-b from-white/30 to-transparent z-[1]" />
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-24 md:pt-0 pt-24"
          style={{ transform: `translateY(${contentOffset}px)` }}
        >
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary tracking-tight leading-[1.05] animate-hero-in hero-text-shadow">
              Where Games Begin.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary/90 max-w-xl leading-relaxed animate-hero-in hero-text-shadow" style={{ animationDelay: '0.15s' }}>
              Book premium turfs, connect with real players, and organize matches effortlessly.
            </p>
            <div className="mt-12 flex flex-wrap gap-4 animate-hero-in" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/login/player"
                className="inline-flex font-semibold text-white bg-[#60A5FA] hover:bg-[#3B82F6] px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                Start as Player
              </Link>
              <Link
                to="/login/provider"
                className="inline-flex font-semibold text-slate-800 bg-white border border-blue-100 px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
              >
                Manage as Provider
              </Link>
            </div>
          </div>
        </div>
        <MiniTurf />
      </section>

      {/* SECTION 2 — Story Block (blob removed, section reveal) */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`relative w-full px-6 py-24 md:py-32 z-10 transition-all duration-500 ease-in-out ${revealed[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="absolute inset-0 bg-surface/85 backdrop-blur-[2px]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight">
              Built for athletes. Designed for simplicity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            <div className="bg-card/95 rounded-2xl p-8 shadow-md border border-blue-100 text-center hover:shadow-card-glow hover:-translate-y-1 transition-all duration-500 ease-in-out backdrop-blur-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Discover</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Find nearby turfs by sport and location. Real-time availability.</p>
            </div>
            <div className="bg-card/95 rounded-2xl p-8 shadow-md border border-blue-100 text-center hover:shadow-card-glow hover:-translate-y-1 transition-all duration-500 ease-in-out backdrop-blur-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Schedule</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Pick date, time, and invite or match with players.</p>
            </div>
            <div className="bg-card/95 rounded-2xl p-8 shadow-md border border-blue-100 text-center hover:shadow-card-glow hover:-translate-y-1 transition-all duration-500 ease-in-out backdrop-blur-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Play</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Pay securely and show up. Simple.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Platform Impact (count-up stats) */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`relative w-full px-6 py-24 md:py-32 z-10 transition-all duration-500 ease-in-out ${revealed[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="absolute inset-0 bg-surface-alt/90 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-200/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCount value="86" label="Matches Hosted" />
            <StatCount value="29" label="Active Players" />
            <StatCount value="5" label="Premium Locations" />
            <StatCount value="4.3" label="Avg Rating" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — How it Works */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`relative w-full px-6 py-24 md:py-32 z-10 transition-all duration-500 ease-in-out ${revealed[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="absolute inset-0 bg-surface/85 backdrop-blur-[2px]" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-64 flex items-center justify-center">
            <div className="absolute w-52 h-36 rounded-2xl bg-white/70 border border-blue-100 shadow-lg backdrop-blur-sm -rotate-3 translate-x-2 transition-transform duration-500 ease-in-out" />
            <div className="absolute w-52 h-36 rounded-2xl bg-white/80 border border-blue-100 shadow-xl backdrop-blur-sm rotate-0 transition-transform duration-500 ease-in-out" />
            <div className="absolute w-52 h-36 rounded-2xl bg-white/60 border border-blue-100 shadow-md backdrop-blur-sm rotate-3 -translate-x-2 transition-transform duration-500 ease-in-out" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-10">How it works</h2>
            <div className="space-y-0">
              {[
                { step: 1, title: 'Discover', desc: 'Browse turfs by location and sport. See live availability.' },
                { step: 2, title: 'Schedule', desc: 'Pick date and time. Invite friends or find players.' },
                { step: 3, title: 'Play', desc: 'Pay securely and hit the field.' },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-semibold flex items-center justify-center shrink-0">{item.step}</div>
                    {i < 2 && <div className="w-0.5 flex-1 min-h-[40px] bg-blue-100 my-1" />}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                    <p className="text-text-secondary text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Trust & Payments (static dots, no animated line) */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`relative w-full px-6 py-16 md:py-20 z-10 overflow-hidden transition-all duration-500 ease-in-out ${revealed[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="absolute inset-0 bg-surface-alt/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #60A5FA 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-text-secondary text-sm font-medium mb-6">We support secure payments via</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-5 py-2.5 rounded-xl bg-card border border-blue-100 text-text-primary text-sm font-medium shadow-sm">UPI</span>
            <span className="px-5 py-2.5 rounded-xl bg-card border border-blue-100 text-text-primary text-sm font-medium shadow-sm">Cards</span>
            <span className="px-5 py-2.5 rounded-xl bg-card border border-blue-100 text-text-primary text-sm font-medium shadow-sm">Net Banking</span>
          </div>
        </div>
      </section>

      {/* SECTION 6 — About Us */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className={`relative w-full z-10 transition-all duration-500 ease-in-out ${revealed[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-alt/50 to-surface" />
        <div className="relative w-full h-16 -mt-8" aria-hidden>
          <svg viewBox="0 0 1440 80" className="w-full h-full fill-surface-alt" preserveAspectRatio="none">
            <path d="M0,40 Q360,0 720,40 T1440,40 L1440,80 L0,80 Z" opacity="0.9" />
          </svg>
        </div>
        <div className="relative px-6 py-24 md:py-32 bg-gradient-to-b from-surface-alt/50 via-surface to-surface">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">About us</h2>
            <p className="text-text-secondary leading-relaxed">
              Built to simplify local sports coordination by combining booking and player discovery into one easy-to-use platform. Speed, simplicity, and community-driven play.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Footer */}
      <footer className="relative w-full px-6 py-16 bg-slate-100/80 border-t border-blue-100 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Company</p>
              <Link to="/" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out mb-2">Home</Link>
              <Link to="/login/player" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out mb-2">Player Login</Link>
              <Link to="/login/provider" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out">Provider Login</Link>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Support</p>
              <Link to="/" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out mb-2">Help</Link>
              <Link to="/" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out">Contact</Link>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Legal</p>
              <Link to="/" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out mb-2">Terms</Link>
              <Link to="/" className="block text-sm text-text-primary hover:text-primary transition-colors duration-300 ease-in-out">Privacy</Link>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Social</p>
              <span className="text-sm text-text-secondary">Placeholder</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-blue-100">
            <Link to="/" className="shrink-0 transition-transform duration-300 ease-in-out hover:scale-105" aria-label="Home">
              <img src={logo} alt="" className="h-[50px] w-auto md:h-[64px] object-contain" />
            </Link>
            <p className="text-sm text-text-secondary">© 2026. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
