import { getPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function GET() {
  const posts = getPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `<item>
<title>${escapeXml(post.title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
<description>${escapeXml(post.description)}</description>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(SITE_NAME)}</title>
<link>${SITE_URL}/blog</link>
<description>Notes on custom software from Idaho Software Development.</description>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
