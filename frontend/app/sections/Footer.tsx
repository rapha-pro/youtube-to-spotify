import { TvMinimalPlay } from "lucide-react";
import { Link } from "@heroui/react";

import { SpotifyIcon } from "@/components/icons";
import { siteConfig } from "@/utils/site";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link aria-label="Syncwave" href="/">
            <Logo classname="mb-6 md:mb-0" showText={false} />
          </Link>
          <div className="flex gap-6 items-center mb-6 md:mb-0">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className="text-gray-400 hover:text-white transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
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
            <Link className="hover:text-gray-300 transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:text-gray-300 transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="hover:text-gray-300 transition-colors" href="#">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
