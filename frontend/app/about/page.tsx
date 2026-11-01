"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Globe } from "lucide-react";
import BestOfVoid from "@/components/home/BestOfVoid";

export default function AboutPage() {
  return (
    <div className="bg-void-cream min-h-screen py-8 sm:py-16 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* ========================================================= */}
        {/* 1. HERO BRAND MANIFESTO (Matched from voidessentials.store) */}
        {/* ========================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate block">
            OUR LEGACY &bull; ATELIER DISCIPLINE
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-void-black font-display uppercase leading-tight">
            ESSENTIALS,<br />WITHOUT EXCESS.
          </h1>
          <p className="text-base sm:text-lg text-void-slate font-serif italic max-w-xl mx-auto pt-1 text-[#a58145]">
            &ldquo;One piece. Done right. Radical permanence.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-void-slate leading-relaxed pt-2 max-w-2xl mx-auto">
            VOID ESSENTIALS was conceived to strip away transient fashion ornamentation. We design foundational clothing for individuals who demand severe aesthetic discipline, architectural silhouettes, and heavyweight textiles engineered to outlive seasonal fast-fashion cycles.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. THE DISCIPLINE MANIFESTO                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Authentic Botanical Imagery from uploaded legacy reference */}
          <div className="relative aspect-[4/5] bg-black overflow-hidden rounded-3xl border border-void-border/70 shadow-2xl">
            <Image
              src="/images/editorial/botanical-stems.jpg"
              alt="Void Botanical Stems Material Architecture"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white font-mono text-[10px] tracking-widest uppercase flex justify-between items-center">
              <span>Surat, India &bull; Pure Supima</span>
              <span className="text-neutral-400">www.voidessentials.store</span>
            </div>
          </div>

          <div className="space-y-6 md:pl-6">
            <span className="text-xs font-bold tracking-widest uppercase text-void-slate">
              01 &bull; THIS IS OUR DISCIPLINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-void-black font-display uppercase tracking-tight">
              A DISCIPLINE, NOT A BRAND
            </h2>
            <p className="text-xs sm:text-sm text-void-slate leading-relaxed">
              Void isn&apos;t really a brand. It&apos;s a discipline. Right now we make one thing, a tee, and we make it properly instead of chasing more. No logos, no trends, no discounts. Just something that earns its place in your rotation, not your closet. That&apos;s Void.
            </p>
            <div className="border-l-2 border-void-black pl-4 py-1 text-xs sm:text-sm font-serif italic text-void-black leading-relaxed">
              &ldquo;The fabric is the statement. High-density combed jersey knit. Substantial drape, structured silhouette, and lifelong durability.&rdquo;
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. THIS IS OUR VISION                                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          
          <div className="space-y-6 md:pr-6 order-2 md:order-1">
            <span className="text-xs font-bold tracking-widest uppercase text-void-slate">
              02 &bull; THIS IS OUR VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-void-black font-display uppercase tracking-tight">
              LESS, MADE WELL, BEATS MORE, MADE FAST
            </h2>
            <p className="text-xs sm:text-sm text-void-slate leading-relaxed">
              Void exists to prove that less, made well, beats more, made fast. We&apos;re not building a wardrobe full of options. We&apos;re building the one tee you actually reach for, over and over, until it&apos;s the only one that matters.
            </p>
            <p className="text-xs sm:text-sm text-void-slate leading-relaxed">
              No trends to chase, no logos to hide behind, no discounts to lean on. Just intention, worn daily. That&apos;s where Void is headed.
            </p>
            <div className="border-l-2 border-void-black pl-4 py-1 text-xs sm:text-sm font-serif italic text-void-black leading-relaxed">
              &ldquo;Quiet luxury. Zero branding. Understated elegance designed for effortless daily wear. Sourced and manufactured in Surat.&rdquo;
            </div>
          </div>

          <div className="relative aspect-square bg-[#121214] overflow-hidden rounded-3xl border border-void-border/70 shadow-2xl flex items-center justify-center p-8 order-1 md:order-2">
            <Image
              src="/images/editorial/flower-bloom.jpg"
              alt="Void Flower Bloom Archive"
              width={260}
              height={260}
              className="object-contain rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-4 text-center font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
              DROP ONE &bull; THE SUPIMA TEE &bull; ARCHIVAL RELEASE
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. THREE PILLARS OF MATERIAL ARCHITECTURE                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-void-border pt-12 text-xs">
          
          <div className="space-y-2">
            <span className="font-mono text-void-ash">01 / TEXTILE SPECIFICATION</span>
            <h3 className="font-extrabold uppercase tracking-wider text-void-black text-sm">
              100% PURE SUPIMA COTTON
            </h3>
            <p className="text-void-slate leading-relaxed">
              Extra-long staple fibers custom-milled in Surat, Gujarat. Delivers superior tensile strength, rich dye absorption, and ultra-soft comfort that softens with every wash cycle.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-void-ash">02 / ARCHITECTURAL COLLAR</span>
            <h3 className="font-extrabold uppercase tracking-wider text-void-black text-sm">
              ZERO-BACON THICK RIB COLLAR
            </h3>
            <p className="text-void-slate leading-relaxed">
              High-tension knit collar engineered to never roll, stretch out, or bacon-curl. Retains its crisp, structural neckline through hundreds of washes.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-void-ash">03 / ZERO BRANDING</span>
            <h3 className="font-extrabold uppercase tracking-wider text-void-black text-sm">
              DISCIPLINE OVER LOGOS
            </h3>
            <p className="text-void-slate leading-relaxed">
              Zero external logos, tags, or loud branding. Built with clean blind-stitched hems and architectural drape that lets the textile speak for itself.
            </p>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 5. CURATED ATELIER PIECES (Product Cards Grid)            */}
        {/* ========================================================= */}
        <div className="pt-2">
          <BestOfVoid />
        </div>

        {/* ========================================================= */}
        {/* 6. VERIFIED ATELIER REPOSITORY & DISCLOSURES              */}
        {/* ========================================================= */}
        <div className="bg-void-pitch text-void-white p-8 sm:p-12 border border-void-charcoal space-y-6 rounded-3xl shadow-xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-bold tracking-super-wide uppercase text-neutral-400 block">
              OFFICIAL ATELIER DISCLOSURES
            </span>
            <h3 className="text-xl font-bold uppercase font-display mt-1">
              VERIFIED ATELIER REPOSITORIES &bull; GUJARAT, INDIA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-void-ash">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-void-white block uppercase text-[11px]">Dispatch &amp; Physical Repository</strong>
                  <span className="text-neutral-300">Thatharo Shop, Nagar Naka, Jamnagar, Gujarat - 361305, India</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-void-white block uppercase text-[11px]">Textile Engineering &amp; Sourcing Origin</strong>
                  <span className="text-neutral-300">Surat, Gujarat - 395007, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-void-white block uppercase text-[11px]">Official Support Channel</strong>
                  <a href="mailto:support@voidessentials.store" className="text-void-white underline font-mono">
                    support@voidessentials.store
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-void-white block uppercase text-[11px]">Client Concierge Telephone</strong>
                  <a href="tel:+919510490976" className="text-void-white underline font-semibold">
                    +91 95104 90976
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-void-white text-void-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-void-white border border-white/20 hover:bg-white/10 rounded-full transition-all"
            >
              CONTACT THE ATELIER
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
