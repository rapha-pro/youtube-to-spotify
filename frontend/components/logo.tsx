import { Music } from "lucide-react";

import { LogoProps } from "@/types";
import { siteConfig } from "@/utils/site";

export default function Logo(LogoProps: LogoProps) {
  const { width = 8, height = 8, classname = "", size = 16, showText = true } = LogoProps;

  return (
    <div className={`flex items-center gap-2 ${classname}`}>
      <div className={`relative h-${height} w-${width}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 rounded-full animate-pulse" />
        <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
          <Music className="text-white" size={`${size}`} />
        </div>
      </div>
      { showText && 
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
          {siteConfig.name}
        </h1>
      }
    </div>
  );
}
