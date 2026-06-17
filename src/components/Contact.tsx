"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-3xl font-bold font-mono tracking-tight">Let's Connect</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-gradient">Ready to build something great?</h3>
          <p className="text-secondary max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to bring your vision to life.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="mailto:franciscomateoescobar1@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-black font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            <Mail className="w-5 h-5" />
            <span>Send an Email</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/franciscoesscobarr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass-card font-medium hover:border-accent/30 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </motion.a>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-mono">
          <a href="mailto:franciscomateoescobar1@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail className="w-4 h-4" />
            franciscomateoescobar1@gmail.com
          </a>
          <a href="https://github.com/FranciszekaMateu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Github className="w-4 h-4" />
            github.com/FranciszekaMateu
          </a>
        </div>
      </motion.div>
    </section>
  );
}
