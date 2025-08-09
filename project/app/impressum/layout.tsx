import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - Rechtliche Informationen',
  description: 'Impressum und rechtliche Informationen zu Tier-Check. Angaben gemäß § 5 TMG.',
  robots: {
    index: true,
    follow: false,
  },
  alternates: {
    canonical: 'https://tier-check.de/impressum',
  },
};

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}