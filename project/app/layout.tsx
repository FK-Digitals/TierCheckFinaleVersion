import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const CookieConsentBanner = dynamic(() => import('./components/CookieConsentBanner'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Tier-Check - Dein Haustier-Ratgeber | Expertenwissen für Tierliebhaber',
    template: '%s | Tier-Check'
  },
  description: 'Entdecke fundierte Ratgeber, praktische Tipps und Expertenwissen für Hunde, Katzen, Vögel und andere Haustiere. Kostenlose Artikel von Tierärzten und Experten.',
  keywords: ['Haustiere', 'Tierratgeber', 'Hunde', 'Katzen', 'Vögel', 'Kleintiere', 'Tierpflege', 'Tiergesundheit', 'Hundeerziehung', 'Katzenpflege'],
  authors: [{ name: 'Tier-Check Team' }],
  creator: 'Tier-Check',
  publisher: 'Tier-Check',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://tier-check.de',
    siteName: 'Tier-Check',
    title: 'Tier-Check - Dein Haustier-Ratgeber',
    description: 'Entdecke fundierte Ratgeber, praktische Tipps und Expertenwissen für Hunde, Katzen, Vögel und andere Haustiere.',
    images: [
      {
        url: '/image copy copy.png',
        width: 1200,
        height: 630,
        alt: 'Tier-Check - Haustier-Ratgeber',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tier-Check - Dein Haustier-Ratgeber',
    description: 'Entdecke fundierte Ratgeber, praktische Tipps und Expertenwissen für Hunde, Katzen, Vögel und andere Haustiere.',
    images: ['/image copy copy.png'],
  },
  alternates: {
    canonical: 'https://tier-check.de',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden max-w-full`}>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
