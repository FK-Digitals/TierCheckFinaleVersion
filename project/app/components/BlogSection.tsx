'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Heart, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { getBlogPosts, type BlogPost, getAnimalTypes } from '../lib/blogData';

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [animalTypes, setAnimalTypes] = useState<any[]>([]);

  useEffect(() => {
    const posts = getBlogPosts().filter(post => post.status === 'published');
    setBlogPosts(posts);
    const types = getAnimalTypes();
    setAnimalTypes(types);
  }, []);

  const categories = ['Alle', ...animalTypes.map(type => type.name)];

  const filteredPosts = blogPosts.filter(post => {
    if (selectedCategory === 'Alle') return true;
    
    // Check if post matches selected animal type
    const selectedAnimalType = animalTypes.find(type => type.name === selectedCategory);
    if (selectedAnimalType) {
      return post.animalType === selectedAnimalType.name ||
             post.title.toLowerCase().includes(selectedAnimalType.name.toLowerCase().slice(0, -1)) ||
             post.excerpt.toLowerCase().includes(selectedAnimalType.name.toLowerCase().slice(0, -1));
    }
    
    return false;
  }).slice(0, 4);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-amber-100 to-orange-100 -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">📝</span>
            <span className="text-orange-800 font-semibold">TierCheck Stories</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
            Unsere neuesten
            <motion.span
              className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent ml-3"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Blog-Artikel
            </motion.span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
            Entdecke spannende Artikel, hilfreiche Ratgeber und inspirierende Geschichten 
            rund um das Leben mit Haustieren.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white/80 text-orange-800 hover:bg-white/95 border border-orange-300'
              }`}
              whileHover={{ scale: selectedCategory === category ? 1.05 : 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Show icon for animal types */}
              {index > 0 && animalTypes.find(type => type.name === category) && (
                <span className="mr-2">
                  {animalTypes.find(type => type.name === category)?.icon}
                </span>
              )}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-200"
              whileHover={{ y: -10 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={`${post.title} - ${post.category} Ratgeber für Haustiere`}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <motion.div
                  className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {post.category}
                </motion.div>

                {/* Read Time */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-orange-700 mb-3">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-orange-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-orange-800 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-orange-700">
                    <motion.button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/blog/${post.slug}`;
                        if (navigator.share) {
                          navigator.share({
                            title: post.title,
                            text: post.excerpt,
                            url: shareUrl,
                          }).catch(console.error);
                        } else {
                          // Fallback: copy link to clipboard
                          navigator.clipboard.writeText(shareUrl)
                            .then(() => alert('Link kopiert!'))
                            .catch(() => alert('Fehler beim Kopieren des Links'));
                        }
                      }}
                      className="flex items-center space-x-1 hover:text-green-500 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 size={16} />
                      <span>Teilen</span>
                    </motion.button>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 text-orange-700 font-semibold hover:text-orange-800 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="flex items-center space-x-2">
                      <span>Weiterlesen</span>
                      <ArrowRight size={16} />
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Alle Artikel ansehen
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}