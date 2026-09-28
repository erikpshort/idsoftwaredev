import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page is not on the Idaho Software Development site.',
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 py-24">
      <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[var(--muted)] uppercase">404</p>
      <h1 className="font-display mt-4 text-[clamp(2rem,4.6vw,3.2rem)] leading-none">That page is not here.</h1>
      <p className="mt-6 max-w-[46ch] text-[var(--muted)]">The shop&apos;s work, and the way to start a project, are on the home page.</p>
      <Link href="/" className="mt-8 inline-block text-[var(--ink)] underline decoration-[var(--teal)] underline-offset-4">
        Back to the shop
      </Link>
    </div>
  );
}
