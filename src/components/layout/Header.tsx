import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Waves, Phone, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Tours', href: '#tours' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('#home')}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <span className={cn(
                  'text-xl font-bold font-display transition-colors',
                  isScrolled ? 'text-navy-900' : 'text-white'
                )}>
                  AquaThrill NYC
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors',
                    isScrolled ? 'text-navy-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className={cn(
                  'flex items-center space-x-1',
                  isScrolled ? 'text-navy-600' : 'text-white/80'
                )}>
                  <Phone className="w-4 h-4" />
                  <span>(212) 555-WAVE</span>
                </div>
                <div className={cn(
                  'flex items-center space-x-1',
                  isScrolled ? 'text-navy-600' : 'text-white/80'
                )}>
                  <MapPin className="w-4 h-4" />
                  <span>NYC Marina</span>
                </div>
              </div>
              <Button
                variant="luxury"
                size="md"
                className="animate-pulse-glow"
                onClick={() => scrollToSection('#tours')}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-navy-700 hover:bg-navy-100' : 'text-white hover:bg-white/10'
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-white/20 lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors text-navy-700 hover:text-primary-600 hover:bg-navy-50"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-navy-200">
                <div className="space-y-3 text-sm text-navy-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(212) 555-WAVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>NYC Marina, Pier 84</span>
                  </div>
                </div>
                <Button
                  variant="luxury"
                  size="lg"
                  fullWidth
                  className="mt-4"
                  onClick={() => scrollToSection('#tours')}
                >
                  Book Your Adventure
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}