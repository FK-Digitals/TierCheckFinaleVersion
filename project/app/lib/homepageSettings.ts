export interface HomepageSettings {
  heroBackground: string;
  heroBackgroundMobile: string;
  heroTitle: string;
  heroSubtitle: string;
  productOfTheWeek: {
    title: string;
    description: string;
    price: string;
    originalPrice: string;
    discount: string;
    image: string;
    rating: number;
    reviews: number;
    features: string[];
    url: string;
  };
  affiliateProducts: AffiliateProduct[];
}

export interface AffiliateProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  category: string;
  badge?: string;
  url: string;
  buttonText?: string;
  buttonColor?: string;
  buttonStyle?: string;
  buttonSize?: string;
  buttonIcon?: string;
  buttonAnimation?: string;
}

const defaultSettings: HomepageSettings = {
  heroBackground: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  heroBackgroundMobile: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop',
  heroTitle: 'Tier-Check',
  heroSubtitle: 'Dein Haustier-Ratgeber',
  productOfTheWeek: {
    title: "Premium Katzenfutter - Naturbelassen & Getreidefrei",
    description: "Das beste Nassfutter für deine Katze! Ohne künstliche Zusatzstoffe, mit 95% Fleischanteil und allen wichtigen Nährstoffen. Von Tierärzten empfohlen.",
    price: "24,99€",
    originalPrice: "34,99€",
    discount: "29%",
    image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 1247,
    features: ["95% Fleischanteil", "Getreidefrei", "Ohne Zusatzstoffe", "Tierarzt empfohlen"],
    url: "https://example.com/product-of-the-week"
  },
  affiliateProducts: [
    {
      id: 1,
      title: "Premium Katzenfutter - Naturbelassen",
      description: "Hochwertiges Nassfutter ohne Zusatzstoffe, perfekt für eine gesunde Katzenernährung.",
      price: "24,99€",
      originalPrice: "29,99€",
      image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      category: "Katzenfutter",
      badge: "Bestseller",
      url: "https://example.com/premium-katzenfutter",
      buttonText: "Kaufen",
      buttonColor: "green",
      buttonStyle: "solid",
      buttonSize: "medium",
      buttonIcon: "shopping-cart",
      buttonAnimation: "hover-scale"
    },
    {
      id: 2,
      title: "Interaktives Hundespielzeug",
      description: "Intelligenzspielzeug zur geistigen Förderung und Beschäftigung deines Hundes.",
      price: "19,99€",
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      category: "Hundespielzeug",
      url: "https://example.com/hundespielzeug",
      buttonText: "Kaufen",
      buttonColor: "green",
      buttonStyle: "solid",
      buttonSize: "medium",
      buttonIcon: "shopping-cart",
      buttonAnimation: "hover-scale"
    },
    {
      id: 3,
      title: "Kaninchen-Heuraufe aus Naturholz",
      description: "Praktische und artgerechte Heuraufe für Kaninchen und andere Kleintiere.",
      price: "15,99€",
      image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      category: "Kaninchenzubehör",
      url: "https://example.com/kaninchen-heuraufe",
      buttonText: "Kaufen",
      buttonColor: "green",
      buttonStyle: "solid",
      buttonSize: "medium",
      buttonIcon: "shopping-cart",
      buttonAnimation: "hover-scale"
    }
  ]
};

export const getHomepageSettings = (): HomepageSettings => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('homepageSettings');
    console.log('Raw stored settings:', stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Parsed settings:', parsed);
        // Merge with defaults to ensure all properties exist
        const merged = {
          ...defaultSettings,
          ...parsed,
          heroBackgroundMobile: parsed.heroBackgroundMobile || defaultSettings.heroBackgroundMobile,
          productOfTheWeek: {
            ...defaultSettings.productOfTheWeek,
            ...parsed.productOfTheWeek
          },
          affiliateProducts: parsed.affiliateProducts || defaultSettings.affiliateProducts
        };
        console.log('Merged settings:', merged);
        return merged;
      } catch (error) {
        console.error('Error parsing homepage settings:', error);
      }
    }
  }
  return defaultSettings;
};

export const saveHomepageSettings = (settings: HomepageSettings) => {
  if (typeof window !== 'undefined') {
    try {
      // First try to save the complete settings
      localStorage.setItem('homepageSettings', JSON.stringify(settings));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('homepageSettingsUpdated'));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, trying to save without large images...');
        
        try {
          // Create a copy of settings to avoid mutating the original
          const settingsToSave = JSON.parse(JSON.stringify(settings));
          
          // Check and remove large base64 images to prevent quota exceeded error
          const isLargeBase64 = (str: string): boolean => {
            return str.startsWith('data:image/') && str.length > 50000; // 50KB threshold
          };
          
          // Check hero background
          if (isLargeBase64(settingsToSave.heroBackground)) {
            console.warn('Hero background image too large, using URL fallback');
            settingsToSave.heroBackground = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
          }
          
          // Check mobile hero background
          if (isLargeBase64(settingsToSave.heroBackgroundMobile)) {
            console.warn('Mobile hero background image too large, using URL fallback');
            settingsToSave.heroBackgroundMobile = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop';
          }
          
          // Check product of the week image
          if (isLargeBase64(settingsToSave.productOfTheWeek.image)) {
            console.warn('Product image too large, using URL fallback');
            settingsToSave.productOfTheWeek.image = 'https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=600';
          }
          
          // Check affiliate product images
          settingsToSave.affiliateProducts = settingsToSave.affiliateProducts.map((product: AffiliateProduct) => ({
            ...product,
            image: isLargeBase64(product.image) ? 'https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=400' : product.image
          }));
          
          localStorage.setItem('homepageSettings', JSON.stringify(settingsToSave));
          
          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('homepageSettingsUpdated'));
          
          // Show warning to user
          alert('Warnung: Das hochgeladene Bild war zu groß für den lokalen Speicher. Bitte verwende kleinere Bilder oder externe URLs für bessere Performance.');
        } catch (fallbackError) {
          console.error('Error saving homepage settings even with fallbacks:', fallbackError);
          alert('Fehler beim Speichern der Einstellungen. Bitte versuche es mit kleineren Bildern oder externen URLs.');
        }
      } else {
        console.error('Error saving homepage settings:', error);
        alert('Fehler beim Speichern der Einstellungen.');
      }
    }
  }
};