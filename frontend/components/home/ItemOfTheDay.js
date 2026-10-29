"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Check, Heart, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";

export default function ItemOfTheDay() {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getFeaturedProducts();
        if (res.success && res.data?.length > 0) {
          // Select an archival flagship piece as the Item of the Day
          const item = res.data[0];
          setProduct(item);
          if (item.sizes?.length > 0) {
            setSelectedSize(item.sizes[0]);
          }
        }
      } catch (err) {
        console.error("Item of the Day error:", err);
      }
    }
    loadFeatured();
  }, []);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, { size: selectedSize, price_override: product.price });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const images = [
    product.primary_image,
    product.secondary_image || product.primary_image
  ].filter(Boolean);

  return (
    <section className="bg-void-cream py-20 px-4 sm:px-6 lg:px-8 border-t border-void-border/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[11px] font-bold tracking-super-wide uppercase text-void-slate block">
            FEATURED CURATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-void-black font-display uppercase mt-1">
            ITEM OF THE DAY
          </h2>
        </div>

        {/* Split Showcase Card (Matches Reference Image) */}
        <div className="bg-void-white border border-void-border/70 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Dual Angle Editorial Photography */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-[3/4] bg-void-bone rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                  selectedImage === idx
                    ? "border-void-black ring-1 ring-void-black"
                    : "border-void-border/60 hover:border-void-black/40"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.title} angle ${idx + 1}`}
                  fill
                  className="object-cover grayscale contrast-115 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 350px"
                />
                <div className="absolute top-3 left-3 bg-black/80 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {idx === 0 ? "FRONT PROFILE" : "ARCHIVAL CUT"}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Garment Specifications & Instant Add to Bag */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate">
                  {product.category} &bull; ATELIER ARCHIVE
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2.5 bg-void-bone text-void-black hover:text-red-500 rounded-full transition-all shadow-sm"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-void-black tracking-tight mt-2">
                {product.title}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-void-black">
                  ${product.price?.toFixed(2)}
                </span>
                {product.compare_at_price && (
                  <span className="text-sm text-void-ash line-through font-medium">
                    ${product.compare_at_price.toFixed(2)}
                  </span>
                )}
                <span className="text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full ml-auto">
                  IN STOCK
                </span>
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className="space-y-2 border-t border-void-border/60 pt-5">
                <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
                  <span>SELECT SIZE: <strong className="text-black">{selectedSize}</strong></span>
                  <span className="text-neutral-400 font-normal text-[10px]">TRUE TO FIT</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-12 h-12 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center border ${
                        selectedSize === sz
                          ? "bg-black text-white border-black shadow-md scale-105"
                          : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full bg-void-black text-void-white py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ADDED TO ATELIER BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>

              <Link
                href={`/products/${product.slug}`}
                className="w-full bg-void-bone text-void-black py-3 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 rounded-full border border-void-border/60"
              >
                <span>VIEW COMPLETE SPECIFICATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Reassurance pill */}
            <div className="flex items-center gap-2 text-[11px] text-void-slate pt-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
              <span>Complimentary insured shipping & 15-day return protocol included.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

