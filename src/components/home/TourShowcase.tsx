import { motion } from 'framer-motion'
import { Clock, Users, MapPin, Star, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { formatCurrency } from '../../lib/utils'

const featuredTours = [
  {
    id: 1,
    title: 'NYC Skyline Adventure',
    description: 'Experience the Manhattan skyline like never before with our signature tour featuring the Statue of Liberty and Brooklyn Bridge views.',
    shortDescription: 'Iconic skyline views and landmark sightseeing',
    duration: 90,
    maxParticipants: 8,
    price: 150,
    difficulty: 'Beginner',
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: ['Statue of Liberty Views', 'Brooklyn Bridge', 'Professional Guide', 'Safety Equipment'],
    highlights: ['Best for first-time riders', 'Perfect photo opportunities', 'Multiple landmark stops']
  },
  {
    id: 2,
    title: 'Sunset Romance Tour',
    description: 'Glide through golden waters as the sun sets behind the Manhattan skyline. Perfect for couples and special occasions.',
    shortDescription: 'Romantic sunset ride with champagne service',
    duration: 120,
    maxParticipants: 6,
    price: 225,
    difficulty: 'Intermediate',
    rating: 5.0,
    reviewCount: 189,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: ['Champagne Service', 'Sunset Views', 'Private Guide', 'Photography Package'],
    highlights: ['Couples favorite', 'Complimentary champagne', 'Professional photos included']
  },
  {
    id: 3,
    title: 'Adrenaline Rush Experience',
    description: 'For thrill-seekers only! High-speed adventure through open waters with advanced maneuvers and jumps.',
    shortDescription: 'High-speed thrills for experienced riders',
    duration: 75,
    maxParticipants: 4,
    price: 200,
    difficulty: 'Advanced',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    features: ['High-Speed Racing', 'Advanced Maneuvers', 'Expert Instruction', 'GoPro Footage'],
    highlights: ['Maximum adrenaline', 'Advanced techniques', 'Professional footage included']
  }
]

export function TourShowcase() {
  return (
    <section id="tours" className="py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-navy-900 mb-6">
            Featured Adventures
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully crafted experiences, each designed to deliver unforgettable moments on the water with NYC's most spectacular backdrop.
          </p>
        </motion.div>

        {/* Tours Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {featuredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <GlassCard className="h-full bg-white/80 hover:bg-white/90 transition-all duration-300">
                {/* Tour Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tour.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                      tour.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-lg font-bold text-navy-900">
                      {formatCurrency(tour.price)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-navy-900">
                      {tour.rating} ({tour.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed">
                      {tour.shortDescription}
                    </p>
                  </div>

                  {/* Tour Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-navy-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-primary-500" />
                      <span>{tour.duration} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-primary-500" />
                      <span>Up to {tour.maxParticipants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span>NYC Waters</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-navy-900">Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {tour.features.length > 3 && (
                        <span className="text-xs text-navy-500">
                          +{tour.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:shadow-lg group-hover:shadow-primary-500/25"
                  >
                    Book This Adventure
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View All Tours CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="xl"
            icon={<ArrowRight className="w-5 h-5" />}
            className="border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white"
          >
            View All Tours & Packages
          </Button>
        </motion.div>
      </div>
    </section>
  )
}