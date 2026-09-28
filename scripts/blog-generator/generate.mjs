import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const queuePath = path.join(root, 'blog-queue.json');
const contentDir = path.join(root, 'content', 'blog');
const imageDir = path.join(root, 'public', 'blog-images');

function boiseToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Boise',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function publishedLinks() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const post = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
      return { slug: post.slug, title: post.title };
    });
}

const dryRun = process.argv.includes('--dry-run') || process.env.DRY_RUN === 'true';
const baseUrl = process.env.BLOG_ENGINE_URL?.replace(/\/$/, '');
const token = process.env.BLOG_ENGINE_TOKEN;
if (!baseUrl || !token) {
  throw new Error('BLOG_ENGINE_URL and BLOG_ENGINE_TOKEN are required.');
}

const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const today = boiseToday();
const item = queue.find((entry) => entry.status === 'queued' && entry.publishOn <= today);
if (!item) {
  console.log(`No queued topic is due on or before ${today}.`);
  process.exit(0);
}

const links = publishedLinks();
const response = await fetch(`${baseUrl}/api/generate`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'idsoftwaredev-blog-generator',
  },
  body: JSON.stringify({
    app: 'idsoftwaredev',
    topic: item.topic,
    angle: item.angle,
    keywords: item.keywords,
    questions: item.questions,
    links,
    publishOn: item.publishOn,
    dryRun,
  }),
  signal: AbortSignal.timeout(900_000),
});

if (!response.ok) {
  throw new Error(`blog-engine ${response.status}: ${(await response.text()).slice(0, 800)}`);
}

const { post, images, warnings } = await response.json();
for (const warning of warnings ?? []) console.warn(warning);

if (dryRun) {
  console.log(`Dry run ok: ${post.slug} — ${post.title}`);
  console.log(`hero bytes ${images?.hero ? Buffer.from(images.hero, 'base64').length : 0}`);
  process.exit(0);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
  throw new Error(`Engine returned an unusable slug: ${post.slug}`);
}
if (links.some((link) => link.slug === post.slug) || fs.existsSync(path.join(contentDir, `${post.slug}.json`))) {
  throw new Error(`Slug already published: ${post.slug}`);
}

fs.mkdirSync(contentDir, { recursive: true });
fs.writeFileSync(
  path.join(contentDir, `${post.slug}.json`),
  JSON.stringify(
    {
      title: post.title,
      slug: post.slug,
      description: post.description,
      author: post.author,
      publishDate: post.publishDate,
      tags: post.tags,
      markdown: post.markdown,
      quickAnswer: post.quickAnswer ?? null,
      faqJsonLd: post.faqJsonLd ?? null,
      imageAlt: post.imageAlt ?? null,
    },
    null,
    2,
  ) + '\n',
);

if (images?.hero && images?.social) {
  const dir = path.join(imageDir, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'hero.jpg'), Buffer.from(images.hero, 'base64'));
  fs.writeFileSync(path.join(dir, 'social.jpg'), Buffer.from(images.social, 'base64'));
} else {
  console.warn('No images returned. The post will ship without a hero.');
}

item.status = 'done';
item.slug = post.slug;
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + '\n');
console.log(`Wrote ${post.slug}`);
