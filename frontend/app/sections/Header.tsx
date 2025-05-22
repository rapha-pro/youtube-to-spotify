"use client";

import { Link } from '@heroui/link';
import { Button } from '@/components/Button';
import { siteConfig } from '@/config/site';
import { Music, Sparkles, Workflow, HelpCircle, Github } from 'lucide-react';

const iconMap = {
  Sparkles: <Sparkles size={16} />,
  Workflow: <Workflow size={16} />,
  HelpCircle: <HelpCircle size={16} />,
};

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
              <Music size={16} className="text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
            {siteConfig.name}
          </h1>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              {iconMap[item.icon as keyof typeof iconMap]}
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <Github size={20} />
          </Link>
        </div>

        <Button color="success" variant="shadow" as={Link} href="#get-started">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;