import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, hasHero } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Custom Software Notes',
  description:
    'Notes on custom software for Idaho and Treasure Valley businesses, from the shop that builds it.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Custom Software Notes | Idaho Software Development',
    description:
      'Notes on custom software for Idaho and Treasure Valley businesses, from the shop that builds it.',
    url: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16">
      <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[var(--muted)] uppercase">Notes</p>
      <h1 className="font-display mt-4 max-w-[12ch] text-[clamp(2.4rem,5vw,3.6rem)] leading-none">
        From the shop.
      </h1>
      <p className="mt-6 max-w-[54ch] text-[1.125rem] text-[var(--muted)]">
        How a Treasure Valley software shop thinks about custom software, and when a website is the smaller job.
      </p>
      <div className="mt-14">
        {posts.map((post) => (
          <article key={post.slug} className="border-t border-[var(--line)] py-8">
            <p className="font-mono text-[0.72rem] tracking-[0.14em] text-[var(--faint)] uppercase">
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                timeZone: 'America/Boise',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h2 className="font-display mt-3 text-[1.8rem] leading-tight">
              <Link href={`/blog/${post.slug}`} className="no-underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-[62ch] text-[var(--muted)]">{post.description}</p>
            {hasHero(post.slug) ? (
              <Image
                src={`/blog-images/${post.slug}/hero.jpg`}
                alt=""
                width={1600}
                height={900}
                className="mt-6 aspect-video w-full max-w-[720px] object-cover"
              />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
