'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

export default function DatenschutzPage() {
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
              Datenschutzerklärung
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
              Informationen über die Erhebung und Verarbeitung personenbezogener Daten
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
              <Shield size={20} />
              <span className="font-semibold">WICHTIGER HINWEIS</span>
            </div>
            <p className="text-red-700 mt-2 text-sm">
              Dies ist ein Platzhaltertext! Du musst diese Datenschutzerklärung durch eine rechtlich korrekte, 
              auf dein Projekt zugeschnittene Version ersetzen. Konsultiere einen Rechtsanwalt für rechtssichere Texte.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">1. Verantwortlicher</h2>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Tier-Check GmbH</strong></p>
              <p>Musterstraße 123</p>
              <p>51375 Leverkusen</p>
              <p>Deutschland</p>
              <p>E-Mail: Tier-Check@outlook.de</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                <Eye size={18} />
                <span>Beim Besuch unserer Website</span>
              </h3>
              <p className="text-gray-700 mb-3">
                Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser 
                automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden 
                temporär in einem sog. Logfile gespeichert.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                <Database size={18} />
                <span>Bei der Nutzung unseres Kontaktformulars</span>
              </h3>
              <p className="text-gray-700 mb-3">
                Bei Fragen jeder Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website 
                bereitgestelltes Formular Kontakt aufzunehmen. Dabei sind folgende Angaben erforderlich:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Betreff</li>
                <li>Nachricht</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">3. Rechtsgrundlage für die Datenverarbeitung</h2>
          
          <p className="text-gray-700 mb-4">
            Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der folgenden Rechtsgrundlagen:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">4. Ihre Rechte</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Sie haben folgende Rechte:</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">5. Cookies</h2>
          
          <p className="text-gray-700 mb-4">
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät 
            gespeichert werden. Weitere Informationen finden Sie in unserer 
            <Link href="/cookies" className="text-orange-600 hover:text-orange-700 font-medium"> Cookie-Richtlinie</Link>.
          </p>

          <h2 className="text-2xl font-bold text-orange-900 mb-6 mt-8">6. Kontakt</h2>
          
          <p className="text-gray-700">
            Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p>E-Mail: Tier-Check@outlook.de</p>
            <p>Adresse: Musterstraße 123, 51375 Leverkusen</p>
          </div>

          <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p>Stand: Januar 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}