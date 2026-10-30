"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);
  const modelWrapperRef = useRef(null);
  const modelImageRef = useRef(null);
  const headlineRef = useRef(null);
  const lineRef = useRef(null);
  const seasonBadgeRef = useRef(null);
  const buttonsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Master Entrance Timeline with Extended Cinematic Duration (~4s total)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Initial states
      gsap.set(watermarkRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 40,
        filter: "blur(14px)",
      });
      gsap.set(modelWrapperRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.96,
      });
      gsap.set(modelImageRef.current, {
        scale: 1,
        filter: "grayscale(100%) contrast(105%) brightness(0.95)",
      });
      gsap.set(".hero-text-line", {
        opacity: 0,
        y: 25,
      });
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(seasonBadgeRef.current, {
        opacity: 0,
        y: -25,
      });
      gsap.set(buttonsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.95,
      });
      gsap.set(quoteRef.current, {
        opacity: 0,
        x: 25,
      });

      // --- SCENE 1: The Massive "VOID" Monolith Awakens ---
      tl.to(watermarkRef.current, {
        opacity: 0.95,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.4,
        ease: "power2.out",
      })

        // --- SCENE 2: High-Fashion Model Rises through the Typography ---
        .to(modelWrapperRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.2,
          ease: "power3.out",
        }, "-=1.8")
        .to(modelImageRef.current, {
          scale: 1,
          filter: "grayscale(100%) contrast(105%) brightness(1)",
          duration: 2.2,
          ease: "power2.out",
        }, "-=2.2")

        // --- SCENE 3: Editorial Typography Stagger ---
        .to(".hero-text-line", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power2.out",
        }, "-=1.6")
        .to(lineRef.current, {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
        }, "-=1.2")

        // --- SCENE 4: Season Badge Cascades Down ---
        .to(seasonBadgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        }, "-=1.4")

        // --- SCENE 5: Action Buttons Glide Up with Spring ---
        .to(buttonsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.16,
          ease: "back.out(1.5)",
        }, "-=1.1")
        .to(quoteRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        }, "-=1.0");

      // 2. Continuous Ambient Floating Motion for Central Model Figure
      gsap.to(modelWrapperRef.current, {
        y: -12,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });

      // 3. Interactive Depth Parallax on Mouse Move
      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        // Background watermark shifts slowly opposite
        gsap.to(watermarkRef.current, {
          x: -xPos * 25,
          y: -yPos * 18,
          duration: 1.8,
          ease: "power1.out",
        });

        // Model shifts with foreground depth
        gsap.to(modelWrapperRef.current, {
          x: xPos * 18,
          y: yPos * 14,
          rotationY: xPos * 3,
          duration: 1.6,
          ease: "power1.out",
        });
      };

      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (isFinePointer) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      return () => {
        if (isFinePointer) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[94vh] bg-void-cream flex items-center justify-center overflow-hidden pt-4 sm:pt-8 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-void-border/40 select-none"
    >
      {/* 1. Oversized Monolithic Brand Watermark (Layered Behind Model) */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden will-change-transform"
      >
        <span className="font-display font-black text-[22vw] sm:text-[24vw] leading-none text-void-black/90 tracking-tighter uppercase scale-y-110 drop-shadow-sm">
          VOID
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col justify-between h-full min-h-[68vh] sm:min-h-[72vh]">

        {/* Top Floating Editorial Text & Season Badge */}
        <div className="flex justify-between items-start gap-4 pt-2 sm:pt-4">

          {/* Left Editorial Header */}
          <div ref={headlineRef} className="space-y-0.5 sm:space-y-1 max-w-[200px] sm:max-w-xs">
            <p className="hero-text-line text-[11px] sm:text-sm font-semibold tracking-super-wide text-void-black uppercase leading-relaxed">
              FASHION
            </p>
            <p className="hero-text-line text-[11px] sm:text-sm font-semibold tracking-super-wide text-void-black uppercase leading-relaxed">
              THAT MOVES
            </p>
            <p className="hero-text-line text-[11px] sm:text-sm font-semibold tracking-super-wide text-void-black uppercase leading-relaxed">
              WITH YOU.
            </p>
            <div ref={lineRef} className="w-10 sm:w-14 h-0.5 bg-void-black mt-1.5 sm:mt-2"></div>
          </div>

          {/* Right Season Badge */}
          <div ref={seasonBadgeRef} className="text-right">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-super-wide uppercase text-void-slate block">
              NEW
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-super-wide uppercase text-void-slate block">
              COLLECTION
            </span>
            <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-void-black block mt-0.5">
              2025 / 2026
            </span>
          </div>
        </div>

        {/* Center: Walking High-Fashion Model Figure with Ambient Hover Parallax */}
        <div
          ref={modelWrapperRef}
          className="relative my-auto w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] mx-auto aspect-[739/1024] flex items-center justify-center will-change-transform py-2 sm:py-3"
        >
          <div
            ref={modelImageRef}
            className="relative w-full h-full drop-shadow-2xl overflow-hidden rounded-3xl border border-white/40 shadow-2xl transition-shadow duration-500 bg-neutral-100"
          >
            <Image
              src="/images/hero-model.jpg"
              alt="Void Essentials Editorial Figure"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 460px"
            />
          </div>
        </div>

        {/* Bottom Call to Actions & Atelier Reassurance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-2 sm:pt-4">

          {/* Dual Action Pill Buttons */}
          <div ref={buttonsRef} className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/catalog"
              className="flex-1 sm:flex-initial bg-void-black text-void-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-lg rounded-full hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/catalog"
              className="text-xs font-bold tracking-widest uppercase text-void-black px-5 sm:px-7 py-3.5 sm:py-4 rounded-full border border-void-black/25 hover:border-void-black hover:bg-void-black/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              EXPLORE NEW IN
            </Link>
          </div>

          {/* Atelier Reassurance Subtext */}
          <div ref={quoteRef} className="hidden lg:block text-right text-[11px] font-medium tracking-wider text-void-slate">
            <div className="flex items-center justify-end gap-1.5 text-void-black font-semibold mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span>&ldquo;Essentials, without excess.&rdquo;</span>
            </div>
            <span className="block text-[10px] text-neutral-400">Atelier Archival Restock &bull; Synchronized Fittings</span>
          </div>

        </div>

      </div>
    </section>
  );
}
