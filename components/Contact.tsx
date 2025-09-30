'use client'

import { useState } from 'react'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    services: '',
    timeline: '',
    budget: '',
    brief: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setFormData({
          name: '',
          email: '',
          company: '',
          services: '',
          timeline: '',
          budget: '',
          brief: ''
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Information */}
      <div className="lg:col-span-1 space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Let's Create Together</h3>
          <p className="text-gray-400">
            Ready to bring your vision to life? Our producers respond within 2-4 hours 
            during business days. Direct line to decision makers, no gatekeepers.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="text-studio-blue mt-1" size={20} />
            <div>
              <p className="font-medium">Direct Line</p>
              <p className="text-gray-400">+63 917 123 4567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-studio-blue mt-1" size={20} />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-400">business@w9studio.net</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-studio-blue mt-1" size={20} />
            <div>
              <p className="font-medium">Studio Location</p>
              <p className="text-gray-400">Makati CBD, Metro Manila</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-studio-blue mt-1" size={20} />
            <div>
              <p className="font-medium">Business Hours</p>
              <p className="text-gray-400">Mon-Fri: 9AM-7PM</p>
              <p className="text-gray-400">Sat: 10AM-5PM</p>
            </div>
          </div>
        </div>

        {/* Response Time Promise */}
        <div className="bg-studio-blue/10 border border-studio-blue p-6">
          <p className="text-studio-blue font-bold mb-2">Our Promise</p>
          <p className="text-sm text-gray-300">
            2-4 hour response time during business hours. 
            Detailed proposal within 24 hours. 
            No project too big or too small.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
                placeholder="juan@agency.com"
              />
            </div>
          </div>

          {/* Company/Agency */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company/Agency *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
              placeholder="GIGIL, TBWA, Leo Burnett, etc."
            />
          </div>

          {/* Service Selection */}
          <div>
            <label htmlFor="services" className="block text-sm font-medium mb-2">
              Services Interested In *
            </label>
            <select
              id="services"
              name="services"
              required
              value={formData.services}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
            >
              <option value="">Select a service</option>
              <option value="tv-commercial">TV Commercial Production</option>
              <option value="corporate-video">Corporate Video</option>
              <option value="digital-content">Digital/Social Content</option>
              <option value="post-production">Post-Production Only</option>
              <option value="studio-rental">Studio/Equipment Rental</option>
              <option value="retainer">Monthly Retainer Partnership</option>
              <option value="multiple">Multiple Services</option>
            </select>
          </div>

          {/* Timeline and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                Project Timeline *
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
              >
                <option value="">Select timeline</option>
                <option value="urgent">Urgent (2-4 weeks)</option>
                <option value="standard">Standard (1-3 months)</option>
                <option value="planning">Planning (3+ months)</option>
                <option value="ongoing">Ongoing/Retainer</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget Range *
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors"
              >
                <option value="">Select budget range</option>
                <option value="150-500">₱150,000 - 500,000</option>
                <option value="500-1500">₱500,000 - 1,500,000</option>
                <option value="1500+">₱1,500,000+</option>
                <option value="retainer">Monthly Retainer</option>
                <option value="discuss">Prefer to Discuss</option>
              </select>
            </div>
          </div>

          {/* Project Brief */}
          <div>
            <label htmlFor="brief" className="block text-sm font-medium mb-2">
              Project Brief (Optional)
            </label>
            <textarea
              id="brief"
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-studio-gray border border-studio-gray focus:border-studio-blue focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project. What's the brand? What's the objective? Any specific requirements or creative direction?"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              * Required fields. We never share your information.
            </p>
            
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={`px-8 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
                isSubmitting || submitStatus === 'success'
                  ? 'bg-studio-gray text-gray-500 cursor-not-allowed'
                  : 'bg-studio-blue text-white hover:bg-opacity-90 hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="loader w-4 h-4"></div>
                  Sending...
                </>
              ) : submitStatus === 'success' ? (
                <>✓ Sent Successfully</>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="bg-green-900/20 border border-green-500 p-4 text-green-400">
              Thank you! We'll respond within 2-4 hours during business hours.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
