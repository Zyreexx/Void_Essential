"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, MessageSquare } from "lucide-react";
import { useStore } from "@/lib/context";

export default function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    setIsAuthModalOpen,
    setAuthMode,
    logoutUser
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMegaMenuOpen, setShopMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopMegaMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* ========================================================= */}
        {/* 1. LEFT NAVIGATION LINKS (Desktop & Tablet)               */}
        {/* ========================================================= */}
        <div className="flex-1 hidden lg:flex items-center space-x-5 xl:space-x-7 text-[11px] xl:text-xs font-semibold tracking-widest text-neutral-800 uppercase">
          
          {/* HOME */}
          <Link
            href="/"
            className={`py-2 transition-opacity hover:opacity-60 ${
              pathname === "/" ? "text-black font-extrabold" : "text-neutral-700"
            }`}
          >
            HOME
          </Link>

          {/* SHOP ∨ with Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setShopMegaMenuOpen(true)}
            onMouseLeave={() => setShopMegaMenuOpen(false)}
          >
            <button
              onClick={() => setShopMegaMenuOpen(!shopMegaMenuOpen)}
              className={`py-2 flex items-center gap-1 transition-opacity hover:opacity-60 ${
                pathname?.startsWith("/catalog") || shopMegaMenuOpen ? "text-black font-extrabold" : "text-neutral-700"
              }`}
            >
              <span>SHOP</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopMegaMenuOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* ABOUT */}
          <Link
            href="/about"
            className={`py-2 transition-opacity hover:opacity-60 ${
              pathname === "/about" || pathname === "/legacy" ? "text-black font-extrabold" : "text-neutral-700"
            }`}
          >
            ABOUT
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            className={`py-2 transition-opacity hover:opacity-60 ${
              pathname === "/contact" ? "text-black font-extrabold" : "text-neutral-700"
            }`}
          >
            CONTACT
          </Link>

          {/* TRACK YOUR ORDER */}
          <Link
            href="/contact?topic=tracking"
            className="py-2 transition-opacity hover:opacity-60 text-neutral-700"
          >
            TRACK YOUR ORDER
          </Link>

        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-neutral-900 hover:opacity-60 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. CENTER: BRAND LOGO                                     */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Link href="/" className="inline-flex items-center group py-1">
            <Image
              src="/images/logo-horizontal-clean.png"
              alt="VOID ESSENTIALS"
              width={190}
              height={42}
              priority
              className="h-5.5 sm:h-7.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* ========================================================= */}
        {/* 3. RIGHT UTILITY CLUSTER: INDIA | SEARCH | USER | BAG      */}
        {/* ========================================================= */}
        <div className="flex-1 flex items-center justify-end space-x-3.5 sm:space-x-6 text-xs text-neutral-900">
          
          {/* REGION (DISPLAY ONLY) */}
          <span className="hidden sm:inline-block text-[11px] font-bold tracking-widest uppercase text-neutral-800 select-none cursor-default py-1">
            INDIA
          </span>

          {/* SEARCH */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 hover:opacity-60 transition-opacity active:scale-95"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
          </button>

          {/* USER ACCOUNT */}
          {user ? (
            <div className="relative group py-1">
              <button
                className="flex items-center gap-1.5 p-1 hover:opacity-75 transition-opacity"
                aria-label="User profile"
              >
                <div className="w-6 h-6 rounded-full bg-void-black text-void-white flex items-center justify-center text-[10px] font-bold">
                  {user.full_name ? user.full_name[0].toUpperCase() : "V"}
                </div>
              </button>

              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                <div className="bg-white border border-neutral-200 p-4 shadow-xl min-w-[200px] text-xs space-y-2 rounded-2xl">
                  <p className="font-bold text-neutral-900 truncate">{user.full_name || "Archival Client"}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                  <div className="border-t border-neutral-100 pt-2 space-y-1">
                    <Link href="/catalog" className="block py-1 text-neutral-600 hover:text-black">
                      Archival Vault
                    </Link>
                    <Link href="/contact" className="block py-1 text-neutral-600 hover:text-black">
                      Support Concierge
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left py-1 text-red-600 hover:underline font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode("login");
                setIsAuthModalOpen(true);
              }}
              className="p-1.5 hover:opacity-60 transition-opacity active:scale-95"
              aria-label="Sign in"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
            </button>
          )}

          {/* SHOPPING BAG */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 hover:opacity-60 transition-opacity active:scale-95"
            aria-label={`Shopping bag containing ${cartCount} pieces`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. FULL-WIDTH LUXURY SHOP MEGA MENU (Matches Reference)   */}
      {/* ========================================================= */}
      {shopMegaMenuOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-2xl py-10 transition-all z-50 animate-fadeIn"
          onMouseEnter={() => setShopMegaMenuOpen(true)}
          onMouseLeave={() => setShopMegaMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8">
            
            {/* Column 1: Denim */}
            <div className="col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold tracking-wider text-black uppercase font-display border-b border-neutral-100 pb-2">
                Denim
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider text-neutral-600 uppercase">
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">SHOP ALL</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">STRAIGHT</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">BOOTCUT</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">BAGGY</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">BARREL</Link></li>
              </ul>
            </div>

            {/* Column 2: Pants */}
            <div className="col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold tracking-wider text-black uppercase font-display border-b border-neutral-100 pb-2">
                Pants
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider text-neutral-600 uppercase">
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">CARGO PANTS</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">WIDE LEG</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">TAILORED WOOL</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">PLEATED TROUSERS</Link></li>
              </ul>
            </div>

            {/* Column 3: Topwear */}
            <div className="col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold tracking-wider text-black uppercase font-display border-b border-neutral-100 pb-2">
                Topwear
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider text-neutral-600 uppercase">
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">T-SHIRT (SUPIMA)</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">OVERSIZED HOODIE</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">SHIRT JACKET</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">FLANNEL SHIRT</Link></li>
                <li><Link href="/catalog" onClick={() => setShopMegaMenuOpen(false)} className="hover:text-black hover:translate-x-1 transition-all inline-block">JACKETS & COATS</Link></li>
              </ul>
            </div>

            {/* Column 4 & 5: Right Featured Editorial Cards */}
            <div className="col-span-6 grid grid-cols-2 gap-5 pl-4 border-l border-neutral-100">
              
              {/* Featured Card 1: Jackets */}
              <Link
                href="/catalog"
                onClick={() => setShopMegaMenuOpen(false)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md block"
              >
                <Image
                  src="/images/products/puffer-jacket.jpg"
                  alt="Atelier Jackets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-medium text-neutral-300">
                    Made for those who seek form
                  </span>
                  <h3 className="text-xl font-extrabold uppercase font-display mt-0.5 tracking-tight group-hover:underline">
                    Jackets
                  </h3>
                </div>
              </Link>

              {/* Featured Card 2: Denim */}
              <Link
                href="/catalog"
                onClick={() => setShopMegaMenuOpen(false)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md block"
              >
                <Image
                  src="/images/products/wide-leg-pant.jpg"
                  alt="Atelier Denim & Pants"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-medium text-neutral-300">
                    Best-in-class Archival
                  </span>
                  <h3 className="text-xl font-extrabold uppercase font-display mt-0.5 tracking-tight group-hover:underline">
                    Denim &amp; Trousers
                  </h3>
                </div>
              </Link>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SLIDE-OVER MOBILE DRAWER (Mobile & Tablet)             */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInLeft">
            
            <div className="p-6 space-y-6">
              
              {/* Header with Logo and Close */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <Image
                  src="/images/logo-horizontal-clean.png"
                  alt="VOID ESSENTIALS"
                  width={150}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Search Tap */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between bg-neutral-100 px-4 py-3 rounded-full text-xs text-neutral-600"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span>Search silhouettes, fabrics...</span>
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">SEARCH</span>
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1 text-xs font-bold tracking-widest text-neutral-900 uppercase">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  HOME
                </Link>

                <div className="py-2 px-2 space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400">COLLECTIONS</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-700 pl-1">
                    <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">&bull; ALL PIECES</Link>
                    <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">&bull; JACKETS</Link>
                    <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">&bull; HOODIES &amp; TEES</Link>
                    <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">&bull; CARGOS &amp; PANTS</Link>
                    <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">&bull; DENIM ARCHIVE</Link>
                  </div>
                </div>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  ABOUT / OUR STORY
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  CONTACT
                </Link>

                <Link
                  href="/contact?topic=returns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-700"
                >
                  15-DAY RETURNS &amp; EXCHANGES
                </Link>

                <Link
                  href="/contact?topic=tracking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-700"
                >
                  TRACK YOUR ORDER
                </Link>
              </nav>

            </div>

            {/* Bottom Drawer Footer: WhatsApp & Region */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-3">
              <a
                href="https://wa.me/919510490976"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Dispatch: Jamnagar &bull; Gujarat</span>
                <span className="font-bold text-black uppercase">INDIA</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
