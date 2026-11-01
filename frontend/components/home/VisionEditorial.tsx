"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  id: string;
  tag: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  aspect: string;
  caption: string;
  rightHeading: string;
  quote: string;
}

const SLIDES: SlideItem[] = [
  {
    id: "01",
    tag: "DROP ONE · THE SUPIMA TEE",
    titleLine1: "Pure simplicity.",
    titleLine2: "Unmatched weight.",
    description: "100% Pure Long-Staple Supima Cotton. Zero logos, no compromises. Engineered in Surat, India.",
    ctaText: "SHOP THE SUPIMA TEE",
    ctaLink: "/catalog?category=topwear",
    image: "/images/editorial/botanical-stems.jpg",
    aspect: "portrait",
    caption: "www.voidessentials.store",
    rightHeading: "THIS IS OUR DISCIPLINE",
    quote: "Void isn't really a brand. It's a discipline. Right now we make one thing, a tee, and we make it properly instead of chasing more. No logos, no trends, no discounts. Just something that earns its place in your rotation, not your closet. That's Void."
  },
  {
    id: "02",
    tag: "001 · WASHED BLACK TEE",
    titleLine1: "The staple you",
    titleLine2: "reach for daily.",
    description: "Thick rib collar that never rolls or bacon-curls. Pre-shrunk Supima cotton that softens with every wash.",
    ctaText: "VIEW WASHED BLACK",
    ctaLink: "/catalog?category=topwear",
    image: "/images/editorial/flower-bloom.jpg",
    aspect: "square",
    caption: "www.voidessentials.store",
    rightHeading: "THIS IS OUR VISION",
    quote: "Void exists to prove that less, made well, beats more, made fast. We're not building a wardrobe full of options. We're building the one tee you actually reach for, over and over, until it's the only one that matters. No trends to chase, no logos to hide behind, no discounts to lean on. Just intention, worn daily. That's where Void is headed."
  },
  {
    id: "03",
    tag: "MATERIAL ARCHITECTURE · PURE SUPIMA",
    titleLine1: "The fabric is",
    titleLine2: "the statement.",
    description: "High-density combed jersey knit. Substantial drape, structured silhouette, and lifelong durability.",
    ctaText: "EXPLORE TEXTILES",
    ctaLink: "/catalog",
    image: "/images/editorial/botanical-stems.jpg",
    aspect: "portrait",
    caption: "www.voidessentials.store",
    rightHeading: "MATERIAL INTEGRITY",
    quote: "We reject the endless churn of fast-fashion cycles. Every single yarn is spun from extra-long staple Supima fibers that resist pilling, maintain rich color depth, and hold their architectural form through hundreds of wear and wash cycles."
  },
  {
    id: "04",
    tag: "002 · MINIMALIST BONE TEE",
    titleLine1: "Quiet luxury.",
    titleLine2: "Zero branding.",
    description: "Understated elegance designed for effortless daily wear. Sourced and manufactured in Surat.",
    ctaText: "SHOP THE COLLECTION",
    ctaLink: "/catalog",
    image: "/images/editorial/botanical-stems.jpg",
    aspect: "portrait",
    caption: "www.voidessentials.store",
    rightHeading: "ARCHITECTURAL RESTRAINT",
    quote: "When textile quality and structural silhouette speak with uncompromised clarity, external logos become unnecessary noise. We build foundational essentials engineered strictly without excess."
  }
];

export default function VisionEditorial() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const activeSlide = SLIDES[currentIdx];

  // Auto-advance slides every 7 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      aria-label="Vision and Brand Narrative"
      className="relative bg-gradient-to-b from-[#18181b] via-[#202024] to-[#121214] text-white py-14 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden w-full max-w-full">
        <span className="text-[12vw] font-black tracking-wider text-white uppercase select-none pointer-events-none truncate max-w-full text-center">
          VOID
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Section Top Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-[0.25em] uppercase text-white/90">
            OUR VISION
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4" />
        </div>

        {/* 3-Column Editorial Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Column: Headline, Specs & CTAs */}
          <div key={activeSlide.id} className="lg:col-span-5 space-y-5 transition-opacity duration-500">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                {activeSlide.tag}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                {activeSlide.titleLine1}
              </h3>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#d4af37] leading-tight font-normal">
                {activeSlide.titleLine2}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300/80 leading-relaxed max-w-md pt-2">
              {activeSlide.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={activeSlide.ctaLink}
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase text-white border border-white/25 hover:bg-white/10 hover:border-white/50 transition-all"
              >
                OUR STORY
              </Link>
            </div>
          </div>

          {/* Center Column: Iconic Artwork */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-4">
            <div className="relative group">
              <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.titleLine1}
                  fill
                  className="object-cover transition-opacity duration-700"
                  sizes="(max-width: 768px) 200px, 240px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="text-[10px] font-mono text-center tracking-widest text-neutral-400 mt-3 uppercase">
                {activeSlide.caption}
              </p>
            </div>
          </div>

          {/* Right Column: Statement Manifesto */}
          <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-3">
            <span className="text-xs font-serif tracking-[0.2em] uppercase text-white/80 font-semibold">
              {activeSlide.rightHeading}
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed tracking-wide text-justify italic">
              &ldquo;{activeSlide.quote}&rdquo;
            </p>
          </div>

        </div>

        {/* Bottom Carousel Controls & Indicators */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Progress Bars & Index */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    currentIdx === idx ? "w-10 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono tracking-widest text-neutral-400">
              0{currentIdx + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
              aria-label="Previous Vision Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
              aria-label="Next Vision Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
