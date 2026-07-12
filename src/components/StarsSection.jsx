import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './StarsSection.css'

// إحداثيات لرسم اسم سلمى (SALMA) بنقاط (كل نقطة نجمة)
const NAME_DOTS = [
  // S
  [20, 30], [35, 25], [50, 25], [65, 30], [65, 45], [50, 55], [35, 55], [20, 65], [20, 80], [35, 85], [50, 85], [65, 80],
  // A الأول
  [85, 85], [90, 70], [95, 55], [100, 40], [105, 25], [110, 40], [115, 55], [120, 70], [125, 85], [95, 65], [115, 65],
  // L
  [145, 25], [145, 40], [145, 55], [145, 70], [145, 85], [160, 85], [175, 85], [190, 85],
  // M
  [210, 85], [210, 70], [210, 55], [210, 40], [210, 25], [225, 45], [240, 60], [255, 45], [270, 25], [270, 40], [270, 55], [270, 70], [270, 85],
  // A الثاني
  [290, 85], [295, 70], [300, 55], [305, 40], [310, 25], [315, 40], [320, 55], [325, 70], [330, 85], [300, 65], [320, 65],
]

export default function StarsSection() {
  const [drawn, setDrawn] = useState(false)

  const bgStars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: 0.5 + Math.random() * 2,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  })), [])

  const nameStars = useMemo(() => NAME_DOTS.map(([x, y], i) => ({
    id: i, x, y, delay: i * 0.05,
  })), [])

  return (
    <section className="stars-section" id="stars">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">السماء بتنادي اسمك</span>
        <h2 className="section-title">في كل نجمة، اسمك</h2>
        <p className="section-subtitle">
          اضغطي على السماء عشان أرسم اسمك بنجوم خاصة بيكي
        </p>
      </motion.div>

      <motion.div className="sky-canvas"
        onClick={() => setDrawn(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 1 }}>
        {bgStars.map(star => (
          <div key={`bg-${star.id}`} className="bg-star"
            style={{
              left: `${star.x}%`, top: `${star.y}%`,
              width: `${star.size}px`, height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }} />
        ))}
        <div className="moon"></div>

        <svg className="name-svg" viewBox="0 0 350 110" preserveAspectRatio="xMidYMid meet">
          {nameStars.map(star => (
            <g key={star.id}>
              <motion.circle cx={star.x} cy={star.y} r="2" fill="#fff"
                initial={{ opacity: 0, scale: 0 }}
                animate={drawn ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.5 }}
                transition={{ duration: 0.6, delay: drawn ? star.delay : 0 }}
                style={{
                  filter: drawn
                    ? 'drop-shadow(0 0 6px #fff) drop-shadow(0 0 12px #ec4899)'
                    : 'drop-shadow(0 0 2px #fff)',
                }} />
              {drawn && (
                <motion.circle cx={star.x} cy={star.y} r="5" fill="rgba(236, 72, 153, 0.3)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0.5] }}
                  transition={{
                    duration: 3, delay: star.delay,
                    repeat: Infinity, repeatDelay: Math.random() * 2,
                  }} />
              )}
            </g>
          ))}
        </svg>

        {!drawn && (
          <div className="click-hint">
            <span>👆</span>
            <p>اضغطي هنا</p>
          </div>
        )}

        {drawn && (
          <motion.div className="constellation-name"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}>
            ✦ كوكبة سلمى ✦
          </motion.div>
        )}
      </motion.div>

      <motion.p className="stars-quote"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}>
        " لو السماء فيها نجوم بعدد ما بحبك، السماء كلها هتنور "
      </motion.p>
    </section>
  )
}
