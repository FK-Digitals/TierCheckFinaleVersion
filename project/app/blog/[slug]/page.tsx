'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  Calendar, 
  User, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Star,
  ShoppingCart,
  ExternalLink,
  Info,
  Target,
  Home,
  Shield,
  DollarSign,
  Loader,
  Copy,
  X
} from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from '../../lib/blogData';
import { AnimatePresence } from 'framer-motion';

// Enhanced content processing for the cat buying guide
const processContent = (content: string) => {
  if (!content || typeof content !== 'string') return '';
  
  // Split content into lines for better processing
  const lines = content.split('\n');
  let processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip empty lines but preserve them
    if (!line.trim()) {
      processedLines.push('<br>');
      continue;
    }
    
    // Process headers
    if (line.startsWith('# ')) {
      processedLines.push(`<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-900 mb-4 sm:mb-6 mt-6 sm:mt-8">${line.substring(2)}</h1>`);
    } else if (line.startsWith('## ')) {
      processedLines.push(`<h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-orange-800 mb-3 sm:mb-4 mt-4 sm:mt-6">${line.substring(3)}</h2>`);
    } else if (line.startsWith('### ')) {
      processedLines.push(`<h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-orange-700 mb-2 sm:mb-3 mt-3 sm:mt-4">${line.substring(4)}</h3>`);
    } else if (line.startsWith('- ')) {
      // List items
      const listContent = line.substring(2);
      processedLines.push(`<li class="mb-2 text-orange-800 flex items-start space-x-2"><span class="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span><span>${listContent}</span></li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      // Numbered list items
      const match = line.match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        const [, number, content] = match;
        processedLines.push(`<li class="mb-2 text-orange-800 flex items-start space-x-2"><span class="w-6 h-6 bg-orange-600 text-white rounded-full text-xs flex items-center justify-center mt-1 flex-shrink-0 font-bold">${number}</span><span>${content}</span></li>`);
      }
    } else {
      // Regular paragraph
      processedLines.push(`<p class="mb-4 text-orange-800">${line}</p>`);
    }
  }
  
  let processedContent = processedLines.join('');
  
  // Process shortcodes and formatting
  processedContent = processedContent
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-orange-900">$1</strong>')
    .replace(/\[TIPP\](.*?)(?=\[|$)/gs, '<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4"><div class="flex items-center space-x-2 mb-2"><span class="text-blue-600">💡</span><strong class="text-blue-800">Tipp:</strong></div><p class="text-blue-700">$1</p></div>')
    .replace(/\[WICHTIG\](.*?)(?=\[|$)/gs, '<div class="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4"><div class="flex items-center space-x-2 mb-2"><span class="text-orange-600">⚠️</span><strong class="text-orange-800">Wichtig:</strong></div><p class="text-orange-700">$1</p></div>')
    .replace(/\[WARNUNG\](.*?)(?=\[|$)/gs, '<div class="bg-red-50 border border-red-200 rounded-lg p-4 my-4"><div class="flex items-center space-x-2 mb-2"><span class="text-red-600">🚨</span><strong class="text-red-800">Warnung:</strong></div><p class="text-red-700">$1</p></div>')
    .replace(/\[ANIMATION\](.*?)(?=\[|$)/gs, '<span class="inline-block animate-pulse hover:animate-bounce hover:text-purple-600 transition-all duration-300 cursor-pointer font-medium bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md">✨ $1</span>')
    .replace(/\[HIGHLIGHT\](.*?)(?=\[|$)/gs, '<span class="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold text-gray-900 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg">💎 $1</span>')
    .replace(/\[FOCUS\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold text-pink-600 hover:text-pink-800 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-lg border border-pink-200 hover:border-pink-400">🎯 $1</span>')
    .replace(/\[FLASH\](.*?)(?=\[|$)/gs, '<span class="inline-block font-semibold text-cyan-700 hover:text-white hover:bg-cyan-600 transition-all duration-200 cursor-pointer px-2 py-1 rounded border border-cyan-300 hover:border-cyan-600 hover:shadow-lg hover:animate-pulse">⚡ $1</span>')
    .replace(/\[GLOW\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer">🌟 $1</span>')
    .replace(/\[GRADIENT\](.*?)(?=\[|$)/gs, '<span class="inline-block font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-red-500 transition-all duration-500 cursor-pointer hover:scale-105">🎨 $1</span>');
  
  return processedContent;
};

// Info Box Component
function InfoBox({ type, title, children, icon: Icon }: {
  type: 'tip' | 'warning' | 'info' | 'success';
  title: string;
  children: React.ReactNode;
  icon: any;
}) {
  const styles = {
    tip: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-purple-50 border-purple-200 text-purple-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  const iconStyles = {
    tip: 'text-blue-600',
    warning: 'text-yellow-600',
    info: 'text-purple-600',
    success: 'text-green-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-4 p-4 rounded-r-lg ${styles[type]} my-6`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`${iconStyles[type]} mt-0.5`} size={20} />
        <div>
          <h4 className="font-semibold mb-2">{title}</h4>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Affiliate Product Component
function AffiliateProduct({ product, index }: { product: any; index: number }) {
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
  const getButtonClasses = () => {
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

  // Get animation props
  const getAnimationProps = () => {
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
        return {};
    }
  };

  // Get icon component
  const getButtonIcon = () => {
    const icon = product.buttonIcon || 'shopping-cart';
    const size = product.buttonSize === 'small' ? 14 : product.buttonSize === 'large' ? 20 : 16;
    
    switch (icon) {
      case 'shopping-cart': return <ShoppingCart size={size} />;
      case 'external-link': return <ExternalLink size={size} />;
      case 'heart': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>❤️</span>;
      case 'star': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>⭐</span>;
      case 'arrow-right': return <span className={product.buttonSize === 'small' ? 'text-sm' : product.buttonSize === 'large' ? 'text-lg' : 'text-base'}>➡️</span>;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={`${product.title} - Empfohlenes Produkt für Haustiere`}
          className="w-full h-48 object-cover"
        />
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            ANGEBOT
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2">{product.title}</h4>
        <div 
          className="text-gray-600 text-sm mb-3"
          dangerouslySetInnerHTML={{ 
            __html: processProductDescription(product.description)
          }}
        />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <motion.button
          className={`w-full ${getButtonClasses()}`}
          {...getAnimationProps()}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(product.url, '_blank')}
        >
          {getButtonIcon()}
          <span>{product.buttonText || 'Jetzt kaufen'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [canUseNativeShare, setCanUseNativeShare] = useState(false);

  // Check if native share is supported
  useEffect(() => {
   if (typeof window !== 'undefined' && typeof navigator.share === 'function') {
      setCanUseNativeShare(true);
    }
  }, []);

  // Share functions
  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleNativeShare = async () => {
    if (navigator.share && post) {
      try {
        const shareUrl = `${window.location.origin}${window.location.pathname}`;
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
        setShowShareModal(false);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}`;
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShowShareModal(false);
      }, 2000);
    } catch (error) {
      console.log('Error copying link:', error);
      // Fallback for older browsers
      const shareUrl = `${window.location.origin}${window.location.pathname}`;
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShowShareModal(false);
      }, 2000);
    }
  };

  const handleSocialShare = (platform: string) => {
    if (!post) return;

    const currentPageUrl = `${window.location.origin}${window.location.pathname}`;
    const url = encodeURIComponent(currentPageUrl);
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(post.excerpt);

    let socialShareUrl = '';

    switch (platform) {
      case 'whatsapp':
        socialShareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case 'twitter':
        socialShareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'facebook':
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'email':
        socialShareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
        break;
    }

    if (socialShareUrl) {
      window.open(socialShareUrl, '_blank', 'width=600,height=400');
      setShowShareModal(false);
    }
  };

  useEffect(() => {
    const fetchPost = () => {
      const allPosts = getBlogPosts();
      // Check if user is admin (logged in)
      const isAdmin = typeof window !== 'undefined' && localStorage.getItem('adminAuth') === 'true';
      
      let foundPost;
      if (isAdmin) {
        // Admin can see all posts (including drafts)
        foundPost = allPosts.find(post => post.slug === params.slug);
      } else {
        // Regular users only see published posts
        foundPost = allPosts.find(post => post.slug === params.slug && post.status === 'published');
      }
      
      setPost(foundPost || null);
      setIsLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-orange-600" size={48} />
          <p className="text-orange-800 text-lg">Artikel wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Artikel nicht gefunden</h1>
          <p className="text-orange-700 mb-6">
            Der gesuchte Artikel existiert nicht oder ist noch nicht veröffentlicht.
          </p>
          <Link href="/blog">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Zurück zu allen Artikeln
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Draft Warning */}
          {post.status === 'draft' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2 text-yellow-800">
                <span className="text-xl">⚠️</span>
                <span className="font-semibold">ENTWURF</span>
                <span>Dieser Artikel ist noch nicht veröffentlicht</span>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <Link href="/blog">
              <motion.button
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-900 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft size={20} />
                <span>Alle Artikel</span>
              </motion.button>
            </Link>
            
            <Link href="/">
              <div className="flex items-center space-x-2">
                <img 
                  src="/image copy copy.png" 
                  alt="Tier-Check Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-orange-800">Tier-Check</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl"
        >
          <img
            src={post.image}
            alt={`${post.title} - ${post.category} Ratgeber für Haustiere`}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 rounded-xl p-6 mb-8 shadow-lg border border-orange-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6 text-orange-700">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleShare}
                className="flex items-center space-x-2 text-orange-700 hover:text-green-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={20} />
                <span>Teilen</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Artikel teilen</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Native Share (if supported) */}
                  {canUseNativeShare && (
                    <motion.button
                      onClick={handleNativeShare}
                      className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="text-blue-600" size={20} />
                      <span className="text-blue-800 font-medium">Über System teilen</span>
                    </motion.button>
                  )}

                  {/* Copy Link */}
                  <motion.button
                    onClick={handleCopyLink}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Copy className="text-gray-600" size={20} />
                    <span className="text-gray-800 font-medium">
                      {linkCopied ? 'Link kopiert!' : 'Link kopieren'}
                    </span>
                    {linkCopied && <CheckCircle className="text-green-600" size={16} />}
                  </motion.button>

                  {/* Social Media Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => handleSocialShare('whatsapp')}
                      className="flex items-center justify-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-green-600 text-lg">📱</span>
                      <span className="text-green-800 font-medium">WhatsApp</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleSocialShare('twitter')}
                      className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-blue-600 text-lg">🐦</span>
                      <span className="text-blue-800 font-medium">Twitter</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleSocialShare('facebook')}
                      className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-blue-600 text-lg">📘</span>
                      <span className="text-blue-800 font-medium">Facebook</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleSocialShare('email')}
                      className="flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-gray-600 text-lg">📧</span>
                      <span className="text-gray-800 font-medium">E-Mail</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 rounded-xl p-8 mb-8 shadow-lg border border-orange-200 prose prose-lg max-w-none"
        >
          <div 
            className="text-orange-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />
        </motion.div>

        {/* Affiliate Products */}
        {post.affiliateProducts && post.affiliateProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 rounded-xl p-8 mb-8 shadow-lg border border-orange-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-orange-900 mb-2">
                🛍️ Empfohlene Produkte
              </h3>
              <p className="text-orange-700">
                Passende Produkte zu diesem Artikel - sorgfältig ausgewählt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.affiliateProducts.map((product: any, index: number) => (
                <AffiliateProduct key={index} product={product} index={index} />
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mt-6 border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                <strong>Transparenz:</strong> Die oben gezeigten Produkte enthalten Affiliate-Links. 
                Wenn du über diese Links einkaufst, erhalten wir eine kleine Provision, ohne dass dir zusätzliche Kosten entstehen.
                Wir empfehlen nur Produkte, von denen wir überzeugt sind.
              </p>
            </div>
          </motion.div>
        )}

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link href="/blog">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Weitere Artikel entdecken
            </motion.button>
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
