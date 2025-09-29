import { createClient } from '@supabase/supabase-js';

// Direkter Zugriff, damit Next die Werte in den Client-Build inlined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase ENV fehlt');
}

export const supabase = createClient(supabaseUrl.replace(/\/+$/, ''), supabaseAnonKey);

export const BLOG_IMAGES_BUCKET = 'blog-images';

export async function uploadImage(file: File | Blob, path: string) {
  const { data, error } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(data.path);
  return publicUrl;
}

export async function deleteImage(path: string) {
  const { error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).remove([path]);
  if (error) throw error;
  return true;
}
