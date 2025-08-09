'use client';

// Cookie Management Utility Functions
export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
  }

  try {
    const preferences = localStorage.getItem('cookie_preferences');
    if (preferences) {
      return JSON.parse(preferences);
    }
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
  }

  return {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  };
};

export const hasUserConsented = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent') !== null;
};

export const getUserConsentStatus = (): 'accepted' | 'declined' | 'customized' | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cookie_consent') as 'accepted' | 'declined' | 'customized' | null;
};

// Google Analytics Integration (example)
export const initializeAnalytics = () => {
  const preferences = getCookiePreferences();
  
  if (preferences.analytics) {
    // Initialize Google Analytics here
    console.log('Analytics cookies accepted - initializing tracking');
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
  } else {
    console.log('Analytics cookies declined - tracking disabled');
  }
};

// Marketing/Advertising Integration (example)
export const initializeMarketing = () => {
  const preferences = getCookiePreferences();
  
  if (preferences.marketing) {
    // Initialize marketing pixels, Facebook Pixel, etc.
    console.log('Marketing cookies accepted - initializing advertising');
  } else {
    console.log('Marketing cookies declined - advertising disabled');
  }
};

// Functional Cookies Integration (example)
export const initializeFunctional = () => {
  const preferences = getCookiePreferences();
  
  if (preferences.functional) {
    // Initialize functional features like chat widgets, etc.
    console.log('Functional cookies accepted - enabling enhanced features');
  } else {
    console.log('Functional cookies declined - basic functionality only');
  }
};

// Hook to use cookie preferences in components
export const useCookiePreferences = () => {
  const preferences = getCookiePreferences();
  const hasConsented = hasUserConsented();
  const consentStatus = getUserConsentStatus();

  return {
    preferences,
    hasConsented,
    consentStatus,
    canUseAnalytics: preferences.analytics,
    canUseMarketing: preferences.marketing,
    canUseFunctional: preferences.functional
  };
};