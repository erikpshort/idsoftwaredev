import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'marked';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
  tags: string[];
  markdown: string;
  quickAnswer: string | null;
  faqJsonLd: Record<string, unknown> | null;
  imageAlt: string | null;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'blog-images');

function isSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function readPostFile(file: string): BlogPost {
  const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')) as BlogPost;
  if (!isSlug(raw.slug)) {
    throw new Error(`Blog post ${file} has an invalid slug.`);
  }
  return raw;
}

export function getPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.json'))
    .map(readPostFile)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getPost(slug: string): BlogPost | null {
  if (!isSlug(slug)) return null;
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return readPostFile(`${slug}.json`);
}

export function hasHero(slug: string) {
  return fs.existsSync(path.join(IMAGE_DIR, slug, 'hero.jpg'));
}

export function hasSocial(slug: string) {
  return fs.existsSync(path.join(IMAGE_DIR, slug, 'social.jpg'));
}

export function renderMarkdown(markdown: string) {
  return parse(markdown, { async: false, gfm: true });
}
