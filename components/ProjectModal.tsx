'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, ArrowRight, ArrowLeft } from 'lucide-react'
import ReactPlayer from 'react-player'

interface Project {
  id: number
  title: string
  client: string
  category: string
  industry: string
  thumbnail: string
  video?: string
  description: string
  services: string[]
  metrics?: {
    views?: string
    engagement?: string
    roi?: string
  }
  details?: {
    challenge: string
    solution: string
    results: string
  }
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onNext, onPrevious])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="relative w-full max-w-7xl mx-auto px-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next project"
              >
                <ArrowRight size={24} />
              </button>
            )}

            <div className="bg-studio-gray rounded-lg overflow-hidden">
              {/* Video/Image Section */}
              <div className="relative aspect-video bg-studio-darker">
                {project.video ? (
                  <ReactPlayer
                    url={project.video}
                    playing={isPlaying}
                    controls
                    width="100%"
                    height="100%"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    fallback={
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    }
                  />
                ) : (
                  <>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-black/50 backdrop-blur rounded-full">
                        <Play size={48} />
                      </div>
                    </div>
                  </>
                )}

                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-studio-blue text-sm font-medium">
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
                      <p className="text-xl text-gray-400">
                        {project.client} • {project.industry}
                      </p>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Challenge, Solution, Results */}
                    {project.details && (
                      <div className="space-y-6 pt-6 border-t border-studio-black/50">
                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-studio-blue">
                            The Challenge
                          </h3>
                          <p className="text-gray-300">
                            {project.details.challenge}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-studio-blue">
                            Our Solution
                          </h3>
                          <p className="text-gray-300">
                            {project.details.solution}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-studio-blue">
                            The Results
                          </h3>
                          <p className="text-gray-300">
                            {project.details.results}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Services */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">
                        SERVICES PROVIDED
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map(service => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-studio-black/50 text-sm text-gray-400"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-3">
                          PROJECT IMPACT
                        </h4>
                        <div className="space-y-3">
                          {project.metrics.views && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Views</span>
                              <span className="font-bold text-studio-blue">
                                {project.metrics.views}
                              </span>
                            </div>
                          )}
                          {project.metrics.engagement && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Engagement</span>
                              <span className="font-bold text-studio-blue">
                                {project.metrics.engagement}
                              </span>
                            </div>
                          )}
                          {project.metrics.roi && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">ROI</span>
                              <span className="font-bold text-studio-blue">
                                {project.metrics.roi}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-6">
                      <button className="w-full px-6 py-3 bg-studio-blue text-white font-medium hover:bg-white hover:text-studio-black transition-all duration-300">
                        Start Your Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}