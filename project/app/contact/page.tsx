'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
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
              Kontakt
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-orange-800 max-w-3xl mx-auto">
              Wir sind für dich und dein Haustier da. Kontaktiere uns bei Fragen oder Anregungen.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schnellkontakt</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Mail className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-Mail</p>
                    <p className="text-gray-600">Tier-Check@outlook.de</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MapPin className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">Leverkusen, Deutschland</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Antwortzeit</p>
                    <p className="text-gray-600">Innerhalb von 24h</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Häufige Fragen</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Ist die Beratung kostenlos?</h4>
                  <p className="text-gray-600 text-sm">Ja, alle unsere Blog-Artikel und grundlegenden Informationen sind völlig kostenlos.</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Wie schnell bekomme ich eine Antwort?</h4>
                  <p className="text-gray-600 text-sm">Wir antworten normalerweise innerhalb von 24 Stunden auf alle Anfragen.</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Kann ich Fotos meines Haustiers senden?</h4>
                  <p className="text-gray-600 text-sm">Ja, du kannst Fotos per E-Mail an hello@tiercheck.de senden.</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Ersetzt ihr den Tierarzt?</h4>
                  <p className="text-gray-600 text-sm">Nein, wir geben allgemeine Ratschläge. Bei gesundheitlichen Problemen konsultiere immer einen Tierarzt.</p>
                </div>
              </div>
            </motion.div>

            {/* Live Chat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare size={24} />
                <h3 className="text-xl font-bold">Live Chat</h3>
              </div>
              <p className="mb-4">
                Brauchst du sofortige Hilfe? Unser Live-Chat ist verfügbar!
              </p>
              <motion.button
                className="w-full bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('Live-Chat wird geöffnet... (Demo)')}
              >
                Chat starten
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}