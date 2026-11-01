"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";
import { Product } from "@/types";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: query.trim() });
        if (res.success && res.data) {
          setResults(res.data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0 bg-void-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-void-cream max-w-3xl mx-auto border border-void-border/70 shadow-2xl p-6 sm:p-8 rounded-3xl">
        
        {/* Search Input Bar */}
        <div className="flex items-center border-b-2 border-void-black pb-4">
          <Search className="w-6 h-6 text-void-black mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, FABRICS, SILHOUETTES..."
            className="w-full bg-transparent text-sm sm:text-base font-medium tracking-wider text-void-black placeholder-neutral-400 focus:outline-none uppercase"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 hover:opacity-60 text-void-black rounded-full hover:bg-black/5 transition-all"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="py-8 text-center text-xs text-void-ash tracking-widest uppercase">
              Searching archival inventory...
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-xs text-void-ash tracking-widest uppercase">
              No matching archival items found for &ldquo;{query}&rdquo;.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-4 p-3.5 bg-void-white border border-void-border hover:border-void-black transition-all group rounded-2xl shadow-sm hover:shadow-md"
                >
                  <div className="w-16 h-20 bg-void-bone relative flex-shrink-0 overflow-hidden rounded-xl border border-void-border/60">
                    {product.primary_image ? (
                      <Image
                        src={product.primary_image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] text-void-ash">
                        VOID
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest uppercase text-void-ash font-medium">
                      {product.category}
                    </p>
                    <h4 className="text-xs font-bold text-void-black truncate mt-0.5">
                      {product.title}
                    </h4>
                    <p className="text-xs font-semibold text-void-black mt-1">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-void-ash group-hover:text-void-black group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="py-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-void-ash block mb-3">
                POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {["Trench Coat", "Heavyweight Boxy Tee", "Wool Trouser", "Cashmere Cocoon", "Leather Tote"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-4 py-2 bg-void-white border border-void-border hover:border-void-black text-void-black transition-all rounded-full shadow-sm hover:scale-105"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
