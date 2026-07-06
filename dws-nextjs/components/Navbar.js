"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Produk", href: "/products" },
    { name: "Layanan", href: "/services" },
    { name: "Galeri", href: "/gallery" },
    { name: "Testimoni", href: "/testimonials" },
    { name: "Artikel", href: "/artikel" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 flex items-center justify-between ${
        isSticky
          ? "bg-brand-darkBg/95 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-2xl px-3 py-1 rounded-md skew-x-12 transform transition-transform group-hover:scale-105 duration-300">
          <span className="-skew-x-12">DWS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-display font-bold text-sm tracking-wide leading-none group-hover:text-brand-blueLight transition-colors">
            PT DENKO WAHANA SAKTI
          </span>
          <span className="text-gray-400 text-xs tracking-wider font-light">
            Material Handling Solution
          </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium text-sm transition-colors ${
                isActive
                  ? "text-brand-accent"
                  : "text-white hover:text-brand-blueLight"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* CTA right */}
      <div className="hidden lg:flex items-center">
        <Link
          href="/contact"
          className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150"
        >
          Minta Penawaran
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-white hover:text-brand-blueLight transition-colors focus:outline-none"
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        )}
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full inset-x-0 bg-brand-darkBg/98 border-t border-white/5 py-6 px-6 z-40 shadow-2xl`}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-brand-blueLight font-medium text-base transition-colors py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 text-center bg-brand-blue hover:bg-brand-blueDark text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Minta Penawaran
          </Link>
        </nav>
      </div>
    </header>
  );
}
