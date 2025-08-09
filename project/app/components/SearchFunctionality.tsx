import { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  author: string;
  date: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: 1,
    title: "Die richtige Ernährung für Katzen",
    excerpt: "Alles über optimale Katzenernährung...",
    category: "Ernährung",
    slug: "katzen-ernaehrung-guide",
    author: "Dr. Sarah Müller",
    date: "15. Januar 2024"
  },
  {
    id: 2,
    title: "Hundeerziehung leicht gemacht",
    excerpt: "Positive Verstärkung und Trainingsmethoden...",
    category: "Training",
    slug: "hundeerziehung-trainingsmethoden",
    author: "Dr. Max Weber",
    date: "12. Januar 2024"
  },
  {
    id: 3,
    title: "Kaninchenhaltung für Anfänger",
    excerpt: "Der komplette Ratgeber für Kaninchen-Neulinge...",
    category: "Haltung",
    slug: "kaninchenhaltung-anfaenger",
    author: "Lisa Schmidt",
    date: "10. Januar 2024"
  }
];

interface SearchFunctionalityProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
}

export default function SearchFunctionality({ 
  searchQuery, 
  setSearchQuery, 
  onSearch 
}: SearchFunctionalityProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const categories = ['Alle', 'Ernährung', 'Training', 'Haltung', 'Pflege'];

  useEffect(() => {
    // Admin-Zugriff über Suchfeld
    if (searchQuery.toLowerCase() === '/admin') {
      window.location.href = '/admin';
      return;
    }
    
    if (searchQuery.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
        setIsSearchOpen(true);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // Admin-Zugriff über Suchfeld
    if (searchQuery.toLowerCase() === '/admin') {
      window.location.href = '/admin';
      return;
    }
    
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="flex items-center bg-white/95 backdrop-blur-md border border-white/30 rounded-full shadow-lg overflow-hidden">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Suche nach Artikeln..."
          className="flex-1 pl-11 pr-2 py-2.5 sm:py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
        />
        <div className="flex items-center space-x-1">
          {searchQuery && ( 
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
            >
              <X size={16} />
            </motion.button>
          )}
          <motion.button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Suchen
          </motion.button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-orange-200 z-50 max-h-80 sm:max-h-96 overflow-y-auto"
          >
            {/* Category Filter */}
            <div className="p-3 sm:p-4 border-b border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Filter size={16} className="text-orange-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Kategorie:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2 py-1 sm:px-3 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="p-2 sm:p-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                  <span className="ml-2 text-sm text-gray-600">Suche läuft...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1.5 sm:space-y-2">
                  {searchResults
                    .filter(result => selectedCategory === 'Alle' || result.category === selectedCategory)
                    .map((result) => (
                    <motion.a
                      key={result.id}
                      href={`/blog/${result.slug}`}
                      className="block p-2 sm:p-3 rounded-lg hover:bg-orange-50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{result.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{result.excerpt}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                              {result.category}
                            </span>
                            <span>{result.author}</span>
                            <span>{result.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : searchQuery.length > 2 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Search size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Keine Ergebnisse für "{searchQuery}" gefunden</p>
                  <p className="text-sm mt-1">Versuche andere Suchbegriffe</p>
                </div>
              ) : null}
            </div>

            {/* Quick Actions */}
            {searchQuery.length > 2 && (
              <div className="border-t border-orange-100 p-2 sm:p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    {searchResults.length} Ergebnis{searchResults.length !== 1 ? 'se' : ''} gefunden
                  </span>
                  <button
                    onClick={handleSearch}
                    className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm"
                  >
                    Alle Ergebnisse anzeigen →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}