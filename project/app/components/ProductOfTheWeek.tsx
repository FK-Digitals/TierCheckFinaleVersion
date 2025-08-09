'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, ShoppingCart, ExternalLink, Crown, Sparkles } from 'lucide-react';
import { getHomepageSettings, type HomepageSettings } from '../lib/homepageSettings';

export default function ProductOfTheWeek() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings | null>(null);

  useEffect(() => {
    const settings = getHomepageSettings();
    setHomepageSettings(settings);
  }, []);

  // Use settings from homepage settings or fallback to defaults
  const featuredProduct = homepageSettings?.productOfTheWeek || {
    title: "Premium Katzenfutter - Naturbelassen & Getreidefrei",
    description: "Das beste Nassfutter für deine Katze! Ohne künstliche Zusatzstoffe, mit 95% Fleischanteil und allen wichtigen Nährstoffen. Von Tierärzten empfohlen.",
    price: "24,99€",
    originalPrice: "34,99€",
    discount: "29%",
    image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 1247,
    features: ["95% Fleischanteil", "Getreidefrei", "Ohne Zusatzstoffe", "Tierarzt empfohlen"],
    url: "https://example.com/product-of-the-week"
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-orange-100 to-amber-100 -mt-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl blur-xl opacity-30"></div>
          
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-orange-200">
            {/* Header Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Crown size={18} />
                <span className="font-bold text-sm">PRODUKT DER WOCHE</span>
                <Sparkles size={16} />
              </motion.div>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 right-4 z-10 md:block hidden">
              <motion.div
                className="bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                -{featuredProduct.discount} RABATT
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <motion.div
                className="relative mt-8 md:mt-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={featuredProduct.image}
                    alt={`${featuredProduct.title} - Produkt der Woche bei Tier-Check`}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Mobile Discount Badge - Below Image */}
                <div className="md:hidden mt-3 text-right">
                  <motion.div
                    className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg inline-block"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    -{featuredProduct.discount} RABATT
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-6 mt-8 md:mt-0">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-orange-900 mb-3">
                    {featuredProduct.title}
                  </h3>
                  
                  <p className="text-orange-800 leading-relaxed mb-4">
                    {featuredProduct.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {featuredProduct.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 text-xs sm:text-sm text-green-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(featuredProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {featuredProduct.rating} ({featuredProduct.reviews} Bewertungen)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">
                      {featuredProduct.price}
                    </span>
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      {featuredProduct.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Du sparst {(parseFloat(featuredProduct.originalPrice.replace('€', '')) - parseFloat(featuredProduct.price.replace('€', ''))).toFixed(2)}€
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(featuredProduct.url, '_blank')}
                  >
                    <ShoppingCart size={20} />
                    <span>Jetzt kaufen & sparen</span>
                    <ExternalLink size={18} />
                  </motion.button>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-4">
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <span>✓ Kostenloser Versand</span>
                      <span>✓ 30 Tage Rückgabe</span>
                      <span>✓ Sichere Zahlung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Affiliate Disclaimer */}
            <div className="bg-orange-50 border-t border-orange-200 px-8 py-4">
              <p className="text-xs text-gray-600 text-center">
                <strong>Transparenz:</strong> Dies ist ein Affiliate-Link. Wenn du über diesen Link kaufst, 
                erhalten wir eine kleine Provision, ohne dass dir zusätzliche Kosten entstehen. 
                Wir empfehlen nur Produkte, von denen wir überzeugt sind.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}