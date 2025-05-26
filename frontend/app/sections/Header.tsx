"use client";

import { useEffect, useRef } from "react";
import { Link } from "@heroui/react";
import { Button } from "@heroui/react";
import { Sparkles, Workflow, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/utils/site";
import { GithubIcon } from "@/components/icons";
import Logo from "@/components/logo";

const iconMap = {
  Sparkles: <Sparkles size={16} />,
  Workflow: <Workflow size={16} />,
  HelpCircle: <HelpCircle size={16} />,
};

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
		<Link
            href="/"
            aria-label="Syncwave"
		>
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
          <Link
            className="hover:text-green-400 transition-colors"
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon className="text-gray-400" />
          </Link>
        </div>

        <Button as={Link} color="success" href="#get-started" variant="shadow">
          Get Started
        </Button>
      </div>
    </header>
  );
}
