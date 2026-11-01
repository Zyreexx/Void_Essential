"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ShoppingBag, Truck, RefreshCw, ShieldCheck, ArrowLeft, Check } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity] = useState(1);
  const [activeTab, setActiveTab] = useState("fabric");

  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success && res.data) {
          const prod = res.data;
          setProduct(prod);
          // Set initial variant selections
          if (prod.variants && prod.variants.length > 0) {
            setSelectedSize(prod.variants[0].size);
            setSelectedColor(prod.variants[0].color_name);
          } else if (prod.sizes && prod.sizes.length > 0) {
            setSelectedSize(prod.sizes[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-void-cream">
        <p className="text-xs font-bold tracking-widest uppercase text-void-slate animate-pulse">
          Retrieving Archival Garment Specifications...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-void-cream p-6 text-center space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-void-black">
          Silhouette Not Found
        </h2>
        <p className="text-xs text-void-slate max-w-sm">
          This piece may have entered private archival rotation or is currently unavailable.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 bg-void-black text-void-white px-6 py-3 text-xs font-bold tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO CATALOG</span>
        </Link>
      </div>
    );
  }

  // Determine current active variant
  const currentVariant = product.variants?.find(
    (v) => v.size === selectedSize && (!selectedColor || v.color_name === selectedColor)
  ) || product.variants?.[0];

  const currentPrice = currentVariant?.price_override || product.price;
  const availableStock = currentVariant?.stock_quantity ?? 10;
  const allImages = product.images && product.images.length > 0 ? product.images : [{ image_url: product.primary_image }];

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
  };

  return (
    <div className="bg-void-cream min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium tracking-wider text-void-slate">
          <Link href="/catalog" className="hover:text-void-black flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CATALOG</span>
          </Link>
          <span>/</span>
          <span className="uppercase text-void-ash">{product.category}</span>
          <span>/</span>
          <span className="uppercase text-void-black font-semibold truncate">{product.title}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary High-Res View with Smooth Luxury Radius */}
            <div className="relative aspect-[3/4] bg-void-bone overflow-hidden rounded-3xl border border-void-border/70 shadow-lg">
              {allImages[selectedImage]?.image_url ? (
                <Image
                  src={allImages[selectedImage].image_url}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover object-center grayscale contrast-115"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs tracking-widest text-void-ash">
                  ARCHIVAL IMAGE
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.is_archival && (
                  <span className="bg-void-black text-void-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                    ARCHIVE EDITION
                  </span>
                )}
                {product.is_new_arrival && (
                  <span className="bg-void-white/95 backdrop-blur-sm text-void-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-void-border shadow-md">
                    NEW RELEASE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Carousel with Smooth Rounded Corners */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={img.image_url || idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 flex-shrink-0 bg-void-bone rounded-xl overflow-hidden border transition-all ${
                      selectedImage === idx
                        ? "border-void-black ring-2 ring-void-black"
                        : "border-void-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover grayscale"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Inspection & Purchasing Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            <div>
              {/* Category & Title */}
              <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate block">
                {product.category} &bull; ATELIER ARCHIVE
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-void-black font-display uppercase mt-2">
                {product.title}
              </h1>

              {/* Price & SKU */}
              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                {product.compare_at_price ? (
                  <>
                    <span className="text-base text-neutral-400 line-through font-normal">
                      RS. {product.compare_at_price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#EA3323]">
                      RS. {currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="bg-[#EA3323] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm tracking-wider shadow-sm">
                      10% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-black text-[#EA3323]">
                    RS. {currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
                <span className="text-[11px] text-neutral-400 font-mono ml-auto">
                  SKU: {currentVariant?.sku || "VOID-ARCHIVAL"}
                </span>
              </div>

              {/* Stock Status Badge */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${availableStock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className="text-xs font-medium tracking-wider text-void-slate">
                  {availableStock > 5
                    ? "In Stock — Ready for atelier dispatch"
                    : availableStock > 0
                    ? `Archival scarcity — Only ${availableStock} units remaining`
                    : "Archival edition currently depleted"}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 text-xs sm:text-sm text-void-slate leading-relaxed border-t border-void-border/60 pt-6">
                {product.description}
              </p>

              {/* Variant Selector: Color */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-void-black block mb-2">
                    COLOR: <span className="font-normal text-void-slate">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(product.variants.map((v) => v.color_name))).map((colorName) => {
                      const colorObj = product.variants?.find((v) => v.color_name === colorName);
                      const isSelected = selectedColor === colorName;
                      return (
                        <button
                          key={colorName}
                          onClick={() => setSelectedColor(colorName)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                            isSelected
                              ? "border-void-black bg-void-pitch text-void-white shadow-sm"
                              : "border-void-border bg-void-white text-void-black hover:border-neutral-400"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: colorObj?.color_hex || "#111" }}
                          />
                          <span>{colorName}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Variant Selector: Size */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-void-black">
                      SELECT SIZE
                    </span>
                    <span className="text-[10px] text-void-ash tracking-widest uppercase">
                      FITS TRUE TO ARCHIVAL DRAPE
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {Array.from(new Set(product.variants.map((v) => v.size))).map((sz) => {
                      const isSelected = selectedSize === sz;
                      const variantForSize = product.variants?.find(
                        (v) => v.size === sz && (!selectedColor || v.color_name === selectedColor)
                      );
                      const isOutOfStock = (variantForSize?.stock_quantity ?? 0) <= 0;

                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(sz)}
                          className={`py-3 text-xs font-bold tracking-wider uppercase border rounded-xl transition-all ${
                            isSelected
                              ? "border-void-black bg-void-black text-void-white shadow-sm scale-[1.02]"
                              : isOutOfStock
                              ? "border-void-border/40 text-neutral-300 bg-neutral-100 cursor-not-allowed line-through"
                              : "border-void-border bg-void-white text-void-black hover:border-void-black"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons: Add to Bag & Wishlist with Smooth Curves */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={availableStock <= 0}
                  className="flex-1 bg-void-black text-void-white py-4 px-8 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg rounded-full hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{availableStock > 0 ? "ADD TO ATELIER BAG" : "OUT OF STOCK"}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-4 border border-void-border bg-void-white hover:border-void-black text-void-black transition-all rounded-full hover:scale-105 shadow-sm"
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Reassurance Micro-Strip with Smooth Card Styling */}
              <div className="mt-6 p-4 rounded-2xl bg-void-bone/70 border border-void-border/60 grid grid-cols-3 gap-2 text-center text-[11px] text-void-slate shadow-sm">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-void-black" />
                  <span>Complimentary Shipping Over RS. 2,500</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-void-black" />
                  <span>15-Day Return Protocol</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-void-black" />
                  <span>Artisanal Construction</span>
                </div>
              </div>

            </div>

            {/* Accordion / Specification Tabs */}
            <div className="border-t border-void-border pt-6">
              <div className="flex border-b border-void-border text-xs font-bold tracking-widest uppercase mb-4">
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-2.5 mr-6 border-b-2 transition-all ${
                    activeTab === "fabric"
                      ? "border-void-black text-void-black"
                      : "border-transparent text-void-ash hover:text-void-black"
                  }`}
                >
                  FABRIC & GSM
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-2.5 mr-6 border-b-2 transition-all ${
                    activeTab === "care"
                      ? "border-void-black text-void-black"
                      : "border-transparent text-void-ash hover:text-void-black"
                  }`}
                >
                  CARE INSTRUCTIONS
                </button>
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`pb-2.5 border-b-2 transition-all ${
                    activeTab === "delivery"
                      ? "border-void-black text-void-black"
                      : "border-transparent text-void-ash hover:text-void-black"
                  }`}
                >
                  SHIPPING & RETURNS
                </button>
              </div>

              <div className="text-xs text-void-slate leading-relaxed">
                {activeTab === "fabric" && (
                  <p>{product.fabric_composition || "Heavyweight Japanese/Italian combed textiles selected for long-term shape retention."}</p>
                )}
                {activeTab === "care" && (
                  <p>{product.care_instructions || "Delicate cold wash inside out or professional dry clean. Do not tumble dry."}</p>
                )}
                {activeTab === "delivery" && (
                  <p>Dispatched from our central fulfillment atelier within 24–48 hours. Express insured transit worldwide. Complimentary returns within 15 days of delivery.</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
