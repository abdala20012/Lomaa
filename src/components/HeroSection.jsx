import { motion } from 'framer-motion'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <motion.div className="badge-pill"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <span className="badge-sparkle">✦</span>
        <span>صفحة من القلب لـ</span>
        <span className="badge-heart">♥</span>
      </motion.div>
      <motion.h1 className="hero-name"
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}>
        سلمى
      </motion.h1>
      <motion.div className="hero-divider"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}>
        <span>♥</span>
      </motion.div>
      <motion.p className="hero-quote"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}>
        يوم ما عرفنا بعض<br />
        كان يوم ولادتي <span className="inline-heart">♥</span>
      </motion.p>
      <motion.div className="scroll-indicator"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}>
        <span>اكتشفي قصتنا</span>
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </section>
  )
}
