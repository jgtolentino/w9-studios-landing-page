'use client'

import { Award, Users, Zap, Target } from 'lucide-react'

export default function About() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for <span className="text-gradient">Advertising Excellence</span>
          </h2>
          
          <p className="text-xl text-gray-300">
            W9 Studios bridges the gap between creative vision and flawless execution. 
            We understand the pressure of pitches, the importance of deadlines, and 
            the need for production partners who make agency producers look brilliant.
          </p>
          
          <p className="text-gray-400">
            Founded by industry veterans with 30+ years combined experience at Hit Productions, 
            Loudbox Studios, and international co-productions. We've worked with every major 
            agency in Manila and understand what it takes to win pitches and deliver 
            award-winning campaigns.
          </p>

          {/* Key Differentiators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="flex gap-4">
              <Award className="text-studio-blue flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Award-Winning Team</h4>
                <p className="text-sm text-gray-400">
                  Cannes Lions, Spikes Asia, and Kidlat winners on staff
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Users className="text-studio-blue flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Agency DNA</h4>
                <p className="text-sm text-gray-400">
                  We speak agency language and understand creative KPIs
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Zap className="text-studio-blue flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Speed Without Sacrifice</h4>
                <p className="text-sm text-gray-400">
                  24-48 hour turnarounds maintaining cinema quality
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Target className="text-studio-blue flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Strategic Creative</h4>
                <p className="text-sm text-gray-400">
                  We enhance concepts, not just execute them
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a href="#contact" className="button-primary inline-block">
              Let's Discuss Your Next Project
            </a>
          </div>
        </div>

        {/* Image/Visual Element */}
        <div className="relative">
          {/* Behind the Scenes Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-video bg-studio-gray rounded overflow-hidden">
                <div className="h-full bg-gradient-to-br from-studio-blue/20 to-transparent flex items-center justify-center">
                  <span className="text-xs text-gray-500">BTS: Director at Work</span>
                </div>
              </div>
              <div className="aspect-square bg-studio-gray rounded overflow-hidden">
                <div className="h-full bg-gradient-to-br from-studio-red/20 to-transparent flex items-center justify-center">
                  <span className="text-xs text-gray-500">Cinema Camera Setup</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="aspect-square bg-studio-gray rounded overflow-hidden">
                <div className="h-full bg-gradient-to-br from-studio-gold/20 to-transparent flex items-center justify-center">
                  <span className="text-xs text-gray-500">Post-Production Suite</span>
                </div>
              </div>
              <div className="aspect-video bg-studio-gray rounded overflow-hidden">
                <div className="h-full bg-gradient-to-br from-studio-blue/20 to-transparent flex items-center justify-center">
                  <span className="text-xs text-gray-500">Client Review Session</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute -bottom-4 -left-4 bg-studio-black border border-studio-blue p-4">
            <div className="text-2xl font-bold text-studio-blue">30+</div>
            <div className="text-xs text-gray-400">Years Combined Experience</div>
          </div>
          
          <div className="absolute -top-4 -right-4 bg-studio-black border border-studio-red p-4">
            <div className="text-2xl font-bold text-studio-red">100+</div>
            <div className="text-xs text-gray-400">Campaigns Delivered</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-24">
        <h3 className="text-3xl font-bold text-center mb-12">
          Leadership <span className="text-gradient">Team</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-studio-gray overflow-hidden">
              <div className="h-full bg-gradient-to-br from-studio-blue/30 to-transparent flex items-center justify-center">
                <span className="text-xs">CEO</span>
              </div>
            </div>
            <h4 className="font-bold text-lg">Maria Santos</h4>
            <p className="text-studio-blue text-sm mb-2">Chief Executive Officer</p>
            <p className="text-sm text-gray-400">
              Former CD at GIGIL. 15+ years in advertising production.
            </p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-studio-gray overflow-hidden">
              <div className="h-full bg-gradient-to-br from-studio-red/30 to-transparent flex items-center justify-center">
                <span className="text-xs">CCO</span>
              </div>
            </div>
            <h4 className="font-bold text-lg">Carlos Reyes</h4>
            <p className="text-studio-red text-sm mb-2">Chief Creative Officer</p>
            <p className="text-sm text-gray-400">
              Award-winning director. Cannes Lions & Spikes Asia winner.
            </p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-studio-gray overflow-hidden">
              <div className="h-full bg-gradient-to-br from-studio-gold/30 to-transparent flex items-center justify-center">
                <span className="text-xs">COO</span>
              </div>
            </div>
            <h4 className="font-bold text-lg">Ana Dela Cruz</h4>
            <p className="text-studio-gold text-sm mb-2">Chief Operating Officer</p>
            <p className="text-sm text-gray-400">
              Production veteran from Hit Productions. Netflix partnerships.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
