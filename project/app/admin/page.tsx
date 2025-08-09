'use client';

import AdminAuth from '../components/AdminAuth';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getBlogPosts, saveBlogPosts, staticBlogPosts, type BlogPost, type AffiliateProduct } from '../lib/blogData';
import { getAnimalTypes, saveAnimalTypes, type AnimalType } from '../lib/blogData';
import ImageUpload from '../components/ImageUpload';
import AIContentGenerator from '../components/AIContentGenerator';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  Upload,
  Image as ImageIcon,
  Calendar,
  User,
  Tag,
  FileText,
  Clock,
  LogOut,
  Home,
  ShoppingCart,
  Star,
  X,
  Sparkles,
  Wand2,
  Loader,
  ExternalLink,
  UserPlus,
  Shield,
  Users,
  Settings
} from 'lucide-react';

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminPageContent />
    </AdminAuth>
  );
}

function AdminPageContent() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'date' | 'likes' | 'comments'>>({
   title: '',
  excerpt: '',
  content: '',
  author: '',
  category: '',
  image: '',
  animalType: '',
  slug: '',
  status: 'draft', // ✅ typkorrekt
  readTime: '5 min',
  affiliateProducts: []
});
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);
  const [formData2, setFormData2] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Ernährung',
    image: '',
    status: 'draft' as 'draft' | 'published',
    readTime: '',
    slug: '',
    affiliateProducts: [] as AffiliateProduct[],
    animalType: ''
  });
  const [currentAffiliateProduct, setCurrentAffiliateProduct] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    rating: 0,
    url: '',
    buttonText: 'Jetzt kaufen',
    buttonColor: 'green',
    buttonStyle: 'solid',
    buttonSize: 'medium',
    buttonIcon: 'shopping-cart',
    buttonAnimation: 'hover-scale'
  });
  const [showAnimalManager, setShowAnimalManager] = useState(false);
  const [newAnimalType, setNewAnimalType] = useState({
    name: '',
    icon: '',
    color: 'from-blue-600 to-indigo-600'
  });
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserManager, setShowUserManager] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'Editor',
    name: ''
  });

  // Load posts on component mount
  useEffect(() => {
    const allPosts = getBlogPosts();
    setPosts(allPosts);
    const types = getAnimalTypes();
    setAnimalTypes(types);
    
    // Load current user
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing current user:', error);
      }
    }
    // Load users from localStorage
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
  }, []);

  const categories = ['Ernährung', 'Training', 'Haltung', 'Pflege', 'Gesundheit', 'Ratgeber'];

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.slug || generateSlug(formData.title);
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData, slug, date: new Date().toLocaleDateString('de-DE') }
          : post
      ));
      // Save to localStorage
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData, slug, date: new Date().toLocaleDateString('de-DE') }
          : post
      );
      saveBlogPosts(updatedPosts);
    } else {
  // Create new post
  const slug = formData.slug || formData.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);

  const newPost: BlogPost = {
    id: Date.now(),
    title: formData.title,
    excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
    content: formData.content,
    author: formData.author || 'Admin',
    category: formData.category || 'Allgemein',
    image: formData.image || 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=800',
    animalType: formData.animalType || '',
    slug: slug,
    date: new Date().toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    likes: 0,
    comments: 0,
    status: formData.status || 'draft',
    readTime: formData.readTime || '5 min',
    affiliateProducts: formData.affiliateProducts || []
  };

  const newPosts = [newPost, ...posts];
  setPosts(newPosts);
  saveBlogPosts(newPosts);
}


    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Ernährung',
      image: '',
      status: 'draft',
      readTime: '',
      slug: '',
      affiliateProducts: [],
      animalType: ''
    });
    setCurrentAffiliateProduct({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '',
      rating: 4.5,
      url: 'https://example.com',
      buttonText: 'Jetzt kaufen',
      buttonColor: 'green',
      buttonStyle: 'solid',
      buttonSize: 'medium',
      buttonIcon: 'shopping-cart',
      buttonAnimation: 'hover-scale'
    });
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      status: post.status,
      readTime: post.readTime || '',
      slug: post.slug || '',
      affiliateProducts: post.affiliateProducts || [],
      animalType: post.animalType || ''
    });
    setShowEditor(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bist du sicher, dass du diesen Artikel löschen möchtest?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      // Save all posts to localStorage (including modified static ones)
      saveBlogPosts(updatedPosts);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Ernährung',
      image: '',
      status: 'draft',
      readTime: '',
      slug: '',
      affiliateProducts: [],
      animalType: ''
    });
    setCurrentAffiliateProduct({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '',
      rating: 4.5,
      url: 'https://example.com',
      buttonText: 'Jetzt kaufen',
      buttonColor: 'green',
      buttonStyle: 'solid',
      buttonSize: 'medium',
      buttonIcon: 'shopping-cart',
      buttonAnimation: 'hover-scale'
    });
    setShowEditor(true);
  };

  const addAffiliateProduct = () => {
    const updatedProducts = [...(formData.affiliateProducts || []), { ...currentAffiliateProduct }];
    
    setFormData({
      ...formData,
      affiliateProducts: updatedProducts
    });

    setEditingPost(editingPost ? {
      ...editingPost,
      affiliateProducts: updatedProducts
    } : null);
    
    // Reset form
    setCurrentAffiliateProduct({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '',
      rating: 4.5,
      url: 'https://example.com',
      buttonText: 'Jetzt kaufen',
      buttonColor: 'green',
      buttonStyle: 'solid',
      buttonSize: 'medium',
      buttonIcon: 'shopping-cart',
      buttonAnimation: 'hover-scale'
    });
  };

