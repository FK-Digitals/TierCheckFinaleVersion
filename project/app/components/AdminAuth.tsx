'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';


export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setAuthed(!!user);
      setChecking(false);
      if (!user && pathname !== '/admin/login') {
        router.replace(`/admin/login?redirectedFrom=${encodeURIComponent(pathname)}`);
      }
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p>Berechtigung wird überprüft...</p>
        </motion.div>
      </div>
    );
  }

  if (!authed && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md">
          <Lock className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-bold mb-2">Zugriff verweigert</h2>
          <p className="mb-6">Bitte melde dich als Administrator an.</p>
          <button onClick={() => router.replace('/admin/login')}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg">
            Zur Anmeldung
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
