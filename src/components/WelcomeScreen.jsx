import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './WelcomeScreen.css'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG']

export default function WelcomeScreen({ onFinish }) {
  const [stage, setStage] = useState(0)
  const [profileSrc, setProfileSrc] = useState(null)
  const [profileChecked, setProfileChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    const tryLoadProfile = async () => {
      for (const ext of EXTENSIONS) {
        const src = `/images/profile.${ext}`
        try {
          const response = await fetch(src, { method: 'HEAD' })
          if (response.ok && !cancelled) {
            setProfileSrc(src)
            setProfileChecked(true)
            return
          }
        } catch (e) {}
      }
      if (!cancelled) setProfileChecked(true)
    }
    tryLoadProfile()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3800),
      setTimeout(() => onFinish(), 6500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onFinish])

  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1 }}
    >
      <div className="welcome-glow"></div>
      <div className="welcome-glow welcome-glow-2"></div>

      <div className="welcome-floating-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="welcome-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${14 + Math.random() * 16}px`,
            }}>♥</span>
        ))}
      </div>

      <div className="welcome-sparkles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="welcome-spark"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${1.5 + Math.random() * 2.5}s`,
              animationDelay: `${Math.random() * 3}s`,
            }} />
        ))}
      </div>

      <div className="welcome-content">
        <motion.div className="profile-wrapper"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{
            scale: stage >= 1 ? 1 : 0,
            opacity: stage >= 1 ? 1 : 0,
            rotate: stage >= 1 ? 0 : -180,
          }}
          transition={{ type: 'spring', damping: 14, duration: 1.5 }}>
          <div className="profile-orbit orbit-1"></div>
          <div className="profile-orbit orbit-2"></div>
          <div className="profile-orbit orbit-3"></div>
          <div className="orbit-stars">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <span key={deg} className="orbit-star"
                style={{ transform: `rotate(${deg}deg) translateX(140px)` }}>✦</span>
            ))}
          </div>
          <div className="profile-frame">
            <div className="profile-frame-inner">
              {profileSrc ? (
                <img src={profileSrc} alt="سلمى" className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  <span className="placeholder-letter">م</span>
                  <span className="placeholder-text">
                    {profileChecked
                      ? 'حطي صورتك باسم\nprofile.jpg في\npublic/images/'
                      : 'جاري التحميل...'}
                  </span>
                </div>
              )}
              <div className="profile-shine"></div>
            </div>
          </div>
          <motion.span className="floating-heart-tiny pos-1" animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>♥</motion.span>
          <motion.span className="floating-heart-tiny pos-2" animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>♥</motion.span>
          <motion.span className="floating-heart-tiny pos-3" animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>♥</motion.span>
          <motion.span className="floating-heart-tiny pos-4" animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>♥</motion.span>
        </motion.div>

        <motion.h2 className="welcome-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 20 }}
          transition={{ duration: 0.8 }}>
          أهلاً بيكي يا...
        </motion.h2>

        <motion.h1 className="welcome-name"
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            scale: stage >= 2 ? 1 : 0.5,
            filter: stage >= 2 ? 'blur(0px)' : 'blur(20px)',
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}>
          سلمى
        </motion.h1>

        <motion.div className="welcome-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 30 }}
          transition={{ duration: 1 }}>
          <div className="tagline-line"></div>
          <p>عالمنا فاتح ليكي ✨</p>
          <div className="tagline-line"></div>
        </motion.div>
      </div>
    </motion.div>
  )
}
