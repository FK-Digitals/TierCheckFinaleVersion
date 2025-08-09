'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader } from 'lucide-react';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log('🔍 Checking authentication...');
      
      const adminAuth = localStorage.getItem('adminAuth');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      console.log('📝 adminAuth:', adminAuth);
      console.log('⏰ loginTime:', loginTime);
      
      if (adminAuth === 'true' && loginTime) {
        // Check if login is still valid (24 hours)
        const loginTimestamp = parseInt(loginTime);
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (currentTime - loginTimestamp < twentyFourHours) {
          console.log('✅ User is authenticated and session is valid');
          setIsAuthenticated(true);
        } else {
          console.log('⏰ Session expired, clearing auth');
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
        }
      } else {
        console.log('❌ User is not authenticated');
        setIsAuthenticated(false);
      }
      
      // Set loading to false after authentication check is complete
      setIsLoading(false);
    }
    // Small delay to ensure proper hydration
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false && !isLoading) {
      console.log('🔄 Redirecting to login...');
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader className="animate-spin mx-auto mb-4 text-orange-600" size={48} />
          <p className="text-orange-800 text-lg">Berechtigung wird überprüft...</p>
        </motion.div>
      </div>
    );
  }

  // Show access denied if not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md"
        >
          <Lock className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Zugriff verweigert</h2>
          <p className="text-gray-600 mb-6">
            Du musst dich als Administrator anmelden, um auf diesen Bereich zuzugreifen.
          </p>
          <motion.button
            onClick={() => router.push('/admin/login')}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Zur Anmeldung
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}