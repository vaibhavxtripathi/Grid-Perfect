"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import TrustedBy from "@/components/TrustedBy";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CallToAction from "@/components/CallToAction";
import SiteFooter from "@/components/SiteFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-44 px-4 sm:px-6 lg:px-8">
        <Hero />
        <BentoGrid />
      </section>
      <TrustedBy />
      <FeatureSection />
      <HowItWorks />
      <Benefits />
      <CallToAction />
      <SiteFooter />
    </div>
  );
}
