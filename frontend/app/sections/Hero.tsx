"use client";

import { Button } from '@/components/Button';
import { SpotifyIcon, YoutubeIcon } from '@/components/Icons';

export const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-4 md:pt-40 md:pb-32">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="block">Transfer Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">YouTube</span>
            <span className="block">Playlists to</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">Spotify</span>
          </h1>
          <p className="hero-description text-gray-300 text-lg md:text-xl mb-8">
            Seamlessly migrate your music collections between platforms with just a few clicks.
            No more manual searching and rebuilding playlists.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4" id="get-started">
            <Button
              size="lg"
              color="success"
              variant="shadow"
              className="group flex items-center gap-2"
              startContent={<SpotifyIcon size={20} className="group-hover:scale-110 transition-transform" />}
            >
              Login with Spotify
            </Button>
            <Button
              size="lg"
              color="danger"
              variant="shadow"
              className="group flex items-center gap-2"
              startContent={<YoutubeIcon size={20} className="group-hover:scale-110 transition-transform" />}
            >
              Login with YouTube
            </Button>
          </div>
        </div>

        <div className="hero-image relative">
          <div className="relative h-[400px] w-full">
            <div className="absolute top-0 right-0 h-64 w-64 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-red-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            {/* Phone mockup and other content can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;