import React from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/home/HeroSection'
import { TourShowcase } from './components/home/TourShowcase'
import { AboutSection } from './components/home/AboutSection'
import { ContactSection } from './components/home/ContactSection'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TourShowcase />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App