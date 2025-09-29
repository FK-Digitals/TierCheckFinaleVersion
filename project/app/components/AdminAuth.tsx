'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) {
        setAuthed(false);
        setLoading(false);
        router.replace('/admin/login');
        return;
      }
      setAuthed(true);
      setLoading(false);
    }

    check();

    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      setAuthed(!!session);
      if (!session) router.replace('/admin/login');
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <div className="p-6 text-sm opacity-70">Prüfe Anmeldung…</div>;
  }
  if (!authed) return null;
  return <>{children}</>;
}
