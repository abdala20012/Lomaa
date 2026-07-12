import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PasswordLock.css'

const PASSWORD = 'Loma'

export default function PasswordLock({ onUnlock }) {
  const [chars, setChars] = useState(['', '', '', ''])
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputsRef = useRef([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    if (!/^[a-zA-Z]*$/.test(value)) return
    const newChars = [...chars]
    newChars[index] = value.slice(-1)
    setChars(newChars)
    setError(false)
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }
    if (newChars.every(d => d !== '') && newChars.join('').length === 4) {
      setTimeout(() => checkPassword(newChars.join('')), 200)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !chars[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^a-zA-Z]/g, '').slice(0, 4)
    const newChars = ['', '', '', '']
    for (let i = 0; i < pasted.length; i++) {
      newChars[i] = pasted[i]
    }
    setChars(newChars)
    if (pasted.length === 4) {
      setTimeout(() => checkPassword(pasted), 200)
    }
  }

  const checkPassword = (entered) => {
    if (entered.toLowerCase() === PASSWORD.toLowerCase()) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => {
        setChars(['', '', '', ''])
        inputsRef.current[0]?.focus()
      }, 1500)
    }
  }

  return (
    <motion.div
      className="lock-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lock-bg-1"></div>
      <div className="lock-bg-2"></div>

      <div className="lock-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="lock-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${14 + Math.random() * 18}px`,
            }}
          >♥</span>
        ))}
      </div>

      <motion.div
        className={`lock-container ${shake ? 'shake' : ''}`}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="lock-icon"
          animate={error ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="lock-shape">
            <div className="lock-arc"></div>
            <div className="lock-body">
              <span className="lock-keyhole">♥</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="lock-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          صفحة خاصة جداً
        </motion.h1>

        <motion.p
          className="lock-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ادخلي الاسم السحري عشان تفتحي عالمنا ♥
        </motion.p>

        <div className="digits-container" onPaste={handlePaste}>
          {chars.map((char, i) => (
            <motion.input
              key={i}
              ref={el => inputsRef.current[i] = el}
              type="text"
              inputMode="text"
              maxLength="1"
              value={char}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`digit-input ${error ? 'error' : ''} ${char ? 'filled' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.08 }}
              dir="ltr"
            />
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span>💔</span>
              مش ده الاسم يا قمر... حاولي تاني
              <span>💔</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="lock-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          💡 فكري في اسم دلع حبيبك ليكي...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
