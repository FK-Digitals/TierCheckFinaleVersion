import { getBlogPostBySlug } from "../../lib/blogData";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Artikel nicht gefunden",
      description: "Der gesuchte Artikel konnte nicht gefunden werden.",
    };
  }

  const seoTitle =
    post.title.length > 60 ? post.title.slice(0, 57) + "..." : post.title;

  const seoDescription =
    post.excerpt.length > 160 ? post.excerpt.slice(0, 157) + "..." : post.excerpt;

  const keywords = [
    post.category.toLowerCase(),
    ...post.title.toLowerCase().split(" ").filter(w => w.length > 3),
    "haustiere",
    "tierratgeber",
    "tierpflege",
  ].join(", ");

  const ogAuthors = typeof post.author === "string" && post.author ? [post.author] : undefined;
  const ogImages = post.image ? [{
    url: post.image,
    width: 1200,
    height: 630,
    alt: post.title,
  }] : [];

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: post.date,
      authors: ogAuthors,
      images: ogImages,
      locale: "de_DE",
      siteName: "Tier-Check",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: post.image ? [post.image] : undefined,
    },
    alternates: { canonical: `https://tier-check.de/blog/${post.slug}` },
    robots: {
      index: post.status === "published",
      follow: post.status === "published",
    },
    other: {
      keywords,
      category: post.category,
      publishedTime: post.date,
      author: post.author ?? "",
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
