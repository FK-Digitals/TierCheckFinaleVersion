'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Info-Meldung, wenn von /admin/logout o.ä. gekommen
  useEffect(() => {
    if (searchParams.get('logout') === '1') {
      setInfo('Du wurdest erfolgreich abgemeldet.');
    }
  }, [searchParams]);

  // Nur weiterleiten, wenn wirklich eingeloggt
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted && data.user) {
        router.replace(searchParams.get('redirectedFrom') ?? '/admin');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router, searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setInfo(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (error) {
      setError(error.message || 'Anmeldung fehlgeschlagen.');
      return;
    }

    try {
      localStorage.setItem('adminAuth', '1');
      localStorage.setItem('adminLoginTime', String(Date.now()));
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ email, name: email.split('@')[0], role: 'Administrator' })
      );
    } catch {}

    window.dispatchEvent(new Event('tiercheck:auth-changed'));
    router.replace(searchParams.get('redirectedFrom') ?? '/admin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-900 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft size={20} />
                <span>Zurück zur Startseite</span>
              </motion.button>
            </Link>

            <div className="flex items-center space-x-2">
              <img
                src="/image copy copy.png"
                alt="Tier-Check Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-orange-800">Tier-Check Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-orange-900">Anmelden</h1>
              <p className="text-orange-800 mt-1">Verwalte deine Inhalte im Admin-Bereich</p>
            </div>

            {info && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                {info}
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-orange-700 hover:text-orange-900 px-2 py-1"
                  >
                    {showPassword ? 'Verbergen' : 'Anzeigen'}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
              >
                <LogIn size={18} />
                <span>{submitting ? 'Anmelden…' : 'Anmelden'}</span>
              </motion.button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Probleme beim Login? Wende dich an den Administrator.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
