'use client'

import { 
  Film, 
  Building2, 
  Smartphone, 
  Palette, 
  Headphones, 
  Sparkles,
  Camera,
  MonitorPlay,
  Users
} from 'lucide-react'

const services = [
  {
    icon: Film,
    title: 'TV Commercial Production',
    description: 'End-to-end commercial production from concept to delivery. Award-winning creative execution for major brands.',
    price: '₱300K - 1M per spot',
    features: [
      'Script development & storyboarding',
      'Location scouting & permits',
      'Talent casting & management',
      'Multi-camera production',
      'Full post-production suite'
    ]
  },
  {
    icon: Building2,
    title: 'Corporate Video Production',
    description: 'Cinematic corporate storytelling that elevates brand narratives and engages stakeholders.',
    price: '₱75K - 250K per project',
    features: [
      'Corporate AVPs & testimonials',
      'Training & onboarding videos',
      'Event coverage & documentation',
      'Executive interviews',
      'Annual report videos'
    ]
  },
  {
    icon: Smartphone,
    title: 'Digital & Social Content',
    description: 'High-volume content optimized for digital platforms. From TikTok to YouTube campaigns.',
    price: '₱25K - 150K per series',
    features: [
      'Vertical video for TikTok/Reels',
      'YouTube pre-roll ads',
      'Social media campaigns',
      'Influencer collaboration videos',
      'Live streaming production'
    ]
  },
  {
    icon: Camera,
    title: 'Food Cinematography',
    description: 'Specialized food filming with custom rigs, specialized lighting, and styling expertise.',
    price: 'Premium rates apply',
    features: [
      'Macro & slow-motion capture',
      'Steam & sizzle effects',
      'Custom lighting setups',
      'Food styling coordination',
      'Recipe & process videos'
    ]
  },
  {
    icon: Sparkles,
    title: 'Virtual Production',
    description: 'Cutting-edge virtual sets and real-time VFX for tech launches and futuristic campaigns.',
    price: 'Custom pricing',
    features: [
      'LED wall virtual sets',
      'Real-time compositing',
      'Unreal Engine integration',
      '3D environment creation',
      'XR production capabilities'
    ]
  },
  {
    icon: Palette,
    title: 'Post-Production Services',
    description: 'World-class post-production with Dolby Atmos capabilities and cinema-grade color grading.',
    price: '₱50K - 150K per project',
    features: [
      'DaVinci Resolve color grading',
      'Motion graphics & VFX',
      'Sound design & mixing',
      'Dolby Atmos audio',
      'Multiple format delivery'
    ]
  }
]

const retainerPackages = [
  {
    name: 'Starter',
    price: '₱165,000',
    description: 'Perfect for growing brands',
    features: [
      '1-2 shoots per month',
      'Basic post-production',
      'Social media optimization',
      '48-hour turnaround',
      'Dedicated producer'
    ]
  },
  {
    name: 'Professional',
    price: '₱330,000',
    description: 'For established agencies',
    features: [
      '2-3 shoots per month',
      'Full post-production suite',
      'Priority scheduling',
      '24-hour turnaround',
      'Senior creative team',
      'Quarterly strategy sessions'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Unlimited possibilities',
    features: [
      'Unlimited shoots',
      'Dedicated production team',
      'Same-day turnaround',
      'Executive producer access',
      'International co-production',
      'Custom workflow integration'
    ]
  }
]

export default function Services() {
  return (
    <div className="space-y-16">
      {/* Main Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="bg-studio-black p-8 border border-studio-gray hover:border-studio-blue transition-all duration-500 group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-6">
                <Icon 
                  size={48} 
                  className="text-studio-blue group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-studio-blue transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-4">
                {service.description}
              </p>
              
              <p className="text-studio-blue font-medium mb-4">
                {service.price}
              </p>
              
              <ul className="space-y-2 text-sm text-gray-300">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-studio-blue mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Retainer Packages */}
      <div className="pt-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Monthly <span className="text-gradient">Retainer Packages</span>
        </h3>
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Guaranteed production capacity for your agency. Preferential scheduling, 
          consistent quality, simplified billing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {retainerPackages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative p-8 border transition-all duration-500 ${
                index === 1 
                  ? 'border-studio-blue bg-studio-blue/5 scale-105' 
                  : 'border-studio-gray bg-studio-black hover:border-studio-blue'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-studio-blue text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
              <p className="text-3xl font-bold text-studio-blue mb-2">
                {pkg.price}
                <span className="text-sm text-gray-400 font-normal">/month</span>
              </p>
              <p className="text-gray-400 mb-6">{pkg.description}</p>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="text-studio-blue mt-0.5">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full ${
                index === 1 ? 'button-primary' : 'button-secondary'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Rental Note */}
      <div className="bg-studio-gray p-8 text-center">
        <MonitorPlay size={48} className="text-studio-blue mx-auto mb-4" />
        <h4 className="text-2xl font-bold mb-2">Equipment Rental Available</h4>
        <p className="text-gray-400 max-w-2xl mx-auto">
          RED camera packages, ARRI lighting, professional grip equipment available for rental. 
          Studio space rental at ₱12,800-27,800 per session.
        </p>
      </div>
    </div>
  )
}
