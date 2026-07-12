import { useState } from 'react'
import { motion } from 'framer-motion'
import './VideosSection.css'

// 🎬 الفديوهات بتتقرى من public/videos/
// حطي الفيديوهات بالأسماء دي: video1.mp4, video2.mp4, video3.mp4

const videos = [
  { id: 1, title: 'لحظة لا تُنسى', caption: 'من أجمل اللحظات اللي عشناها سوا ♥', placeholder: '🎬' },
  { id: 2, title: 'ذكرى خاصة', caption: 'كل فيديو بيحكي قصة جزء من قلبي ♥', placeholder: '🎥' },
  { id: 3, title: 'أنتِ وأنا', caption: 'لأن كل لحظة معاكي تستاهل تتحفظ للأبد ♥', placeholder: '💝' },
]

function VideoCard({ video, index }) {
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)

  const videoSrc = `/videos/video${video.id}.mp4`

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="video-wrapper">
        {!failed ? (
          <video
            controls
            preload="metadata"
            onError={() => setFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="video-player"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="video-placeholder">
            <span className="video-placeholder-icon">{video.placeholder}</span>
            <p className="video-placeholder-text">
              حطي الفيديو باسم<br />
              <strong>video{video.id}.mp4</strong><br />
              في مجلد public/videos/
            </p>
          </div>
        )}
        {!playing && !failed && (
          <div className="video-overlay-glow"></div>
        )}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-caption">{video.caption}</p>
      </div>
    </motion.div>
  )
}

export default function VideosSection() {
  return (
    <section className="videos-section" id="videos">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">لحظاتنا المسجلة</span>
        <h2 className="section-title">فديوهاتنا</h2>
        <p className="section-subtitle">لأن بعض اللحظات أحلى من أي صورة يا سلمى ♥</p>
      </motion.div>

      <div className="videos-grid">
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </section>
  )
}
