"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignFeature() {
  return (
    <section className="bg-void-cream py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-void-border/60">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate block">
              NEW SEASON
            </span>

            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-void-black font-display leading-[0.95]">
              NEW<br />
              VIBES
            </h2>

            <p className="text-sm sm:text-base text-void-slate max-w-sm leading-relaxed">
              Discover everything new and now. Archival fits, heavyweight organic cottons, and architectural silhouettes engineered for modern living.
            </p>

            <div className="pt-2">
              <Link
                href="/catalog?category=men"
                className="inline-flex items-center gap-3 bg-void-black text-void-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all group shadow-md rounded-full hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Editorial Portrait Figure */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-void-bone overflow-hidden border border-void-border/70 shadow-xl rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
                alt="Void Essentials New Season Editorial"
                fill
                className="object-cover object-center grayscale contrast-115"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
