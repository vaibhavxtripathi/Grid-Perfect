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
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-44 px-4 sm:px-6 lg:px-8">
        <Hero />
        <motion.div
          className="max-w-7xl mx-auto mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F7] p-5 shadow-sm relative z-10">
            <BentoGrid />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-40 
                  bg-gradient-to-b from-transparent to-white 
                  pointer-events-none z-20"
          ></div>
        </motion.div>
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
