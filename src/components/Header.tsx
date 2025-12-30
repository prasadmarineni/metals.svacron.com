"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-10 h-10 flex items-center"
        >
          <Link href="/" aria-label="Svacron Home" className="flex items-center gap-2">
            <img
              src="/svacron-logo.svg"
              alt="Svacron Logo"
              width={40}
              height={40}
              className="w-10 h-10 drop-shadow-lg"
              style={{ display: 'block' }}
            />
            <span className="text-xl font-bold text-white tracking-tight">Svacron</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          <Link href="/" className="text-white/70 hover:text-white transition">Home</Link>
          <Link href="/gold-rate-today" className="text-white/70 hover:text-white transition">Gold</Link>
          <Link href="/silver-rate-today" className="text-white/70 hover:text-white transition">Silver</Link>
          <Link href="/platinum-rate-today" className="text-white/70 hover:text-white transition">Platinum</Link>
        </nav>

        {/* CTA */}
        <Link href="https://svacron.com" className="hidden md:inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold transition"
          >
            About Svacron
          </motion.button>
        </Link>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900 border-t border-white/10 p-4"
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Gold', href: '/gold-rate-today' },
            { label: 'Silver', href: '/silver-rate-today' },
            { label: 'Platinum', href: '/platinum-rate-today' },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="block py-2 text-white/70 hover:text-white">
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
