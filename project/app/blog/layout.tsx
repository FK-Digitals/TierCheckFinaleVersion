import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Alle Artikel über Haustiere',
  description:
    'Entdecke alle unsere Artikel rund um Haustiere, Pflege und Erziehung. Fundierte Ratgeber für Hunde, Katzen, Vögel und andere Tierarten.',
  openGraph: {
    title: 'Tier-Check Blog - Alle Artikel über Haustiere',
    description:
      'Entdecke alle unsere Artikel rund um Haustiere, Pflege und Erziehung. Fundierte Ratgeber für Hunde, Katzen, Vögel und andere Tierarten.',
    type: 'website',
    images: [
      {
        url: '/image copy copy.png',
        width: 1200,
        height: 630,
        alt: 'Tier-Check Blog - Haustier Artikel',
      },
    ],
  },
  alternates: {
    canonical: 'https://tier-check.de/blog',
  },
  other: {
    keywords:
      'Haustier Blog, Tierratgeber, Hundeerziehung, Katzenpflege, Vogelhaltung, Kleintiere, Tierpflege Tipps',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
