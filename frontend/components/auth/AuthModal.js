"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Lock, Mail, User as UserIcon, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/context";
import { api } from "@/lib/api";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, loginUser, showToast } = useStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      if (authMode === "login") {
        const res = await api.login({ email, password });
        if (res.success && res.data) {
          loginUser(res.data.user, res.data.access_token, res.data.refresh_token);
        } else {
          setErrorMsg(res.message || "Invalid credentials. Please verify your details.");
        }
      } else {
        const res = await api.register({ email, password, full_name: fullName });
        if (res.success && res.data) {
          loginUser(res.data.user, res.data.access_token, res.data.refresh_token);
        } else {
          setErrorMsg(res.message || "Registration failed. Please check inputs.");
        }
      }
    } catch {
      setErrorMsg("Network error communicating with authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-void-black/75 backdrop-blur-sm"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative bg-void-cream border border-void-border/70 w-full max-w-md p-8 sm:p-10 shadow-2xl rounded-3xl z-10">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-void-ash hover:text-void-black rounded-full hover:bg-black/5 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Image
            src="/images/logo-horizontal-clean.png"
            alt="VOID ESSENTIALS"
            width={180}
            height={40}
            className="h-7 w-auto object-contain mb-1"
          />
          <p className="text-[10px] tracking-widest uppercase text-void-ash mt-1">
            {authMode === "login" ? "CLIENT ACCESS PORTAL" : "CREATE ATELIER ACCOUNT"}
          </p>
        </div>

        {/* Tab Switcher with Smooth Rounded Pills */}
        <div className="flex bg-void-bone p-1 rounded-full mb-6 text-xs font-bold tracking-widest uppercase border border-void-border/60">
          <button
            onClick={() => {
              setAuthMode("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-full transition-all ${
              authMode === "login"
                ? "bg-void-black text-void-white shadow-sm"
                : "text-void-ash hover:text-void-black"
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setAuthMode("register");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-full transition-all ${
              authMode === "register"
                ? "bg-void-black text-void-white shadow-sm"
                : "text-void-ash hover:text-void-black"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === "register" && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-void-ash absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Julian Vance"
                  className="w-full bg-void-white border border-void-border pl-10 pr-3 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-void-ash absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@voidessentials.store"
                className="w-full bg-void-white border border-void-border pl-10 pr-3 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-void-slate mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-void-ash absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-void-white border border-void-border pl-10 pr-3 py-3 rounded-xl text-xs text-void-black focus:outline-none focus:ring-2 focus:ring-void-black/20 focus:border-void-black transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-void-black text-void-white py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg rounded-full hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <span>{isLoading ? "PROCESSING..." : authMode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-[10px] text-neutral-400">
          By continuing, you agree to Void Essentials Terms of Fitting & Archival Privacy Notice.
        </p>

      </div>
    </div>
  );
}
