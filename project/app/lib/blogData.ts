export interface BlogPost {
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
  affiliateProducts?: AffiliateProduct[];
  animalType?: string;
}

export interface AffiliateProduct {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  url: string;
  buttonText?: string;
  buttonColor?: string;
  buttonStyle?: string;
  buttonSize?: string;
  buttonIcon?: string;
  buttonAnimation?: string;
}

export interface AnimalType {
  id: number;
  name: string;
  icon: string;
  color: string;
}

// Static blog posts (original articles)
export const staticBlogPosts: BlogPost[] = [];

// Default animal types
export const defaultAnimalTypes: AnimalType[] = [
  { id: 1, name: 'Katzen', icon: '🐱', color: 'from-purple-600 to-pink-600' },
  { id: 2, name: 'Hunde', icon: '🐕', color: 'from-blue-600 to-indigo-600' },
  { id: 3, name: 'Vögel', icon: '🐦', color: 'from-green-600 to-emerald-600' },
  { id: 4, name: 'Kleintiere', icon: '🐹', color: 'from-yellow-600 to-orange-600' },
  { id: 5, name: 'Reptilien', icon: '🦎', color: 'from-teal-600 to-cyan-600' },
  { id: 6, name: 'Fische', icon: '🐠', color: 'from-cyan-600 to-blue-600' }
];

// Animal types management functions
export const getAnimalTypes = (): AnimalType[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('animalTypes');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing animal types:', error);
      }
    }
  }
  return defaultAnimalTypes;
};

export const saveAnimalTypes = (animalTypes: AnimalType[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('animalTypes', JSON.stringify(animalTypes));
  }
};

// Blog data management functions
export const getBlogPosts = (): BlogPost[] => {
  if (typeof window !== 'undefined') {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Merge with static posts to ensure we have all data
        const allPosts = [...staticBlogPosts];
        
        // Add or update posts from localStorage
        parsedPosts.forEach((storedPost: BlogPost) => {
          const existingIndex = allPosts.findIndex(p => p.id === storedPost.id);
          if (existingIndex >= 0) {
            // Update existing post but keep static content if missing
            allPosts[existingIndex] = {
              ...allPosts[existingIndex],
              ...storedPost,
              content: storedPost.content || allPosts[existingIndex].content
            };
          } else {
            // Add new post
            allPosts.push(storedPost);
          }
        });
        
        return allPosts;
      } catch (error) {
        console.error('Error parsing blog posts from localStorage:', error);
      }
    }
  }
  // Return static posts if no localStorage data
  return staticBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const allPosts = getBlogPosts();
  
  // Check if request comes from admin area
  const isAdminAccess = typeof window !== 'undefined' && 
    (window.location.pathname.includes('/admin') || 
     document.referrer.includes('/admin') ||
     localStorage.getItem('adminAuth') === 'true');
  
  if (isAdminAccess) {
    // Admin can see all posts (including drafts)
    return allPosts.find(post => post.slug === slug) || null;
  } else {
    // Public users only see published posts
    return allPosts.find(post => post.slug === slug && post.status === 'published') || null;
  }
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  if (typeof window !== 'undefined') {
    try {
      // Only save new posts (not static ones) to save space
      const newPosts = posts.filter(post => !staticBlogPosts.find(sp => sp.id === post.id));
      
      const dataToSave = JSON.stringify(newPosts);
      
      localStorage.setItem('blogPosts', dataToSave);
      console.log('✅ Blog posts saved successfully:', newPosts.length, 'new posts');
      
    } catch (error) {
      console.error('Error saving blog posts:', error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('❌ Browser-Speicher ist voll! Für Offline-Tests mit großen Bildern verwende Firefox oder erhöhe das localStorage-Limit in den Browser-Entwicklertools.');
      } else {
        if (error instanceof Error) {
          alert('Fehler beim Speichern: ' + error.message);
        } else {
          alert('Ein unbekannter Fehler ist beim Speichern aufgetreten.');
        }
      }
    }
  }
};
