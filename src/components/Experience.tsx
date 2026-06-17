"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Founder & Full Stack Engineer",
    company: "Eikos Labs",
    location: "Montevideo / Remote",
    period: "2024 – Present",
    description: "Building innovative software solutions and scalable web applications from the ground up.",
    details: [
      "Architecting and developing full-stack applications for diverse client needs",
      "Leading product design, development, and deployment cycles",
      "Implementing modern web technologies to ensure high performance and scalability",
      "Driving technical vision and engineering best practices"
    ],
    tech: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
  },
  {
    role: "Full Stack Engineer",
    company: "Levity",
    location: "Montevideo",
    period: "Oct 2022 – Feb 2025",
    description: "Designed and developed scalable web applications using SCRUM methodology.",
    details: [
      "Developed responsive UIs using React & Next.js",
      "Built RESTful APIs with Node.js, Express, and MongoDB",
      "Implemented reusable, maintainable component libraries",
      "Integrated internal and third-party APIs",
      "Performed unit testing and React component integration"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "NestJS", "Next.js", "Tailwind"]
  },
  {
    role: "Front End Specialist",
    company: "Freelance",
    location: "Remote",
    period: "Jul 2019 – Present",
    description: "Delivered modern, high-performance web solutions for diverse clients.",
    details: [
      "Skybluepark: Redesigned and modernized landing page",
      "Sofwareros INC: Modernized corporate webpage with 3D elements",
      "Wifi Gomera: Redesigned, optimized, and improved SEO",
      "Various clients: Performance-focused landing pages & sales funnels"
    ],
    tech: ["Three.js", "Astro", "Next.js", "JavaScript", "CSS"]
  }
];

export default function Experience() {
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
          <Briefcase className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-3xl font-bold font-mono tracking-tight">Experience</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-muted border border-white/10 text-secondary">
                  {exp.company}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>
            </div>

            <p className="text-secondary leading-relaxed">{exp.description}</p>
            
            <ul className="space-y-3">
              {exp.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {exp.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-muted/50 border border-white/5 font-mono text-secondary">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
