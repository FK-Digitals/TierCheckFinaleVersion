import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz - Datenschutzerklärung',
  description: 'Datenschutzerklärung von Tier-Check. Informationen über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten.',
  robots: {
    index: true,
    follow: false,
  },
  alternates: {
    canonical: 'https://tier-check.de/datenschutz',
  },
};

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}