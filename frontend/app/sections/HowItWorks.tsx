import { useEffect } from "react";
import { Button } from "@heroui/react";
import { Youtube as YoutubeIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SpotifyIcon } from "@/components/icons";
import { playlistDescription } from "@/utils/site";

export default function HowItWorks() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const steps = document.querySelectorAll(".step-card");

    steps.forEach((step, index) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top bottom-=100",
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="how-it-works">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transfer your music collections
          </p>
        </div>

        <div className="space-y-16">
          {/* 1. connect YouTube */}
          <div className="step-card grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">Connect YouTube</h3>
              <p className="text-gray-400">
                Login with your Google account to access your YouTube playlists.
                We'll scan your account and show you all available playlists.
              </p>
            </div>
            <div className="md:col-span-3 order-1 md:order-2">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-center gap-4">
                  <YoutubeIcon className="text-red-500 text-3xl" />
                  <div>
                    <h4 className="font-medium">Connect with YouTube</h4>
                    <p className="text-sm text-gray-400">
                      Access your playlists securely
                    </p>
                  </div>
                  <Button className="ml-auto" color="danger">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. connect Spotify */}
          <div className="step-card grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3 order-1">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex items-center gap-4">
                  <SpotifyIcon className="text-green-500 text-3xl" />
                  <div>
                    <h4 className="font-medium">Connect with Spotify</h4>
                    <p className="text-sm text-gray-400">
                      Allow playlist creation
                    </p>
                  </div>
                  <Button className="ml-auto" color="success">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 order-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3">Connect Spotify</h3>
              <p className="text-gray-400">
                Login with your Spotify account and authorize our app to create
                playlists on your behalf.
              </p>
            </div>
          </div>

          {/* 3. Transfer playlists */}
          <div className="step-card grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3">Transfer Playlists</h3>
              <p className="text-gray-400">
                Select the playlists you want to transfer, click a button, and
                watch as we transfer everything over to your Spotify account.
              </p>
            </div>
            <div className="md:col-span-3 order-1 md:order-2">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="space-y-2 mb-4">
                  <div className="bg-gray-700/50 p-3 rounded flex items-center">
                    <input checked className="mr-3" type="checkbox" />
                    <span>{ playlistDescription }</span>
                    <span className="ml-auto text-gray-400">42 tracks</span>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded flex items-center">
                    <input checked className="mr-3" type="checkbox" />
                    <span>Workout Mix</span>
                    <span className="ml-auto text-gray-400">28 tracks</span>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded flex items-center">
                    <input checked className="mr-3" type="checkbox" />
                    <span>Chill Lofi Beats</span>
                    <span className="ml-auto text-gray-400">63 tracks</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                  color="primary"
                >
                  Start Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
