'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push('/admin');
  };

  const signUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else alert('Bestätige deine E-Mail und logge dich danach ein.');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <form className="space-y-3" onSubmit={signIn}>
          <input className="w-full border p-2 rounded" type="email" placeholder="E-Mail" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full border p-2 rounded" type="password" placeholder="Passwort" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full border p-2 rounded" disabled={loading} type="submit">{loading ? '...' : 'Einloggen'}</button>
        </form>
        <button className="w-full border p-2 rounded" onClick={signUp}>Registrieren</button>
        <button className="w-full border p-2 rounded" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: typeof window !== 'undefined' ? window.location.origin + '/admin' : undefined } })}>Mit Google</button>
      </div>
    </main>
  );
}
