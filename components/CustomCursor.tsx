'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Track mouse movement
    document.addEventListener('mousemove', updatePosition)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .cursor-hover'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isVisible])

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Outer cursor ring */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className={`w-10 h-10 border-2 rounded-full transition-all duration-300 ${
            isHovering
              ? 'border-studio-blue bg-studio-blue/10'
              : 'border-studio-white/30'
          }`}
        />
      </div>

      {/* Inner cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-100 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
        }}
      >
        <div className="w-1 h-1 bg-studio-blue rounded-full" />
      </div>
    </>
  )
}