'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Star, Sparkles, Heart, Zap, ArrowDown } from 'lucide-react';
import SearchFunctionality from './SearchFunctionality';
import { getHomepageSettings, type HomepageSettings } from '../lib/homepageSettings';

export default function ParallaxHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load settings on client side after hydration
    const settings = getHomepageSettings();
    console.log('Loading homepage settings in useEffect:', settings);
    setHomepageSettings(settings);

    // Listen for custom events from the admin panel
    const handleSettingsUpdate = () => {
      console.log('Homepage settings updated, refreshing...');
      const updatedSettings = getHomepageSettings();
      setHomepageSettings(updatedSettings);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('homepageSettingsUpdated', handleSettingsUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('homepageSettingsUpdated', handleSettingsUpdate);
      }
    };
  }, []);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading state until settings are loaded
  if (!homepageSettings) {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto"></div>
          </div>
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Tier-Check
          </motion.h1>
          <p className="text-white/80">Lädt...</p>
        </div>
      </div>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Determine which background image to use
  const backgroundImage = isMobile && homepageSettings.heroBackgroundMobile 
    ? homepageSettings.heroBackgroundMobile 
    : homepageSettings.heroBackground;

  const popularTopics = [
    { name: 'Katzenpflege', href: '/blog/katzen-ernaehrung-guide' },
    { name: 'Hundeerziehung', href: '/blog/hundeerziehung-trainingsmethoden' },
    { name: 'Kaninchenhaltung', href: '/blog/kaninchenhaltung-anfaenger' },
    { name: 'Vogelpflege', href: '/blog/vogelpflege-winter' },
    { name: 'Kleintiere', href: '/blog/hamster-gesunde-ernaehrung' },
    { name: 'Vogeltraining', href: '/blog/wellensittich-training-sprechen' }
  ];

  return (
    <div className="relative h-screen sm:h-[80vh] md:h-[85vh] lg:h-screen overflow-hidden w-full min-w-full">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: isMobile ? 1.15 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: isMobile ? 15 : 20, ease: "easeOut" }}
      >
        {/* Overlay with responsive opacity */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/60 z-10 w-full min-w-full" />
        
        {/* Background Image */}
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-bottom min-w-full"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
          role="img"
          aria-label="Tier-Check Hero Hintergrundbild mit Haustieren"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-start h-full text-center px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-0 lg:justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Heading */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            {homepageSettings.heroTitle}
          </span>
          <br />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light">
            {homepageSettings.heroSubtitle}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 leading-relaxed drop-shadow-lg px-2 sm:px-4 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Entdecke fundierte Artikel, praktische Tipps und inspirierende Geschichten 
          rund um die Welt der Haustiere. Von Ernährung bis Erziehung – alles für das 
          Wohlbefinden deiner tierischen Begleiter.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="w-full max-w-2xl mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-0"
        >
          <SearchFunctionality 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch} 
          />
        </motion.div>

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 lg:px-8"
        >
          <p className="text-white/80 mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg">Beliebte Themen:</p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
            {popularTopics.map((topic, index) => (
              <Link key={index} href={topic.href}>
                <motion.button
                  className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-gray-800 hover:bg-white/95 hover:text-gray-900 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {topic.name}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-4 sm:mb-6 md:mb-8 text-white px-2 sm:px-4 lg:px-8"
        >
          <motion.div 
            className="flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Star className="text-yellow-600" size={12} />
            <span className="text-xs font-medium text-gray-800">Expertenwissen</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Sparkles className="text-orange-500" size={12} />
            <span className="text-xs font-medium text-gray-800">Neue Artikel</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Heart className="text-red-500" size={12} />
            <span className="text-xs font-medium text-gray-800">Kostenlos</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <Zap className="text-amber-600" size={12} />
            <span className="text-xs font-medium text-gray-800">Fundiert</span>
          </motion.div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4 lg:px-8"
        >
          <Link href="/blog">
            <motion.button
              className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 text-sm sm:text-base"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Alle Artikel lesen
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white drop-shadow-lg"
          >
            <span className="text-xs sm:text-sm mb-2">Mehr entdecken</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}