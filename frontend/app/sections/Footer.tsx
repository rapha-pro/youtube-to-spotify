import { Music, Youtube as YoutubeIcon } from "lucide-react";
import { SpotifyIcon } from "@/components/icons";
import { Link } from "@heroui/react";


export default function Footer() {

  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 rounded-full"></div>
              <div className="absolute inset-[2px] bg-gray-900 rounded-full flex items-center justify-center">
                <Music size={16} className="text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Syncwave
            </h1>
          </div>

          <div className="flex gap-6 items-center mb-6 md:mb-0">
            <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              <SpotifyIcon className="text-green-400" size={20} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              <YoutubeIcon className="text-red-400" size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Syncwave. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
