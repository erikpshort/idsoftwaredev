import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { AUTHOR, SITE_NAME, SITE_URL, authorJsonLd } from '@/lib/site';

const description = `${AUTHOR.name} is the founder of ${SITE_NAME}, a Treasure Valley shop building custom software, workflows, apps, and AI integration.`;

export const metadata: Metadata = {
  title: `${AUTHOR.name}, Founder`,
  description,
  alternates: { canonical: AUTHOR.path },
  openGraph: {
    type: 'profile',
    url: AUTHOR.path,
    title: `${AUTHOR.name} | ${SITE_NAME}`,
    description,
    images: [{ url: AUTHOR.image, alt: AUTHOR.name }],
  },
};

export default function ErikShortPage() {
  const posts = getPosts().filter((post) => post.author === AUTHOR.name);
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_URL}${AUTHOR.path}`,
    mainEntity: { ...authorJsonLd, description },
  };

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
      <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[var(--muted)] uppercase">Author</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src={AUTHOR.image}
          alt={AUTHOR.name}
          width={240}
          height={266}
          priority
          className="h-auto w-40 shrink-0 object-cover sm:w-56"
        />
        <div>
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none">{AUTHOR.name}</h1>
          <p className="font-mono mt-4 text-[0.75rem] tracking-wide text-[var(--faint)]">
            {AUTHOR.jobTitle}, {SITE_NAME} · Treasure Valley
          </p>
          <p className="mt-6 max-w-[54ch] text-[1.125rem] text-[var(--muted)]">
            Erik runs {SITE_NAME}, building custom software, workflow tools, mobile apps, and AI
            integration for Treasure Valley businesses that have outgrown their tools.
          </p>
          <p className="mt-4">
            <a
              href="mailto:admin@idsoftwaredev.com"
              className="text-[var(--ink)] underline decoration-[var(--teal)] underline-offset-4"
            >
              admin@idsoftwaredev.com
            </a>
          </p>
        </div>
      </div>
      {posts.length ? (
        <div className="mt-14">
          <h2 className="font-display text-[1.8rem] leading-tight">Notes by Erik</h2>
          {posts.map((post) => (
            <article key={post.slug} className="border-t border-[var(--line)] py-6 first:mt-6">
              <h3 className="font-display text-[1.4rem] leading-tight">
                <Link href={`/blog/${post.slug}`} className="no-underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-[62ch] text-[var(--muted)]">{post.description}</p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
