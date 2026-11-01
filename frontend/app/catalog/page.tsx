"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, SlidersHorizontal, Star, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";
import { Product } from "@/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialArchival = searchParams.get("archival") === "true";
  const initialWishlist = searchParams.get("wishlist") === "true";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [onlyArchival, setOnlyArchival] = useState(initialArchival);
  const [viewingWishlist, setViewingWishlist] = useState(initialWishlist);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, toggleWishlist, isWishlisted, wishlist } = useStore();

  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (selectedCategory && selectedCategory !== "all") {
          params.category = selectedCategory;
        }
        if (onlyArchival) {
          params.archival = "true";
        }
        if (selectedSort) {
          params.sort = selectedSort;
        }

        const res = await api.getProducts(params);
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    }

    if (!viewingWishlist) {
      fetchCatalog();
    } else {
      setProducts(wishlist);
      setLoading(false);
    }
  }, [selectedCategory, selectedSort, onlyArchival, viewingWishlist, wishlist]);

  const categories = [
    { label: "ALL ATELIER", value: "all" },
    { label: "MEN", value: "men" },
    { label: "WOMEN", value: "women" },
    { label: "ACCESSORIES", value: "accessories" },
  ];

  return (
    <div className="bg-void-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-void-border pb-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-super-wide uppercase text-void-slate">
                {viewingWishlist ? "SAVED ARCHIVE" : "ATELIER CATALOG"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-void-black font-display uppercase mt-1">
                {viewingWishlist ? "YOUR WISHLIST" : onlyArchival ? "ARCHIVAL VAULT" : "ESSENTIALS COLLECTION"}
              </h1>
            </div>
            <p className="text-xs text-void-slate tracking-wider max-w-xs md:text-right">
              Showing {products.length} {products.length === 1 ? "silhouette" : "silhouettes"} crafted with uncompromised textile integrity.
            </p>
          </div>

          {/* Filtering & Sorting Controls Bar */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-void-border/60">
            
            {/* Category Pills with Smooth Curves */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setViewingWishlist(false);
                    setSelectedCategory(cat.value);
                  }}
                  className={`text-xs px-5 py-2.5 font-bold tracking-widest uppercase transition-all rounded-full ${
                    !viewingWishlist && selectedCategory === cat.value
                      ? "bg-void-black text-void-white shadow-sm scale-[1.02]"
                      : "bg-void-white border border-void-border text-void-slate hover:text-void-black hover:border-void-black"
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setViewingWishlist(false);
                  setOnlyArchival(!onlyArchival);
                }}
                className={`text-xs px-5 py-2.5 font-bold tracking-widest uppercase transition-all rounded-full ${
                  onlyArchival && !viewingWishlist
                    ? "bg-void-black text-void-white shadow-sm scale-[1.02]"
                    : "bg-void-white border border-void-border text-void-slate hover:text-void-black hover:border-void-black"
                }`}
              >
                ARCHIVAL ONLY
              </button>
            </div>

            {/* Sorting Dropdown with Smooth Rounded Borders */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-void-slate" />
              <label htmlFor="sort-select" className="text-xs font-bold tracking-widest uppercase text-void-slate">
                SORT:
              </label>
              <select
                id="sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-void-white border border-void-border text-xs font-semibold px-4 py-2 rounded-full text-void-black focus:outline-none focus:border-void-black tracking-wider uppercase shadow-sm cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse space-y-3">
                <div className="bg-void-bone aspect-[3/4] w-full border border-void-border" />
                <div className="h-4 bg-void-border w-3/4" />
                <div className="h-3 bg-void-border w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-sm font-bold tracking-widest uppercase text-void-black">
              NO PIECES FOUND IN THIS SPECIFICATION
            </p>
            <p className="text-xs text-void-slate max-w-sm mx-auto">
              Try adjusting your category filter or explore our complete atelier archive.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyArchival(false);
                setViewingWishlist(false);
              }}
              className="mt-4 inline-block bg-void-black text-void-white px-6 py-3 text-xs font-bold tracking-widest uppercase"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col justify-between">
                
                {/* Image Container with Studio Neutral Background & Rounded Luxury Corners */}
                <div className="relative aspect-square bg-[#E8E8E8] overflow-hidden rounded-3xl border border-neutral-200/50 shadow-sm hover:shadow-md transition-all">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
                    {product.primary_image && (
                      <Image
                        src={product.primary_image}
                        alt={product.title}
                        fill
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                  </Link>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-black hover:text-red-500 rounded-full transition-all shadow-sm opacity-0 group-hover:opacity-100"
                    aria-label={`Wishlist ${product.title}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Metadata & Shopping Bag Button (Matches Reference) */}
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
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs tracking-widest uppercase">Loading Atelier Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
