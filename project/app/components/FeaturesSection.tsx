'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Heart, 
  Sparkles,
  Bot,
  Camera,
  MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: "Expertenwissen",
    description: "Fundierte Artikel von Tierärzten, Verhaltensexperten und erfahrenen Haustierbesitzern mit praktischen Tipps.",
    color: "from-slate-600 to-gray-700",
  },
  {
    icon: Sparkles,
    title: "Regelmäßige neue Artikel",
    description: "Wöchentlich neue Blog-Artikel und Ratgeber rund um das Leben mit Haustieren.",
    color: "from-amber-600 to-orange-600",
  },
  {
    icon: Brain,
    title: "Wissenschaftlich fundiert",
    description: "Alle Artikel basieren auf aktuellen wissenschaftlichen Erkenntnissen und bewährten Praktiken.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Heart,
    title: "Verschiedene Tierarten",
    description: "Von Hunden und Katzen bis zu Vögeln und Reptilien - für jeden Tierliebhaber ist etwas dabei.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Praktische Ratgeber",
    description: "Hilfreiche Anleitungen und Tipps für die tägliche Pflege, Erziehung und Gesundheit deiner Tiere.",
    color: "from-teal-600 to-cyan-600",
  },
  {
    icon: Shield,
    title: "Kostenlos & Werbefrei",
    description: "Alle Inhalte sind komplett kostenlos und ohne störende Werbung für ein optimales Leseerlebnis.",
    color: "from-gray-600 to-slate-700",
  }
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-orange-100 to-amber-100 -mt-1">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">📖</span>
            <span className="text-orange-800 font-semibold">Blog Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
            Warum
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent ml-3">
              TierCheck?
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
            Eine wachsende Plattform für Haustierliebhaber mit fundierten Ratgebern 
            und praktischen Tipps für den Alltag mit Tieren.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <motion.div
                  className="bg-white/95 rounded-xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-200"
                  whileHover={{ 
                    y: -10,
                    scale: 1.01
                  }}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                    <Icon className="text-white" size={20} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-orange-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-orange-800 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/blog">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              📚 Alle Artikel entdecken
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}