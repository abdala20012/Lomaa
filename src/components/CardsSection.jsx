import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CardsSection.css'

const letters = [
  { id: 1, title: 'لما بصحى الصبح', preview: 'كل صبح بصحى وأنا بفكر فيكي...',
    body: 'أول حاجة بتيجي في بالي إنتي، بفتح عيني وأنا بسأل نفسي: عاملة إيه؟ نمتي كويس؟ كل يوم بيبدأ بإسمك في قلبي.' },
  { id: 2, title: 'لما بشوفك', preview: 'لما بشوفك الدنيا كلها بتتوقف...',
    body: 'وأنا بشوفك بنسى كل اللي حواليا، صوت الناس، الدنيا، كل حاجة. الوحيدة اللي بشوفها وبسمعها هي إنتي. عينيكي بتحكي قصص الدنيا كلها.' },
  { id: 3, title: 'لما بضحك معاكي', preview: 'ضحكتك أحلى موسيقى سمعتها...',
    body: 'كل ضحكة معاكي بتبقى ذكرى. بحبك لما تضحكي وعنيكي بتلمع. الضحكة دي عمرها ما هتروح من بالي مهما حصل.' },
  { id: 4, title: 'لما بسافر وأنا بعيد', preview: 'بحس إن في حاجة ناقصة من حياتي...',
    body: 'لما بكون بعيد عنك بحس إن الدنيا فقدت لونها. بنسى أتنفس بشكل طبيعي. الوقت بيقف ولحد ما أرجع أشوفك تاني الحياة بتاخد طعمها.' },
  { id: 5, title: 'لما بتزعلي', preview: 'زعلك بيكسر قلبي...',
    body: 'لما بشوفك زعلانة بحس إن الدنيا اتقلبت. مستعد أعمل أي حاجة عشان أشوف ابتسامتك تاني. زعلك أصعب حاجة على قلبي.' },
  { id: 6, title: 'لما بفكر في المستقبل', preview: 'مش شايف حياتي من غيرك...',
    body: 'كل أحلامي إنتي فيها. بيتنا، أولادنا، السفر سوا، السهر سوا، الكبر سوا. مفيش حلم في بالي إنتي مش جزء منه.' },
  { id: 7, title: 'لما بفتكر أول لقاء', preview: 'اللحظة اللي قلبت حياتي...',
    body: 'لسه فاكر كل تفصيلة، اللبس بتاعك، نظرتك، كلامك. اليوم ده هو يوم ميلاد قلبي الحقيقي، اليوم اللي عرفت فيه إيه هو الحب.' },
  { id: 8, title: 'وعد مني', preview: 'بوعدك إني هحبك للأبد...',
    body: 'بوعدك إني هفضل أحبك، أحترمك، أحميكي، وأكون جنبك مهما حصل. مش هخليكي تحسي بالوحدة أبداً. إنتي عمري وحياتي وكل حاجة.' },
  { id: 9, title: 'كلام من قلبي ليكي يا سلمى', preview: 'أنا بحبك وهفضل طول عمري أحبك...',
    body: 'أنا بحبك وهفضل طول عمري أحبك مهما حصل ومهما اختلفنا، هتفضلي انتي أغلى حد عندي.. مراتي وبنتي وصاحبتي وشريكة حياتي ورفيقة عمري وحبيبتي وكل دنيتي، وحبيبتي اللي مليش غيرها. عارف إني ساعات بتعصب وساعات برضو بعمل حاجات تضايق، بس والله مفيش مرة أبداً بيكون قصدي أضايقك، وحقك عليا لو في أي مرة عملت أي حاجة زعلتك. أنا كل الدنيا تهون عندي بس ميهونش عليا زعلك. بحبك موووووت ❤️' },
]

export default function CardsSection() {
  const [opened, setOpened] = useState(null)

  return (
    <section className="cards-section" id="cards">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">دفتر رسائلي إليك</span>
        <h2 className="section-title">رسائل من القلب</h2>
        <p className="section-subtitle">اضغطي على أي ورقة عشان تفتحيها وتقري اللي مكتوب فيها ♥</p>
      </motion.div>

      <div className="letters-grid">
        {letters.map((letter, i) => (
          <motion.div key={letter.id} className="letter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
            whileHover={{ y: -8, rotateZ: i % 2 === 0 ? 2 : -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpened(letter)}>
            <div className="letter-card-fold"></div>
            <div className="letter-card-icon">♥</div>
            <h4 className="letter-card-title">{letter.title}</h4>
            <p className="letter-card-preview">{letter.preview}</p>
            <span className="letter-card-open">اضغطي للقراءة ←</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div className="letter-modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}>
            <motion.div className="letter-modal"
              initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateY: 90, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setOpened(null)}>×</button>
              <div className="modal-decoration top-right">♥</div>
              <div className="modal-decoration top-left">♥</div>
              <h3 className="modal-title">{opened.title}</h3>
              <div className="modal-divider"><span>✦</span></div>
              <p className="modal-body">{opened.body}</p>
              <div className="modal-signature"><p>— حبيبك ♥</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
