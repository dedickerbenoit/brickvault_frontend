import {
  HeroSection,
  FeaturesSection,
  InsightsSection,
  UseCasesSection,
  CtaSection,
  LandingFooter,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
      <UseCasesSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
