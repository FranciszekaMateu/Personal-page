import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPostBySlug, type BlogPost } from "@/data/posts";

type Locale = "en" | "es";

function localizePost(post: BlogPost, locale: Locale) {
  return {
    slug: post.slug,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    title: post.title[locale] || post.title.en,
    description: post.description[locale] || post.description.en,
    content: post.contentHtml[locale] || post.contentHtml.en,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const locale = (searchParams.get("locale") as Locale) || "en";

  // Simulate server-side processing delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({
      post: localizePost(post, locale),
      locale,
      timestamp: new Date().toISOString(),
    });
  }

  const posts = (await getAllPosts()).map((p) => localizePost(p, locale));
  return NextResponse.json({
    posts,
    count: posts.length,
    locale,
    timestamp: new Date().toISOString(),
  });
}
