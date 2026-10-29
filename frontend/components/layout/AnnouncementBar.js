"use client";

import React from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-void-black text-void-white text-[10px] sm:text-[11px] tracking-wider py-2 px-3 sm:px-4 border-b border-void-charcoal overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center font-medium">
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 truncate">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">COMPLIMENTARY DISPATCH ON ORDERS OVER RS. 2,500</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-void-ash text-[10px] tracking-widest uppercase shrink-0">
          <Link href="/about" className="hover:text-void-white transition-colors">
            ATELIER ARCHIVE
          </Link>
          <span className="text-void-slate">|</span>
          <Link href="/contact" className="hover:text-void-white transition-colors">
            HELP &amp; CONCIERGE
          </Link>
        </div>
      </div>
    </div>
  );
}
