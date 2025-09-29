'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, ShoppingCart, ExternalLink, Award } from 'lucide-react';
import { getHomepageSettings, type AffiliateProduct } from '../lib/homepageSettings';
import { useState, useEffect } from 'react';

export default function AffiliateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [featuredProducts, setFeaturedProducts] = useState<AffiliateProduct[]>([]);

  useEffect(() => {
    const settings = getHomepageSettings();
    setFeaturedProducts(settings.affiliateProducts);
  }, []);

  // Process shortcodes in product description
  const processProductDescription = (description: string) => {
    if (!description) return '';
    
    return description
      .replace(/\[TIPP\](.*?)(?=\[|$)/gs, '<span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">💡 $1</span>')
      .replace(/\[WICHTIG\](.*?)(?=\[|$)/gs, '<span class="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">⚠️ $1</span>')
      .replace(/\[WARNUNG\](.*?)(?=\[|$)/gs, '<span class="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">🚨 $1</span>')
      .replace(/\[ANIMATION\](.*?)(?=\[|$)/gs, '<span class="inline-block animate-pulse hover:animate-bounce hover:text-purple-600 transition-all duration-300 cursor-pointer font-medium bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded-full text-xs">✨ $1</span>')
      .replace(/\[HIGHLIGHT\](.*?)(?=\[|$)/gs, '<span class="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded-full font-semibold text-gray-900 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 cursor-pointer hover:scale-105 text-xs">💎 $1</span>')
      .replace(/\[FOCUS\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold text-pink-600 hover:text-pink-800 hover:scale-110 transition-all duration-300 cursor-pointer bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-full text-xs">🎯 $1</span>')
      .replace(/\[FLASH\](.*?)(?=\[|$)/gs, '<span class="inline-block font-semibold text-cyan-700 hover:text-white hover:bg-cyan-600 transition-all duration-200 cursor-pointer px-2 py-1 rounded-full hover:animate-pulse text-xs">⚡ $1</span>')
      .replace(/\[GLOW\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer text-xs">🌟 $1</span>')
      .replace(/\[GRADIENT\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-red-500 transition-all duration-500 cursor-pointer hover:scale-105 text-xs">🎨 $1</span>');
  };

  // Get button styling based on product settings
  const getButtonClasses = (product: AffiliateProduct) => {
    const color = product.buttonColor || 'green';
    const style = product.buttonStyle || 'solid';
    const size = product.buttonSize || 'medium';
    
    let classes = 'flex items-center justify-center space-x-2 font-semibold rounded-lg shadow-lg transition-all duration-300 ';
    
    // Size classes
    if (size === 'small') {
      classes += 'px-3 py-2 text-sm ';
    } else if (size === 'large') {
      classes += 'px-6 py-4 text-lg ';
    } else {
      classes += 'px-4 py-3 text-base ';
    }
    
    // Style and color classes
    if (style === 'outline') {
      classes += 'border-2 bg-transparent ';
      switch (color) {
        case 'green': classes += 'border-green-600 text-green-600 hover:bg-green-50'; break;
        case 'blue': classes += 'border-blue-600 text-blue-600 hover:bg-blue-50'; break;
        case 'orange': classes += 'border-orange-600 text-orange-600 hover:bg-orange-50'; break;
        case 'red': classes += 'border-red-600 text-red-600 hover:bg-red-50'; break;
        case 'purple': classes += 'border-purple-600 text-purple-600 hover:bg-purple-50'; break;
        default: classes += 'border-gray-600 text-gray-600 hover:bg-gray-50'; break;
      }
    } else if (style === 'ghost') {
      classes += 'bg-transparent ';
      switch (color) {
        case 'green': classes += 'text-green-600 hover:bg-green-50'; break;
        case 'blue': classes += 'text-blue-600 hover:bg-blue-50'; break;
        case 'orange': classes += 'text-orange-600 hover:bg-orange-50'; break;
        case 'red': classes += 'text-red-600 hover:bg-red-50'; break;
        case 'purple': classes += 'text-purple-600 hover:bg-purple-50'; break;
        default: classes += 'text-gray-600 hover:bg-gray-50'; break;
      }
    } else {
      classes += 'text-white ';
      switch (color) {
        case 'green': classes += 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-500/25'; break;
        case 'blue': classes += 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/25'; break;
        case 'orange': classes += 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-orange-500/25'; break;
        case 'red': classes += 'bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-red-500/25'; break;
        case 'purple': classes += 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/25'; break;
        default: classes += 'bg-gradient-to-r from-gray-600 to-slate-600 hover:shadow-gray-500/25'; break;
      }
    }
    
    return classes;
  };

  // Get icon component
  const getButtonIcon = (product: AffiliateProduct) => {
    const icon = product.buttonIcon || 'shopping-cart';
    const size = product.buttonSize === 'small' ? 14 : product.buttonSize === 'large' ? 20 : 16;
    
    switch (icon) {
      case 'shopping-cart': return <ShoppingCart size={size} />;
      case 'external-link': return <ExternalLink size={size} />;
      case 'heart': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>❤️</span>;
      case 'star': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>⭐</span>;
      case 'arrow-right': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>➡️</span>;
      default: return <ShoppingCart size={size} />;
    }
  };

  // Get animation props
  const getAnimationProps = (product: AffiliateProduct) => {
    const animation = product.buttonAnimation || 'hover-scale';
    
    switch (animation) {
      case 'hover-scale':
        return { whileHover: { scale: 1.02 } };
      case 'hover-bounce':
        return { whileHover: { y: -2 } };
      case 'hover-pulse':
        return { 
          animate: { scale: [1, 1.02, 1] },
          transition: { duration: 2, repeat: Infinity }
        };
      case 'hover-glow':
        return { whileHover: { boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" } };
      default:
        return { whileHover: { scale: 1.02 } };
    }
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-amber-100 to-orange-100 -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="text-green-600" size={20} />
            <span className="text-orange-800 font-semibold">Empfohlene Produkte</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-4">
            Unsere
            <motion.span
              className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent ml-3"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Produktempfehlungen
            </motion.span>
          </h2>
          
          <p className="text-base sm:text-lg text-orange-800 max-w-2xl mx-auto">
            Sorgfältig ausgewählte Produkte, die wir selbst verwenden und empfehlen können.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className="bg-white/95 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-200 h-full flex flex-col"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    src={product.image}
                    alt={`${product.title} - ${product.category} für Haustiere`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-orange-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {product.title}
                  </h3>

                  <div 
                    className="text-orange-800 text-sm mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: processProductDescription(product.description)
                    }}
                  />

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    <motion.button
                      className={`w-full ${getButtonClasses(product)}`}
                      {...getAnimationProps(product)}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(product.url, '_blank')}
                    >
                      {getButtonIcon(product)}
                      <span>{product.buttonText || 'Kaufen'}</span>
                    </motion.button>
                  </div>
                </div>

                {/* Affiliate Disclaimer */}
                <div className="px-6 pb-4">
                  <p className="text-xs text-gray-500 text-center">
                    * Affiliate-Link - Wir erhalten eine kleine Provision
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 bg-white/80 rounded-xl p-6 border border-orange-200"
        >
          <p className="text-sm text-gray-600 mb-2">
            <strong>Transparenz:</strong> Die oben gezeigten Produkte enthalten Affiliate-Links. 
            Wenn du über diese Links einkaufst, erhalten wir eine kleine Provision, ohne dass dir zusätzliche Kosten entstehen.
          </p>
          <p className="text-xs text-gray-500">
            Wir empfehlen nur Produkte, von denen wir überzeugt sind und die wir selbst verwenden würden.
          </p>
        </motion.div>
      </div>
    </section>
  );
}