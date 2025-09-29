'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
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
              <span className="text-xl font-bold text-orange-800">Tier-Check</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Impressum
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
              Rechtliche Informationen zu TierCheck
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none"
        >
          <h2 className="text-2xl font-bold text-orange-900 mb-6">Angaben gemäß § 5 TMG</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Betreiber</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Tier-Check GmbH</strong></p>
                <p>Musterstraße 123</p>
                <p>51375 Leverkusen</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-orange-600" size={18} />
                  <span className="text-gray-700">Tier-Check@outlook.de</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-orange-600" size={18} />
                  <span className="text-gray-700">Leverkusen, Deutschland</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Registereintrag</h3>
              <div className="text-gray-700 space-y-1">
                <p>Eintragung im Handelsregister</p>
                <p>Registergericht: Amtsgericht Berlin</p>
                <p>Registernummer: HRB 123456</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Umsatzsteuer-ID</h3>
              <p className="text-gray-700">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                Die Inhalte auf Tier-Check dienen ausschließlich der Information und ersetzen keinesfalls eine professionelle Beratung, Untersuchung oder Behandlung durch einen Tierarzt. Bei gesundheitlichen Problemen Ihres Haustieres wenden Sie sich bitte immer an einen qualifizierten Tierarzt.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Verantwortlich für den Inhalt</h3>
              <div className="text-gray-700">
                <p>Max Mustermann</p>
                <p>Geschäftsführer</p>
                <p>Musterstraße 123</p>
                <p>51375 Leverkusen</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Haftungsausschluss</h3>
              <div className="text-gray-700 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Haftung für Inhalte</h4>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Haftung für Links</h4>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Urheberrecht</h4>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Medizinischer Haftungsausschluss</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-gray-700">
                <p className="font-semibold mb-2">Wichtiger Hinweis:</p>
                <p>
                  Die Inhalte auf TierCheck dienen ausschließlich der Information und ersetzen keinesfalls eine professionelle Beratung, Untersuchung oder Behandlung durch einen Tierarzt. Bei gesundheitlichen Problemen Ihres Haustieres wenden Sie sich bitte immer an einen qualifizierten Tierarzt.
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
              <p>Stand: Januar 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}