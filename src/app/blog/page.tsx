"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import AmbientBackground from "@/components/AmbientBackground";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
  tags: string[];
}

interface ApiResponse {
  posts: BlogPost[];
  count: number;
  locale: string;
}

export default function BlogPage() {
  const { t, locale } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?locale=${locale}`, { cache: "no-store" });
        const data: ApiResponse = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [locale]);

  return (
    <main className="min-h-screen text-foreground relative overflow-hidden selection:bg-accent selection:text-white">
      <AmbientBackground />
      <Navigation />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
          {t("blog.back")}
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/50">
            <span className="text-accent font-bold">$</span> 002 / {t("blog.allWritings")}
          </p>
          <h1 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            {t("blog.title.line1")} <br />
            <span className="gradient-text">{t("blog.title.line2")}</span>
          </h1>
          <p className="font-sans text-base text-foreground/60 max-w-xl leading-relaxed pt-2">
            {t("blog.count").replace("{count}", posts.length.toString()).replace("{plural}", posts.length !== 1 ? 's' : '')}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-6 border-b-[2.5px] border-foreground/10 animate-pulse">
                <div className="h-3 w-20 bg-muted border-[1.5px] border-foreground/10 mb-3" />
                <div className="h-6 w-2/3 bg-muted border-[1.5px] border-foreground/10 mb-2" />
                <div className="h-4 w-1/2 bg-muted border-[1.5px] border-foreground/10" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="font-mono text-sm text-foreground/50 uppercase">{t("blog.empty")}</p>
        ) : (
          <div className="space-y-0">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="editorial-row group block py-5 sm:py-6"
              >
                <div className="flex items-baseline gap-3 md:gap-4 mb-2 flex-wrap sm:flex-nowrap">
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tabular-nums flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground row-title transition-all duration-150 leading-tight min-w-0">
                    {post.title}
                  </h2>
                </div>
                <p className="font-sans text-sm sm:text-base text-foreground/60 leading-relaxed max-w-2xl sm:ml-6 md:ml-10">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 sm:ml-6 md:ml-10 pt-3">
                  <span className="font-mono text-[10px] uppercase text-foreground/40 tabular-nums">
                    {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                  </span>
                  <span className="text-foreground/20">·</span>
                  <span className="font-mono text-[10px] uppercase text-foreground/40">
                    {post.readTime}
                  </span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase text-foreground/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
