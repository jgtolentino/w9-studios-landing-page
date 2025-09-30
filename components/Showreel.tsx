'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative">
      {/* Showreel Thumbnail/Player */}
      <div className="relative aspect-video bg-studio-gray overflow-hidden group cursor-pointer"
           onClick={() => setIsPlaying(true)}>
        {!isPlaying ? (
          <>
            {/* Placeholder Video Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-studio-blue/20 to-studio-red/20">
              {/* This would be replaced with actual thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="text-xl font-medium">Watch Our 90-Second Showreel</p>
                  <p className="text-sm text-gray-400 mt-2">Best work from 2024-2025</p>
                </div>
              </div>
            </div>

            {/* Animated Play Button Pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-studio-blue/30 animate-ping" />
            </div>
          </>
        ) : (
          <div className="relative h-full">
            <video
              autoPlay
              controls
              className="w-full h-full"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/videos/showreel-2024.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(false)
              }}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Showreel Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-studio-blue mb-2">25+</div>
          <div className="text-sm text-gray-400">Projects Featured</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-studio-blue mb-2">15</div>
          <div className="text-sm text-gray-400">Major Brands</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-studio-blue mb-2">8</div>
          <div className="text-sm text-gray-400">Award Winners</div>
        </div>
      </div>

      {/* Client Logos Grid */}
      <div className="mt-12">
        <p className="text-center text-sm text-gray-400 mb-6">Featured Clients in Showreel</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-50">
          {/* Placeholder logos - replace with actual client logos */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-studio-gray rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">Client {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
