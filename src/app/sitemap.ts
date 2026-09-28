import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishDate,
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: posts[0]?.lastModified ?? new Date() },
    ...posts,
    { url: `${SITE_URL}/privacy-policy` },
    { url: `${SITE_URL}/terms-of-service` },
    { url: `${SITE_URL}/sms-signup` },
  ];
}
