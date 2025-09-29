'use client';

import { useEffect, useState, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminAuth({ children }: PropsWithChildren) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function run() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) {
        router.replace('/admin/login');
      }
      setChecking(false);
    }
    run();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      if (!session) router.replace('/admin/login');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checking) return <div className="p-6 text-sm opacity-70">Prüfe Anmeldung…</div>;
  return <>{children}</>;
}
