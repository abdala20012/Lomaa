import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PasswordLock from './components/PasswordLock'
import WelcomeScreen from './components/WelcomeScreen'
import CinemaMode from './components/CinemaMode'
import AuroraBackground from './components/AuroraBackground'
import FloatingHearts from './components/FloatingHearts'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CounterSection from './components/CounterSection'
import TimelineSection from './components/TimelineSection'
import LetterSection from './components/LetterSection'
import GallerySection from './components/GallerySection'
import VideosSection from './components/VideosSection'
import CardsSection from './components/CardsSection'
import StarsSection from './components/StarsSection'
import MusicWallSection from './components/MusicWallSection'
import QuizSection from './components/QuizSection'
import SurpriseBoxSection from './components/SurpriseBoxSection'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'

export default function App() {
  const [stage, setStage] = useState('locked')
  const shouldStartMusic = stage === 'welcome' || stage === 'unlocked'

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'locked' && (
          <PasswordLock key="lock" onUnlock={() => setStage('welcome')} />
        )}
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onFinish={() => setStage('unlocked')} />
        )}
      </AnimatePresence>

      {shouldStartMusic && (
        <MusicPlayer autoPlay={true} visible={stage === 'unlocked'} />
      )}

      {stage === 'unlocked' && (
        <>
          <AuroraBackground />
          <FloatingHearts count={20} />
          <Navbar />
          <CinemaMode />
          <main>
            <HeroSection />
            <CounterSection />
            <TimelineSection />
            <LetterSection />
            <GallerySection />
            <VideosSection />
            <CardsSection />
            <StarsSection />
            <MusicWallSection />
            <QuizSection />
            <SurpriseBoxSection />
            <Footer />
          </main>
        </>
      )}
    </>
  )
}
