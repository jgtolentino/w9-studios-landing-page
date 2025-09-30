'use client'

import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-studio-darker border-t border-studio-gray">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-studio-blue flex items-center justify-center font-bold text-white">
                W9
              </div>
              <span className="text-xl font-bold">STUDIOS</span>
            </div>
            <p className="text-sm text-gray-400">
              Premium commercial production for advertising agencies. 
              Cinematic excellence meets strategic creative execution.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-studio-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-studio-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-studio-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-studio-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#showreel" className="text-gray-400 hover:text-studio-blue transition-colors">
                  Showreel
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-studio-blue transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-studio-blue transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-studio-blue transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-studio-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">TV Commercial Production</li>
              <li className="text-gray-400">Corporate Videos</li>
              <li className="text-gray-400">Digital Content</li>
              <li className="text-gray-400">Food Cinematography</li>
              <li className="text-gray-400">Virtual Production</li>
              <li className="text-gray-400">Post-Production</li>
              <li className="text-gray-400">Equipment Rental</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone size={16} className="mt-0.5 text-studio-blue" />
                <div>
                  <p>+63 917 123 4567</p>
                  <p className="text-xs">Direct Producer Line</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail size={16} className="mt-0.5 text-studio-blue" />
                <div>
                  <p>hello@w9studios.ph</p>
                  <p className="text-xs">2-4 hour response time</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="mt-0.5 text-studio-blue" />
                <div>
                  <p>Makati CBD</p>
                  <p className="text-xs">Metro Manila, Philippines</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Awards & Certifications */}
      <div className="border-t border-studio-gray">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span>Member: Ad Congress Philippines</span>
              <span>•</span>
              <span>Netflix Approved Vendor</span>
              <span>•</span>
              <span>Dolby Atmos Certified</span>
            </div>
            <div className="flex items-center gap-4 opacity-30">
              {/* Award badges placeholders */}
              <div className="w-16 h-8 bg-studio-gray rounded"></div>
              <div className="w-16 h-8 bg-studio-gray rounded"></div>
              <div className="w-16 h-8 bg-studio-gray rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-studio-gray">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {currentYear} W9 Studios. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-studio-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-studio-blue transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-studio-blue transition-colors">
                Equipment List
              </a>
              <a href="#" className="hover:text-studio-blue transition-colors">
                Rate Card
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
