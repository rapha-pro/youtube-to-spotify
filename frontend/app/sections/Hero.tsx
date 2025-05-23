"use client";

import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { Youtube as YoutubeIcon } from "lucide-react";
import { SpotifyIcon } from "@/components/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Phone from "@/components/phone";

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
	
		gsap.from(".hero-title", {
		  y: 50,
		  opacity: 0,
		  duration: 0.8,
		  delay: 0.2,
		  ease: "power3.out"
		});
	
		gsap.from(".hero-description", {
		  y: 50,
		  opacity: 0,
		  duration: 0.8,
		  delay: 0.4,
		  ease: "power3.out"
		});
	
		gsap.from(".hero-buttons", {
		  y: 50,
		  opacity: 0,
		  duration: 0.8,
		  delay: 0.6,
		  ease: "power3.out"
		});
	
		gsap.from(".hero-image", {
		  scale: 0.8,
		  opacity: 0,
		  duration: 1,
		  delay: 0.4,
		  ease: "elastic.out(1, 0.75)"
		});
	}, []);
	

	return (
		<section ref={heroRef} className="pt-32 pb-24 px-4 md:pt-40 md:pb-32">
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

						<div className="absolute inset-0 flex items-center justify-center">
							<Phone  />
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto max-w-6xl mt-16 text-center">
				<div className="inline-flex gap-2 items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
					<div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
					<p className="text-sm">
						<span className="font-bold text-green-400">100+</span> playlists transferred today
					</p>
				</div>
			</div>
		</section>
	);
};