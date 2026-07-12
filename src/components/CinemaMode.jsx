import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CinemaMode.css'

export default function CinemaMode() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err)
    }
  }

  return (
    <>
      <motion.button
        className={`cinema-btn ${isFullscreen ? 'active' : ''}`}
        onClick={toggleFullscreen}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isFullscreen ? 'الخروج من وضع السينما' : 'وضع السينما'}
        title={isFullscreen ? 'الخروج من وضع السينما' : 'وضع السينما 🎬'}
      >
        {isFullscreen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 14h5v2h-3v3h-2v-5zm-4 0v5H8v-3H5v-2h5zm4-4V5h2v3h3v2h-5zm-4 0H5V8h3V5h2v5z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        )}
      </motion.button>

      {isFullscreen && (
        <motion.div
          className="cinema-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          🎬 وضع السينما
        </motion.div>
      )}
    </>
  )
}
