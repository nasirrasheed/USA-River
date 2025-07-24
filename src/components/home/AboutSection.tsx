import { motion } from 'framer-motion'
import { Shield, Award, Users, Heart } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Coast Guard certified equipment and professional safety briefings ensure your adventure is both thrilling and secure.'
  },
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Our experienced guides know NYC waters like the back of their hand, sharing insider knowledge and ensuring unforgettable experiences.'
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate group sizes mean personalized attention and the flexibility to customize your adventure on the water.'
  },
  {
    icon: Heart,
    title: 'Memorable Moments',
    description: 'From proposal-worthy sunsets to adrenaline-pumping rides, we create experiences that become lifelong memories.'
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-navy-50 via-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-navy-900 mb-6">
                Why Choose AquaThrill NYC?
              </h2>
              <p className="text-xl text-navy-600 leading-relaxed mb-8">
                For over five years, we've been NYC's premier jet ski tour company, combining luxury service with heart-pounding adventure. Our passion for the water and commitment to excellence has made us the top choice for both locals and visitors seeking unforgettable experiences on the Hudson River.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900">
                    {feature.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Sunset tour"
                  className="w-full h-48 object-cover"
                />
              </GlassCard>
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="NYC skyline"
                  className="w-full h-64 object-cover"
                />
              </GlassCard>
            </div>
            <div className="space-y-4 pt-8">
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Jet ski action"
                  className="w-full h-64 object-cover"
                />
              </GlassCard>
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Adventure"
                  className="w-full h-48 object-cover"
                />
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}