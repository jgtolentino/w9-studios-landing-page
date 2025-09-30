'use client'

import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import ProjectModal from './ProjectModal'
import { projectPalettes } from '../utils/mediaGenerator'
import { StaggerChildren, StaggerChild, FadeInWhenVisible } from './ScrollAnimations'

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

// Extended project data with details
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
    },
    details: {
      challenge: 'Create a campaign that resonates with Filipino families during the summer season while maintaining brand authenticity.',
      solution: 'We crafted a heartwarming narrative centered around family traditions, using cinematic techniques to capture genuine emotions.',
      results: 'The campaign achieved 2.5M views in the first week and drove a 40% increase in summer menu sales.'
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

      {/* Projects Grid - Asymmetric 8-column Buck.co style with animations */}
      <StaggerChildren className="grid grid-cols-8 gap-4 md:gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => {
          // Alternate between 3-span and 5-span for asymmetry (Buck pattern)
          const isFeature = index % 3 === 0;
          const span = isFeature ? 'col-span-8 md:col-span-5' : 'col-span-8 md:col-span-3';

          // Get dynamic color palette for this project
          const projectKey = project.client.toLowerCase().replace(/[^a-z]/g, '');
          const colors = projectPalettes[projectKey as keyof typeof projectPalettes] ||
                         { primary: '#0066FF', secondary: '#E84141', accent: '#ffffff' };

          return (
          <StaggerChild key={project.id}>
          <div
            key={project.id}
            className={`project-card group relative overflow-hidden bg-studio-gray cursor-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${span}`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => {
              setSelectedProject(project);
              setIsModalOpen(true);
            }}
          >
            {/* Thumbnail with dynamic colors */}
            <div className="relative aspect-video overflow-hidden bg-studio-darker">
              {/* Dynamic gradient based on project colors */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: hoveredProject === project.id
                    ? `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`
                    : `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
                }}
              />

              {/* Actual thumbnail image */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
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

              {/* View Case Study Button */}
              <button
                className="inline-flex items-center gap-2 text-sm font-medium text-studio-blue hover:text-studio-white transition-colors pt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                View Case Study <ExternalLink size={16} />
              </button>
            </div>
          </div>
          </StaggerChild>
        )})}
      </StaggerChildren>

      {/* Load More Button */}
      <FadeInWhenVisible className="text-center pt-8">
        <button className="button-secondary">
          Load More Projects
        </button>
      </FadeInWhenVisible>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        onNext={() => {
          const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject?.id);
          const nextIndex = (currentIndex + 1) % filteredProjects.length;
          setSelectedProject(filteredProjects[nextIndex]);
        }}
        onPrevious={() => {
          const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject?.id);
          const prevIndex = currentIndex - 1 < 0 ? filteredProjects.length - 1 : currentIndex - 1;
          setSelectedProject(filteredProjects[prevIndex]);
        }}
      />
    </div>
  )
}
