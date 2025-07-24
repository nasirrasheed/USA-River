import { motion } from 'framer-motion'
import { Waves, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '#home' },
      { name: 'Tours', href: '#tours' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  {
    title: 'Tours',
    links: [
      { name: 'NYC Skyline Tour', href: '#tours' },
      { name: 'Sunset Adventure', href: '#tours' },
      { name: 'Private Charter', href: '#tours' },
      { name: 'Group Packages', href: '#tours' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQ', href: '#contact' },
      { name: 'Safety Guidelines', href: '#about' },
      { name: 'Cancellation Policy', href: '#contact' },
      { name: 'Gift Cards', href: '#contact' },
    ]
  }
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      {/* Wave decoration */}
      <div className="relative">
        <svg
          className="absolute top-0 left-0 w-full h-12 text-primary-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="relative pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <Waves className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold font-display">AquaThrill NYC</span>
                </div>
                
                <p className="text-white/80 leading-relaxed max-w-md">
                  Experience the ultimate luxury jet ski adventures in New York City. 
                  Ride the waves with breathtaking skyline views and unforgettable memories.
                </p>

                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-white/80">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span>Pier 84, West 44th Street, NYC 10036</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <span>(212) 555-WAVE</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <span>info@aquathrillnyc.com</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold font-display">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-white/70 hover:text-white hover:text-primary-300 transition-colors text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2024 AquaThrill NYC. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <button onClick={() => scrollToSection('#contact')} className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => scrollToSection('#contact')} className="text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </button>
                <button onClick={() => scrollToSection('#contact')} className="text-white/60 hover:text-white transition-colors">
                  Accessibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}