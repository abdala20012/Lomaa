import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './SurpriseBoxSection.css'

const surprises = [
  '♥ بحبك أكتر من نفسي والدنيا كلها',
  '✦ إنتي أحلى حاجة حصلتلي في حياتي',
  '☾ كل يوم بصحى وأنا بشكر ربنا إنك في حياتي',
  '✿ ضحكتك بتنوّر يومي وتخليه أحلى',
  '★ معاكي أنا أحلى نسخة من نفسي',
  '♡ مفيش حد يستحق حبي زيك',
  '✧ في عينيكي بشوف كل أحلامي',
  '❀ بحبك حب مالوش حدود ومالوش نهاية',
  '☆ إنتي السبب اللي بيخليني أبتسم كل يوم',
  '✺ معاكي أنا في الجنة على الأرض',
]

export default function SurpriseBoxSection() {
  const [opened, setOpened] = useState(false)
  const [currentSurprise, setCurrentSurprise] = useState('')
  const [openCount, setOpenCount] = useState(0)

  const openBox = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
    setCurrentSurprise(randomSurprise)
    setOpened(true)
    setOpenCount(c => c + 1)

    confetti({
      particleCount: 150, spread: 100, origin: { y: 0.5 },
      colors: ['#ec4899', '#a855f7', '#f472b6', '#fbbf24', '#ffffff'],
      shapes: ['circle', 'square'],
    })

    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.6 },
        colors: ['#ec4899', '#f472b6'] })
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 },
        colors: ['#a855f7', '#c084fc'] })
    }, 200)
  }

  return (
    <section className="surprise-section" id="box">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">هدية ليكي</span>
        <h2 className="section-title">صندوق المفاجأة</h2>
        <p className="section-subtitle">
          اضغطي على الصندوق وكل مرة هتلاقي رسالة جديدة من قلبي ليكي ♥
        </p>
      </motion.div>

      <div className="box-stage">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div key="closed" className="gift-box-wrapper"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.6 }}>
              <motion.button className="gift-box" onClick={openBox}
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 0] }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="box-lid">
                  <div className="box-bow">
                    <div className="bow-left"></div>
                    <div className="bow-right"></div>
                    <div className="bow-center"></div>
                  </div>
                </div>
                <div className="box-body">
                  <div className="box-ribbon-vertical"></div>
                  <div className="box-ribbon-horizontal"></div>
                  <span className="box-question">؟</span>
                </div>
                <div className="box-shadow"></div>
              </motion.button>
              <p className="box-hint">
                {openCount > 0 ? `فتحتيها ${openCount} مرة! جربي تاني 💕` : 'اضغطي عليه ♥'}
              </p>
            </motion.div>
          ) : (
            <motion.div key="opened" className="surprise-result"
              initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotateY: -90 }}
              transition={{ type: 'spring', damping: 15 }}>
              <div className="surprise-card">
                <div className="card-corner top-right">✦</div>
                <div className="card-corner top-left">✦</div>
                <div className="card-corner bottom-right">✦</div>
                <div className="card-corner bottom-left">✦</div>
                <div className="surprise-icon">🎁</div>
                <motion.p className="surprise-message"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}>
                  {currentSurprise}
                </motion.p>
                <button className="another-btn" onClick={() => setOpened(false)}>
                  افتحي تانية ↻
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
