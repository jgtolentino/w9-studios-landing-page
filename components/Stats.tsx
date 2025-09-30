'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatedCounter, CircularChart, ProgressBar, BarChart } from './DataViz'

const stats = [
  {
    value: 250,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Since 2020'
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client Retention',
    description: 'Industry avg: 60-70%'
  },
  {
    value: 48,
    label: 'Awards Won',
    description: 'International recognition'
  },
  {
    value: 2,
    suffix: '-4hr',
    label: 'Response Time',
    description: 'Direct producer access'
  }
]

// Performance metrics for charts
const performanceData = [
  { label: 'Q1', value: 12 },
  { label: 'Q2', value: 19 },
  { label: 'Q3', value: 23 },
  { label: 'Q4', value: 31 }
]

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-studio-black border-y border-studio-gray">
      <div className="container">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-studio-blue mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm md:text-base font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Data Visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Client Satisfaction */}
          <div className="text-center">
            <CircularChart
              value={98}
              maxValue={100}
              color="#0066FF"
              label="Satisfaction"
            />
            <p className="mt-4 text-sm text-gray-400">Client Satisfaction Score</p>
          </div>

          {/* Project Growth */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Project Growth</h4>
            <BarChart data={performanceData} height={150} barColor="#E84141" />
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">Production Capabilities</h4>
            <ProgressBar label="TV Commercials" value={95} color="#0066FF" />
            <ProgressBar label="Corporate Videos" value={88} color="#E84141" />
            <ProgressBar label="Digital Content" value={92} color="#4ECDC4" />
          </div>
        </div>
      </div>
    </section>
  )
}
