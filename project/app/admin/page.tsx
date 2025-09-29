'use client';

import AdminAuth from '../components/AdminAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// nutze den Pfad-Alias, damit TS die Module sicher findet
import type { BlogPost, AffiliateProduct, AnimalType } from '@/app/lib/blogData';
import { fetchPosts, createPost, updatePost, deletePost } from '@/app/lib/blogApi';
import { getAnimalTypes } from '@/app/lib/blogData';

import { ArrowLeft, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminPageContent />
    </AdminAuth>
  );
}

function AdminPageContent() {
  const router = useRouter();

  const [blog_posts, setPosts] = useState<BlogPost[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // WICHTIG: BlogPost verlangt ein "date" Feld → hier default setzen
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'likes' | 'comments'>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    animalType: '',
    slug: '',
    status: 'draft',
    readTime: '5 min',
    affiliateProducts: [],
    date: new Date().toISOString(),
  });

  const [currentAffiliateProduct, setCurrentAffiliateProduct] = useState<AffiliateProduct>({
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
    buttonAnimation: 'hover-scale',
  });

  const [showAnimalManager, setShowAnimalManager] = useState(false);
  const [newAnimalType, setNewAnimalType] = useState({
    name: '',
    icon: '',
    color: 'from-blue-600 to-indigo-600',
  });
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserManager, setShowUserManager] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'Editor',
    name: '',
  });

  // Posts laden
  const loadPosts = async () => {
    const allPosts = await fetchPosts(true); // true = auch Drafts
    setPosts(allPosts as any);

    // WICHTIG: getAnimalTypes liefert Promise → await benutzen
    const types = await getAnimalTypes();
    setAnimalTypes(types);
  };

  useEffect(() => {
    loadPosts();
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing current user:', error);
      }
    }
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error parsing users:', error);
      }
    }
  }, []);

  // Speichern / Bearbeiten
// Speichern / Bearbeiten
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const slug = (formData.slug || formData.title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // gemeinsames Payload
  const base = {
    ...formData,
    slug,
    date: editingPost?.date ?? formData.date ?? new Date().toISOString(),
  };

  if (editingPost) {
    await updatePost(editingPost.id, base);
  } else {
    // fehlende Pflichtfelder für Omit<BlogPost, 'id'> ergänzen
   await createPost({
  ...base,
  likes: 0,
  comments: 0, // statt []
});

  }

  await loadPosts();
  setShowEditor(false);
  setEditingPost(null);
};


  const handleDelete = async (id: string) => {
    if (confirm('Möchtest du diesen Artikel wirklich löschen?')) {
      await deletePost(id);
      await loadPosts();
    }
  };

  return (
    <div className="p-6">
      {/* Kopfbereich */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center text-orange-600 hover:text-orange-800 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Zurück zur Startseite
        </Link>
        <div className="flex space-x-2">
          <button onClick={() => setShowEditor(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            + Neuer Artikel
          </button>
          <button onClick={() => setShowAnimalManager(true)} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Tierarten verwalten
          </button>
          <button onClick={() => setShowUserManager(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Benutzer hinzufügen
          </button>
        </div>
      </div>

      {/* Artikelliste */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Alle Artikel ({blog_posts.length})</h2>
        <ul>
          {blog_posts.map((post) => (
            <li key={post.id} className="flex justify-between items-center border-b py-2">
              <div>
                <strong>{post.title}</strong>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/blog/${post.slug}`}>
                  <Eye className="w-5 h-5 text-blue-500" />
                </Link>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setFormData({
                      // stelle sicher, dass "date" im Formular vorhanden bleibt
                      date: post.date,
                      title: post.title,
                      excerpt: post.excerpt,
                      content: post.content,
                      author: post.author,
                      category: post.category,
                      image: post.image,
                      animalType: post.animalType,
                      slug: post.slug,
                      status: post.status,
                      readTime: post.readTime,
                      affiliateProducts: post.affiliateProducts,
                    });
                    setShowEditor(true);
                  }}
                >
                  <Edit className="w-5 h-5 text-orange-500" />
                </button>
                <button onClick={() => handleDelete(post.id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
