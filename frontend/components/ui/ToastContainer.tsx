"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useStore, ToastItem } from "@/lib/context";

export default function ToastContainer() {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast: ToastItem) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 shadow-xl border flex items-center gap-3 text-xs font-medium tracking-wide transition-all animate-slide-in ${
            toast.type === "success"
              ? "bg-void-black text-void-white border-emerald-500/50"
              : toast.type === "error"
              ? "bg-red-950 text-red-100 border-red-500/50"
              : "bg-void-black text-void-white border-void-charcoal"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
          {toast.type === "info" && <Info className="w-4 h-4 text-void-ash flex-shrink-0" />}
          <span className="flex-1 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
