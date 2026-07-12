import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CounterSection.css'

// تاريخ البداية: 18 أبريل 2026
const START_DATE = new Date(2026, 3, 18)

function calculateTime() {
  const now = new Date()
  const diff = now - START_DATE
  if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CounterSection() {
  const [time, setTime] = useState(calculateTime())
  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  const blocks = [
    { value: time.days, label: 'يوم' },
    { value: time.hours, label: 'ساعة' },
    { value: time.minutes, label: 'دقيقة' },
    { value: time.seconds, label: 'ثانية' },
  ]

  return (
    <section className="counter-section" id="counter">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">اللحظة المباركة</span>
        <h2 className="section-title">من يوم ما عرفتك يا سلمى</h2>
        <p className="section-subtitle">
          كل ثانية معاكي بتعدّي وأنا بحبك أكتر من اللي قبلها ♥
        </p>
      </motion.div>

      <div className="counter-grid">
        {blocks.map((block, i) => (
          <motion.div key={block.label} className="counter-block"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}>
            <motion.div key={block.value} className="counter-value"
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}>
              {String(block.value).padStart(2, '0')}
            </motion.div>
            <div className="counter-label">{block.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div className="counter-footnote"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
        <span>♥</span>كل ثانية معاكي بتساوي عمر كامل<span>♥</span>
      </motion.div>
    </section>
  )
}
