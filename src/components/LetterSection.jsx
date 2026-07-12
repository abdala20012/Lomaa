import { motion } from 'framer-motion'
import './LetterSection.css'

export default function LetterSection() {
  return (
    <section className="letter-section" id="letter">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">من قلبي ليكي</span>
        <h2 className="section-title">خطاب حب</h2>
      </motion.div>

      <motion.div className="letter-paper"
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="letter-corner top-right">♥</div>
        <div className="letter-corner top-left">♥</div>
        <div className="letter-corner bottom-right">♥</div>
        <div className="letter-corner bottom-left">♥</div>

        <div className="letter-header">
          <p className="letter-to">إلى:</p>
          <h3 className="letter-recipient">سلمى، يا أحلى حاجة في الدنيا</h3>
        </div>

        <div className="letter-divider"><span>✦</span></div>

        <div className="letter-body">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
            أنا جبتك هنا وعملتلك الويب سايت ده مخصوص ليكي، عشان أعبرلك عن حبي ليكي
            بطريقة مختلفة شوية. بما إني بقالي كتير مش بقولك كلام حلو، وعلاقتنا الفترة دي
            طابعها الجد أكتر والانشغال بالحاجات اللي عاوزين نعملها والتجهيزات، واحنا مضغوطين
            وتعبانين وبالتالي بنتخانق كتير، فحبيت أجدد العلاقة وأقولك شوية مشاعر من أيام
            البدايات ❤️ وعاوزك تسمعي الكلام اللي هنا ده بقلبك وعقلك.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}>
            بحبك مش مجرد كلمة بقولهالك.. دي إحساس خارج من جوة قلبي، وكل حرف فيها ليه معنى:
            ب.. بعشق عينيكي. ح.. حياتي ليكي. ب.. بموت في كل تفاصيلك. ك.. كلي ملك ايديكي.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }}>
            وحشتيني دي برضو مش كلمة بقولهالك لما بكون مفتقدك وخلاص، دي ليها معاني كتير جداً..
            وحشتيني يعني حياتي وحشة من غيرك. يعني الدنيا فاضية حواليا من غيرك. يعني روحي
            وإحساسي ومشاعري معاكي. يعني عقلي مش بيبطل تفكير فيكي. يعني في بعدك مش بلاقي نفسي.
            يعني انتي كل الدنيا عندي. يعني زهقان وانتي مش معايا. يعني انتي ونسي وأهلي وناسي.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.9 }}>
            وحشتيني يعني انتي أول حد بفكر فيه أول ما اصحى من النوم، وآخر حد بفكر فيه قبل
            ما انام، وأكتر حد بفكر فيه طول اليوم. يعني صوتك بالنسبالي هرمون سعادة، لما يغيب
            ساعة ولا حاجة منسوب السعادة بيقل، وبيرتفع تاني أول ما اسمعك بتتكلمي. يعني كأني
            غريب في الدنيا من غيرك، وانتي ليا وطن وأهل.. فمن الآخر كدة.. وحشتيني وحشتيني وحشتيني ❤️
          </motion.p>
          <motion.p className="letter-highlight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 1.1 }}>
            وعد أوعدك إني هفضل دايماً زي ما عرفتيني.. اللي بيحبك ومش قادر يعيش من غيرك،
            وإني أفضل جنبك وسندك وضهرك وأمانك، والكتف اللي تميلي عليه طول العمر ❤️
          </motion.p>
          <motion.p className="letter-poem"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.3 }}>
            سأظل أحبك كما لم يُحبّ عاشقٌ من قبل<br/>
            وسأظل أراك وطني وملاذي ونبض قلبي الهارب من الضياع<br/>
            إلى أن يشيخ الضوء في عيون النجوم وتهجر الطيور أعشاشها في ربيع الحنين<br/>
            إلى أن تنسى البحار ملوحتها ويصير الليل بلا قمرٍ ولا أنين<br/>
            سأبقى أنتمي إليك كأنك وطني وأتنفسك شوقًا لا يعرف السكون<br/>
            إلى أن تتعب الريح من السفر وتنطفئ في صدري كل أوجاع المطر<br/>
            إلى أن تتوقف الساعات عن الدوران وتفقد الأرض شهيّتها للدوران<br/>
            سأبقى أحبك بصوتٍ لا يسمعه سواك، وأكتفي بك وكأنك آخر ما تبقى من الحياة ❤️
          </motion.p>
        </div>

        <motion.div className="letter-signature"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 1.5 }}>
          <div className="signature-line"></div>
          <p className="signature-name">المخلص ليكي طول العمر</p>
          <p className="signature-from">— حبيبك</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
