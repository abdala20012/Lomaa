import { useState } from 'react'
import { motion } from 'framer-motion'
import './GallerySection.css'

// 📸 الصور بتتقرى من public/images/
// حطي الصور بالأسماء دي: photo1.jpg حتى photo15.jpg

const photos = [
  { id: 1, caption: 'أول يوم شفتك فيه', placeholder: '♥' },
  { id: 2, caption: 'أحلى ضحكة في الدنيا', placeholder: '✦' },
  { id: 3, caption: 'لحظة عمرها ما هتتنسي', placeholder: '☾' },
  { id: 4, caption: 'في عينيكي بشوف الدنيا', placeholder: '♡' },
  { id: 5, caption: 'إنتي حياتي كلها', placeholder: '✿' },
  { id: 6, caption: 'بحبك مهما حصل', placeholder: '★' },
  { id: 7, caption: 'أجمل لحظاتي معاكي', placeholder: '♥' },
  { id: 8, caption: 'دنيتي ليكي يا سلمى', placeholder: '✦' },
  { id: 9, caption: 'وهنا أنا وانتي للأبد', placeholder: '♡' },
  { id: 10, caption: 'كل لحظة معاكي كنز', placeholder: '☾' },
  { id: 11, caption: 'وحشتيني حتى وانتي جنبي', placeholder: '♥' },
  { id: 12, caption: 'عمري ما هنسى اليوم ده', placeholder: '✿' },
  { id: 13, caption: 'إنتي وطني وأمان قلبي', placeholder: '★' },
  { id: 14, caption: 'ذكريات هتفضل معايا للأبد', placeholder: '✦' },
  { id: 15, caption: 'وكل يوم بحبك أكتر', placeholder: '♡' },
]

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG']

function GalleryPhoto({ photo, index }) {
  const [extIndex, setExtIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex(extIndex + 1)
    } else {
      setFailed(true)
    }
  }

  const imageSrc = `/images/photo${photo.id}.${EXTENSIONS[extIndex]}`

  return (
    <motion.div className="gallery-card"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.03 }}>
      <div className="photo-placeholder">
        {!failed ? (
          <img src={imageSrc} alt={photo.caption} onError={handleError} loading="lazy" />
        ) : (
          <span className="placeholder-icon">{photo.placeholder}</span>
        )}
      </div>
      <div className="photo-caption">{photo.caption}</div>
    </motion.div>
  )
}

export default function GallerySection() {
  return (
    <section className="gallery-section" id="gallery">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">معرض ذكرياتنا</span>
        <h2 className="section-title">لحظات لا تُنسى</h2>
        <p className="section-subtitle">كل صورة بتحكي قصة حب لوحدها يا سلمى</p>
      </motion.div>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <GalleryPhoto key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  )
}
