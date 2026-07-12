import { motion } from 'framer-motion'
import './TimelineSection.css'

const events = [
  { date: 'اللحظة الأولى', title: 'أول مرة شفتك', description: 'في اللحظة دي حسّيت إن قلبي اتوقف، وعرفت إن دي البنت اللي مكتوبة ليا', icon: '✦' },
  { date: 'الكلمة الأولى', title: 'أول كلمة بينا', description: 'صوتك كان زي الموسيقى، وكلمة "أهلاً" بقت أحلى كلمة سمعتها في حياتي', icon: '♡' },
  { date: 'الخرجة الأولى', title: 'أول خرجة سوا', description: 'كل تفصيلة في اليوم ده محفورة في قلبي، الجو، المكان، ضحكتك...', icon: '☾' },
  { date: 'الاعتراف', title: 'لما قلتلك بحبك', description: 'كنت خايف من ردك، بس لما قلتيلي بحبك بقيت أسعد إنسان في الدنيا', icon: '♥' },
  { date: 'لحظة فارقة', title: 'أول مرة حضنتك', description: 'حسّيت في الحضن ده بإحساس مالوش وصف، وكأن الدنيا كلها بقت في إيديا', icon: '✿' },
  { date: 'الحاضر', title: 'وهنا أنا وانتي', description: 'كل يوم بحبك أكتر من اللي قبله، وكل يوم بحس إنك أحلى هدية اداهالي ربنا', icon: '★' },
]

export default function TimelineSection() {
  return (
    <section className="timeline-section" id="timeline">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">رحلة حبنا</span>
        <h2 className="section-title">قصتنا</h2>
        <p className="section-subtitle">كل لحظة في الرحلة دي بنينا فيها ذكرى تستاهل تتحكي</p>
      </motion.div>

      <div className="timeline">
        <div className="timeline-line"></div>
        {events.map((event, i) => (
          <motion.div key={i} className={`timeline-item ${i % 2 === 0 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="timeline-content">
              <span className="timeline-date">{event.date}</span>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-desc">{event.description}</p>
            </div>
            <motion.div className="timeline-dot"
              whileHover={{ scale: 1.4, rotate: 360 }}
              transition={{ duration: 0.5 }}>
              <span>{event.icon}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
