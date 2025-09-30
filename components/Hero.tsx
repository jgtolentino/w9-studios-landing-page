'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Play, Volume2, VolumeX } from 'lucide-react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8 // Slightly slower for cinematic feel
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero-showreel.mp4" type="video/mp4" />
          {/* Fallback to placeholder */}
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Additional dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content - Asymmetric Lusion-inspired layout */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-12 gap-8">
            {/* Left column - Main headline */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
              <div className="space-y-4 animate-fade-up">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight">
                  We Craft<br />
                  <span className="text-studio-blue">Cinematic</span><br />
                  Experiences
                </h1>
              </div>

              {/* CTA - Minimalist */}
              <div className="flex gap-4 animate-delay-200">
                <button className="group px-8 py-4 bg-studio-blue text-white font-medium hover:bg-white hover:text-studio-black transition-all duration-300 flex items-center gap-2">
                  <Play size={18} />
                  <span>Play Reel</span>
                </button>
              </div>
            </div>

            {/* Right column - Supporting info */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-end space-y-6 animate-delay-300">
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Production studio for advertising agencies in Metro Manila.
                TV commercials, corporate films, digital content.
              </p>

              <div className="border-l-2 border-studio-blue pl-4">
                <p className="text-sm text-gray-500 mb-1">RESPONSE TIME</p>
                <p className="text-2xl font-bold">2-4 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 left-8 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-studio-white/50" />
        </div>
      </div>
    </section>
  )
}
