'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
}

// Parallax wrapper component
export function ParallaxSection({ children, className = '', speed = 0.5 }: ScrollAnimationProps & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

// Fade in on scroll
export function FadeInWhenVisible({ children, className = '', delay = 0 }: ScrollAnimationProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.17, 0.55, 0.55, 1.0]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale on scroll
export function ScaleOnScroll({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

// Staggered children animation
export function StaggerChildren({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        },
        hidden: {}
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger child
export function StaggerChild({ children, className = '' }: ScrollAnimationProps) {
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.17, 0.55, 0.55, 1.0]
          }
        },
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
export function TextReveal({ text, className = '' }: { text: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = text.split(' ')

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.17, 0.55, 0.55, 1.0]
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-studio-blue origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// Rotating element on scroll
export function RotateOnScroll({ children, className = '' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  )
}

// Magnetic hover effect
export function MagneticHover({ children, className = '', strength = 0.5 }: ScrollAnimationProps & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  )
}

// Export all animations as a collection
export const ScrollAnimations = {
  ParallaxSection,
  FadeInWhenVisible,
  ScaleOnScroll,
  StaggerChildren,
  StaggerChild,
  TextReveal,
  ScrollProgress,
  RotateOnScroll,
  MagneticHover
}

export default ScrollAnimations