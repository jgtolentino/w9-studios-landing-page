'use client'

import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'

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
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Summer Campaign 2024',
    client: 'Jollibee',
    category: 'TV Commercial',
    industry: 'FMCG',
    thumbnail: '/images/portfolio/jollibee-thumb.jpg',
    video: '/videos/jollibee-commercial.mp4',
    description: 'A heartwarming summer campaign celebrating Filipino family traditions',
    services: ['Commercial Production', 'Post-Production', 'Color Grading'],
    metrics: {
      views: '2.5M',
      engagement: '40% increase',
      roi: '3.2x'
    }
  },
  {
    id: 2,
    title: 'Digital Transformation Story',
    client: 'BDO Unibank',
    category: 'Corporate Video',
    industry: 'Finance',
    thumbnail: '/images/portfolio/bdo-thumb.jpg',
    description: 'Showcasing BDO\'s journey to becoming a digital-first bank',
    services: ['Corporate Video', 'Motion Graphics', 'Sound Design'],
    metrics: {
      views: '500K',
      engagement: 'Internal rollout to 20K employees'
    }
  },
  {
    id: 3,
    title: 'Product Launch Film',
    client: 'Samsung Philippines',
    category: 'Digital Content',
    industry: 'Technology',
    thumbnail: '/images/portfolio/samsung-thumb.jpg',
    description: 'Cinematic product reveal for Galaxy S24 series',
    services: ['Virtual Production', '3D Animation', 'Post-Production'],
    metrics: {
      views: '1.8M',
      engagement: '25% CTR',
      roi: '₱15M in pre-orders'
    }
  },
  {
    id: 4,
    title: 'Heritage Series',
    client: 'San Miguel Corporation',
    category: 'Documentary',
    industry: 'FMCG',
    thumbnail: '/images/portfolio/sanmiguel-thumb.jpg',
    description: '130 years of Filipino heritage captured in cinematic documentary',
    services: ['Documentary Production', 'Archival Research', 'Color Restoration'],
    metrics: {
      views: '3.5M total reach'
    }
  },
  {
    id: 5,
    title: 'Healthcare Heroes',
    client: 'Makati Medical Center',
    category: 'Corporate Video',
    industry: 'Healthcare',
    thumbnail: '/images/portfolio/makati-med-thumb.jpg',
    description: 'Tribute to frontline healthcare workers',
    services: ['Corporate Video', 'Testimonial Series', 'Post-Production'],
    metrics: {
      engagement: '95% positive sentiment'
    }
  },
  {
    id: 6,
    title: 'Food Cinematography',
    client: 'Max\'s Restaurant',
    category: 'TV Commercial',
    industry: 'FMCG',
    thumbnail: '/images/portfolio/maxs-thumb.jpg',
    description: 'Mouth-watering food cinematography for national TV campaign',
    services: ['Food Cinematography', 'Specialized Lighting', 'Color Grading'],
    metrics: {
      roi: '20% sales increase'
    }
  }
]

const categories = ['All', 'TV Commercial', 'Corporate Video', 'Digital Content', 'Documentary']
const industries = ['All', 'FMCG', 'Technology', 'Finance', 'Healthcare']

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory
    const industryMatch = selectedIndustry === 'All' || project.industry === selectedIndustry
    return categoryMatch && industryMatch
  })

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-studio-blue text-white'
                  : 'bg-studio-gray text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selectedIndustry === industry
                  ? 'bg-studio-red text-white'
                  : 'bg-studio-gray text-gray-400 hover:text-white'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid - Asymmetric 8-column Buck.co style */}
      <div className="grid grid-cols-8 gap-4 md:gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => {
          // Alternate between 3-span and 5-span for asymmetry (Buck pattern)
          const isFeature = index % 3 === 0;
          const span = isFeature ? 'col-span-8 md:col-span-5' : 'col-span-8 md:col-span-3';

          return (
          <div
            key={project.id}
            className={`project-card group relative overflow-hidden bg-studio-gray cursor-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${span}`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-studio-darker">
              {/* Placeholder image */}
              <div className="absolute inset-0 bg-gradient-to-br from-studio-blue/20 to-studio-red/20" />
              
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
                hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="flex items-center justify-center h-full">
                  <Play size={48} className="text-white" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-studio-blue text-xs font-medium">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-studio-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400">{project.client} • {project.industry}</p>
              </div>

              <p className="text-sm text-gray-300 line-clamp-2">
                {project.description}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2">
                {project.services.slice(0, 3).map(service => (
                  <span
                    key={service}
                    className="text-xs px-2 py-1 bg-studio-black/50 text-gray-400"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="pt-4 border-t border-studio-black/50 flex justify-between text-xs">
                  {project.metrics.views && (
                    <div>
                      <p className="text-gray-500">Views</p>
                      <p className="font-bold text-studio-blue">{project.metrics.views}</p>
                    </div>
                  )}
                  {project.metrics.engagement && (
                    <div>
                      <p className="text-gray-500">Engagement</p>
                      <p className="font-bold text-studio-blue">{project.metrics.engagement}</p>
                    </div>
                  )}
                  {project.metrics.roi && (
                    <div>
                      <p className="text-gray-500">ROI</p>
                      <p className="font-bold text-studio-blue">{project.metrics.roi}</p>
                    </div>
                  )}
                </div>
              )}

              {/* View Case Study Link */}
              <a
                href={`/portfolio/${project.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-studio-blue hover:text-studio-white transition-colors pt-2"
              >
                View Case Study <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )})}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <button className="button-secondary">
          Load More Projects
        </button>
      </div>
    </div>
  )
}
