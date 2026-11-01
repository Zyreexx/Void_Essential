"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";
import { Product } from "@/types";

export default function StorefrontSections() {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      try {
        const res = await api.getProducts();
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Storefront section error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  const tabs = [
    { id: "all", label: "ALL PIECES" },
    { id: "jackets", label: "JACKETS & COATS" },
    { id: "topwear", label: "TOPWEAR & HOODIES" },
    { id: "pants", label: "PANTS & DENIM" },
  ];

  const filteredProducts = products.filter((p) => {
    const title = (p?.title || "").toLowerCase();
    if (activeTab === "all") return true;
    if (activeTab === "jackets") {
      return title.includes("jacket") || title.includes("coat") || title.includes("puffer") || title.includes("blazer");
    }
    if (activeTab === "topwear") {
      return title.includes("hoodie") || title.includes("flannel") || title.includes("shirt") || title.includes("tee") || title.includes("knit");
    }
    if (activeTab === "pants") {
      return title.includes("pant") || title.includes("cargo") || title.includes("denim") || title.includes("bootcut") || title.includes("baggy") || title.includes("trouser");
    }
    return true;
  });

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="bg-white py-12 sm:py-16 px-3.5 sm:px-6 lg:px-8 border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ========================================================= */}
        {/* CATEGORY TABS HEADER                                      */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-super-wide uppercase text-neutral-400 block">
              ATELIER ESSENTIALS
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-black font-display uppercase mt-1">
              CURATED SILHOUETTES
            </h2>
          </div>

          {/* Category Filter Tabs with Horizontal Touch Scroll on Mobile */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-full overflow-x-auto no-scrollbar max-w-full flex-nowrap sm:flex-wrap whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs px-3.5 sm:px-4 py-1.5 sm:py-2 font-bold tracking-wider uppercase transition-all rounded-full ${
                  activeTab === tab.id
                    ? "bg-black text-white shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* EDITORIAL MODEL CARDS (Matches Reference Image)           */}
        {/* ========================================================= */}
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
            {displayProducts.slice(0, 8).map((product) => (
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

                {/* Product Metadata & Action Button (Matches Reference) */}
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
