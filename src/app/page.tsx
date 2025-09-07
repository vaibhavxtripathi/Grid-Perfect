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
        <div className="max-w-7xl mx-auto mt-20 relative">
          {/* Card */}
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F7] p-5 shadow-sm relative z-10">
            <BentoGrid />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-40 
                  bg-gradient-to-b from-transparent to-white 
                  pointer-events-none z-20"
          ></div>
        </div>
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
