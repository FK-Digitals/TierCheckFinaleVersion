import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie-Richtlinie - Informationen zu Cookies',
  description: 'Cookie-Richtlinie von Tier-Check. Informationen über die Verwendung von Cookies auf unserer Website.',
  robots: {
    index: true,
    follow: false,
  },
  alternates: {
    canonical: 'https://tier-check.de/cookies',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}