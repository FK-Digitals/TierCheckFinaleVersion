import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB - Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen von Tier-Check. Nutzungsbedingungen für unsere Website und Services.',
  robots: {
    index: true,
    follow: false,
  },
  alternates: {
    canonical: 'https://tier-check.de/agb',
  },
};

export default function AGBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}