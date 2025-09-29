// CRUD für BlogPosts: Supabase, mit Fallback auf localStorage

import { supabase } from '@/lib/supabaseClient';
import type { BlogPost } from '@/app/lib/blogData';

const STORAGE_KEY = 'blogPosts';

function uuid(): string {
  // Browser + Node kompatibel
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxxyxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// -------- Fallback (localStorage) --------
function lsGet(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BlogPost[]) : [];
  } catch {
    return [];
  }
}

function lsSet(posts: BlogPost[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// -------- Supabase Helper --------
async function hasSupabase(): Promise<boolean> {
  // Wenn URL/Key fehlen → kein Supabase
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return false;
  try {
    // Test-Select, um Tabellenerreichbarkeit zu prüfen
    const { error } = await supabase.from('posts').select('id').limit(1);
    if (error) return false;
    return true;
  } catch {
    return false;
  }
}

// -------- API --------
export async function fetchPosts(includeDrafts = false): Promise<BlogPost[]> {
  if (await hasSupabase()) {
    const query = supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    const { data, error } = includeDrafts
      ? await query
      : await query.eq('status', 'published');

    if (error) {
      // Fallback
      const all = lsGet();
      return (includeDrafts ? all : all.filter((p) => p.status === 'published')).sort(
        (a, b) => +new Date(b.date) - +new Date(a.date)
      );
    }
    return (data ?? []) as BlogPost[];
  }

  const all = lsGet();
  return (includeDrafts ? all : all.filter((p) => p.status === 'published')).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

export async function createPost(payload: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const post: BlogPost = { id: uuid(), ...payload };

  if (await hasSupabase()) {
    const { data, error } = await supabase.from('posts').insert(post).select().single();
    if (!error && data) return data as BlogPost;
    // Fallback auf localStorage
  }

  const all = lsGet();
  all.unshift(post);
  lsSet(all);
  return post;
}

export async function updatePost(id: string, payload: Partial<BlogPost>): Promise<BlogPost | null> {
  if (await hasSupabase()) {
    const { data, error } = await supabase.from('posts').update(payload).eq('id', id).select().maybeSingle();
    if (!error) return (data as BlogPost) ?? null;
    // Fallback
  }

  const all = lsGet();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...payload };
  lsSet(all);
  return all[idx];
}

export async function deletePost(id: string): Promise<boolean> {
  if (await hasSupabase()) {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) return true;
    // Fallback
  }

  const all = lsGet();
  const next = all.filter((p) => p.id !== id);
  lsSet(next);
  return next.length !== all.length;
}
