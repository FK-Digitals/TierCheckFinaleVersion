import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Wir sind für dich da',
  description: 'Kontaktiere das Tier-Check Team bei Fragen zu deinem Haustier. Schnelle Antworten von Experten innerhalb von 24 Stunden.',
  keywords: ['Kontakt', 'Haustier Beratung', 'Tier Experten', 'Haustier Fragen', 'Tierberatung'],
  openGraph: {
    title: 'Kontakt - Tier-Check',
    description: 'Kontaktiere das Tier-Check Team bei Fragen zu deinem Haustier. Schnelle Antworten von Experten innerhalb von 24 Stunden.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tier-check.de/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}