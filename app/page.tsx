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
    avatar: "https://www.wallstreetmojo.com/wp-content/uploads/Performance_Audit_3c348e7b70.jpg",
    quote:
      "Alex rebuilt our entire frontend in six weeks. The new design system cut our dev time in half and our users noticed the difference immediately.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Orbit",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    quote:
      "Exceptional attention to detail and a rare ability to translate complex data into intuitive interfaces. The dashboard Alex built is our best sales tool.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Product Lead at Vela",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Delivered ahead of schedule with zero bugs in production. The checkout redesign directly contributed to a 34% lift in our conversion rate.",
    stars: 5,
  },
];

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "98%", label: "Client satisfaction" },
  { value: "12", label: "Open-source packages" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
      <Sparkles size={11} />
      {children}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      variants={shouldReduce ? fadeIn : scaleIn}
      whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.3),0_16px_48px_-16px_rgba(0,0,0,0.5)] hover:border-purple-500/30 hover:shadow-[0_4px_24px_rgba(168,85,247,0.12),0_24px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#1a1a1a]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {project.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-500/90 text-white text-xs font-semibold backdrop-blur-sm">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-syne font-bold text-lg text-white mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(project.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/50 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200"
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
              className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200"
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

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const shouldReduce = useReducedMotion();
  const barVariant: Variants = {
    hidden: { width: "0%" },
    visible: {
      width: `${skill.level}%`,
      transition: { duration: shouldReduce ? 0 : 1.0, ease: "easeOut", delay: index * 0.07 },
    },
  };

  return (
    <motion.div variants={fadeInUp} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white/85">{skill.name}</span>
          <span className="text-xs text-white/30 font-medium">{skill.category}</span>
        </div>
        <span className="text-xs font-bold text-purple-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          variants={barVariant}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
        />
      </div>
    </motion.div>
  );
}

// ─── Contact form state ──────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
          <Check size={24} className="text-purple-400" />
        </div>
        <h3 className="font-syne font-bold text-xl text-white">Message sent!</h3>
        <p className="text-white/50 text-sm max-w-xs">
          Thanks for reaching out. I typically respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-300 resize-none"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
      >
        Send Message
      </motion.button>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-800/8 blur-[80px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={shouldReduce ? fadeIn : staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Available for work</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-syne font-extrabold text-5xl md:text-6xl xl:text-7xl tracking-tight text-balance leading-[1.05] mb-6"
            >
              I build{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                  digital
                </span>
              </span>{" "}
              products people love.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg text-pretty"
            >
              {APP_NAME} — {APP_TAGLINE}. I craft fast, accessible, and
              beautifully animated web experiences for startups and scale-ups
              worldwide.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
              >
                View my work
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300"
              >
                Get in touch
              </motion.a>
            </motion.div>

            {/* Social row */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 mt-10"
            >
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: `mailto:${APP_EMAIL}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-400/40 hover:bg-purple-400/5 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: portrait + floating badges */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 xl:w-96 xl:h-96">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-900/10 blur-2xl scale-110" />
              {/* Portrait */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/054/511/449/small/portrait-of-a-young-male-software-developer-in-his-office-photo.jpg"
                  alt={APP_NAME}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.background =
                        "linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)";
                    }
                  }}
                />
              </div>

              {/* Floating badge: experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -left-8 top-1/4 px-4 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm"
              >
                <p className="text-xs text-white/40 font-medium">Experience</p>
                <p className="text-white font-bold text-sm font-syne">5+ Years</p>
              </motion.div>

              {/* Floating badge: projects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-6 bottom-1/4 px-4 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm"
              >
                <p className="text-xs text-white/40 font-medium">Projects</p>
                <p className="text-white font-bold text-sm font-syne">40+ Shipped</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="relative py-16 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <p className="font-syne font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-1">
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-[0_2px_8px_rgba(0,0,0,0.3),0_32px_80px_-16px_rgba(0,0,0,0.6)]">
              <img
                src="https://static.wikia.nocookie.net/prototype/images/2/25/Alexander_Mercer.png/revision/latest?cb=20120304015459"
                alt="Alex Mercer working"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.background =
                      "linear-gradient(160deg, #1e1b4b 0%, #0f0f0f 100%)";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl border border-purple-500/20 bg-purple-500/5 -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl border border-white/5 bg-white/2 -z-10" />
          </motion.div>

          {/* Copy side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>About me</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight text-balance leading-tight mb-6"
            >
              Crafting interfaces that feel inevitable.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/55 leading-relaxed mb-4 text-pretty"
            >
              I'm {APP_NAME}, a {APP_TAGLINE} based in San Francisco. For over
              five years I've been obsessed with the intersection of engineering
              precision and design sensibility — building products that are as
              robust under the hood as they are beautiful on screen.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-white/55 leading-relaxed mb-8 text-pretty"
            >
              My background spans early-stage startups and Series B companies.
              I've led frontend teams, architected design systems from scratch,
              and shipped features used by hundreds of thousands of people. I
              care deeply about performance, accessibility, and the small
              details that make users smile.
            </motion.p>

            {/* Services grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {services.map((svc) => (
                <motion.div
                  key={svc.title}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -3 }}
                  className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-purple-500/25 hover:bg-purple-500/5 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center mb-3">
                    <svc.icon size={16} className="text-purple-400" />
                  </div>
                  <h3 className="font-syne font-bold text-sm text-white mb-1">
                    {svc.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {svc.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Selected work</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight text-balance"
            >
              Projects I'm proud of.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/45 mt-4 max-w-xl mx-auto text-pretty"
            >
              A curated selection of products, platforms, and experiments built
              with care and shipped to real users.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: heading + copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Expertise</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight text-balance leading-tight mb-6"
            >
              Tools I reach for every day.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed mb-8 text-pretty"
            >
              Five years of deliberate practice across the full stack. I'm
              strongest in the React ecosystem and TypeScript, but I'm
              comfortable owning a project from database to deployment.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {[
                "React", "Next.js", "TypeScript", "Node.js",
                "Tailwind CSS", "Framer Motion", "PostgreSQL",
                "Figma", "Docker", "Vercel",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/60 text-xs font-medium hover:border-purple-500/30 hover:text-purple-300 hover:bg-purple-500/5 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: skill bars */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Testimonials</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight"
            >
              What clients say.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -5 }}
                className="flex flex-col p-7 rounded-2xl bg-[#111111] border border-white/8 hover:border-purple-500/25 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(168,85,247,0.1)] transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-purple-400 fill-purple-400"
                    />
                  ))}
                </div>

                <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a] flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm font-syne">
                      {t.name}
                    </p>
                    <p className="text-white/35 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>Contact</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight text-balance leading-tight mb-6"
            >
              Let's build something great together.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed mb-8 text-pretty"
            >
              I'm currently open to new projects and full-time opportunities.
              Whether you have a product idea, need a technical co-founder for a
              sprint, or just want to talk shop — my inbox is always open.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4">
              <a
                href={`mailto:${APP_EMAIL}`}
                className="flex items-center gap-3 text-white/60 hover:text-purple-400 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-purple-400/40 flex items-center justify-center transition-colors duration-300">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-medium">{APP_EMAIL}</span>
              </a>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-400/40 hover:bg-purple-400/5 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/3 border border-white/8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-white/60 text-sm">
                Available for new projects starting{" "}
                <span className="text-white font-semibold">February 2025</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="p-8 rounded-3xl bg-[#111111] border border-white/8 shadow-[0_2px_8px_rgba(0,0,0,0.3),0_24px_64px_-16px_rgba(0,0,0,0.5)]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}