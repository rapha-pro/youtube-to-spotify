"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  const handleGetStarted = () => {
    router.push("/get-started");
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link aria-label="Syncwave" href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
              href={item.href}
            >
              {iconMap[item.icon as keyof typeof iconMap]}
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/get-started">
          <Button
            color="success"
            endContent={
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            }
            variant="shadow"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
}
