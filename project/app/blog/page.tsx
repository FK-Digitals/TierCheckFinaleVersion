'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Heart, MessageCircle, ArrowLeft, Search, Share2 } from 'lucide-react';
import { getBlogPosts, type BlogPost } from '../lib/blogData';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Alle', icon: '🏠', color: 'from-orange-600 to-red-600' },
  { name: 'Katzen', icon: '🐱', color: 'from-purple-600 to-pink-600' },
  { name: 'Hunde', icon: '🐕', color: 'from-blue-600 to-indigo-600' },
  { name: 'Vögel', icon: '🐦', color: 'from-green-600 to-emerald-600' },
  { name: 'Kleintiere', icon: '🐹', color: 'from-yellow-600 to-orange-600' },
  { name: 'Ratgeber', icon: '📚', color: 'from-teal-600 to-cyan-600' }
];

export default function BlogPage() {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const posts = getBlogPosts().filter(post => post.status === 'published');
    setAllBlogPosts(posts);
  }, []);

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Alle' || 
      (selectedCategory === 'Katzen' && (post.category === 'Ernährung' || post.category === 'Ratgeber') && post.title.toLowerCase().includes('katze')) ||
      (selectedCategory === 'Hunde' && post.category === 'Training' && post.title.toLowerCase().includes('hund')) ||
      (selectedCategory === 'Vögel' && (post.category === 'Pflege' || post.category === 'Training') && (post.title.toLowerCase().includes('vogel') || post.title.toLowerCase().includes('wellensittich'))) ||
      (selectedCategory === 'Kleintiere' && (post.category === 'Haltung' || post.category === 'Ernährung') && (post.title.toLowerCase().includes('kaninchen') || post.title.toLowerCase().includes('hamster'))) ||
      (selectedCategory === 'Ratgeber' && post.category === 'Ratgeber');
    
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-12 md:py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-900 transition-colors cursor-pointer z-20 relative text-sm md:text-base"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft size={16} className="md:w-5 md:h-5" />
                <span>Zurück zur Startseite</span>
              </motion.button>
            </Link>
            
            <div className="flex items-center space-x-2 self-end md:self-auto">
              <img 
                src="/image copy copy.png" 
                alt="Tier-Check Logo" 
                className="h-6 w-auto md:h-8"
              />
              <span className="text-lg md:text-xl font-bold text-orange-800">Tier-Check</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10"
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-orange-900 mb-2 sm:mb-3 md:mb-4">
              Alle Blog-Artikel
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-orange-800 max-w-3xl mx-auto px-4">
              Entdecke alle unsere Artikel rund um Haustiere, Pflege und Erziehung
            </p>
          </motion.div>
          
          <div className="text-center mt-4 md:mt-6 relative z-10">
            <p className="text-xs sm:text-sm md:text-lg text-orange-700">📚 {filteredPosts.length} Artikel gefunden</p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 md:mt-8 px-4"
          >
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-orange-600" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Artikel durchsuchen..."
                className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 sm:py-3 md:py-4 bg-white/95 backdrop-blur-sm border border-orange-300 rounded-xl text-orange-800 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-lg text-sm md:text-base"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-900 text-center mb-3 sm:mb-4 md:mb-6">🏷️ Nach Tierart filtern</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-1 md:space-x-2 px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white transform scale-105`
                  : 'bg-white/90 text-orange-800 hover:bg-white border border-orange-300 hover:border-orange-400'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs sm:text-sm md:text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-16"
          >
            <div className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 md:mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 mb-2">Keine Artikel gefunden</h3>
            <p className="text-sm sm:text-base text-orange-700 mb-4 md:mb-6 px-4">
              {searchQuery ? `Keine Ergebnisse für "${searchQuery}"` : `Keine Artikel in der Kategorie "${selectedCategory}"`}
            </p>
            <motion.button
              onClick={() => {
                setSelectedCategory('Alle');
                setSearchQuery('');
              }}
              className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
            >
              Alle Artikel anzeigen
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-orange-200 hover:border-orange-300"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Image */}
                <div className="relative overflow-hidden h-40 md:h-48">
                  <motion.img
                    src={post.image}
                    alt={`${post.title} - ${post.category} Ratgeber`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-2 md:top-4 left-2 md:left-4">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                      {post.category}
                    </div>
                  </div>

                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/60 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur-sm shadow-lg">
                    {post.readTime}
                  </div>

                  {/* Hover overlay with read more */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-orange-800 font-semibold text-xs md:text-sm shadow-lg">
                      Artikel lesen →
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center space-x-2 md:space-x-3 text-xs sm:text-sm text-orange-600">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={10} className="md:w-3 md:h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base md:text-xl font-bold text-orange-900 mb-2 md:mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-orange-700 mb-3 md:mb-4 line-clamp-3 text-xs md:text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-orange-100">
                    <div className="flex items-center space-x-2 md:space-x-3 text-xs text-orange-600">
                      <div className="flex items-center space-x-1">
                        <Heart size={10} className="md:w-3 md:h-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={10} className="md:w-3 md:h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    
                    <div className="text-orange-600 font-semibold text-xs sm:text-sm group-hover:text-orange-700 transition-colors">
                      Weiterlesen →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}