import { supabase } from '@/lib/supabaseClient';

export interface BlogPost {
  id: string;               // UUID from DB
  title: string;
  excerpt: string;
  content: string;
  author: string | null;
  date: string;             // ISO string
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
  image?: string;
  url?: string;
  badge?: string;
  buttonLabel?: string;
  buttonIcon?: string;
  buttonAnimation?: string;
  originalPrice?: string;
  rating?: number;
  buttonText?: string;
  buttonColor?: string;
  buttonStyle?: string;
  buttonSize?: string;
}

export interface AnimalType {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const mapFromDb = (row: any): BlogPost => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt ?? '',
  content: row.content ?? '',
  author: row.author ?? null,
  date: row.created_at ?? row.date ?? new Date().toISOString(),
  category: row.category ?? '',
  image: row.image ?? '',
  status: (row.status as 'draft' | 'published') ?? 'published',
  likes: row.likes ?? 0,
  comments: row.comments ?? 0,
  slug: row.slug,
  readTime: row.read_time ?? '',
  affiliateProducts: row.affiliate_products ?? undefined,
  animalType: row.animal_type ?? undefined,
});

const mapToDb = (p: BlogPost) => ({
  id: p.id,
  title: p.title,
  excerpt: p.excerpt,
  content: p.content,
  author: p.author,
  category: p.category,
  image: p.image,
  status: p.status,
  likes: p.likes,
  comments: p.comments,
  slug: p.slug,
  read_time: p.readTime,
  animal_type: p.animalType,
  affiliate_products: p.affiliateProducts ?? null,
});

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(mapFromDb);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapFromDb(data) : null;
};

// Accepts a full array for backward compatibility. Performs upsert by slug.
export const saveBlogPosts = async (posts: BlogPost[]): Promise<void> => {
  if (!Array.isArray(posts) || posts.length === 0) return;
  const upserts = posts.map(mapToDb);
  const { error } = await supabase
    .from('blog_posts')
    .upsert(upserts, { onConflict: 'slug' });
  if (error) throw error;
};

// Animal types stored in table animal_types
export const getAnimalTypes = async (): Promise<AnimalType[]> => {
  const { data, error } = await supabase
    .from('animal_types')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data || []) as AnimalType[];
};

export const saveAnimalTypes = async (types: AnimalType[]): Promise<void> => {
  const { error } = await supabase
    .from('animal_types')
    .upsert(types.map(t => ({ id: t.id, name: t.name, icon: t.icon, color: t.color })), { onConflict: 'id' });
  if (error) throw error;
};

export const staticBlogPosts: BlogPost[] = [];
