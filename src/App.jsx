import { useState, useEffect, useRef } from 'react'
import {
  Home, Menu, X, ShieldCheck, Clock, CalendarCheck, Wrench, Zap, Sparkles, PaintRoller,
  Fan, Hammer, ArrowRight, MousePointerClick, UserCheck, HeartHandshake, Check, Star,
  BadgeCheck, Phone, Mail, MapPin, CheckCircle2, Briefcase, ChevronRight,
} from 'lucide-react'

const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const SERVICES = [
  { name: 'Plumbing', icon: Wrench, img: 'photo-1607472586893-edb57bdc0e39', desc: 'Leaks, fittings and bathroom repairs handled quickly and cleanly.' },
  { name: 'Electrical', icon: Zap, img: 'photo-1621905251189-08b45d6a269e', desc: 'Safe wiring, switches, fans and lighting from careful technicians.' },
  { name: 'Cleaning', icon: Sparkles, img: 'photo-1581578731548-c64695cc6952', desc: 'Regular and deep cleaning that leaves every room fresh.' },
  { name: 'Painting', icon: PaintRoller, img: 'photo-1589939705384-5185137a7f0f', desc: 'Neat interior and exterior finishes with minimal disruption.' },
  { name: 'AC & Appliance Repair', icon: Fan, img: 'photo-1631545806609-1c1a4b0f8d1c', desc: 'Servicing and repair for air conditioners and daily appliances.' },
  { name: 'Carpentry', icon: Hammer, img: 'photo-1504148455328-c376907d081c', desc: 'Furniture fixes, fittings and custom woodwork done right.' },
]

const STEPS = [
  { icon: MousePointerClick, title: 'Choose Your Service', text: 'Pick what your home needs from our everyday services.' },
  { icon: UserCheck, title: 'Connect With a Verified Professional', text: 'We match you with a skilled local professional nearby.' },
  { icon: HeartHandshake, title: 'Enjoy Hassle-Free Home Care', text: 'Relax while the work is done well and on time.' },
]

const PLANS = [
  { name: 'Basic', price: 199, features: ['Access to professionals', 'Standard booking', 'Essential maintenance support'] },
  { name: 'Home Plus', price: 399, featured: true, features: ['Everything in Basic', 'Priority booking', 'Regular maintenance benefits', 'Service discounts'] },
  { name: 'Premium', price: 699, features: ['Everything in Home Plus', 'Premium scheduling', 'Dedicated support'] },
]

const PROS = [
  { name: 'Rahul', role: 'Electrician', years: 5, rating: 4.9, img: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Arjun', role: 'Plumber', years: 7, rating: 4.8, img: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Priya', role: 'Cleaning Professional', years: 4, rating: 4.9, img: 'photo-1494790108377-be9c29b29330' },
]

/* [label, section id, optional action] */
const NAV = [
  ['Home', 'home'], ['Services', 'services'], ['Membership', 'membership'],
  ['About', 'about'], ['Join as Professional', 'about', 'register'],
]

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

/* Image with a branded fallback so the layout never breaks if a photo fails to load */
function Img({ id, w, alt, className = '', eager = false, position = 'center', fallback = null }) {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-sage-100 to-sand text-primary/70 ${className}`}>
        {fallback}
      </div>
    )
  }
  return (
    <img
      src={u(id, w)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
      {...(eager ? { fetchpriority: 'high' } : {})}
      onError={() => setBad(true)} style={{ objectPosition: position }}
      className={`object-cover ${className}`}
    />
  )
}

function Logo() {
  return (
    <a href="#home" onClick={(e) => { e.preventDefault(); go('home') }} className="group flex items-center gap-3" aria-label="Workforce Suppliers, home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-soft transition group-hover:bg-deep">
        <Home size={20} strokeWidth={2.2} />
      </span>
      <span className="font-heading text-[1.05rem] font-extrabold leading-none tracking-tight text-deep">
        Workforce <span className="text-primary">Suppliers</span>
      </span>
    </a>
  )
}

function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...p }) {
  const variants = {
    primary: 'bg-primary text-white shadow-soft hover:bg-deep hover:shadow-lift',
    secondary: 'border border-line bg-white text-deep shadow-soft hover:border-primary/50 hover:text-primary',
  }
  const sizes = { md: 'h-11 px-6', lg: 'h-12 px-7' }
  return (
    <button
      {...p} type={type}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition duration-200 active:scale-[.98] ${sizes[size]} ${variants[variant]} ${className}`}
    />
  )
}

