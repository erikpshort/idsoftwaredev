import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, hasHero, hasSocial, renderMarkdown } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Params = { slug: string };

function pageTitle(title: string) {
  const combined = `${title} | ${SITE_NAME}`;
  return combined.length <= 60 ? combined : title;
}

function pageDescription(description: string) {
  if (description.length <= 155) return description;
  const cut = description.slice(0, 152);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}

export function generateStaticParams(): Params[] {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = pageTitle(post.title);
  const description = pageDescription(post.description);
  const url = `/blog/${post.slug}`;
  const images = hasSocial(post.slug)
    ? [
        {
          url: `/blog-images/${post.slug}/social.jpg`,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ]
    : undefined;
  return {
    title: { absolute: title },
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.publishDate,
      authors: [post.author],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: canonical,
    image: hasSocial(post.slug) ? `${SITE_URL}/blog-images/${post.slug}/social.jpg` : undefined,
    keywords: post.tags.join(', '),
  };

  return (
    <article className="mx-auto max-w-[1080px] px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      {post.faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqJsonLd) }} />
      ) : null}
      <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[var(--muted)] uppercase">
        <Link href="/blog" className="no-underline">
          Notes
        </Link>
      </p>
      <h1 className="font-display mt-4 max-w-[18ch] text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">
        {post.title}
      </h1>
      <p className="font-mono mt-4 text-[0.75rem] tracking-wide text-[var(--faint)]">
        {post.author}
        {' · '}
        {new Date(post.publishDate).toLocaleDateString('en-US', {
          timeZone: 'America/Boise',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {hasHero(post.slug) ? (
        <Image
          src={`/blog-images/${post.slug}/hero.jpg`}
          alt={post.imageAlt || ''}
          width={1600}
          height={900}
          priority
          className="mt-8 aspect-video w-full max-w-[960px] object-cover"
        />
      ) : null}
      <div className="article mt-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.markdown) }} />
    </article>
  );
}
