import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MusicWallSection.css'

const songs = [
  { id: 1, title: 'أغنيتنا', artist: 'الأغنية اللي بتجمعنا', color: '#ec4899',
    memory: 'أول أغنية سمعناها سوا وحفظناها بقلوبنا',
    lyric: '" حبيبي إنت لي والدنيا حواليا "' },
  { id: 2, title: 'في عينيها', artist: 'محمد منير', color: '#a855f7',
    memory: 'بحب أسمعها وأنا بفتكرك',
    lyric: '" في عينيها بشوف الدنيا أحلى "' },
  { id: 5, title: 'حبيبتي', artist: 'كاظم الساهر', color: '#fb7185',
    memory: 'كلامها بيوصف اللي بحسه',
    lyric: '" حبيبتي يا أحلى من الحلم "' },
  { id: 6, title: 'أنا ليكي طول حياتي', artist: 'الأغنية الأهم', color: '#c084fc',
    memory: 'الأغنية اللي بتعبر عن وعدي ليكي',
    lyric: '" أنا ليكي طول حياتي "' },
]

export default function MusicWallSection() {
  const [activeSong, setActiveSong] = useState(null)

  return (
    <section className="music-wall-section" id="music">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">جدار الأغاني</span>
        <h2 className="section-title">أغانينا اللي بنحبها</h2>
        <p className="section-subtitle">كل أغنية فيها ذكرى وكل لحن بيرسم في قلبنا حاجة ♪</p>
      </motion.div>

      <div className="music-wall">
        {songs.map((song, i) => (
          <motion.div key={song.id} className="song-vinyl"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSong(song)}>
            <div className="vinyl-record"
              style={{ background: `radial-gradient(circle, ${song.color}, #1a1a2e)` }}>
              <div className="vinyl-grooves"></div>
              <div className="vinyl-center" style={{ background: song.color }}>
                <span>♪</span>
              </div>
            </div>
            <div className="song-info">
              <h4 className="song-title">{song.title}</h4>
              <p className="song-artist">{song.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeSong && (
          <motion.div className="song-modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveSong(null)}>
            <motion.div className="song-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              style={{ borderColor: activeSong.color }}>
              <button className="modal-close" onClick={() => setActiveSong(null)}>×</button>
              <div className="modal-vinyl spinning"
                style={{ background: `radial-gradient(circle, ${activeSong.color}, #1a1a2e)` }}>
                <div className="vinyl-grooves"></div>
                <div className="vinyl-center" style={{ background: activeSong.color }}>
                  <span>♪</span>
                </div>
              </div>
              <h3 className="modal-song-title">{activeSong.title}</h3>
              <p className="modal-song-artist">{activeSong.artist}</p>
              <p className="modal-lyric">{activeSong.lyric}</p>
              <div className="modal-memory">
                <span>♥</span>{activeSong.memory}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
