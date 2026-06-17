"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Layers, Wrench, GitBranch, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    skills: ["React", "Next.js", "Vue.js", "React Native", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    skills: ["Node.js", "Express.js", "NestJS", "RESTful APIs"]
  },
  {
    title: "Databases",
    icon: Database,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose"]
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    skills: ["Git", "Docker", "Jest", "Postman", "NPM/Yarn"]
  },
  {
    title: "Methodologies",
    icon: Layers,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    skills: ["Agile", "Scrum", "CI/CD", "TDD"]
  }
];

export default function Skills() {
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
          <Terminal className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-3xl font-bold font-mono tracking-tight">Tech Stack</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass-card rounded-2xl p-6 space-y-4 group"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${category.bg} ${category.border} border`}>
              <category.icon className={`w-4 h-4 ${category.color}`} />
              <h3 className="font-semibold font-mono text-sm">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-lg bg-muted/50 border border-white/5 text-secondary group-hover:border-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        
        {/* Bento grid filler for aesthetic balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-3 md:col-span-2 lg:col-span-1"
        >
          <GitBranch className="w-8 h-8 text-accent" />
          <h3 className="font-semibold font-mono">Clean Code</h3>
          <p className="text-sm text-muted-foreground">
            Writing maintainable, scalable, and well-documented code is at the core of my engineering philosophy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