function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const k = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    const first = ref.current?.querySelector('input, select, button[type=submit]')
    first?.focus({ preventScroll: true })
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; prev?.focus?.({ preventScroll: true }) }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4">
      <div className="fade fixed inset-0 bg-[#F3F1EA]/75 backdrop-blur-md" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className="pop relative my-auto w-full max-w-md rounded-3xl border border-line bg-card p-7 shadow-lift sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-bg hover:text-deep"><X size={18} /></button>
        {children}
      </div>
    </div>
  )
}

function Success({ title, text, onClose }) {
  return (
    <div className="pop py-4 text-center" role="status">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-primary"><CheckCircle2 size={34} /></span>
      <h3 className="mt-5 text-2xl font-bold text-deep">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
      <Button onClick={onClose} className="mt-7 w-full">Done</Button>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-xs font-medium text-danger">{error}</span>}
    </label>
  )
}
const inputCls = (err) => `w-full rounded-xl border bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:bg-white focus:outline-none focus:ring-4 ${err ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-line focus:border-primary focus:ring-primary/10'}`

/* ---------- validation ---------- */
const isoToday = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().split('T')[0] }
const vName = (v) => (v.trim().length < 2 ? 'Please enter your full name.' : '')
const vPhone = (v) => {
  const digits = v.replace(/[\s-]/g, '').replace(/^\+91/, '').replace(/^0/, '')
  return /^[0-9]{10}$/.test(digits) && /^[+0-9\s-]+$/.test(v) ? '' : 'Enter a valid 10-digit phone number.'
}
const vDate = (v) => (!v ? 'Please choose a date.' : v < isoToday() ? 'Please choose today or a future date.' : '')
const vExp = (v) => (v === '' || isNaN(+v) || +v < 0 || +v > 50 || !Number.isInteger(+v) ? 'Enter whole years between 0 and 50.' : '')
const prettyDate = (v) => { try { return new Date(v + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) } catch { return v } }

