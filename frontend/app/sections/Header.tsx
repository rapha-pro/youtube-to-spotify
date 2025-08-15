"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Sparkles, Workflow, HelpCircle, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteConfig } from "@/utils/site";
import Logo from "@/components/logo";

const iconMap = {
  Sparkles: <Sparkles size={16} />,
  Workflow: <Workflow size={16} />,
  HelpCircle: <HelpCircle size={16} />,
};

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("[Header] - Component mounted/remounted");
    gsap.registerPlugin(ScrollTrigger);

    // Kill any existing animations on this element first
    if (headerRef.current) {
      gsap.killTweensOf(headerRef.current);

      // Reset to visible state first
      gsap.set(headerRef.current, {
        y: 0,
        opacity: 1,
      });

      // Only animate on initial load, not on every navigation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );
    }

    // Cleanup function
    return () => {
      if (headerRef.current) {
        gsap.killTweensOf(headerRef.current);
      }
    };
  }, []); // Empty dependency array - only run on mount

  const handleGetStarted = () => {
    console.log("[Header] - Navigating to get-started");
    // Kill animations before navigation
    if (headerRef.current) {
      gsap.killTweensOf(headerRef.current);
    }
    router.push("/get-started");
  };

  const handleLogoClick = () => {
    console.log("[Header] - Logo clicked, navigating to home");
    // Kill animations before navigation
    if (headerRef.current) {
      gsap.killTweensOf(headerRef.current);
    }
    // Use window.location for more reliable navigation
    window.location.href = "/";
  };

  const handleNavClick = (href: string) => {
    console.log("[Header] - Nav clicked:", href);
    // Kill animations before navigation
    if (headerRef.current) {
      gsap.killTweensOf(headerRef.current);
    }

    // For anchor links on same page, use router
    if (href.startsWith("/#")) {
      router.push(href);
    } else {
      // For other pages, use window.location
      window.location.href = href;
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800"
      style={{ opacity: 1, transform: "translateY(0px)" }} // Ensure header is always visible
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          aria-label="Syncwave"
          className="cursor-pointer"
          onClick={handleLogoClick}
        >
          <Logo />
        </button>

        <div className="hidden md:flex gap-6 items-center">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.href}
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
              onClick={() => handleNavClick(item.href)}
            >
              {iconMap[item.icon as keyof typeof iconMap]}
              {item.label}
            </button>
          ))}
        </div>

        <Button
          color="success"
          endContent={
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          }
          variant="shadow"
          onPress={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
}
