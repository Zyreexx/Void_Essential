"use client";

import React from "react";

// Bespoke, hand-crafted editorial line icons mirroring the reference design
function DeliveryTruckIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.63l-2.4-3A1 1 0 0 0 18.6 9H14v9" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M2 9h4" strokeDasharray="1.5 1.5" />
      <path d="M1 12h3" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function ReturnBoxIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Isometric open package / returns icon */}
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
      <path d="M12 12L4 7.5" />
      <path d="M7.5 5.5l9 5" strokeDasharray="2 1.5" />
      <path d="M15.5 13.5l2.5 1.5-2.5 1.5" />
    </svg>
  );
}

function QualitySealIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Scalloped rosette seal badge with verification check */}
      <path d="M12 2l2.4 2.3 3.3-.4 1.4 3 3 1.5-.4 3.3L22 14.1l-2.3 2.4.4 3.3-3 1.4-1.5 3-3.3-.4L12 22l-2.4-2.3-3.3.4-1.4-3-3-1.5.4-3.3L2 9.9l2.3-2.4-.4-3.3 3-1.4 1.5-3 3.3.4L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SecureLockIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Modern curved padlock */}
      <rect x="5" y="11" width="14" height="10" rx="3" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

interface BadgeItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

export default function TrustBadges() {
  const badges: BadgeItem[] = [
    {
      icon: DeliveryTruckIcon,
      title: "FAST DELIVERY",
      subtitle: "Quick & safe delivery",
    },
    {
      icon: ReturnBoxIcon,
      title: "EASY RETURNS",
      subtitle: "Within 15 days",
    },
    {
      icon: QualitySealIcon,
      title: "QUALITY ASSURED",
      subtitle: "Best fashion, best quality",
    },
    {
      icon: SecureLockIcon,
      title: "SECURE PAYMENT",
      subtitle: "100% secure checkout",
    },
  ];

  return (
    <section className="bg-void-cream py-12 sm:py-14 px-3.5 sm:px-6 lg:px-8 border-b border-void-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex items-center gap-2.5 sm:gap-4 group p-1.5 sm:p-2 rounded-2xl transition-all duration-300 hover:bg-white/60"
              >
                {/* Clean, borderless icon container with soft circular touch */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-void-bone flex items-center justify-center flex-shrink-0 text-void-black shadow-sm group-hover:scale-105 group-hover:bg-void-black group-hover:text-void-white transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-void-black">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 font-medium mt-0.5 leading-tight">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
