"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, APP_NAME, APP_TAGLINE, APP_EMAIL } from "@/lib/data";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: `mailto:${APP_EMAIL}` },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link
              href="/"
              className="font-syne font-bold text-xl tracking-tight text-white hover:text-purple-400 transition-colors duration-300 inline-block mb-3"
            >
              <span className="text-purple-400">A</span>
              {APP_NAME.slice(1)}
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {APP_TAGLINE}. Crafting immersive digital experiences with
              precision and purpose.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Connect
            </p>
            <div className="flex gap-3 mb-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-purple-400 hover:border-purple-400/40 hover:bg-purple-400/5 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-300"
            >
              {APP_EMAIL}
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors duration-300"
            aria-label="Scroll to top"
          >
            Back to top
            <span className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-400/40 group-hover:text-purple-400 transition-all duration-300">
              <ArrowUp size={11} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}