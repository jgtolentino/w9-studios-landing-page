'use client'

import { useEffect, useRef, Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import BookingSystem from '@/components/BookingSystem'
import Showreel from '@/components/Showreel'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { ScrollProgress, FadeInWhenVisible, ParallaxSection } from '@/components/ScrollAnimations'

// Dynamic imports for performance
const WebGLHero = dynamic(() => import('@/components/WebGLHero'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-studio-black" />
})

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5'
        const yPos = -(scrolled * parseFloat(speed))
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main ref={mainRef} className="relative">
        <div className="relative">
          <WebGLHero />
          <Hero />
        </div>
        
        {/* Stats Section - Key metrics with data viz */}
        <FadeInWhenVisible>
          <Stats />
        </FadeInWhenVisible>
        
        {/* Showreel Section - 60-90 second highlight reel */}
        <ParallaxSection speed={0.3}>
          <section id="showreel" className="py-24 bg-studio-darker">
            <div className="container">
              <FadeInWhenVisible>
                <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
                  Our Work Speaks <span className="text-gradient">Volumes</span>
                </h2>
              </FadeInWhenVisible>
              <Showreel />
            </div>
          </section>
        </ParallaxSection>

        {/* Portfolio Grid - Filterable by industry/service */}
        <section id="portfolio" className="py-24 bg-studio-black">
          <div className="container">
            <FadeInWhenVisible>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
                From TV commercials to corporate storytelling, we deliver cinematic excellence
                for Manila's top advertising agencies
              </p>
            </FadeInWhenVisible>
            <Portfolio />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-studio-gray">
          <div className="container">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              Premium Production <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              End-to-end production capabilities with specialized excellence in food cinematography, 
              virtual production, and cinematic corporate storytelling
            </p>
            <Services />
          </div>
        </section>

        {/* About Section - Agency-focused positioning */}
        <section id="about" className="py-24 bg-studio-black">
          <About />
        </section>

        {/* Booking & Reservation Section */}
        <section id="booking" className="py-24 bg-studio-darker">
          <div className="container">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              Book Your <span className="text-gradient">Production</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Reserve studio time, schedule consultations, or book full production services.
              Integrated with Google Workspace for seamless scheduling.
            </p>
            <BookingSystem />
          </div>
        </section>

        {/* Contact Section with qualification form */}
        <section id="contact" className="py-24 bg-studio-black">
          <div className="container">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              Start Your <span className="text-gradient">Project</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              2-4 hour response time. Direct line to our producers.
              Let's create something extraordinary together.
            </p>
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
