import HeroSection from "@/components/home/HeroSection";
import StorefrontSections from "@/components/home/StorefrontSections";
import CategoryBand from "@/components/home/CategoryBand";
import VisionEditorial from "@/components/home/VisionEditorial";
import CampaignFeature from "@/components/home/CampaignFeature";
import TrustBadges from "@/components/home/TrustBadges";
import BestOfVoid from "@/components/home/BestOfVoid";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section with Parallax */}
      <HeroSection />

      {/* 2. Topwear & Category Tabbed Showcase */}
      <StorefrontSections />

      {/* 3. Jet-Black Category Showcase Band */}
      <CategoryBand />

      {/* 4. Editorial Brand Vision & Material Architecture */}
      <VisionEditorial />

      {/* 5. Split Campaign Featurette ("NEW VIBES") */}
      <CampaignFeature />

      {/* 6. Balanced Minimalist Trust Pillars */}
      <TrustBadges />

      {/* 7. Best of Void Featured Product Grid */}
      <BestOfVoid />
    </>
  );
}
