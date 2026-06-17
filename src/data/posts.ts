import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export interface BilingualField {
  en: string;
  es: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  title: BilingualField;
  description: BilingualField;
  contentHtml: {
    en: string;
    es: string;
  };
}

const POSTS_DIR_EN = path.join(process.cwd(), "content", "posts", "en");
const POSTS_DIR_ES = path.join(process.cwd(), "content", "posts", "es");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePostFile(filePath: string): Omit<BlogPost, "contentHtml"> & { _rawContent: { en: string; es: string } } {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Detect if file is bilingual (has nested en/es in title) or single-language
  const isBilingual = typeof data.title === "object";

  if (isBilingual) {
    return {
      slug: data.slug,
      date: data.date,
      readTime: data.readTime,
      tags: data.tags || [],
      title: data.title,
      description: data.description,
      _rawContent: { en: content, es: content }, // fallback: same content
    };
  }

  // Single-language file: figure out which folder it's in
  const isEs = filePath.includes(path.join("posts", "es"));
  const lang = isEs ? "es" : "en";
  return {
    slug: data.slug,
    date: data.date,
    readTime: data.readTime,
    tags: data.tags || [],
    title: { en: data.title, es: data.title },
    description: { en: data.description, es: data.description },
    _rawContent: lang === "en" ? { en: content, es: "" } : { en: "", es: content },
  };
}

async function renderMarkdown(md: string): Promise<string> {
  const result = await remark().use(gfm).use(html, { sanitize: false }).process(md);
  return result.toString();
}

let cache: BlogPost[] | null = null;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (cache) return cache;

  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  // Collect all post files (both flat and per-locale)
  const postMap = new Map<string, BlogPost>();

  // Flat structure: content/posts/*.md (bilingual)
  const flatFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const file of flatFiles) {
    const parsed = parsePostFile(path.join(POSTS_DIR, file));
    const enHtml = await renderMarkdown(parsed._rawContent.en);
    const esContent = parsed._rawContent.es || parsed._rawContent.en;
    const esHtml = await renderMarkdown(esContent);
    postMap.set(parsed.slug, {
      slug: parsed.slug,
      date: parsed.date,
      readTime: parsed.readTime,
      tags: parsed.tags,
      title: parsed.title,
      description: parsed.description,
      contentHtml: { en: enHtml, es: esHtml },
    });
  }

  // Per-locale: content/posts/en/*.md and content/posts/es/*.md
  for (const locale of ["en", "es"] as const) {
    const dir = locale === "en" ? POSTS_DIR_EN : POSTS_DIR_ES;
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const parsed = parsePostFile(path.join(dir, file));
      const htmlContent = await renderMarkdown(parsed._rawContent[locale]);
      const existing = postMap.get(parsed.slug);
      if (existing) {
        existing.contentHtml[locale] = htmlContent;
      } else {
        postMap.set(parsed.slug, {
          slug: parsed.slug,
          date: parsed.date,
          readTime: parsed.readTime,
          tags: parsed.tags,
          title: parsed.title,
          description: parsed.description,
          contentHtml: {
            en: locale === "en" ? htmlContent : "",
            es: locale === "es" ? htmlContent : "",
          },
        });
      }
    }
  }

  cache = Array.from(postMap.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return cache;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug);
}
