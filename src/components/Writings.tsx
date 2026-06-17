"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  timestamp: string;
  locale: string;
}

export default function Writings() {
  const { t, locale } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string>("");

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts?locale=${locale}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data: ApiResponse = await response.json();
      setPosts(data.posts);
      setLastFetched(new Date(data.timestamp).toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <section className="py-20 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between flex-wrap gap-4"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/50 mb-2">
            <span className="text-accent font-bold">$</span>{" "}
            {t("section.writings")}
          </p>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            {t("section.writings.subtitle")}
          </h2>
        </div>
        
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider border-[1.5px] border-foreground px-2 py-0.5 text-foreground hover:bg-accent-secondary transition-colors duration-150 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-150"}`} />
          {loading ? t("writings.loading") : t("writings.refresh")}
        </button>
      </motion.div>

      {lastFetched && !loading && (
        <p className="font-mono text-[10px] text-foreground/30 -mt-4">
          {t("writings.fetched")} {lastFetched}
        </p>
      )}

      <AnimatePresence mode="wait">
        {loading && posts.length === 0 ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-0"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-7 border-b-[2px] border-foreground/10">
                <div className="h-3 w-20 bg-muted border-[1.5px] border-foreground/10 animate-pulse mb-3" />
                <div className="h-6 w-2/3 bg-muted border-[1.5px] border-foreground/10 animate-pulse mb-2" />
                <div className="h-4 w-1/2 bg-muted border-[1.5px] border-foreground/10 animate-pulse" />
              </div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-foreground/60 font-sans text-sm">
              {t("writings.error")}: {error}
            </p>
            <button 
              onClick={fetchPosts}
              className="mt-4 text-sm font-mono uppercase text-foreground border-[1.5px] border-foreground px-3 py-1 hover:bg-accent-secondary transition-colors duration-150"
            >
              {t("writings.tryAgain")}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  className="editorial-row group block py-7"
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-xs text-foreground/40 uppercase tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-sans text-2xl md:text-3xl text-foreground font-bold row-title transition-all duration-150">
                      {post.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-foreground/60 leading-relaxed max-w-2xl ml-0 md:ml-10">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 ml-0 md:ml-10 pt-3">
                    <span className="font-mono text-[10px] uppercase text-foreground/40 tabular-nums">
                      {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-foreground/30">·</span>
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
                    <ArrowUpRight className="w-4 h-4 text-foreground/40 ml-auto opacity-0 row-arrow transition-all duration-150" />
                  </div>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: posts.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/blog"
                className="editorial-row group flex items-center justify-between py-5 sm:py-6 md:py-7"
              >
                <span className="font-sans font-bold uppercase text-lg sm:text-xl md:text-2xl tracking-tight text-foreground row-title transition-all duration-150">
                  {t("writings.viewAll")}
                </span>
                <ArrowUpRight className="w-4 h-4 text-foreground/40 opacity-0 row-arrow transition-all duration-150" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
