'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Settings, 
  ArrowLeft,
  Star,
  ShoppingCart,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import AdminAuth from '../../components/AdminAuth';
import ImageUpload from '../../components/ImageUpload';
import { getHomepageSettings, saveHomepageSettings, type HomepageSettings, type AffiliateProduct } from '../../lib/homepageSettings';

export default function HomepageSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AffiliateProduct | null>(null);

  useEffect(() => {
    const currentSettings = getHomepageSettings();
    setSettings(currentSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      saveHomepageSettings(settings);
      alert('✅ Einstellungen erfolgreich gespeichert!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('❌ Fehler beim Speichern der Einstellungen');
    }
    setIsSaving(false);
  };

  const handleProductSave = (product: AffiliateProduct) => {
    if (!settings) return;

    let updatedProducts;
    if (editingProduct) {
      // Update existing product
      updatedProducts = settings.affiliateProducts.map(p => 
        p.id === editingProduct.id ? product : p
      );
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Date.now()
      };
      updatedProducts = [...settings.affiliateProducts, newProduct];
    }

    setSettings({
      ...settings,
      affiliateProducts: updatedProducts
    });

    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleProductDelete = (productId: number) => {
    if (!settings) return;
    
    if (confirm('Möchtest du dieses Produkt wirklich löschen?')) {
      setSettings({
        ...settings,
        affiliateProducts: settings.affiliateProducts.filter(p => p.id !== productId)
      });
    }
  };

  if (!settings) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-orange-800">Einstellungen werden geladen...</p>
          </div>
        </div>
      </AdminAuth>
    );
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center space-x-2 text-orange-800 hover:text-orange-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Zurück zum Admin-Panel</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <Settings className="text-orange-800" size={24} />
                <span className="text-xl font-bold text-orange-800">Homepage-Einstellungen</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
                Homepage anpassen
              </h1>
              <p className="text-xl text-orange-800 max-w-3xl mx-auto">
                Bearbeite die Inhalte und das Design deiner Homepage
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* Hero Section Settings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <ImageIcon className="text-orange-600" />
                <span>Hero-Bereich</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Desktop Background */}
                <div>
                  <ImageUpload
                    value={settings.heroBackground}
                    onChange={(url) => setSettings({...settings, heroBackground: url})}
                    label="Desktop Hintergrundbild"
                    placeholder="https://example.com/desktop-background.jpg"
                  />
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      💡 <strong>Tipp für Desktop-Bilder:</strong> Verwende Bilder im Querformat (z.B. 1920x1080px) für die beste Darstellung auf Desktops. Das Bild wird als Vollbild-Hintergrund verwendet.
                    </p>
                  </div>
                </div>

                {/* Mobile Background */}
                <div>
                  <ImageUpload
                    value={settings.heroBackgroundMobile}
                    onChange={(url) => setSettings({...settings, heroBackgroundMobile: url})}
                    label="Mobile Hintergrundbild"
                    placeholder="https://example.com/mobile-background.jpg"
                  />
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      💡 <strong>Tipp für mobile Bilder:</strong> Verwende Bilder im Hochformat (z.B. 800x1200px) für die beste Darstellung auf Handys. Das Bild wird automatisch angepasst.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Haupttitel
                  </label>
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tier-Check"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Untertitel
                  </label>
                  <input
                    type="text"
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Dein Haustier-Ratgeber"
                  />
                </div>
              </div>
            </motion.div>

            {/* Product of the Week Settings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Star className="text-yellow-600" />
                <span>Produkt der Woche</span>
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produkttitel
                    </label>
                    <input
                      type="text"
                      value={settings.productOfTheWeek.title}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          title: e.target.value
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <ImageUpload
                      value={settings.productOfTheWeek.image}
                      onChange={(url) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          image: url
                        }
                      })}
                      label="Produktbild"
                      placeholder="https://example.com/product.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Produktbeschreibung
                  </label>
                  <textarea
                    value={settings.productOfTheWeek.description}
                    onChange={(e) => setSettings({
                      ...settings,
                      productOfTheWeek: {
                        ...settings.productOfTheWeek,
                        description: e.target.value
                      }
                    })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preis
                    </label>
                    <input
                      type="text"
                      value={settings.productOfTheWeek.price}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          price: e.target.value
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="24,99€"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Originalpreis
                    </label>
                    <input
                      type="text"
                      value={settings.productOfTheWeek.originalPrice}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          originalPrice: e.target.value
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="34,99€"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rabatt
                    </label>
                    <input
                      type="text"
                      value={settings.productOfTheWeek.discount}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          discount: e.target.value
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="29%"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bewertung
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={settings.productOfTheWeek.rating}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          rating: parseFloat(e.target.value) || 0
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anzahl Bewertungen
                    </label>
                    <input
                      type="number"
                      value={settings.productOfTheWeek.reviews}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          reviews: parseInt(e.target.value) || 0
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produkt-URL
                    </label>
                    <input
                      type="url"
                      value={settings.productOfTheWeek.url}
                      onChange={(e) => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          url: e.target.value
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://example.com/product"
                    />
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={() => setSettings({
                        ...settings,
                        productOfTheWeek: {
                          ...settings.productOfTheWeek,
                          features: [...settings.productOfTheWeek.features, '']
                        }
                      })}
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      + Feature hinzufügen
                    </button>
                  </div>
                  <div className="space-y-2">
                    {settings.productOfTheWeek.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...settings.productOfTheWeek.features];
                            newFeatures[index] = e.target.value;
                            setSettings({
                              ...settings,
                              productOfTheWeek: {
                                ...settings.productOfTheWeek,
                                features: newFeatures
                              }
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = settings.productOfTheWeek.features.filter((_, i) => i !== index);
                            setSettings({
                              ...settings,
                              productOfTheWeek: {
                                ...settings.productOfTheWeek,
                                features: newFeatures
                              }
                            });
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {settings.productOfTheWeek.features.length === 0 && (
                      <p className="text-gray-500 text-sm italic">
                        Keine Features hinzugefügt. Klicke auf "+ Feature hinzufügen" um zu beginnen.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Affiliate Products Settings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <ShoppingCart className="text-green-600" />
                  <span>Affiliate-Produkte</span>
                </h2>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Produkt hinzufügen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settings.affiliateProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{product.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-green-600">{product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowProductForm(true);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 size={14} />
                        <span>Bearbeiten</span>
                      </button>
                      <button
                        onClick={() => handleProductDelete(product.id)}
                        className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 mx-auto"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Speichere...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Einstellungen speichern</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductFormModal
          product={editingProduct}
          onSave={handleProductSave}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </AdminAuth>
  );
}

// Product Form Modal Component
function ProductFormModal({ 
  product, 
  onSave, 
  onClose 
}: { 
  product: AffiliateProduct | null;
  onSave: (product: AffiliateProduct) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Partial<AffiliateProduct>>(
    product || {
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '',
      rating: 4.5,
      category: '',
      badge: '',
      url: '',
      buttonText: 'Kaufen',
      buttonColor: 'green',
      buttonStyle: 'solid',
      buttonSize: 'medium',
      buttonIcon: 'shopping-cart',
      buttonAnimation: 'hover-scale'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.price && formData.url) {
      onSave(formData as AffiliateProduct);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {product ? 'Produkt bearbeiten' : 'Neues Produkt hinzufügen'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({...formData, image: url})}
                label="Produktbild"
                placeholder="https://example.com/product.jpg"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preis *
                </label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="24,99€"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Originalpreis
                </label>
                <input
                  type="text"
                  value={formData.originalPrice || ''}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="29,99€"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bewertung
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating || 4.5}
                  onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 4.5})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Bestseller"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produkt-URL *
              </label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Button Customization */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Button-Anpassung</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button-Text
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText || 'Kaufen'}
                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farbe
                  </label>
                  <select
                    value={formData.buttonColor || 'green'}
                    onChange={(e) => setFormData({...formData, buttonColor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="green">Grün</option>
                    <option value="blue">Blau</option>
                    <option value="orange">Orange</option>
                    <option value="red">Rot</option>
                    <option value="purple">Lila</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stil
                  </label>
                  <select
                    value={formData.buttonStyle || 'solid'}
                    onChange={(e) => setFormData({...formData, buttonStyle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="solid">Gefüllt</option>
                    <option value="outline">Umrandet</option>
                    <option value="ghost">Transparent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Größe
                  </label>
                  <select
                    value={formData.buttonSize || 'medium'}
                    onChange={(e) => setFormData({...formData, buttonSize: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="small">Klein</option>
                    <option value="medium">Mittel</option>
                    <option value="large">Groß</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.buttonIcon || 'shopping-cart'}
                    onChange={(e) => setFormData({...formData, buttonIcon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="shopping-cart">Einkaufswagen</option>
                    <option value="external-link">Externer Link</option>
                    <option value="heart">Herz</option>
                    <option value="star">Stern</option>
                    <option value="arrow-right">Pfeil rechts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animation
                  </label>
                  <select
                    value={formData.buttonAnimation || 'hover-scale'}
                    onChange={(e) => setFormData({...formData, buttonAnimation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="hover-scale">Hover Skalierung</option>
                    <option value="hover-bounce">Hover Sprung</option>
                    <option value="hover-pulse">Hover Puls</option>
                    <option value="hover-glow">Hover Leuchten</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                {product ? 'Aktualisieren' : 'Hinzufügen'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}