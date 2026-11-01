"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  title: string;
  slug: string;
  subtitle: string;
  cta: string;
  image: string;
}

export default function CategoryBand() {
  const categories: CategoryItem[] = [
    {
      title: "MEN",
      slug: "men",
      subtitle: "Elevated everyday essentials.",
      cta: "SHOP MEN",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "WOMEN",
      slug: "women",
      subtitle: "Effortless style for every you.",
      cta: "SHOP WOMEN",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "ACCESSORIES",
      slug: "accessories",
      subtitle: "Comfort meets cool everyday.",
      cta: "SHOP ACCESSORIES",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-void-black text-void-white py-16 px-4 sm:px-6 lg:px-8 border-y border-void-charcoal">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/catalog?category=${cat.slug}`}
              className="flex items-center gap-6 p-5 rounded-2xl bg-void-pitch/40 hover:bg-void-pitch transition-all duration-300 group border border-void-charcoal/50 hover:border-void-charcoal hover:scale-[1.01]"
            >
              {/* Category Thumbnail with Smooth Corners */}
              <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-void-pitch overflow-hidden flex-shrink-0 rounded-xl border border-white/10">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 112px, 128px"
                />
              </div>

              {/* Text & CTA */}
              <div className="flex-1 space-y-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-widest uppercase font-display text-void-white group-hover:text-neutral-200">
                  {cat.title}
                </h3>
                <p className="text-xs text-void-ash leading-snug">
                  {cat.subtitle}
                </p>
                <div className="pt-2 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-void-white group-hover:translate-x-1.5 transition-transform">
                  <span>{cat.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
