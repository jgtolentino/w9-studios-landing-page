'use client'

import { useState } from 'react'
import { Calendar, Clock, Video, Mail, CheckCircle, ExternalLink } from 'lucide-react'

export default function BookingSystem() {
  const [bookingType, setBookingType] = useState<'consultation' | 'studio' | 'production'>('consultation')

  // Google Calendar appointment scheduling link for w9studio.net
  const googleCalendarLink = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234567890' // Replace with your actual link
  const googleFormLink = 'https://forms.gle/your-form-id' // Replace with actual Google Form

  return (
    <div className="space-y-8">
      {/* Booking Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setBookingType('consultation')}
          className={`p-6 border transition-all ${
            bookingType === 'consultation'
              ? 'border-studio-blue bg-studio-blue/10'
              : 'border-studio-gray hover:border-studio-blue'
          }`}
        >
          <Video className="w-8 h-8 mb-3 text-studio-blue" />
          <h3 className="font-bold mb-1">Initial Consultation</h3>
          <p className="text-sm text-gray-400">30-min video call to discuss your project</p>
        </button>

        <button
          onClick={() => setBookingType('studio')}
          className={`p-6 border transition-all ${
            bookingType === 'studio'
              ? 'border-studio-blue bg-studio-blue/10'
              : 'border-studio-gray hover:border-studio-blue'
          }`}
        >
          <Calendar className="w-8 h-8 mb-3 text-studio-blue" />
          <h3 className="font-bold mb-1">Studio Booking</h3>
          <p className="text-sm text-gray-400">Reserve studio space & equipment</p>
        </button>

        <button
          onClick={() => setBookingType('production')}
          className={`p-6 border transition-all ${
            bookingType === 'production'
              ? 'border-studio-blue bg-studio-blue/10'
              : 'border-studio-gray hover:border-studio-blue'
          }`}
        >
          <Clock className="w-8 h-8 mb-3 text-studio-blue" />
          <h3 className="font-bold mb-1">Production Schedule</h3>
          <p className="text-sm text-gray-400">Book full production services</p>
        </button>
      </div>

      {/* Booking Options */}
      <div className="bg-studio-gray p-8 rounded-lg">
        {bookingType === 'consultation' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Schedule a Consultation</h2>
              <p className="text-gray-400 mb-6">
                Book a 30-minute video call with our producers to discuss your project requirements,
                timeline, and budget. We'll respond within 2-4 hours to confirm.
              </p>
            </div>

            {/* Google Calendar Booking */}
            <div className="border border-studio-blue/30 p-6 bg-studio-black/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-studio-blue" />
                Google Calendar Booking
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                View our real-time availability and book instantly. You'll receive a calendar
                invitation to your email with a Google Meet link.
              </p>
              <a
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-studio-blue text-white hover:bg-opacity-90 transition-all"
              >
                Book via Google Calendar
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Alternative: Email */}
            <div className="border border-studio-gray p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-studio-blue" />
                Direct Email
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Prefer email? Send us your preferred times and we'll coordinate.
              </p>
              <a
                href="mailto:business@w9studio.net?subject=Consultation Request"
                className="inline-flex items-center gap-2 px-6 py-3 border border-studio-blue text-studio-blue hover:bg-studio-blue hover:text-white transition-all"
              >
                Email business@w9studio.net
                <Mail size={16} />
              </a>
            </div>
          </div>
        )}

        {bookingType === 'studio' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Reserve Studio & Equipment</h2>
              <p className="text-gray-400 mb-6">
                Book our studio space and professional equipment. Half-day and full-day sessions available.
              </p>
            </div>

            {/* Studio Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-studio-black p-4">
                <h4 className="font-bold mb-2">Studio A (Main)</h4>
                <p className="text-studio-blue text-xl mb-1">₱27,800</p>
                <p className="text-sm text-gray-400">Full day (8 hours)</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• 200 sqm space</li>
                  <li>• Cyc wall included</li>
                  <li>• Basic lighting</li>
                </ul>
              </div>
              <div className="bg-studio-black p-4">
                <h4 className="font-bold mb-2">Studio B (Compact)</h4>
                <p className="text-studio-blue text-xl mb-1">₱12,800</p>
                <p className="text-sm text-gray-400">Half day (4 hours)</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• 100 sqm space</li>
                  <li>• Interview setup</li>
                  <li>• Sound treatment</li>
                </ul>
              </div>
            </div>

            {/* Google Form for detailed booking */}
            <div className="border border-studio-blue/30 p-6 bg-studio-black/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-studio-blue" />
                Equipment & Studio Request Form
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Fill out our detailed form to specify equipment needs, crew requirements, and preferred dates.
                We'll check availability and send you a quote within 4 hours.
              </p>
              <a
                href={googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-studio-blue text-white hover:bg-opacity-90 transition-all"
              >
                Open Booking Form
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}

        {bookingType === 'production' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Full Production Booking</h2>
              <p className="text-gray-400 mb-6">
                For TV commercials, corporate videos, and major productions. Our team will handle
                everything from pre-production to final delivery.
              </p>
            </div>

            {/* Production Timeline */}
            <div className="bg-studio-black p-6">
              <h3 className="font-bold mb-4">Typical Production Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-studio-blue/20 flex items-center justify-center text-studio-blue font-bold">1</div>
                  <div>
                    <p className="font-semibold">Initial Consultation (Day 1)</p>
                    <p className="text-gray-400">Brief discussion, requirements gathering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-studio-blue/20 flex items-center justify-center text-studio-blue font-bold">2</div>
                  <div>
                    <p className="font-semibold">Proposal & Quote (Day 2-3)</p>
                    <p className="text-gray-400">Detailed proposal with timeline and budget</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-studio-blue/20 flex items-center justify-center text-studio-blue font-bold">3</div>
                  <div>
                    <p className="font-semibold">Pre-Production (Week 1-2)</p>
                    <p className="text-gray-400">Scripting, storyboarding, location scouting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-studio-blue/20 flex items-center justify-center text-studio-blue font-bold">4</div>
                  <div>
                    <p className="font-semibold">Production (Scheduled dates)</p>
                    <p className="text-gray-400">Filming with full crew and equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-studio-blue/20 flex items-center justify-center text-studio-blue font-bold">5</div>
                  <div>
                    <p className="font-semibold">Post-Production (1-2 weeks)</p>
                    <p className="text-gray-400">Editing, color grading, sound design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-studio-blue/10 border border-studio-blue/30 p-6">
              <h3 className="font-bold mb-3">Ready to Start Your Production?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Contact our producers directly for full production services. We handle projects
                from ₱300K to ₱3M+ with flexible payment terms for agencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:business@w9studio.net?subject=Production Inquiry"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-studio-blue text-white hover:bg-opacity-90 transition-all"
                >
                  Email Productions Team
                  <Mail size={16} />
                </a>
                <a
                  href="tel:+639171234567"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-studio-blue text-studio-blue hover:bg-studio-blue hover:text-white transition-all"
                >
                  Call +63 917 123 4567
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Workspace Integration Note */}
      <div className="text-center text-sm text-gray-500">
        <p>
          All bookings are managed through our Google Workspace system at{' '}
          <span className="text-studio-blue">w9studio.net</span>
        </p>
        <p className="mt-1">
          Calendar invites and confirmations will be sent from{' '}
          <span className="text-studio-blue">business@w9studio.net</span>
        </p>
      </div>
    </div>
  )
}