const editAffiliateProduct = (index: number) => {
  const product = editingPost?.affiliateProducts?.[index];
  if (product) {
    setCurrentAffiliateProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice ?? '',
      image: product.image,
      rating: product.rating,
      url: product.url,
      buttonText: product.buttonText ?? '',
      buttonColor: product.buttonColor ?? '',
      buttonStyle: product.buttonStyle ?? '',
      buttonSize: product.buttonSize ?? '',
      buttonIcon: product.buttonIcon ?? '',
      buttonAnimation: product.buttonAnimation ?? '',
    });
    setEditingProductIndex(index);
  }
};


const updateAffiliateProduct = () => {
  if (!editingPost || editingProductIndex === null) return;

  const updatedProducts = [...(editingPost.affiliateProducts || [])];
  updatedProducts[editingProductIndex] = currentAffiliateProduct;

  const updatedPost = {
    ...editingPost,
    affiliateProducts: updatedProducts,
  };

  setEditingPost(updatedPost);
  resetAffiliateForm();
  setEditingProductIndex(null);
};


  const resetAffiliateForm = () => {
    setCurrentAffiliateProduct({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '',
      rating: 4.5,
      url: 'https://example.com',
      buttonText: 'Jetzt kaufen',
      buttonColor: 'green',
      buttonStyle: 'solid',
      buttonSize: 'medium',
      buttonIcon: 'shopping-cart',
      buttonAnimation: 'hover-scale'
    });
  };

  const removeAffiliateProduct = (index: number) => {
    const updatedProducts = formData.affiliateProducts?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      affiliateProducts: updatedProducts
    });
    setEditingPost(editingPost ? {
      ...editingPost,
      affiliateProducts: updatedProducts
    } : null);
    // If we're editing this product, cancel the edit
    if (editingProductIndex === index) {
      resetAffiliateForm();
      setEditingProductIndex(null);
    }
  };

  const handleAIGenerate = (aiContent: {
    title: string;
    excerpt: string;
    content: string;
    readTime: string;
  }) => {
    setFormData({
      ...formData,
      title: aiContent.title,
      excerpt: aiContent.excerpt,
      content: aiContent.content,
      readTime: aiContent.readTime,
      slug: generateSlug(aiContent.title)
    });
    setShowAIGenerator(false);
  };

  const handleAddAnimalType = () => {
    if (newAnimalType.name && newAnimalType.icon) {
      const newType: AnimalType = {
        id: Date.now(),
        name: newAnimalType.name,
        icon: newAnimalType.icon,
        color: newAnimalType.color
      };
      const updatedTypes = [...animalTypes, newType];
      setAnimalTypes(updatedTypes);
      saveAnimalTypes(updatedTypes);
      setNewAnimalType({
        name: '',
        icon: '',
        color: 'from-blue-600 to-indigo-600'
      });
    }
  };

  const handleDeleteAnimalType = (id: number) => {
    if (confirm('Bist du sicher, dass du diese Tierart löschen möchtest?')) {
      const updatedTypes = animalTypes.filter(type => type.id !== id);
      setAnimalTypes(updatedTypes);
      saveAnimalTypes(updatedTypes);
    }
  };

  const handleAddUser = () => {
    if (newUser.email && newUser.password && newUser.name) {
      const user = {
        id: Date.now(),
        email: newUser.email,
        password: newUser.password, // In real app, this should be hashed
        role: newUser.role,
        name: newUser.name,
        createdAt: new Date().toLocaleDateString('de-DE'),
        status: 'active'
      };
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
      setNewUser({
        email: '',
        password: '',
        role: 'Editor',
        name: ''
      });
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Bist du sicher, dass du diesen Benutzer löschen möchtest?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    }
  };

  const handleToggleUserStatus = (id: number) => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-900 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft size={20} />
                <span>Zurück zur Startseite</span>
              </motion.button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <img 
                src="/image copy copy.png" 
                alt="Tier-Check Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-orange-800">Tier-Check Admin</span>
              <motion.button
                onClick={() => {
                  localStorage.removeItem('adminAuth');
                  localStorage.removeItem('adminLoginTime');
                  window.location.href = '/admin/login';
                }}
                className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Abmelden
              </motion.button>
            </div>
          </div>

          {/* Current User Info */}
          {currentUser && (
            <div className="bg-white/90 rounded-xl p-4 mb-6 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">Willkommen, {currentUser.name}!</p>
                    <p className="text-sm text-orange-700">{currentUser.role} • {currentUser.email}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    localStorage.removeItem('adminAuth');
                    localStorage.removeItem('adminLoginTime');
                    localStorage.removeItem('currentUser');
                    window.location.href = '/admin/login';
                  }}
                  className="text-orange-600 hover:text-orange-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Abmelden
                </motion.button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-orange-900 mb-2">
                Blog-Verwaltung
              </h1>
              <p className="text-xl text-orange-800">
                Verwalte deine Blog-Artikel und erstelle neue Inhalte
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleNewPost}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} />
                <span>Neuer Artikel</span>
              </motion.button>

              <motion.button
                onClick={() => setShowAnimalManager(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={20} />
                <span>Tierarten verwalten</span>
              </motion.button>

              <motion.button
                onClick={() => setShowUserManager(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus size={20} />
                <span>Benutzer hinzufügen</span>
              </motion.button>
            </div>

            <motion.button
              onClick={() => router.push('/admin/homepage-settings')}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home size={20} />
              <span>+ Home page</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEditor ? (
          /* Editor Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPost ? 'Artikel bearbeiten' : 'Neuen Artikel erstellen'}
              </h2>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setShowAIGenerator(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Wand2 size={16} />
                  <span>Inhalt generieren</span>
                </motion.button>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="inline mr-1" />
                    Titel *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData, 
                        title,
                        slug: generateSlug(title)
                      });
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Artikel-Titel eingeben..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Autor *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Autor-Name..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} className="inline mr-1" />
                    Kategorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🐾 Tierart
                  </label>
                  <select
                    value={formData.animalType || ''}
                    onChange={(e) => setFormData({...formData, animalType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Keine spezielle Tierart</option>
                    {animalTypes.map(type => (
                      <option key={type.id} value={type.name}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'draft' | 'published'})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="draft">Entwurf</option>
                    <option value="published">Veröffentlicht</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock size={16} className="inline mr-1" />
                    Lesezeit
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="z.B. 8 min"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                  label="Artikel-Bild"
                  placeholder="Oder Bild-URL eingeben..."
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL-Slug (automatisch generiert)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50"
                    placeholder="wird-automatisch-generiert"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kurzbeschreibung *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  placeholder="Kurze Beschreibung des Artikels..."
                />
              </div>

              {/* Affiliate Products Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart size={20} className="mr-2" />
                  Affiliate-Produkte
                </h3>
                
                {/* Current Affiliate Products */}
                {Array.isArray(formData.affiliateProducts) && formData.affiliateProducts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Hinzugefügte Produkte:</h4>
                    <div className="space-y-3">
                      {formData.affiliateProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-600">{product.price}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAffiliateProduct(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Affiliate Product */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Neues Produkt hinzufügen:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={currentAffiliateProduct.title}
                      onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, title: e.target.value})}
                      placeholder="Produkt-Titel"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={currentAffiliateProduct.price}
                      onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, price: e.target.value})}
                      placeholder="Preis (z.B. 24,99€)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={currentAffiliateProduct.originalPrice}
                      onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, originalPrice: e.target.value})}
                      placeholder="Ursprungspreis (optional)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="url"
                      value={currentAffiliateProduct.image}
                      onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, image: e.target.value})}
                      placeholder="Bild-URL"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <ImageUpload
                      value={currentAffiliateProduct.image}
                      onChange={(url) => setCurrentAffiliateProduct({...currentAffiliateProduct, image: url})}
                      label="Produkt-Bild"
                      placeholder="Oder Bild-URL eingeben..."
                    />
                  </div>

                  {/* URL Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🔗 Affiliate-URL *
                    </label>
                    <input
                      type="url"
                      value={currentAffiliateProduct.url}
                      onChange={(e) => setCurrentAffiliateProduct({
                        ...currentAffiliateProduct,
                        url: e.target.value
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://example.com/affiliate-link"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Der Link zu dem Produkt (z.B. Amazon, Shop-Link)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      value={currentAffiliateProduct.description}
                      onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, description: e.target.value})}
                      placeholder="Produkt-Beschreibung"
                      rows={2}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    />
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Bewertung (1-5)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentAffiliateProduct.rating}
                        onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, rating: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />

                      {/* Button Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Text
                        </label>
                        <input
                          type="text"
                          value={currentAffiliateProduct.buttonText || 'Jetzt kaufen'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonText: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Jetzt kaufen"
                        />
                      </div>

                      {/* Button Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Farbe
                        </label>
                        <select
                          value={currentAffiliateProduct.buttonColor || 'green'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonColor: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="green">Grün (Standard)</option>
                          <option value="blue">Blau</option>
                          <option value="orange">Orange</option>
                          <option value="red">Rot</option>
                          <option value="purple">Lila</option>
                          <option value="gray">Grau</option>
                        </select>
                      </div>

                      {/* Button Style */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Stil
                        </label>
                        <select
                          value={currentAffiliateProduct.buttonStyle || 'solid'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonStyle: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="solid">Gefüllt (Standard)</option>
                          <option value="outline">Umrandet</option>
                          <option value="ghost">Transparent</option>
                        </select>
                      </div>

                      {/* Button Size */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Größe
                        </label>
                        <select
                          value={currentAffiliateProduct.buttonSize || 'medium'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonSize: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="small">Klein</option>
                          <option value="medium">Mittel (Standard)</option>
                          <option value="large">Groß</option>
                        </select>
                      </div>

                      {/* Button Icon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Icon
                        </label>
                        <select
                          value={currentAffiliateProduct.buttonIcon || 'shopping-cart'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonIcon: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="shopping-cart">🛒 Einkaufswagen</option>
                          <option value="external-link">🔗 Externer Link</option>
                          <option value="heart">❤️ Herz</option>
                          <option value="star">⭐ Stern</option>
                          <option value="arrow-right">➡️ Pfeil rechts</option>
                          <option value="none">Kein Icon</option>
                        </select>
                      </div>

                      {/* Button Animation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Animation
                        </label>
                        <select
                          value={currentAffiliateProduct.buttonAnimation || 'hover-scale'}
                          onChange={(e) => setCurrentAffiliateProduct({...currentAffiliateProduct, buttonAnimation: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="hover-scale">Hover Vergrößerung</option>
                          <option value="hover-bounce">Hover Sprung</option>
                          <option value="hover-pulse">Hover Pulsieren</option>
                          <option value="hover-glow">Hover Leuchten</option>
                          <option value="none">Keine Animation</option>
                        </select>
                      </div>

                      {/* Button Preview */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button-Vorschau
                        </label>
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                          <motion.button
                            className={`
                              flex items-center justify-center space-x-2 font-semibold rounded-lg shadow-lg transition-all duration-300
                              ${currentAffiliateProduct.buttonSize === 'small' ? 'px-3 py-2 text-sm' : 
                                currentAffiliateProduct.buttonSize === 'large' ? 'px-6 py-4 text-lg' : 
                                'px-4 py-3 text-base'}
                              ${currentAffiliateProduct.buttonStyle === 'outline' ? 
                                `border-2 bg-transparent ${
                                  currentAffiliateProduct.buttonColor === 'green' ? 'border-green-600 text-green-600 hover:bg-green-50' :
                                  currentAffiliateProduct.buttonColor === 'blue' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' :
                                  currentAffiliateProduct.buttonColor === 'orange' ? 'border-orange-600 text-orange-600 hover:bg-orange-50' :
                                  currentAffiliateProduct.buttonColor === 'red' ? 'border-red-600 text-red-600 hover:bg-red-50' :
                                  currentAffiliateProduct.buttonColor === 'purple' ? 'border-purple-600 text-purple-600 hover:bg-purple-50' :
                                  'border-gray-600 text-gray-600 hover:bg-gray-50'
                                }` :
                                currentAffiliateProduct.buttonStyle === 'ghost' ?
                                `bg-transparent ${
                                  currentAffiliateProduct.buttonColor === 'green' ? 'text-green-600 hover:bg-green-50' :
                                  currentAffiliateProduct.buttonColor === 'blue' ? 'text-blue-600 hover:bg-blue-50' :
                                  currentAffiliateProduct.buttonColor === 'orange' ? 'text-orange-600 hover:bg-orange-50' :
                                  currentAffiliateProduct.buttonColor === 'red' ? 'text-red-600 hover:bg-red-50' :
                                  currentAffiliateProduct.buttonColor === 'purple' ? 'text-purple-600 hover:bg-purple-50' :
                                  'text-gray-600 hover:bg-gray-50'
                                }` :
                                `text-white ${
                                  currentAffiliateProduct.buttonColor === 'green' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-500/25' :
                                  currentAffiliateProduct.buttonColor === 'blue' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/25' :
                                  currentAffiliateProduct.buttonColor === 'orange' ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-orange-500/25' :
                                  currentAffiliateProduct.buttonColor === 'red' ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-red-500/25' :
                                  currentAffiliateProduct.buttonColor === 'purple' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/25' :
                                  'bg-gradient-to-r from-gray-600 to-slate-600 hover:shadow-gray-500/25'
                                }`
                              }
                            `}
                            whileHover={{ 
                              scale: currentAffiliateProduct.buttonAnimation === 'hover-scale' ? 1.05 : 1,
                              y: currentAffiliateProduct.buttonAnimation === 'hover-bounce' ? -2 : 0
                            }}
                            animate={currentAffiliateProduct.buttonAnimation === 'hover-pulse' ? {
                              scale: [1, 1.02, 1]
                            } : {}}
                            transition={{ 
                              duration: currentAffiliateProduct.buttonAnimation === 'hover-pulse' ? 2 : 0.3,
                              repeat: currentAffiliateProduct.buttonAnimation === 'hover-pulse' ? Infinity : 0
                            }}
                          >
                            {currentAffiliateProduct.buttonIcon && currentAffiliateProduct.buttonIcon !== 'none' && (
                              <span>
                                {currentAffiliateProduct.buttonIcon === 'shopping-cart' && <ShoppingCart size={currentAffiliateProduct.buttonSize === 'small' ? 14 : currentAffiliateProduct.buttonSize === 'large' ? 20 : 16} />}
                                {currentAffiliateProduct.buttonIcon === 'external-link' && <ExternalLink size={currentAffiliateProduct.buttonSize === 'small' ? 14 : currentAffiliateProduct.buttonSize === 'large' ? 20 : 16} />}
                                {currentAffiliateProduct.buttonIcon === 'heart' && <span className={currentAffiliateProduct.buttonSize === 'small' ? 'text-sm' : currentAffiliateProduct.buttonSize === 'large' ? 'text-lg' : 'text-base'}>❤️</span>}
                                {currentAffiliateProduct.buttonIcon === 'star' && <span className={currentAffiliateProduct.buttonSize === 'small' ? 'text-sm' : currentAffiliateProduct.buttonSize === 'large' ? 'text-lg' : 'text-base'}>⭐</span>}
                                {currentAffiliateProduct.buttonIcon === 'arrow-right' && <span className={currentAffiliateProduct.buttonSize === 'small' ? 'text-sm' : currentAffiliateProduct.buttonSize === 'large' ? 'text-lg' : 'text-base'}>➡️</span>}
                              </span>
                            )}
                            <span>{editingProductIndex !== null ? 'Produkt aktualisieren' : 'Produkt hinzufügen'}</span>
                          </motion.button>

                          {editingProductIndex !== null && (
                            <motion.button
                              type="button"
                              onClick={() => {
                                resetAffiliateForm();
                                setEditingProductIndex(null);
                              }}
                              className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 mt-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <X size={20} />
                              <span>Bearbeitung abbrechen</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* URL Preview */}
                    {currentAffiliateProduct.url && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-800">
                          <span className="text-sm font-medium">🔗 Link-Vorschau:</span>
                          <a 
                            href={currentAffiliateProduct.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline truncate max-w-md"
                          >
                            {currentAffiliateProduct.url}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setCurrentAffiliateProduct({
                          title: '',
                          description: '',
                          price: '',
                          originalPrice: '',
                          image: '',
                          rating: 4.5,
                          url: 'https://example.com',
                          buttonText: 'Jetzt kaufen',
                          buttonColor: 'green',
                          buttonStyle: 'solid',
                          buttonSize: 'medium',
                          buttonIcon: 'shopping-cart',
                          buttonAnimation: 'hover-scale'
                        })}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Zurücksetzen
                      </button>
                      <button
                        type="button"
                        onClick={addAffiliateProduct}
                        className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Plus size={16} />
                        <span>Produkt hinzufügen</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artikel-Inhalt * 
                  <span className="text-xs text-gray-500 ml-2">
                    (Markdown unterstützt - verwende [TIPP], [WICHTIG], [WARNUNG] für Highlight-Boxen)
                  </span>
                </label>
                <div className="mb-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>Formatierungs-Tipps:</strong> 
                  <code className="mx-1">[TIPP]</code> für blaue Tipp-Boxen, 
                  <code className="mx-1">[WICHTIG]</code> für orange Wichtig-Boxen, 
                  <code className="mx-1">[WARNUNG]</code> für rote Warnungs-Boxen
                </div>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none font-mono text-sm"
                  placeholder="# Artikel-Titel

Dein Artikel-Inhalt hier...

[TIPP] Das ist ein hilfreicher Tipp für die Leser.

[WICHTIG] Das ist eine wichtige Information.

[WARNUNG] Das ist eine Warnung.

## Unterüberschrift

- Listenpunkt 1
- Listenpunkt 2

**Fetter Text** und *kursiver Text* werden unterstützt."
                />
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save size={20} />
                  <span>{editingPost ? 'Änderungen speichern' : 'Artikel erstellen'}</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Posts List */
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Alle Artikel ({posts.length})</h2>
              
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                          </span>
                          {/* Static Article Badge */}
                          {staticBlogPosts.some(staticPost => staticPost.id === post.id) && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Original
                            </span>
                          )}
                          {post.affiliateProducts && post.affiliateProducts.length > 0 && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {post.affiliateProducts.length} Produkte
                            </span>
                          )}
                          {post.animalType && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {animalTypes.find(type => type.name === post.animalType)?.icon} {post.animalType}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <User size={12} />
                            <span>{post.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Tag size={12} />
                            <span>{post.category}</span>
                          </span>
                          {post.readTime && (
                            <span className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{post.readTime}</span>
                            </span>
                          )}
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Link href={`/blog/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                          <motion.button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            title="Artikel ansehen"
                          >
                            <Eye size={16} />
                          </motion.button>
                        </Link>
                        
                        <motion.button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          title="Bearbeiten"
                        >
                          <Edit size={16} />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          title="Löschen"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animal Types Manager Modal */}
      <AnimatePresence>
        {showAnimalManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                    <Settings className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Tierarten verwalten</h2>
                </div>
                <button
                  onClick={() => setShowAnimalManager(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Add New Animal Type */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Neue Tierart hinzufügen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={newAnimalType.name}
                      onChange={(e) => setNewAnimalType({...newAnimalType, name: e.target.value})}
                      placeholder="Name (z.B. Katzen)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <input
                      type="text"
                      value={newAnimalType.icon}
                      onChange={(e) => setNewAnimalType({...newAnimalType, icon: e.target.value})}
                      placeholder="Emoji (z.B. 🐱)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <select
                      value={newAnimalType.color}
                      onChange={(e) => setNewAnimalType({...newAnimalType, color: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="from-blue-600 to-indigo-600">Blau</option>
                      <option value="from-purple-600 to-pink-600">Lila</option>
                      <option value="from-green-600 to-emerald-600">Grün</option>
                      <option value="from-yellow-600 to-orange-600">Gelb</option>
                      <option value="from-red-600 to-pink-600">Rot</option>
                      <option value="from-teal-600 to-cyan-600">Türkis</option>
                    </select>
                    <button
                      onClick={handleAddAnimalType}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Hinzufügen
                    </button>
                  </div>
                </div>

                {/* Existing Animal Types */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorhandene Tierarten</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {animalTypes.map((type) => (
                      <div key={type.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center text-white font-bold`}>
                            {type.icon}
                          </div>
                          <span className="font-medium text-gray-900">{type.name}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteAnimalType(type.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAnimalManager(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Manager Modal */}
      <AnimatePresence>
        {showUserManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                    <Users className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Benutzer verwalten</h2>
                </div>
                <button
                  onClick={() => setShowUserManager(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Add New User */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <UserPlus className="mr-2" size={20} />
                    Neuen Benutzer hinzufügen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="Vollständiger Name"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="E-Mail-Adresse"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="Passwort"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Administrator">👑 Administrator</option>
                      <option value="Editor">✏️ Editor</option>
                      <option value="Autor">📝 Autor</option>
                      <option value="Moderator">🛡️ Moderator</option>
                    </select>
                    <button
                      onClick={handleAddUser}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                      Hinzufügen
                    </button>
                  </div>
                </div>

                {/* Existing Users */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="mr-2" size={20} />
                    Vorhandene Benutzer ({users.length})
                  </h3>
                  
                  {users.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Noch keine Benutzer hinzugefügt</p>
                      <p className="text-sm">Füge den ersten Benutzer über das Formular oben hinzu</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Benutzer
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rolle
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Erstellt
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aktionen
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                      <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {user.role === 'Administrator' && '👑 '}
                                    {user.role === 'Editor' && '✏️ '}
                                    {user.role === 'Autor' && '📝 '}
                                    {user.role === 'Moderator' && '🛡️ '}
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    onClick={() => handleToggleUserStatus(user.id)}
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                                      user.status === 'active' 
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                    }`}
                                  >
                                    {user.status === 'active' ? '🟢 Aktiv' : '🔴 Inaktiv'}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.createdAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleToggleUserStatus(user.id)}
                                      className={`p-2 rounded-lg transition-colors ${
                                        user.status === 'active' 
                                          ? 'text-red-600 hover:bg-red-50' 
                                          : 'text-green-600 hover:bg-green-50'
                                      }`}
                                      title={user.status === 'active' ? 'Deaktivieren' : 'Aktivieren'}
                                    >
                                      <Shield size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Benutzer löschen"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-blue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Benutzerrollen Erklärung:</h4>
                      <div className="text-blue-700 text-sm space-y-1">
                        <p><strong>👑 Administrator:</strong> Vollzugriff auf alle Funktionen</p>
                        <p><strong>✏️ Editor:</strong> Kann Artikel erstellen, bearbeiten und veröffentlichen</p>
                        <p><strong>📝 Autor:</strong> Kann eigene Artikel erstellen und bearbeiten</p>
                        <p><strong>🛡️ Moderator:</strong> Kann Kommentare und Inhalte moderieren</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUserManager(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Content Generator Modal */}
      <AnimatePresence>
        {showAIGenerator && (
          <AIContentGenerator
            onGenerate={handleAIGenerate}
            onClose={() => setShowAIGenerator(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
