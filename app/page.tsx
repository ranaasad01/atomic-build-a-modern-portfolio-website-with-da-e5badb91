"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_EMAIL } from "@/lib/data";
import { ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ExternalLink, Star, Sparkles, Code, Layout, Terminal, Activity, Check, ArrowUp } from 'lucide-react';

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: "p1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library built for scale. Tokens, themes, and 80+ accessible components powering three production products.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "p2",
    title: "Orbit Analytics Dashboard",
    description:
      "Real-time data visualization platform for SaaS metrics. Custom chart primitives, live WebSocket feeds, and a dark-first UI.",
    tags: ["Next.js", "D3.js", "WebSockets", "Tailwind"],
    image: "https://i.ytimg.com/vi/glCQ5z3yMno/maxresdefault.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "p3",
    title: "Vela E-Commerce Platform",
    description:
      "Headless storefront with sub-100ms page loads, edge-rendered product pages, and a custom checkout flow that lifted conversion by 34%.",
    tags: ["Next.js", "Shopify", "Edge Runtime", "Framer Motion"],
    image: "https://welcome.getvela.ai/open-graph.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "p4",
    title: "Pulse Mobile App",
    description:
      "Cross-platform fitness tracking app with AI-powered coaching, motion-based gesture controls, and offline-first architecture.",
    tags: ["React Native", "Expo", "TensorFlow Lite", "SQLite"],
    image: "https://play-lh.googleusercontent.com/3gvSC902Etqh70J9zBlwpPYNu9C79LAu_Y1ebPuCQ2wVw-qdxg_uelAZo0GzMJAVgh2PIKnRo9Iymm8NOlXZmjE",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];

const skills = [
  { name: "React & Next.js", category: "Frontend", level: 98 },
  { name: "TypeScript", category: "Language", level: 95 },
  { name: "Node.js & APIs", category: "Backend", level: 88 },
  { name: "UI / UX Design", category: "Design", level: 85 },
  { name: "Framer Motion", category: "Animation", level: 90 },
  { name: "PostgreSQL", category: "Database", level: 80 },
  { name: "Docker & CI/CD", category: "DevOps", level: 78 },
  { name: "Three.js / WebGL", category: "3D", level: 72 },
];

const services = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect interfaces built with React and Next.js. Performance-first, accessible by default, and delightful to use.",
  },
  {
    icon: Terminal,
    title: "Full-Stack Development",
    description:
      "End-to-end product development from database schema to deployed API. Clean architecture, typed throughout.",
  },
  {
    icon: Code,
    title: "Design Systems",
    description:
      "Scalable component libraries with Storybook, design tokens, and thorough documentation that teams actually use.",
  },
  {
    icon: Activity,
    title: "Performance Audits",
    description:
      "Deep-dive Core Web Vitals analysis and optimization. Real improvements measured in Lighthouse scores and revenue.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://www.wallstreetmojo.com/wp-content/uploads/2023/07/Performa-Invoice.jpg",
    text: "Alex delivered a design system that our entire engineering org adopted within weeks. The documentation alone was worth the engagement.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Orbit",
    avatar: "https://www.wallstreetmojo.com/wp-content/uploads/2023/07/Performa-Invoice.jpg",
    text: "Shipped our analytics dashboard in 6 weeks. Performance, design, and code quality all exceeded expectations. Will hire again.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Product Lead at Vela",
    avatar: "https://www.wallstreetmojo.com/wp-content/uploads/2023/07/Performa-Invoice.jpg",
    text: "The new storefront Alex built increased our conversion rate by 34%. He understood both the technical and business requirements perfectly.",
    stars: 5,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: `mailto:${APP_EMAIL}` },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-4">
      <Sparkles size={12} className="text-purple-400" />
      <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
        {children}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#111]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs font-medium border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors duration-200"
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-800/8 rounded-full blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6"
          >
            <span className="block text-white">Creative</span>
            <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
              Developer
            </span>
            <span className="block text-white/20 text-3xl sm:text-4xl md:text-5xl mt-2 font-light">
              & Designer
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            I craft high-performance web experiences that live at the
            intersection of engineering precision and thoughtful design.
            Currently building at the edge of what&apos;s possible.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:scale-105 active:scale-95"
            >
              View My Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5"
            >
              <Mail size={16} />
              Get In Touch
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto"
          >
            {[
              { value: "5+", label: "Years Exp." },
              { value: "40+", label: "Projects" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-syne font-bold text-2xl text-white">
                  {stat.value}
                </div>
                <div className="text-white/30 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text */}
            <motion.div variants={slideInLeft}>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl text-white mb-6 leading-tight">
                Building things that
                <span className="text-purple-400"> matter</span>
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  I&apos;m {APP_NAME}, a full-stack developer with 5+ years of
                  experience turning complex problems into elegant, performant
                  solutions. I specialize in React ecosystems, design systems,
                  and the craft of shipping great software.
                </p>
                <p>
                  When I&apos;m not pushing pixels or optimizing bundle sizes,
                  you&apos;ll find me contributing to open source, writing about
                  frontend architecture, or exploring generative art with
                  WebGL.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Open Source",
                  "Remote-first",
                  "Design-minded",
                  "Performance obsessed",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-white/50 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Services grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={scaleIn}
                  className="p-5 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-purple-500/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <service.icon size={18} className="text-purple-400" />
                  </div>
                  <h3 className="font-syne font-semibold text-white text-sm mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <SectionLabel>Projects</SectionLabel>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl text-white">
                Selected Work
              </h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                A curated selection of projects that showcase my range across
                product, platform, and performance engineering.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <SectionLabel>Skills</SectionLabel>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl text-white">
                Tech Stack
              </h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Tools and technologies I use to bring ideas to life.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-white font-medium text-sm">
                        {skill.name}
                      </span>
                      <span className="ml-2 text-white/30 text-xs">
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-purple-400 text-sm font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl text-white">
                What Clients Say
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  variants={scaleIn}
                  className="p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-purple-400 fill-purple-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover bg-white/10"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    <div>
                      <div className="text-white text-sm font-semibold">
                        {t.name}
                      </div>
                      <div className="text-white/30 text-xs">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl text-white mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-white/40">
                Have a project in mind? I&apos;d love to hear about it. Send me
                a message and I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-8"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-purple-400" />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/40 text-sm">
                    Thanks for reaching out. I&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            email: e.target.value,
                          }))
                        }
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Direct contact */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <a
                href={`mailto:${APP_EMAIL}`}
                className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors duration-300"
              >
                <Mail size={16} />
                {APP_EMAIL}
              </a>
              <div className="flex gap-3">
                {socials.slice(0, 3).map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
