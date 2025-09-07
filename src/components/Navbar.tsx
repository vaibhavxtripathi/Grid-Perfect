"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 fixed top-0 z-50 backdrop-blur-sm w-full ${
            scrolled ? "border-b border-gray-300 shadow-sm" : ""
          }`}
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                Grid Perfect
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/app"
                className="text-gray-700 hover:text-black transition-colors"
              >
                App
              </Link>
              <Link
                href="#features"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-black transition-colors"
              >
                How it Works
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/app"
                className="bg-black text-white px-3 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 group"
              >
                Get Started
                <div className="rotate-0 group-hover:-rotate-45 transition-transform duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-black"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/app"
                className="block px-3 py-2 text-gray-700 hover:text-black"
              >
                App
              </Link>
              <Link
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-black"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-gray-700 hover:text-black"
              >
                How it Works
              </Link>
              <Link
                href="/app"
                className="flex px-4 py-2 bg-black text-white rounded-md mx-3 mt-4 text-center text-sm font-medium items-center justify-center gap-2 group"
              >
                Get Started
                <div className="rotate-0 group-hover:-rotate-45 transition-transform duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
