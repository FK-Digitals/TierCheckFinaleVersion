'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Scale } from 'lucide-react';

export default function AGBPage() {
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
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
              Nutzungsbedingungen für unsere Website und Services
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
          {/* Warning Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle size={20} />
              <span className="font-semibold">WICHTIGER HINWEIS</span>
            </div>
            <p className="text-red-700 mt-2 text-sm">
              Dies ist ein Platzhaltertext! Du musst diese AGB durch rechtlich korrekte, 
              auf dein Projekt zugeschnittene Geschäftsbedingungen ersetzen. Konsultiere einen Rechtsanwalt für rechtssichere Texte.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 1 Geltungsbereich</h2>
          
          <p className="text-gray-700 mb-6">
            Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für die Nutzung der Website 
            tier-check.de und aller damit verbundenen Services der Tier-Check GmbH (nachfolgend "Anbieter").
          </p>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 2 Vertragspartner</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p><strong>Tier-Check GmbH</strong></p>
            <p>Musterstraße 123</p>
            <p>51375 Leverkusen</p>
            <p>Deutschland</p>
            <p>E-Mail: Tier-Check@outlook.de</p>
            <p>Registergericht: Amtsgericht Berlin</p>
            <p>Registernummer: HRB 123456</p>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 3 Leistungen</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                <FileText size={18} />
                <span>Kostenlose Inhalte</span>
              </h3>
              <p className="text-gray-700 mb-3">
                Der Anbieter stellt kostenlose Informationen und Ratgeber rund um das Thema Haustiere zur Verfügung. 
                Diese Inhalte dienen ausschließlich der Information und ersetzen keine professionelle Beratung.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Affiliate-Links</h3>
              <p className="text-gray-700 mb-3">
                Die Website enthält Affiliate-Links zu Produkten Dritter. Bei Käufen über diese Links 
                erhält der Anbieter eine Provision, ohne dass dem Nutzer zusätzliche Kosten entstehen.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">§ 4 Nutzungsrechte</h2>
          
          <p className="text-gray-700 mb-4">
            Der Nutzer erhält ein einfaches, nicht übertragbares Recht zur Nutzung der bereitgestellten Inhalte 
            für private, nicht-kommerzielle Zwecke.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Untersagt ist insbesondere:</h4>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>Die kommerzielle Nutzung der Inhalte</li>
              <li>Die Vervielfältigung ohne Zustimmung</li>
              <li>Die Weitergabe an Dritte</li>
              <li>Die Bearbeitung oder Veränderung der Inhalte</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 5 Haftungsausschluss</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Scale size={20} className="text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-800">Wichtiger Haftungsausschluss</h3>
            </div>
            <div className="text-orange-700 space-y-3">
              <p>
                <strong>Medizinischer Haftungsausschluss:</strong> Die bereitgestellten Informationen ersetzen 
                keinesfalls eine professionelle tierärztliche Beratung, Diagnose oder Behandlung.
              </p>
              <p>
                <strong>Inhaltliche Richtigkeit:</strong> Trotz sorgfältiger Prüfung übernehmen wir keine 
                Haftung für die Vollständigkeit, Richtigkeit und Aktualität der Inhalte.
              </p>
              <p>
                <strong>Externe Links:</strong> Für Inhalte verlinkter Seiten sind ausschließlich deren 
                Betreiber verantwortlich.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">§ 6 Datenschutz</h2>
          
          <p className="text-gray-700 mb-4">
            Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer 
            <Link href="/datenschutz" className="text-orange-600 hover:text-orange-700 font-medium"> Datenschutzerklärung</Link>.
          </p>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 7 Änderungen der AGB</h2>
          
          <p className="text-gray-700 mb-4">
            Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Nutzer werden über Änderungen 
            per E-Mail oder durch einen Hinweis auf der Website informiert.
          </p>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">§ 8 Schlussbestimmungen</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Anwendbares Recht:</strong> Es gilt das Recht der Bundesrepublik Deutschland.
            </p>
            <p className="text-gray-700">
              <strong>Gerichtsstand:</strong> Ausschließlicher Gerichtsstand ist Leverkusen.
            </p>
            <p className="text-gray-700">
              <strong>Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen unwirksam sein, 
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </div>

          <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p>Stand: Januar 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}