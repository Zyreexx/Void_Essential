"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/context";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount
  } = useStore();

  const FREE_SHIPPING_THRESHOLD = 2500;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-void-black/70 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-void-cream text-void-black shadow-2xl flex flex-col justify-between border-l border-void-border">
          
          {/* Header */}
          <div className="p-6 border-b border-void-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-sm font-extrabold tracking-widest uppercase font-display">
                YOUR BAG ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-void-bone px-6 py-3 border-b border-void-border">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-void-slate mb-1.5">
                Add <span className="font-bold text-void-black">RS. {amountToFreeShipping.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> more to unlock <span className="font-semibold text-void-black">Free Delivery</span>.
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-700 mb-1.5 flex items-center gap-1.5">
                <span>✓</span> You have unlocked complimentary delivery!
              </p>
            )}
            <div className="w-full bg-void-border h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-void-black h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-void-ash stroke-1" />
                <p className="text-sm font-semibold tracking-wider text-void-black">
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <p className="text-xs text-void-ash max-w-xs leading-relaxed">
                  Explore our curated archival catalog and elevate your everyday wardrobe.
                </p>
                <Link
                  href="/catalog"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-block bg-void-black text-void-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:opacity-90"
                >
                  DISCOVER COLLECTION
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 pb-6 border-b border-void-border last:border-b-0"
                >
                  {/* Thumbnail with Smooth Radius */}
                  <div className="w-20 h-24 bg-void-bone relative flex-shrink-0 overflow-hidden rounded-xl border border-void-border/70">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-void-ash">
                        VOID
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold tracking-wide hover:underline leading-tight line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-void-ash hover:text-red-500 transition-colors p-1 rounded-full hover:bg-neutral-100"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-void-slate tracking-wider">
                        <span>Size: <strong className="text-void-black">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-void-black">{item.color}</strong></span>
                      </div>

                      <p className="mt-1 text-xs font-bold tracking-tight text-void-black">
                        RS. {(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    {/* Quantity Selector with Smooth Pill */}
                    <div className="flex items-center border border-void-border w-24 justify-between bg-void-white px-2.5 py-1 mt-2 rounded-full shadow-sm">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 hover:opacity-60 text-void-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 hover:opacity-60 text-void-black"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-void-border bg-void-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-void-slate">
                  <span>Subtotal</span>
                  <span className="font-semibold text-void-black">
                    RS. {cartSubtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-void-slate">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-void-black">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "RS. 149.00"}
                  </span>
                </div>
                <div className="border-t border-void-border pt-2 flex justify-between text-sm font-bold text-void-black">
                  <span>Total</span>
                  <span>
                    RS. {(cartSubtotal + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 149)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-void-black text-void-white py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
