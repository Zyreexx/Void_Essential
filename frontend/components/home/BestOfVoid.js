"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";

export default function BestOfVoid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getFeaturedProducts();
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="bg-void-cream py-14 sm:py-20 px-3.5 sm:px-6 lg:px-8 border-t border-void-border/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-super-wide uppercase text-void-slate block">
              CURATED ATELIER SELECTION
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-void-black font-display uppercase mt-1">
              BEST OF VOID
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold tracking-widest uppercase text-void-black border-b border-void-black pb-1 hover:opacity-60 transition-opacity"
          >
            VIEW FULL ARCHIVE
          </Link>
        </div>

        {/* Product Grid (Matches Reference Image) */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse space-y-3">
                <div className="bg-neutral-200 aspect-square w-full rounded-2xl sm:rounded-3xl" />
                <div className="h-4 bg-neutral-200 w-3/4 rounded" />
                <div className="h-3 bg-neutral-200 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="group flex flex-col justify-between">
                
                {/* Image Container with Studio Background & Smooth Rounded Corners */}
                <div className="relative aspect-square bg-[#E8E8E8] overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
                    {product.primary_image && (
                      <Image
                        src={product.primary_image}
                        alt={product.title}
                        fill
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                  </Link>

                  {/* Top-Right Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 text-black hover:text-red-500 rounded-full transition-all shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label={`Wishlist ${product.title}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>

                {/* Product Metadata & Shopping Bag (Matches Reference) */}
                <div className="mt-3 space-y-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-semibold text-neutral-900 block truncate hover:underline"
                  >
                    {product.title}
                  </Link>
                  
                  <div className="text-xs font-bold text-neutral-900">
                    RS. {product.price?.toLocaleString("en-IN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Gold Star Ratings & Count */}
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span>(128)</span>
                    </div>

                    {/* Minimalist Shopping Bag Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 rounded-xl border border-neutral-300 flex items-center justify-center text-neutral-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                      aria-label={`Add ${product.title} to bag`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
