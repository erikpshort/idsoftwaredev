// Re-renders the hero and social images for a post that already exists. The
// post text is not touched: the engine's /api/hero route calls only the image
// vendor.
//
// Env: BLOG_ENGINE_URL, BLOG_ENGINE_TOKEN, POST_SLUG, HERO_SCENE (one sentence
// naming the object to draw, with no style words), HERO_HEADLINE
// ("Main line|smaller second line"), DRY_RUN ("true" returns placeholders and
// bills nothing).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const baseUrl = process.env.BLOG_ENGINE_URL?.replace(/\/$/, '');
const token = process.env.BLOG_ENGINE_TOKEN;
const slug = process.env.POST_SLUG?.trim();
const heroScene = process.env.HERO_SCENE?.trim();
const heroHeadline = process.env.HERO_HEADLINE?.trim();
const dryRun = process.env.DRY_RUN === 'true';

if (!baseUrl || !token) throw new Error('BLOG_ENGINE_URL and BLOG_ENGINE_TOKEN are required.');
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Unusable slug: ${slug}`);
if (!fs.existsSync(path.join(root, 'content', 'blog', `${slug}.json`))) {
  throw new Error(`No post with the slug ${slug}.`);
}
if (!heroScene || !heroHeadline) throw new Error('HERO_SCENE and HERO_HEADLINE are required.');

const response = await fetch(`${baseUrl}/api/hero`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'idsoftwaredev-blog-generator',
  },
  body: JSON.stringify({ app: 'idsoftwaredev', heroScene, heroHeadline, dryRun }),
  signal: AbortSignal.timeout(600_000),
});

if (!response.ok) {
  throw new Error(`blog-engine ${response.status}: ${(await response.text()).slice(0, 800)}`);
}

const { images, warnings } = await response.json();
for (const warning of warnings ?? []) console.warn(warning);
if (!images?.hero || !images?.social) throw new Error('The engine returned no images.');

const hero = Buffer.from(images.hero, 'base64');
const social = Buffer.from(images.social, 'base64');
if (dryRun) {
  console.log(`Dry run ok for ${slug}: hero ${hero.length} bytes, social ${social.length} bytes. Nothing written.`);
  process.exit(0);
}

const dir = path.join(root, 'public', 'blog-images', slug);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'hero.jpg'), hero);
fs.writeFileSync(path.join(dir, 'social.jpg'), social);
console.log(`Wrote new hero and social images for ${slug}`);
