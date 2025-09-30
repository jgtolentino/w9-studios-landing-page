'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

// Animated counter component
export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const animation = animate(motionValue, value, {
        duration,
        ease: [0.17, 0.55, 0.55, 1.0]
      })
      return animation.stop
    }
  }, [isInView, value, motionValue, duration])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// Animated progress bar
export function ProgressBar({
  label,
  value,
  maxValue = 100,
  color = '#0066FF'
}: {
  label: string
  value: number
  maxValue?: number
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const percentage = (value / maxValue) * 100

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-bold">
          <AnimatedCounter value={value} suffix={`/${maxValue}`} />
        </span>
      </div>
      <div className="h-2 bg-studio-gray rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1.0] }}
        />
      </div>
    </div>
  )
}

// Animated circular chart
export function CircularChart({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = '#0066FF',
  label
}: {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const percentage = (value / maxValue) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: [0.17, 0.55, 0.55, 1.0] }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">
          <AnimatedCounter value={percentage} suffix="%" />
        </span>
        {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
      </div>
    </div>
  )
}

// Animated bar chart
export function BarChart({
  data,
  height = 200,
  barColor = '#0066FF'
}: {
  data: { label: string; value: number }[]
  height?: number
  barColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full rounded-t"
                style={{ backgroundColor: barColor }}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${barHeight}%` } : { height: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.17, 0.55, 0.55, 1.0]
                }}
              />
              <span className="text-xs text-gray-400 mt-2 text-center">
                {item.label}
              </span>
              <span className="text-sm font-bold">
                <AnimatedCounter value={item.value} />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Animated line graph (simplified)
export function LineGraph({
  data,
  width = 300,
  height = 150,
  color = '#0066FF'
}: {
  data: number[]
  width?: number
  height?: number
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - minValue) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <div ref={ref} className="relative">
      <svg width={width} height={height}>
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.17, 0.55, 0.55, 1.0] }}
        />
        {/* Add dots at data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width
          const y = height - ((value - minValue) / range) * height

          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.5 + index * 0.1,
                ease: [0.17, 0.55, 0.55, 1.0]
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Animated stats grid
export function StatsGrid({
  stats
}: {
  stats: { label: string; value: number; suffix?: string; prefix?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.17, 0.55, 0.55, 1.0]
          }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-bold text-studio-blue mb-2">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </p>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Export all components
export const DataViz = {
  AnimatedCounter,
  ProgressBar,
  CircularChart,
  BarChart,
  LineGraph,
  StatsGrid
}

export default DataViz