import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export function GlassCard({ children, className = '', hover = true, gradient = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        'backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden',
        gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-white/10',
        'shadow-glass hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}