function BookingModal({ service, onClose }) {
  const empty = { name: '', phone: '', date: '' }
  const [done, setDone] = useState(false)
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const [svc, setSvc] = useState(service)
  useEffect(() => { setSvc(service); setDone(false); setF(empty); setErr({}) }, [service])
  const set = (k, check) => (e) => {
    const v = e.target.value
    setF((p) => ({ ...p, [k]: v }))
    if (err[k]) setErr((p) => ({ ...p, [k]: check(v) }))
  }
  const submit = (e) => {
    e.preventDefault()
    const n = { name: vName(f.name), phone: vPhone(f.phone), date: vDate(f.date) }
    setErr(n)
    if (!Object.values(n).some(Boolean)) setDone(true)
  }
  return (
    <Modal open={!!service} onClose={onClose} title="Book a service">
      {done ? (
        <Success title="Booking request sent" text={`Thanks ${f.name.trim().split(' ')[0]}! We’ll call you on ${f.phone.trim()} to confirm your ${svc} visit on ${prettyDate(f.date)}.`} onClose={onClose} />
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="pr-8">
            <h3 className="text-2xl font-bold text-deep">Book a service</h3>
            <p className="mt-1 text-sm text-muted">Tell us a little and we’ll match you with a professional.</p>
          </div>
          <Field label="Your name" error={err.name}><input className={inputCls(err.name)} aria-invalid={!!err.name} autoComplete="name" placeholder="e.g. Anita Sharma" value={f.name} onChange={set('name', vName)} /></Field>
          <Field label="Phone number" error={err.phone}><input type="tel" inputMode="tel" autoComplete="tel" className={inputCls(err.phone)} aria-invalid={!!err.phone} placeholder="98765 43210" value={f.phone} onChange={set('phone', vPhone)} /></Field>
          <Field label="Service">
            <select className={inputCls()} value={svc} onChange={(e) => setSvc(e.target.value)}>
              {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Preferred date" error={err.date}><input type="date" min={isoToday()} className={inputCls(err.date)} aria-invalid={!!err.date} value={f.date} onChange={set('date', vDate)} /></Field>
          <Button type="submit" className="w-full">Request booking</Button>
        </form>
      )}
    </Modal>
  )
}

function RegisterModal({ open, onClose }) {
  const empty = { name: '', phone: '', skill: 'Electrician', exp: '' }
  const [done, setDone] = useState(false)
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  useEffect(() => { if (open) { setDone(false); setF(empty); setErr({}) } }, [open])
  const set = (k, check) => (e) => {
    const v = e.target.value
    setF((p) => ({ ...p, [k]: v }))
    if (err[k]) setErr((p) => ({ ...p, [k]: check(v) }))
  }
  const submit = (e) => {
    e.preventDefault()
    const n = { name: vName(f.name), phone: vPhone(f.phone), exp: vExp(f.exp) }
    setErr(n)
    if (!Object.values(n).some(Boolean)) setDone(true)
  }
  return (
    <Modal open={open} onClose={onClose} title="Register as a professional">
      {done ? (
        <Success title="Registration received" text={`Welcome, ${f.name.trim().split(' ')[0]}! Our team will reach out on ${f.phone.trim()} with next steps.`} onClose={onClose} />
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="pr-8">
            <h3 className="text-2xl font-bold text-deep">Join our network</h3>
            <p className="mt-1 text-sm text-muted">Share your skills and start getting consistent work.</p>
          </div>
          <Field label="Full name" error={err.name}><input className={inputCls(err.name)} aria-invalid={!!err.name} autoComplete="name" placeholder="e.g. Suresh Kumar" value={f.name} onChange={set('name', vName)} /></Field>
          <Field label="Phone number" error={err.phone}><input type="tel" inputMode="tel" autoComplete="tel" className={inputCls(err.phone)} aria-invalid={!!err.phone} placeholder="98765 43210" value={f.phone} onChange={set('phone', vPhone)} /></Field>
          <Field label="Primary skill">
            <select className={inputCls()} value={f.skill} onChange={(e) => setF({ ...f, skill: e.target.value })}>
              {['Electrician', 'Plumber', 'Cleaner', 'Painter', 'AC & Appliance Technician', 'Carpenter'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Years of experience" error={err.exp}><input type="number" inputMode="numeric" min="0" max="50" className={inputCls(err.exp)} aria-invalid={!!err.exp} placeholder="e.g. 5" value={f.exp} onChange={set('exp', vExp)} /></Field>
          <Button type="submit" className="w-full">Submit registration</Button>
        </form>
      )}
    </Modal>
  )
}

function Navbar({ onStart, onRegister }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8)
    const r = () => window.innerWidth >= 1024 && setOpen(false)
    s(); window.addEventListener('scroll', s, { passive: true }); window.addEventListener('resize', r)
    return () => { window.removeEventListener('scroll', s); window.removeEventListener('resize', r) }
  }, [])
  useEffect(() => {
    const ids = ['home', 'services', 'membership', 'about']
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  const nav = ([, id, action]) => { setOpen(false); action === 'register' ? onRegister() : go(id) }
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${open ? 'border-line bg-bg' : scrolled ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const isActive = !item[2] && active === item[1]
            return (
              <button key={item[0]} onClick={() => nav(item)} aria-current={isActive ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-sage-100 text-deep' : 'text-muted hover:bg-sage-50 hover:text-deep'}`}>{item[0]}</button>
            )
          })}
        </nav>
        <div className="hidden lg:block"><Button onClick={onStart}>Get Started</Button></div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-deep shadow-soft lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="drop absolute inset-x-0 top-full border-b border-line bg-bg px-5 pb-6 pt-2 shadow-lift lg:hidden">
          <nav className="mx-auto max-w-lg" aria-label="Mobile">
            {NAV.map((item) => (
              <button key={item[0]} onClick={() => nav(item)} className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-base font-medium text-ink transition hover:bg-sage-50">
                {item[0]} <ChevronRight size={18} className="text-muted" />
              </button>
            ))}
            <Button onClick={() => { setOpen(false); onStart() }} size="lg" className="mt-4 w-full">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(55%_60%_at_85%_40%,#EBF2EC_0%,rgba(250,249,246,0)_100%)]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-8 lg:pb-32 lg:pt-20">
        <div>
          <h1 className="text-[2.5rem] font-extrabold leading-[1.06] text-deep sm:text-6xl lg:text-[4rem]">
            Your Home. Our Workforce. <span className="text-primary">Complete Peace of Mind.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Reliable home maintenance starts with the right people. Discover trusted local professionals for all your everyday home service needs.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => go('services')} size="lg">Explore Services <ArrowRight size={16} /></Button>
            <Button variant="secondary" onClick={() => go('about')} size="lg">Join Our Network</Button>
          </div>
          <ul className="mt-12 grid max-w-xl gap-4 border-t border-line pt-8 sm:grid-cols-3">
            {[[ShieldCheck, 'Verified Professionals'], [Clock, 'Reliable Services'], [CalendarCheck, 'Flexible Memberships']].map(([I, t]) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-100 text-primary"><I size={18} /></span>
                <span className="text-sm font-semibold leading-snug text-deep">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-deep/10">
            <Img id="photo-1560518883-ce09059eeffa" w={1400} eager alt="Modern home exterior" position="center 60%" fallback={<Home size={72} strokeWidth={1.2} />} className="aspect-[4/4.6] w-full sm:aspect-[4/4.2] lg:aspect-[4/4.7]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sage-100/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-7 left-4 right-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-lift sm:right-auto sm:-left-6 sm:pr-7">
            <Img id="photo-1500648767791-00dcc994a43e" w={200} alt="Service professional" position="center 25%" fallback={<UserCheck size={22} />} className="h-14 w-14 shrink-0 rounded-full ring-2 ring-white" />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-heading text-sm font-bold text-deep">Rahul · Electrician <BadgeCheck size={15} className="shrink-0 text-primary" /></p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><Star size={13} className="fill-accent text-accent" /> 4.9 · arriving at 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-extrabold leading-tight text-deep sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-muted">{sub}</p>}
    </div>
  )
}

const wrap = 'mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28'

function Services({ onPick }) {
  return (
    <section id="services" className={wrap}>
      <SectionHead eyebrow="Services" title="Everything Your Home Needs" sub="From a dripping tap to a fresh coat of paint, one place for every everyday job." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ name, icon: I, img, desc }) => (
          <button key={name} onClick={() => onPick(name)} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-sage-100">
              <Img id={img} w={900} alt={name} fallback={<I size={44} strokeWidth={1.3} />} className="h-full w-full transition duration-500 group-hover:scale-105" />
              <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-primary shadow-soft"><I size={20} /></span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-deep">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">Book now <ArrowRight size={15} className="transition duration-300 group-hover:translate-x-1" /></span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="border-y border-line bg-white">
      <div className={wrap}>
        <SectionHead eyebrow="How it works" title="Home care in three simple steps" />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          <div className="absolute left-[16.5%] right-[16.5%] top-8 hidden border-t border-dashed border-sage-200 md:block" aria-hidden="true" />
          {STEPS.map(({ icon: I, title, text }, i) => (
            <li key={title} className="relative text-center">
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-line bg-sage-50 text-primary shadow-soft">
                <I size={26} />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-bold text-deep ring-2 ring-white">{i + 1}</span>
              </span>
              <h3 className="mx-auto mt-6 max-w-[16rem] text-lg font-bold text-deep">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Membership({ onSelect }) {
  return (
    <section id="membership" className="bg-gradient-to-b from-sage-50 to-bg">
      <div className={wrap}>
        <SectionHead eyebrow="Membership" title="Simple Plans. Better Home Care." sub="Choose a monthly plan that fits your home. Prices shown are illustrative." />
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 md:grid-cols-3 md:gap-5">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-3xl p-8 transition duration-300 ${p.featured ? 'z-10 border-2 border-primary bg-white shadow-lift md:-my-4 md:py-12' : 'border border-line bg-card shadow-soft hover:-translate-y-1 hover:shadow-lift'}`}>
              {p.featured && <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-soft"><Star size={12} className="fill-accent text-accent" /> Most popular</span>}
              <h3 className="text-lg font-bold text-deep">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-1 text-deep">
                <span className="font-heading text-2xl font-bold">₹</span>
                <span className="font-heading text-5xl font-extrabold tracking-tight">{p.price}</span>
                <span className="ml-1 text-sm font-medium text-muted">/ month</span>
              </p>
              <hr className="my-7 border-line" />
              <ul className="flex-1 space-y-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm leading-snug text-ink">
                    <span className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.featured ? 'bg-primary text-white' : 'bg-sage-100 text-primary'}`}><Check size={12} strokeWidth={3} /></span>{f}
                  </li>
                ))}
              </ul>
              <Button variant={p.featured ? 'primary' : 'secondary'} size="lg" onClick={() => onSelect(p)} className="mt-9 w-full">Choose {p.name}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const initials = (n) => n.slice(0, 1).toUpperCase()

function Professionals() {
  return (
    <section className="border-y border-line bg-white">
      <div className={wrap}>
        <SectionHead eyebrow="Our network" title="Meet Our Trusted Professionals" sub="Sample profiles shown for this prototype." />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PROS.map((p) => (
            <article key={p.name} className="flex flex-col items-center rounded-3xl border border-line bg-bg p-7 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative">
                <Img id={p.img} w={400} alt={`${p.name}, ${p.role}`} position="center 20%" fallback={<span className="font-heading text-3xl font-bold">{initials(p.name)}</span>} className="h-28 w-28 rounded-full ring-4 ring-white shadow-soft" />
                <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-white text-primary shadow-soft ring-1 ring-line" title="Verified"><BadgeCheck size={20} /></span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-deep">{p.name}</h3>
              <p className="text-sm text-muted">{p.role}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-primary"><ShieldCheck size={13} /> Verified</span>
              <div className="mt-auto grid w-full grid-cols-2 gap-3 pt-6">
                <div className="rounded-2xl bg-white py-3 ring-1 ring-line"><p className="font-heading text-lg font-bold text-deep">{p.years} yrs</p><p className="text-xs text-muted">Experience</p></div>
                <div className="rounded-2xl bg-white py-3 ring-1 ring-line"><p className="flex items-center justify-center gap-1 font-heading text-lg font-bold text-deep"><Star size={15} className="fill-accent text-accent" />{p.rating}</p><p className="text-xs text-muted">Rating</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About({ onRegister }) {
  return (
    <section id="about" className={wrap}>
      <div className="grid items-stretch overflow-hidden rounded-[2rem] border border-sage-200 bg-sage-100 shadow-soft lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16">
          <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-white text-primary shadow-soft"><Briefcase size={22} /></span>
          <h2 className="text-3xl font-extrabold leading-tight text-deep sm:text-4xl">Great Opportunities for Skilled Professionals</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Join Workforce Suppliers and connect with homeowners who need your skills. Build trust, find opportunities and grow your work.
          </p>
          <Button onClick={onRegister} size="lg" className="mt-9">Register as a Professional <ArrowRight size={16} /></Button>
        </div>
        <Img id="photo-1504307651254-35680f356dfd" w={1200} alt="Skilled professionals at work" fallback={<Briefcase size={56} strokeWidth={1.2} />} className="h-72 w-full lg:h-full lg:min-h-[28rem]" />
      </div>
    </section>
  )
}

function Footer() {
  const links = [['Home', 'home'], ['Services', 'services'], ['Membership', 'membership'], ['About', 'about']]
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">Connecting homes and communities with trusted local professionals, and giving skilled workers steady opportunities.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-deep">Quick links</h4>
          <ul className="mt-4 space-y-3">
            {links.map(([l, id]) => <li key={l}><button onClick={() => go(id)} className="text-sm text-muted transition hover:text-primary">{l}</button></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-deep">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +91 00000 00000</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> hello@example.com</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> Your City, Your State</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-muted">© {new Date().getFullYear()} Workforce Suppliers. Prototype with sample data.</div>
    </footer>
  )
}

export default function App() {
  const [service, setService] = useState(null)
  const [plan, setPlan] = useState(null)
  const [register, setRegister] = useState(false)
  return (
    <>
      <Navbar onStart={() => setService('Plumbing')} onRegister={() => setRegister(true)} />
      <main>
        <Hero />
        <Services onPick={setService} />
        <HowItWorks />
        <Membership onSelect={setPlan} />
        <Professionals />
        <About onRegister={() => setRegister(true)} />
      </main>
      <Footer />
      <BookingModal service={service} onClose={() => setService(null)} />
      <RegisterModal open={register} onClose={() => setRegister(false)} />
      <Modal open={!!plan} onClose={() => setPlan(null)} title="Plan selected">
        {plan && <Success title={`${plan.name} plan selected`} text={`You’ve chosen ${plan.name} at ₹${plan.price}/month. This is a prototype, so no payment is taken.`} onClose={() => setPlan(null)} />}
      </Modal>
    </>
  )
}
