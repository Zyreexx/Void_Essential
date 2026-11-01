"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";

interface CompletedOrderItem {
  product_title: string;
  size: string;
  quantity: number;
  unit_price: number;
}

interface CompletedOrder {
  order_number: string;
  customer_email: string;
  total_amount: number;
  items: CompletedOrderItem[];
}

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, user, showToast } = useStore();

  const [email, setEmail] = useState(user?.email || "");
  const [firstName, setFirstName] = useState(user?.full_name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.full_name?.split(" ")[1] || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [shippingMethod] = useState("standard");

  // Payment simulation state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const shippingFee = cartSubtotal >= 2500 ? 0.0 : shippingMethod === "express" ? 299.0 : 149.0;
  const tax = Math.round(cartSubtotal * 0.05 * 100) / 100;
  const total = (cartSubtotal + shippingFee + tax);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }

    if (!email || !address || !city || !postalCode) {
      showToast("Please fill in all required shipping fields.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer_email: email,
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          address,
          city,
          state,
          postal_code: postalCode,
          country,
          method: shippingMethod
        },
        items: cart.map((item) => ({
          product_id: item.productId,
          variant_id: item.variantId,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        }))
      };

      const res = await api.createOrder(orderPayload);
      if (res.success && res.data?.order) {
        setCompletedOrder(res.data.order as CompletedOrder);
        clearCart();
        showToast("Your order has been confirmed by the atelier.", "success");
      } else {
        showToast(res.message || "Failed to finalize order. Please try again.", "error");
      }
    } catch (err) {
      console.error("Order error:", err);
      showToast("Network error submitting order.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Confirmed Receipt View
  if (completedOrder) {
    return (
      <div className="bg-void-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-void-white border border-void-border/70 p-8 sm:p-12 shadow-2xl rounded-3xl space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold tracking-super-wide uppercase text-void-slate block">
              ATELIER FULFILLMENT DISPATCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-void-black font-display uppercase">
              ORDER CONFIRMED
            </h1>
            <p className="text-xs text-void-slate">
              Receipt & tracking dispatched to <strong className="text-void-black">{completedOrder.customer_email}</strong>.
            </p>
          </div>

          <div className="bg-void-bone p-5 rounded-2xl border border-void-border/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-void-slate uppercase font-semibold">Order Reference:</span>
              <span className="font-mono font-bold text-void-black">{completedOrder.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-void-slate uppercase font-semibold">Payment Status:</span>
              <span className="font-bold text-emerald-700 uppercase">Paid (Verified)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-void-slate uppercase font-semibold">Total Amount:</span>
              <span className="font-bold text-void-black">${completedOrder.total_amount?.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-void-border pt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-void-black">
              ORDERED SILHOUETTES ({completedOrder.items?.length})
            </h4>
            <div className="divide-y divide-void-border text-xs">
              {completedOrder.items?.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-void-black">{item.product_title}</span>
                    <span className="text-void-ash text-[11px] block">
                      Size: {item.size} &bull; Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-void-black">
                    ${(item.unit_price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-void-border">
            <Link
              href="/catalog"
              className="w-full bg-void-black text-void-white py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 rounded-full shadow-lg"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (cart.length === 0) {
    return (
      <div className="bg-void-cream min-h-screen py-24 px-4 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-void-ash mx-auto stroke-1" />
        <h2 className="text-lg font-bold uppercase tracking-widest text-void-black">
          YOUR BAG IS EMPTY
        </h2>
        <p className="text-xs text-void-slate max-w-sm mx-auto">
          Add an item from our curated collection before proceeding to checkout.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-void-black text-void-white px-6 py-3 text-xs font-bold tracking-widest uppercase mt-2"
        >
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-void-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 flex items-center gap-2 text-xs font-medium tracking-wider text-void-slate">
          <Link href="/catalog" className="hover:text-void-black flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO STORE</span>
          </Link>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Form: Shipping & Simulated Payment */}
          <div className="lg:col-span-7 space-y-8">

            {/* Step 1: Customer & Shipping Address */}
            <div className="bg-void-white border border-void-border/70 p-6 sm:p-8 space-y-5 shadow-sm rounded-3xl">
              <div className="flex items-center justify-between border-b border-void-border pb-3">
                <h3 className="text-xs font-extrabold tracking-widest uppercase text-void-black font-display">
                  1. CLIENT INFORMATION & SHIPPING ADDRESS
                </h3>
                <span className="text-[10px] text-void-ash uppercase tracking-widest">STEP 1 OF 2</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                  Email Address for Tracking
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@voidessentials.store"
                  className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Julian"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="104 Mercer Street, Suite 4B"
                  className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="NY"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10012"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black uppercase transition-all"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            {/* Step 2: Payment Gateway Simulation */}
            <div className="bg-void-white border border-void-border/70 p-6 sm:p-8 space-y-5 shadow-sm rounded-3xl">
              <div className="flex items-center justify-between border-b border-void-border pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-void-black" />
                  <h3 className="text-xs font-extrabold tracking-widest uppercase text-void-black font-display">
                    2. SECURE PAYMENT (ENCRYPTED)
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-BIT SSL ENCRYPTED</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 rounded-2xl">
                [Simulated Gateway] Secure test environment active. You can enter any 16-digit card number to verify order completion.
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 •••• •••• 4242"
                  className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs font-mono text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs font-mono text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1.5">
                    Security Code (CVC)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-void-cream border border-void-border px-4 py-3 rounded-xl text-xs font-mono text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-void-black text-void-white py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg rounded-full hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <span>{isSubmitting ? "AUTHORIZING WITH ATELIER..." : `AUTHORIZE PAYMENT • RS. ${total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-void-white border border-void-border/70 p-6 sm:p-8 space-y-6 shadow-sm rounded-3xl sticky top-28">
              <h3 className="text-xs font-extrabold tracking-widest uppercase text-void-black font-display border-b border-void-border pb-3">
                SUMMARY ({cart.length} {cart.length === 1 ? "PIECE" : "PIECES"})
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-void-border">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3">
                    <div className="w-16 h-20 bg-void-bone relative flex-shrink-0 rounded-xl overflow-hidden border border-void-border/70">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-void-black line-clamp-1">{item.title}</p>
                      <p className="text-void-slate text-[11px] mt-0.5">
                        Size: {item.size} &bull; Color: {item.color}
                      </p>
                      <p className="text-void-ash text-[11px]">Qty: {item.quantity}</p>
                      <p className="font-bold text-void-black mt-1">
                        RS. {(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2 border-t border-void-border pt-4 text-xs">
                <div className="flex justify-between text-void-slate">
                  <span>Subtotal</span>
                  <span className="font-semibold text-void-black">
                    RS. {cartSubtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-void-slate">
                  <span>Domestic Delivery</span>
                  <span className="font-semibold text-void-black">
                    {shippingFee === 0 ? "COMPLIMENTARY" : `RS. ${shippingFee.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </span>
                </div>
                <div className="flex justify-between text-void-slate">
                  <span>GST (Included / 5%)</span>
                  <span className="font-semibold text-void-black">
                    RS. {tax.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-void-black border-t border-void-border pt-3">
                  <span>TOTAL DUE</span>
                  <span className="text-[#EA3323]">
                    RS. {total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Reassurance */}
              <div className="bg-void-bone p-3.5 border border-void-border text-[11px] text-void-slate space-y-1">
                <p className="font-semibold text-void-black">&ldquo;Essentials, without excess.&rdquo;</p>
                <p>All pieces are individually wrapped in archival unbleached tissue and tracked from the atelier.</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
