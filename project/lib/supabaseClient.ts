import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL und Anon Key müssen in den Umgebungsvariablen gesetzt werden');
}

function makeClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: 'tiercheck-auth',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// HMR-sicherer Singleton
const g = globalThis as any;
export const supabase = g.__tiercheck_sb ?? makeClient();
if (process.env.NODE_ENV !== 'production') g.__tiercheck_sb = supabase;

// Storage Bucket Name für Blog-Bilder
export const BLOG_IMAGES_BUCKET = 'blog-images'

// Hilfsfunktion zum Upload von Bildern
export const uploadImage = async (file: File, path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(BLOG_IMAGES_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Öffentliche URL für das hochgeladene Bild abrufen
    const { data: { publicUrl } } = supabase.storage
      .from(BLOG_IMAGES_BUCKET)
      .getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Fehler beim Hochladen des Bildes:', error)
    throw error
  }
}

// Hilfsfunktion zum Löschen von Bildern
export const deleteImage = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from(BLOG_IMAGES_BUCKET)
      .remove([path])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Fehler beim Löschen des Bildes:', error)
    throw error
  }
}