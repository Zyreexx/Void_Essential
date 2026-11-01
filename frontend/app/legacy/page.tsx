import type { Metadata } from "next";
import AboutPage from "@/app/about/page";

export const metadata: Metadata = {
  title: "OUR LEGACY • VOID ESSENTIALS",
  description: "One piece. Done right. Radical permanence. Sourced from pure long-staple Supima cotton in Surat, Gujarat.",
};

export default function LegacyPage() {
  return <AboutPage />;
}
