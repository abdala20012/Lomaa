import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const sections = [
  { id: 'hero', label: 'البداية' },
  { id: 'counter', label: 'عداد' },
  { id: 'timeline', label: 'قصتنا' },
  { id: 'letter', label: 'خطابي' },
  { id: 'gallery', label: 'صورنا' },
  { id: 'videos', label: 'فديوهات' },
  { id: 'cards', label: 'رسايل' },
  { id: 'stars', label: 'السماء' },
  { id: 'music', label: 'أغانينا' },
  { id: 'quiz', label: 'لعبة' },
  { id: 'box', label: 'هدية' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
      <div className="nav-brand" onClick={() => scrollTo('hero')}>
        <span className="brand-heart">♥</span>
        <span className="brand-name">سلمى</span>
      </div>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="القائمة">
        {open ? '×' : '☰'}
      </button>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {sections.map(s => (
          <li key={s.id}><button onClick={() => scrollTo(s.id)}>{s.label}</button></li>
        ))}
      </ul>
    </motion.nav>
  )
}
