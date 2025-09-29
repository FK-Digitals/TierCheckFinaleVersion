'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Sparkles
} from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'Über uns', href: '#' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'FAQ', href: '#' }
  ],
  legal: [
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
    { name: 'Impressum', href: '/impressum' },
    { name: 'Cookies', href: '/cookies' }
  ]
};

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
  { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
  { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
  { icon: Youtube, href: '#', color: 'hover:text-red-500' }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-orange-200 to-amber-200 text-orange-900 relative overflow-hidden -mt-1">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    className="text-4xl"
                    animate={{ 
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🐱
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Tier-Check
                  </h3>
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="text-yellow-400" size={20} />
                  </motion.div>
                </div>
                
                <p className="text-sm sm:text-base text-orange-800 mb-4 sm:mb-6 leading-relaxed">
                  Die ultimative Plattform für Haustierliebhaber. Wir verbinden 
                  modernste KI-Technologie mit der Liebe zu Tieren, um dir und 
                  deinem pelzigen Freund das beste Leben zu ermöglichen.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm sm:text-base text-orange-700">
                    <Mail size={16} />
                    <span>Tier-Check@outlook.de</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm sm:text-base text-orange-700">
                    <MapPin size={16} />
                    <span>Leverkusen, Deutschland</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 capitalize text-orange-900">
                  {category === 'company' ? 'Unternehmen' : 'Rechtliches'}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-sm sm:text-base text-orange-800 hover:text-orange-900 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-orange-800 text-center sm:text-left"
              >
                <span>© 2024 TierBloq. Alle Rechte vorbehalten.</span>
                <div className="flex items-center space-x-1">
                  <Heart className="text-red-400" size={14} />
                  <span>Made with love for pets</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <span className="text-xs sm:text-sm text-orange-800 mr-2">Folge uns:</span>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`text-orange-700 ${social.color} transition-colors duration-200`}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}