'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, X, Loader, Brain, FileText } from 'lucide-react';

interface AIContentGeneratorProps {
  onGenerate: (content: {
    title: string;
    excerpt: string;
    content: string;
    readTime: string;
  }) => void;
  onClose: () => void;
}

export default function AIContentGenerator({ onGenerate, onClose }: AIContentGeneratorProps) {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!inputText.trim()) {
      alert('Bitte füge deinen Text ein');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract title from first line (remove # if present)
    const lines = inputText.trim().split('\n');
    const titleLine = lines[0].replace(/^#+\s*/, '').trim();
    
    // Extract excerpt from first paragraph after title
    let excerpt = '';
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.startsWith('TIPP[') && !line.startsWith('WARNUNG[') && !line.startsWith('WICHTIG[') && !line.startsWith('INFO[')) {
        excerpt = line;
        break;
      }
    }

    // If no excerpt found, create one from title
    if (!excerpt) {
      excerpt = `Alles was du über ${titleLine.toLowerCase()} wissen musst. Praktische Tipps und Expertenwissen für Haustierbesitzer.`;
    }

    // Estimate reading time based on word count
    const wordCount = inputText.split(/\s+/).length;
    const readingSpeed = 200; // words per minute
    const minutes = Math.ceil(wordCount / readingSpeed);
    const readTime = `${minutes} min`;

    // Process content - convert shortcodes and clean up formatting
    const processedContent = inputText
      .replace(/TIPP\[(.*?)\]/g, '[TIPP]$1')
      .replace(/WARNUNG\[(.*?)\]/g, '[WARNUNG]$1')
      .replace(/WICHTIG\[(.*?)\]/g, '[WICHTIG]$1')
      .replace(/ANIMATION\[(.*?)\]/g, '[ANIMATION]$1')
      .replace(/INFO\[(.*?)\]/g, '[TIPP]$1'); // Convert INFO to TIPP

    const generatedContent = {
      title: titleLine,
      excerpt: excerpt,
      content: processedContent,
      readTime: readTime
    };

    setIsGenerating(false);
    onGenerate(generatedContent);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Brain className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Inhalt generieren</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">So funktioniert's:</h4>
                <p className="text-blue-700 text-sm mb-2">
                  Füge deinen fertigen Blog-Text ein. Die KI extrahiert automatisch:
                </p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• <strong>Titel</strong> aus der ersten Zeile</li>
                  <li>• <strong>Kurzbeschreibung</strong> aus dem ersten Absatz</li>
                  <li>• <strong>Lesezeit</strong> basierend auf Wortanzahl</li>
                  <li>• <strong>Content</strong> wird 1:1 übernommen (keine Änderungen!)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shortcode Legend */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-800 mb-3">📋 Shortcode-Legende</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-blue-600">💡</span>
                      <code className="bg-blue-200 px-2 py-1 rounded text-xs font-mono">TIPP[...]</code>
                    </div>
                    <p className="text-blue-700 text-xs">Blaue Tipp-Box für hilfreiche Hinweise</p>
                  </div>
                  
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-orange-600">⚠️</span>
                      <code className="bg-orange-200 px-2 py-1 rounded text-xs font-mono">WICHTIG[...]</code>
                    </div>
                    <p className="text-orange-700 text-xs">Orange Box für wichtige Informationen</p>
                  </div>
                  
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-red-600">🚨</span>
                      <code className="bg-red-200 px-2 py-1 rounded text-xs font-mono">WARNUNG[...]</code>
                    </div>
                    <p className="text-red-700 text-xs">Rote Warnungs-Box für kritische Hinweise</p>
                  </div>
                  
                  <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-purple-600">✨</span>
                      <code className="bg-purple-200 px-2 py-1 rounded text-xs font-mono">ANIMATION[...]</code>
                    </div>
                    <p className="text-purple-700 text-xs">Animierter Text mit Hover-Effekten</p>
                  </div>
                  
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-600">💎</span>
                      <code className="bg-green-200 px-2 py-1 rounded text-xs font-mono">HIGHLIGHT[...]</code>
                    </div>
                    <p className="text-green-700 text-xs">Leuchtender Marker-Effekt</p>
                  </div>
                  
                  <div className="bg-pink-100 border border-pink-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-pink-600">🎯</span>
                      <code className="bg-pink-200 px-2 py-1 rounded text-xs font-mono">FOCUS[...]</code>
                    </div>
                    <p className="text-pink-700 text-xs">Zoom-Effekt mit Schatten</p>
                  </div>
                  
                  <div className="bg-cyan-100 border border-cyan-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-cyan-600">⚡</span>
                      <code className="bg-cyan-200 px-2 py-1 rounded text-xs font-mono">FLASH[...]</code>
                    </div>
                    <p className="text-cyan-700 text-xs">Blitz-Animation bei Hover</p>
                  </div>
                  
                  <div className="bg-indigo-100 border border-indigo-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-indigo-600">🌟</span>
                      <code className="bg-indigo-200 px-2 py-1 rounded text-xs font-mono">GLOW[...]</code>
                    </div>
                    <p className="text-indigo-700 text-xs">Leuchtender Glow-Effekt</p>
                  </div>
                  
                  <div className="bg-rose-100 border border-rose-300 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-rose-600">🎨</span>
                      <code className="bg-rose-200 px-2 py-1 rounded text-xs font-mono">GRADIENT[...]</code>
                    </div>
                    <p className="text-rose-700 text-xs">Regenbogen-Gradient-Text</p>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-purple-100 rounded-lg">
                  <p className="text-purple-700 text-xs">
                    <strong>💡 Tipps:</strong> INFO[...] wird zu TIPP[...] konvertiert • Alle Effekt-Shortcodes funktionieren auch in Affiliate-Produktbeschreibungen!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog-Text einfügen *
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="# Dein Blog-Titel

Hier kommt deine Einleitung...

TIPP[Das ist ein hilfreicher Tipp]
WARNUNG[Das ist eine wichtige Warnung]
WICHTIG[Das ist eine wichtige Information]
ANIMATION[Dieser Text wird animiert und interaktiv!]
HIGHLIGHT[Dieser Text wird hervorgehoben!]
FOCUS[Dieser Text bekommt Fokus-Effekt!]
FLASH[Dieser Text blitzt beim Hover!]
GLOW[Dieser Text leuchtet schön!]
GRADIENT[Regenbogen-Text-Effekt!]

## Unterüberschrift

Dein Inhalt hier..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none font-mono text-sm"
              rows={20}
            />
            <div className="mt-2 text-sm text-gray-500">
              Wörter: {inputText.split(/\s+/).filter(word => word.length > 0).length} | 
              Geschätzte Lesezeit: {Math.ceil(inputText.split(/\s+/).filter(word => word.length > 0).length / 200)} min
            </div>
          </div>

          {/* Preview */}
          {inputText.trim() && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Vorschau der Extraktion:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Titel:</span>
                  <span className="ml-2 text-gray-900">
                    {inputText.trim().split('\n')[0].replace(/^#+\s*/, '').trim() || 'Wird aus erster Zeile extrahiert'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Kurzbeschreibung:</span>
                  <span className="ml-2 text-gray-900">
                    {(() => {
                      const lines = inputText.trim().split('\n');
                      for (let i = 1; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (line && !line.startsWith('#') && !line.startsWith('TIPP[') && !line.startsWith('WARNUNG[') && !line.startsWith('WICHTIG[') && !line.startsWith('INFO[')) {
                          return line.substring(0, 100) + (line.length > 100 ? '...' : '');
                        }
                      }
                      return 'Wird aus erstem Absatz extrahiert';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>

          <motion.button
            onClick={generateContent}
            disabled={isGenerating || !inputText.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
            whileTap={{ scale: isGenerating ? 1 : 0.98 }}
          >
            {isGenerating ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Verarbeite Text...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>Inhalt generieren</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}