'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: '#1',
    label: 'Commercial Production in Asia',
    description: 'Ranked by Arcade Film Factory 2025'
  },
  {
    value: '₱3.53B',
    label: 'Metro Manila Ad Market',
    description: 'Growing at 11.7% CAGR'
  },
  {
    value: '95%',
    label: 'Client Retention Rate',
    description: 'Industry average: 60-70%'
  },
  {
    value: '2-4hr',
    label: 'Response Time',
    description: 'Direct producer access'
  }
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
    <section ref={sectionRef} className="py-16 bg-studio-black border-y border-studio-gray">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                {stat.value}
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
      </div>
    </section>
  )
}
