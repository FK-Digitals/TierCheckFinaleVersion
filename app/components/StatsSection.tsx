'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Heart, MessageCircle, Award } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: 6,
    label: 'Artikel-Kategorien',
    suffix: '',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    value: 8,
    label: 'Tierarten abgedeckt',
    suffix: '',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Heart,
    value: 100,
    label: 'Kostenlos verfügbar',
    suffix: '%',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: MessageCircle,
    value: 0,
    label: 'Werbung & Tracking',
    suffix: '%',
    color: 'from-green-500 to-emerald-500'
  }
];

function StatCard({ stat, index, isInView }: {
  stat: {
    icon: any;
    value: number;
    label: string;
    suffix: string;
    color: string;
  };
  index: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setCount(stat.value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, index * 200);

      return () => clearTimeout(timer);
    }
  }, [isInView, stat.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-white/95 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-200 group-hover:border-orange-300">
        <div className="text-center">
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="text-white" size={28} />
          </motion.div>

          <motion.div
            className="text-4xl md:text-5xl font-bold text-orange-900 mb-2"
            key={count}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {count.toLocaleString()}{stat.suffix}
          </motion.div>

          <p className="text-orange-800 font-medium text-lg">
            {stat.label}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
        </div>
        <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 bg-gradient-to-b from-orange-100 to-amber-100 -mt-1">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">
            Unsere{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Blog-Community
            </span>
          </h2>
          <p className="text-xl text-orange-800 max-w-3xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
            Eine wachsende Community von Haustierliebhabern liest täglich unsere Artikel
          </p>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}