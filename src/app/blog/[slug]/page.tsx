"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import AmbientBackground from "@/components/AmbientBackground";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  readTime: string;
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/posts?slug=${params.slug}&locale=${locale}`,
          { cache: "no-store" }
        );
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (params.slug) fetchPost();
  }, [params.slug, locale]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(scrolled * 100, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  if (loading) {
    return (
      <main className="min-h-screen text-foreground flex items-center justify-center bg-background">
        <div className="font-mono text-sm text-foreground/50 uppercase tracking-widest animate-pulse">
          Loading...
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen text-foreground flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-6">
          <p className="text-8xl font-black text-accent">404</p>
          <p className="font-sans text-lg text-foreground/60">
            {locale === "es"
              ? "No encontramos esta entrada."
              : "We couldn't find this post."}
          </p>
          <Link
            href="/blog"
            className="btn-brutal btn-brutal-secondary inline-flex items-center gap-2 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.post.back")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-foreground relative selection:bg-accent selection:text-white">
      <AmbientBackground />

      {/* Reading progress bar — thick brutalist */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-muted z-50">
        <motion.div
          className="h-full bg-accent origin-left"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <Navigation />

      <article className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-32">
        {/* Header */}
        <header className="max-w-2xl mx-auto px-5 sm:px-6 md:px-8 mb-10 sm:mb-12 md:mb-16">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors duration-150 mb-8 sm:mb-10 md:mb-12"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-150" />
              {t("blog.post.back")}
            </Link>
          </motion.div>

          {/* Category kicker */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-accent font-bold mb-4 sm:mb-5"
          >
            {post.tags[0] || "Essay"} · {t("blog.post.writings")}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-foreground text-balance mb-5 sm:mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Deck */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-foreground/60 leading-snug text-balance"
          >
            {post.description}
          </motion.p>

          {/* Byline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-8 sm:mt-10 pt-6 border-t-[3px] border-foreground"
          >
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-accent text-white flex items-center justify-center font-mono text-sm font-bold">
                  FE
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground font-bold leading-tight">
                    Francisco Escobar
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/50 leading-tight">
                    {t("blog.post.authorRole")}
                  </p>
                </div>
              </div>
              <span className="text-foreground/20 hidden sm:inline">·</span>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-foreground/50">
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString(
                    locale === "es" ? "es-ES" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} {t("blog.post.read")}
                </span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-[680px] mx-auto px-5 sm:px-6 md:px-8"
        >
          <div
            className="article-body font-sans text-[16px] sm:text-[17px] md:text-[18px] leading-[1.75] text-foreground/80
              [&>p]:mb-6 [&>p]:text-balance
              [&>h2]:font-sans [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-extrabold [&>h2]:uppercase [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:sm:mt-14 [&>h2]:md:mt-16 [&>h2]:mb-5 [&>h2]:sm:mb-6 [&>h2]:leading-[1.1] [&>h2]:tracking-tight
              [&>h3]:font-sans [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:uppercase [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:sm:mt-12 [&>h3]:mb-4 [&>h3]:leading-[1.2]
              [&>ul]:my-6 [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:list-disc
              [&>ol]:my-6 [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:list-decimal
              [&>li]:text-foreground/80 [&>li]:leading-[1.75] [&>li>strong]:text-foreground [&>li>strong]:font-bold
              [&>blockquote]:border-l-[4px] [&>blockquote]:border-accent [&>blockquote]:pl-5 [&>blockquote]:sm:pl-6 [&>blockquote]:not-italic [&>blockquote]:text-foreground/60 [&>blockquote]:my-8 [&>blockquote]:text-lg [&>blockquote]:font-medium
              [&>strong]:font-bold [&>strong]:text-foreground
              [&>em]:italic
              [&>code]:font-mono [&>code]:text-[0.85em] [&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:border-[1.5px] [&>code]:border-foreground/20 [&>code]:text-foreground
              [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:sm:p-5 [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:text-sm [&>pre]:font-mono [&>pre]:leading-relaxed [&>pre]:border-[2px] [&>pre]:border-foreground
              [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:border-0 [&>pre>code]:text-foreground/80
              [&>a]:text-accent [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-accent/50 [&>a]:hover:decoration-accent [&>a]:font-medium
              [&>hr]:my-12 [&>hr]:border-foreground/20 [&>hr]:border-t-[2px]
              [&>:first-child>p:first-child]:first-letter:font-sans
              [&>:first-child>p:first-child]:first-letter:text-6xl
              [&>:first-child>p:first-child]:first-letter:sm:text-7xl
              [&>:first-child>p:first-child]:first-letter:md:text-[88px]
              [&>:first-child>p:first-child]:first-letter:font-black
              [&>:first-child>p:first-child]:first-letter:float-left
              [&>:first-child>p:first-child]:first-letter:mr-3
              [&>:first-child>p:first-child]:first-letter:sm:mr-4
              [&>:first-child>p:first-child]:first-letter:md:mr-5
              [&>:first-child>p:first-child]:first-letter:mt-1
              [&>:first-child>p:first-child]:first-letter:sm:mt-2
              [&>:first-child>p:first-child]:first-letter:leading-[0.85]
              [&>:first-child>p:first-child]:first-letter:text-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* End mark — thick bar */}
          <div className="mt-12 sm:mt-14 md:mt-16 flex items-center justify-center gap-3">
            <span className="h-[3px] flex-1 max-w-[40px] bg-foreground" />
            <span className="font-mono text-xs font-bold text-foreground/40 uppercase">End</span>
            <span className="h-[3px] flex-1 max-w-[40px] bg-foreground" />
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto px-5 sm:px-6 md:px-8 mt-16 sm:mt-20 md:mt-24">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider border-[2px] border-foreground text-foreground hover:bg-accent-secondary transition-colors duration-100 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author card */}
          <div className="border-t-[3px] border-foreground pt-10 sm:pt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent text-white flex items-center justify-center font-mono text-base sm:text-lg font-bold flex-shrink-0">
                FE
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                  {t("blog.post.writtenBy")}
                </p>
                <p className="font-sans text-lg sm:text-xl text-foreground font-bold uppercase mb-1">
                  Francisco Escobar
                </p>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  {t("blog.post.authorBio")}
                </p>
                <div className="flex items-center gap-3 mt-3 font-mono text-xs uppercase tracking-wider">
                  <a
                    href="https://github.com/FranciszekaMateu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/50 hover:text-accent transition-colors duration-100"
                  >
                    GitHub
                  </a>
                  <span className="text-foreground/20">·</span>
                  <a
                    href="https://www.linkedin.com/in/franciscoesscobarr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/50 hover:text-accent transition-colors duration-100"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/blog"
              className="btn-brutal btn-brutal-secondary inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {t("blog.post.more")}
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
