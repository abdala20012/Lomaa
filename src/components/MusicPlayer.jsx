import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './MusicPlayer.css'

// 🎵 الأغنية بتتقرى من public/music/ مباشرة
// كل اللي عليكي تعمليه: حطي ملف الأغنية في public/music/our-song.mp3
const SONG_PATH = '/music/our-song.mp3'

export default function MusicPlayer({ autoPlay = false, visible = true }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasSong, setHasSong] = useState(false)
  const [showAutoplayHint, setShowAutoplayHint] = useState(false)
  const audioRef = useRef(null)
  const hasTriedAutoplay = useRef(false)

  // اختبار وجود ملف الأغنية
  useEffect(() => {
    fetch(SONG_PATH, { method: 'HEAD' })
      .then(res => setHasSong(res.ok))
      .catch(() => setHasSong(false))
  }, [])

  // تشغيل تلقائي
  useEffect(() => {
    if (!hasSong || !autoPlay || !audioRef.current || hasTriedAutoplay.current) return
    hasTriedAutoplay.current = true

    const audio = audioRef.current
    audio.volume = 0.5

    const tryPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setShowAutoplayHint(false)
      } catch (err) {
        console.warn('Autoplay blocked, user needs to interact')
        setShowAutoplayHint(true)
        setTimeout(() => setShowAutoplayHint(false), 5000)
      }
    }

    const timer = setTimeout(tryPlay, 500)
    return () => clearTimeout(timer)
  }, [hasSong, autoPlay])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasSong) return
    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [hasSong])

  const togglePlay = () => {
    if (!hasSong) {
      setIsPlaying(!isPlaying)
      if (!isPlaying) setProgress(35)
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn('Play failed:', err))
    }
  }

  return (
    <>
      {/* الـ audio عنصر مخفي يفضل شغال طول الوقت */}
      {hasSong && <audio ref={audioRef} src={SONG_PATH} loop />}

      {/* تلميح بسيط لو المتصفح منع التشغيل التلقائي */}
      {showAutoplayHint && visible && (
        <motion.div
          className="autoplay-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span>🎵</span>
          دوسي على زر التشغيل عشان تسمعي أغنيتنا
        </motion.div>
      )}

      {/* المشغل بيبان بس لما visible=true */}
      {visible && (
        <motion.div className="music-player"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}>
          <button className={`play-disc ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay} aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <div className="player-info">
            <div className="player-top">
              <span className="song-title">أغنيتنا <span className="song-heart">♥</span></span>
              <span className="player-status">
                {!hasSong ? 'مش جاهزة' : isPlaying ? 'يتم التشغيل' : 'متوقفة'}
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
