"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 sm:pt-16 pb-14 sm:pb-16 px-4 sm:px-8 lg:px-16 border-t border-neutral-900 select-none w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ========================================================= */}
        {/* TOP BRAND & SOCIAL ROW                                    */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-neutral-900/80">
          
          {/* Brand Name & Philosophy Description */}
          <div className="space-y-4 max-w-xl">
            <Link href="/" className="inline-block group">
              <div className="font-serif leading-none tracking-[0.25em] text-white">
                <span className="block text-2xl sm:text-3xl font-light">VOID</span>
                <span className="block text-xl sm:text-2xl tracking-[0.35em] font-normal text-neutral-200 mt-1">
                  ESSENTIALS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-light">
              Essentials, without excess. Radical permanence. Pure long-staple Supima cotton crafted in Gujarat. Designed with zero external logos.
            </p>
          </div>

          {/* Social Icons in Dark Circular Capsules */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#161618] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 rounded-full bg-[#161618] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-[#161618] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all shadow-sm"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* Phone */}
            <a
              href="tel:+919510490976"
              aria-label="Call Void Client Support"
              className="w-10 h-10 rounded-full bg-[#161618] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM 4-COLUMN LINK & CONTACT GRID                       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-2 text-xs">
          
          {/* Column 1: Core Essentials */}
          <div className="space-y-4">
            <ul className="space-y-3.5 text-neutral-300 font-medium">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  The Supima Tee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Brand / Company */}
          <div className="space-y-4">
            <ul className="space-y-3.5 text-neutral-300 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Contact Info (Phone, Email, Gujarat Address) */}
          <div className="space-y-4">
            <div className="space-y-3 text-neutral-300 text-xs">
              
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+919510490976" className="hover:text-white transition-colors tracking-wide">
                  +91 95104 90976
                </a>
              </div>

              {/* Email in Monospace font */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href="mailto:support@voidessentials.store"
                  className="font-mono text-neutral-200 hover:text-white transition-colors text-[11px]"
                >
                  support@voidessentials.store
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px] text-neutral-400 leading-relaxed">
                  Thatharo Shop, Nagar Naka, Jamnagar, Gujarat - 361305
                </span>
              </div>

            </div>
          </div>

          {/* Column 4: Policies */}
          <div className="space-y-4">
            <ul className="space-y-3 text-neutral-300 font-medium text-xs">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
