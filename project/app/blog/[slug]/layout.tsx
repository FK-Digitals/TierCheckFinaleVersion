import { getBlogPostBySlug } from '../../lib/blogData';
import type { Metadata } from 'next';

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artikel nicht gefunden',
      description: 'Der gesuchte Artikel konnte nicht gefunden werden.',
    };
  }

  // Generate SEO-optimized title
  const seoTitle = post.title.length > 60 
    ? post.title.substring(0, 57) + '...' 
    : post.title;

  // Generate SEO-optimized description
  const seoDescription = post.excerpt.length > 160 
    ? post.excerpt.substring(0, 157) + '...' 
    : post.excerpt;

  // Generate keywords from title and category
  const keywords = [
    post.category.toLowerCase(),
    ...post.title.toLowerCase().split(' ').filter(word => word.length > 3),
    'haustiere',
    'tierratgeber',
    'tierpflege'
  ].join(', '); // Als kommaseparierter String für Meta-Tags

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'de_DE',
      siteName: 'Tier-Check',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [post.image],
    },
    alternates: {
      canonical: `https://tier-check.de/blog/${post.slug}`,
    },
    robots: {
      index: post.status === 'published',
      follow: post.status === 'published',
    },
    other: {
      keywords: keywords,
      category: post.category,
      publishedTime: post.date,
      author: post.author,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
