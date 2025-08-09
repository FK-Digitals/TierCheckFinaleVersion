'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Interface
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'draft' | 'published';
  likes: number;
  comments: number;
  slug: string;
  readTime: string;
  affiliateProducts: string[];
}

// Speicherfunktionen
const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('blogPosts') || '[]');
};

const saveBlogPosts = (posts: BlogPost[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }
};

// Komponente
const CreateBlogPage = () => {
  const [formData, setFormData] = useState<any>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    image: '',
    status: 'draft',
    readTime: '',
    affiliateProducts: [],
    slug: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Bitte fülle mindestens Titel und Inhalt aus');
      return;
    }

    setIsSaving(true);

    try {
      const allPosts = getBlogPosts();

      const newPost: BlogPost = {
        id: Date.now(),
        title: formData.title,
        excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
        content: formData.content,
        author: formData.author || 'Admin',
        date: new Date().toLocaleDateString('de-DE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        category: formData.category || 'Allgemein',
        image:
          formData.image ||
          'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: formData.status as 'draft' | 'published',
        likes: 0,
        comments: 0,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
          .substring(0, 50),
        readTime: formData.readTime || '5 min',
        affiliateProducts: formData.affiliateProducts || []
      };

      console.log('Creating new post:', newPost.title);
      console.log('Post content length:', newPost.content.length);
      console.log(
        'Post image type:',
        newPost.image.startsWith('data:') ? 'Base64' : 'URL'
      );

      const updatedPosts = [...allPosts, newPost];
      saveBlogPosts(updatedPosts);

      setIsSaving(false);
 
      const savedPosts = getBlogPosts();
      const wasSaved = savedPosts.find((p) => p.id === newPost.id);

      if (wasSaved) {
        alert('✅ Blog-Post erfolgreich erstellt!');
      } else {
        alert('⚠️ Blog-Post wurde erstellt, aber möglicherweise nicht dauerhaft gespeichert.');
      }

      router.push('/admin/blog');
    } catch (error) {
      setIsSaving(false);
      console.error('Error creating post:', error);
      alert('❌ Fehler beim Erstellen des Posts: ' + (error as Error).message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Neuen Blog-Post erstellen</h1>
      <input
        type="text"
        placeholder="Titel"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <textarea
        placeholder="Inhalt"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        rows={10}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button
        onClick={handleSave}
        disabled={isSaving}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isSaving ? 'Speichern...' : 'Blogpost speichern'}
      </button>
    </div>
  );
};

export default CreateBlogPage;
