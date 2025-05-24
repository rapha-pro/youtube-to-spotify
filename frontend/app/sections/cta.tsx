import { Button } from "@heroui/react";
import { Youtube as YoutubeIcon } from "lucide-react";

import { SpotifyIcon } from "@/components/icons";

export default function Cta() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transfer Your Music?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of music lovers who have already seamlessly migrated
          their playlists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="group flex items-center gap-2"
            color="success"
            size="lg"
            startContent={
              <SpotifyIcon
                className="group-hover:scale-110 transition-transform"
                size={20}
              />
            }
            variant="shadow"
          >
            Login with Spotify
          </Button>
          <Button
            className="group flex items-center gap-2"
            color="danger"
            size="lg"
            startContent={
              <YoutubeIcon
                className="group-hover:scale-110 transition-transform"
                size={20}
              />
            }
            variant="shadow"
          >
            Login with YouTube
          </Button>
        </div>
      </div>
    </section>
  );
}
