import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './QuizSection.css'

const questions = [
  { question: 'إيه أحلى حاجة في الدنيا؟',
    options: ['الفلوس', 'الشهرة', 'إنتي ♥', 'السفر'],
    correct: 2, feedback: 'صح! إنتي أحلى من أي حاجة في الدنيا 💕' },
  { question: 'بحبك أكتر من...',
    options: ['القمر', 'النجوم', 'البحر', 'الدنيا كلها وكمان نفسي'],
    correct: 3, feedback: 'صح! بحبك أكتر من نفسي والدنيا كلها 🌹' },
  { question: 'لما بتضحكي، أنا بحس بـ:',
    options: ['الراحة', 'السعادة', 'كل اللي فات وأكتر', 'الفرحة'],
    correct: 2, feedback: 'بالظبط! ضحكتك بتنوّر يومي ✨' },
  { question: 'لو الدنيا لازم أختار حاجة واحدة، هختار:',
    options: ['الفلوس', 'الصحة', 'إنتي', 'كل اللي فوق'],
    correct: 2, feedback: 'إنتي السبب اللي بعيش عشانه 💖' },
  { question: 'في المستقبل أنا شايف:',
    options: ['شغل وفلوس', 'بيت وعربية', 'إنتي وأنا وأولادنا', 'سفر حول العالم'],
    correct: 2, feedback: 'ده حلمي اللي بستنى يتحقق معاكي 👰🤵' },
]

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (optionIndex) => {
    if (selected !== null) return
    setSelected(optionIndex)
    setShowFeedback(true)
    const isCorrect = optionIndex === questions[currentQ].correct
    if (isCorrect) {
      setScore(s => s + 1)
      confetti({
        particleCount: 60, spread: 70, origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#f472b6', '#fbbf24']
      })
    }
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1)
        setSelected(null)
        setShowFeedback(false)
      } else {
        setFinished(true)
        setTimeout(() => {
          confetti({
            particleCount: 200, spread: 100, origin: { y: 0.5 },
            colors: ['#ec4899', '#a855f7', '#f472b6', '#fbbf24', '#ffffff']
          })
        }, 300)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); setShowFeedback(false)
  }

  const q = questions[currentQ]
  const progress = ((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100

  return (
    <section className="quiz-section" id="quiz">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="section-tag">العبي معايا</span>
        <h2 className="section-title">قد إيه تعرفي حبيبك؟</h2>
        <p className="section-subtitle">جاوبي على الأسئلة دي وشوفي قد إيه إنتي قريبة من قلبه ♥</p>
      </motion.div>

      <motion.div className="quiz-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        {!finished ? (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="question-number">السؤال {currentQ + 1} من {questions.length}</div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}>
                <h3 className="quiz-question">{q.question}</h3>
                <div className="quiz-options">
                  {q.options.map((opt, i) => {
                    let className = 'quiz-option'
                    if (selected !== null) {
                      if (i === q.correct) className += ' correct'
                      else if (i === selected) className += ' wrong'
                      else className += ' disabled'
                    }
                    return (
                      <motion.button key={i} className={className}
                        onClick={() => handleAnswer(i)}
                        whileHover={selected === null ? { scale: 1.02, x: -8 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        disabled={selected !== null}>
                        <span className="option-letter">{['أ', 'ب', 'ج', 'د'][i]}</span>
                        <span className="option-text">{opt}</span>
                      </motion.button>
                    )
                  })}
                </div>
                <AnimatePresence>
                  {showFeedback && selected === q.correct && (
                    <motion.div className="feedback success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}>
                      {q.feedback}
                    </motion.div>
                  )}
                  {showFeedback && selected !== q.correct && (
                    <motion.div className="feedback try-again"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}>
                      الإجابة الصحيحة كانت: {q.options[q.correct]} 💝
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div className="quiz-results"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}>
            <div className="result-icon">♥</div>
            <h3 className="result-title">
              {score === questions.length ? 'إنتي تعرفيني تماماً! 💯'
                : score >= 3 ? 'إنتي قريبة جداً من قلبي 💖'
                : 'محتاجين نقعد نتكلم أكتر 💕'}
            </h3>
            <div className="result-score">
              <span className="score-number">{score}</span>
              <span className="score-total">من {questions.length}</span>
            </div>
            <p className="result-message">
              {score === questions.length
                ? 'صح إنتي اللي بتعرفي عني كل حاجة، وأنا بحبك على ده وعلى أكتر'
                : 'مهما كانت النتيجة، إنتي اللي في قلبي وحبي ليكي مالوش حدود'}
            </p>
            <button className="reset-btn" onClick={resetQuiz}>العبي تاني ↻</button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
