"use client";

import { TvMinimalPlay } from "lucide-react";

import { SpotifyIcon } from "@/components/icons";
import { siteConfig } from "@/utils/site";
import Logo from "@/components/logo";

export default function Footer() {
  const handleNavClick = (href: string) => {
    console.log("[Footer] - Nav clicked:", href);

    // For anchor links on same page, scroll to section if on home page
    if (href.startsWith("/#")) {
      const currentPath = window.location.pathname;

      if (currentPath === "/") {
        // If we're on home page, scroll to section
        const sectionId = href.substring(2); // Remove "/#"
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });

          return;
        }
      }
      // If not on home page, navigate to home with anchor
      window.location.href = href;
    } else {
      // For other pages, use window.location
      window.location.href = href;
    }
  };

  const handleLogoClick = () => {
    console.log("[Footer] - Logo clicked, navigating to home");
    window.location.href = "/";
  };

  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            aria-label="Syncwave"
            className="cursor-pointer mb-6 md:mb-0"
            onClick={handleLogoClick}
          >
            <Logo showText={false} />
          </button>

          <div className="flex gap-6 items-center mb-6 md:mb-0">
            {siteConfig.navItems.map((item) => (
              <button
                key={item.href}
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
              href="#"
            >
              <SpotifyIcon className="text-green-400" size={20} />
            </a>
            <a
              className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
              href="#"
            >
              <TvMinimalPlay className="text-red-400" size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Syncwave. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <button
              className="hover:text-gray-300 transition-colors"
              onClick={() => handleNavClick("#")}
            >
              Privacy Policy
            </button>
            <button
              className="hover:text-gray-300 transition-colors"
              onClick={() => handleNavClick("#")}
            >
              Terms of Service
            </button>
            <button
              className="hover:text-gray-300 transition-colors"
              onClick={() => handleNavClick("#")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
