import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Waves, Users, Award, Shield } from 'lucide-react'
import { Button } from '../ui/Button'

const heroSlides = [
  {
    id: 1,
    title: 'Ride the Waves of NYC',
    subtitle: 'Premium Jet Ski Adventures',
    description: 'Experience the ultimate thrill with breathtaking skyline views',
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  },
  {
    id: 2,
    title: 'Sunset Adventures Await',
    subtitle: 'Golden Hour Magic',
    description: 'Glide through pristine waters as the city lights begin to sparkle',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  },
  {
    id: 3,
    title: 'Luxury Meets Adventure',
    subtitle: 'Unforgettable Experiences',
    description: 'Premium service, professional guides, and memories to last a lifetime',
    image: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  }
]

const stats = [
  { icon: Users, label: '10,000+', description: 'Happy Riders' },
  { icon: Award, label: '5 Years', description: 'Experience' },
  { icon: Shield, label: '100%', description: 'Safety Record' },
  { icon: Waves, label: '25+', description: 'Routes Available' },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTours = () => {
    const element = document.querySelector('#tours')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-800/50 to-primary-900/70" />
        </motion.div>
      </AnimatePresence>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-400/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-1/3 w-6 h-6 bg-secondary-400/20 rounded-full blur-sm"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Hero Text */}
          <div className="space-y-4">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-primary-200 font-medium"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <motion.p
              key={`description-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="luxury"
              size="xl"
              className="group relative overflow-hidden"
              onClick={scrollToTours}
            >
              <span className="relative z-10">Book Your Adventure</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              icon={<Play className="w-5 h-5" />}
              onClick={() => setShowVideo(true)}
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Watch Experience
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-primary-400 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://player.vimeo.com/video/324175618?autoplay=1&loop=1&muted=1"
                className="w-full h-full rounded-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white hover:text-primary-300 transition-colors text-2xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}