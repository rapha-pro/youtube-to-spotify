import { Button } from "@heroui/react";
import { SpotifyIcon } from "@/components/icons";
import { Youtube as YoutubeIcon } from "lucide-react";

export default function Cta() {

    return (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transfer Your Music?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of music lovers who have already seamlessly migrated their playlists.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </section>
    );
};