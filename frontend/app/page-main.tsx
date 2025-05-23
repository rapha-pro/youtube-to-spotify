"use client";

import React, { useEffect, useRef } from "react";
import { Button, Card } from "@heroui/react";
import Image from "@heroui/image";
import {Link} from "@heroui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lucide React Icons
import {
  Music,
  Rocket,
  CheckCircle,
  ArrowRightLeft,
  Shield,
  Youtube as YoutubeIcon,
  MessageSquare
} from "lucide-react";

// Custom SpotifyIcon since Lucide doesn't have one
const SpotifyIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 11.8a6 6 0 0 1 8 0" />
    <path d="M9 15a3 3 0 0 1 6 0" />
    <path d="M7 8.6a8 8 0 0 1 10 0" />
  </svg>
);

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Hero section animations
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

    // Features section animations
    const features = document.querySelectorAll(".feature-card");
    features.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top bottom-=100",
        },
        y: 100,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.2,
        ease: "power3.out"
      });
    });

    // Steps section animations
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
        ease: "power3.out"
      });
    });

    // Testimonial animation
    gsap.from(testimonialRef.current, {
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top bottom-=50",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      {/* Header */}
      <header ref={headerRef} className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
                <Music size={16} className="text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Syncwave
            </h1>
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="hover:text-green-400 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-green-400 transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="hover:text-green-400 transition-colors">
              FAQ
            </Link>
          </div>

          <Button color="success" variant="shadow" as={Link} href="#get-started">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
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
                <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[550px]">
                  {/* Phone mockup */}
                  <div className="absolute inset-0 bg-gray-800 rounded-[40px] border-4 border-gray-700 shadow-2xl overflow-hidden">
                    {/* App Screen */}
                    <div className="absolute inset-2 bg-black rounded-[32px] overflow-hidden">
                      {/* App Content */}
                      <div className="h-full w-full flex flex-col">
                        {/* App Header */}
                        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 bg-gradient-to-r from-green-500 to-purple-600 rounded-full"></div>
                            <span className="text-white font-medium">Syncwave</span>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-gray-800"></div>
                        </div>

                        {/* App Body */}
                        <div className="flex-1 p-4 flex flex-col gap-4">
                          {/* YouTube Playlist */}
                          <div className="rounded-lg bg-red-900/20 border border-red-800/50 p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <YoutubeIcon className="text-red-500" size={20} />
                              <span className="text-red-200 font-medium">Summer Vibes 2023</span>
                            </div>
                            <div className="space-y-2">
                              <div className="h-6 bg-red-800/30 rounded-md w-full"></div>
                              <div className="h-6 bg-red-800/30 rounded-md w-[85%]"></div>
                              <div className="h-6 bg-red-800/30 rounded-md w-[90%]"></div>
                            </div>
                          </div>

                          {/* Transfer Animation */}
                          <div className="flex justify-center my-2">
                            <div className="relative h-10 w-10 bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
                              <ArrowRightLeft className="text-purple-400" size={20} />
                            </div>
                          </div>

                          {/* Spotify Playlist */}
                          <div className="rounded-lg bg-green-900/20 border border-green-800/50 p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <SpotifyIcon className="text-green-500" size={20} />
                              <span className="text-green-200 font-medium">Summer Vibes 2023</span>
                            </div>
                            <div className="space-y-2">
                              <div className="h-6 bg-green-800/30 rounded-md w-full flex items-center">
                                <div className="ml-auto mr-2 flex items-center gap-1">
                                  <CheckCircle className="text-green-400" size={16} />
                                </div>
                              </div>
                              <div className="h-6 bg-green-800/30 rounded-md w-[85%] flex items-center">
                                <div className="ml-auto mr-2 flex items-center gap-1">
                                  <CheckCircle className="text-green-400" size={16} />
                                </div>
                              </div>
                              <div className="h-6 bg-green-800/30 rounded-md w-[90%] flex items-center">
                                <div className="ml-auto mr-2 flex items-center gap-1">
                                  <CheckCircle className="text-green-400" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Success Message */}
                          <div className="mt-auto mx-auto px-6 py-3 bg-green-500/20 rounded-full text-green-400 flex items-center gap-2">
                            <CheckCircle size={16} />
                            <span>Transfer Complete!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl mt-16 text-center">
          <div className="inline-flex gap-2 items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm">
              <span className="font-bold text-green-400">1,500+</span> playlists transferred today
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featureRef} id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">Syncwave</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The easiest and most reliable way to transfer your music collections between streaming platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4">
                <Rocket className="text-green-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Transfer your playlists in seconds, not hours. Our optimized matching algorithm works at incredible speeds.
              </p>
            </Card>

            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4">
                <Music className="text-purple-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">99% Match Rate</h3>
              <p className="text-gray-400">
                Our advanced audio fingerprinting ensures nearly perfect matching, even for obscure tracks and remixes.
              </p>
            </Card>

            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-blue-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="text-blue-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Effortless Process</h3>
              <p className="text-gray-400">
                Just two logins and you're done. No complicated setup or configuration required.
              </p>
            </Card>

            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-red-900/30 flex items-center justify-center mb-4">
                <YoutubeIcon className="text-red-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">YouTube Integration</h3>
              <p className="text-gray-400">
                Access all your YouTube Music playlists and liked videos with a simple Google login.
              </p>
            </Card>

            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4">
                <SpotifyIcon className="text-green-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Spotify Integration</h3>
              <p className="text-gray-400">
                Seamlessly create new playlists in your Spotify account with all your favorite tracks.
              </p>
            </Card>

            <Card className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-yellow-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="text-yellow-400" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-400">
                We never store your passwords and use OAuth for secure authentication with both platforms.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Three simple steps to transfer your music collections
            </p>
          </div>

          <div className="space-y-16">
            <div className="step-card grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3">Connect YouTube</h3>
                <p className="text-gray-400">
                  Login with your Google account to access your YouTube playlists. We'll scan your account and show you all available playlists.
                </p>
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-center gap-4">
                    <YoutubeIcon className="text-red-500 text-3xl" />
                    <div>
                      <h4 className="font-medium">Connect with YouTube</h4>
                      <p className="text-sm text-gray-400">Access your playlists securely</p>
                    </div>
                    <Button color="danger" className="ml-auto">Connect</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="step-card grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-3 order-1">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex items-center gap-4">
                    <SpotifyIcon className="text-green-500 text-3xl" />
                    <div>
                      <h4 className="font-medium">Connect with Spotify</h4>
                      <p className="text-sm text-gray-400">Allow playlist creation</p>
                    </div>
                    <Button color="success" className="ml-auto">Connect</Button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 order-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3">Connect Spotify</h3>
                <p className="text-gray-400">
                  Login with your Spotify account and authorize our app to create playlists on your behalf.
                </p>
              </div>
            </div>

            <div className="step-card grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3">Transfer Playlists</h3>
                <p className="text-gray-400">
                  Select the playlists you want to transfer, click a button, and watch as we transfer everything over to your Spotify account.
                </p>
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="space-y-2 mb-4">
                    <div className="bg-gray-700/50 p-3 rounded flex items-center">
                      <input type="checkbox" className="mr-3" checked />
                      <span>Summer Vibes 2023</span>
                      <span className="ml-auto text-gray-400">42 tracks</span>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded flex items-center">
                      <input type="checkbox" className="mr-3" checked />
                      <span>Workout Mix</span>
                      <span className="ml-auto text-gray-400">28 tracks</span>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded flex items-center">
                      <input type="checkbox" className="mr-3" checked />
                      <span>Chill Lofi Beats</span>
                      <span className="ml-auto text-gray-400">63 tracks</span>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    Start Transfer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section ref={testimonialRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-green-400 to-purple-500 rounded-full mb-6 flex items-center justify-center">
                <div className="h-14 w-14 bg-gray-900 rounded-full flex items-center justify-center text-2xl">
                  ✨
                </div>
              </div>
              <p className="text-xl md:text-2xl mb-6 text-gray-100 italic">
                "I spent hours trying to rebuild my YouTube playlists on Spotify manually.
                With Syncwave, I transferred 500+ songs across multiple playlists in under 2 minutes.
                Absolute game changer!"
              </p>
              <div>
                <h4 className="font-bold">Sarah K.</h4>
                <p className="text-gray-400 text-sm">Music Producer & DJ</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-2">Is this service free?</h3>
              <p className="text-gray-400">
                Yes, Syncwave is completely free for basic transfers. We offer premium features for advanced users.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-2">Do you store my login credentials?</h3>
              <p className="text-gray-400">
                No, we use OAuth 2.0 for authentication, which means we never see or store your passwords.
                We only request the minimum permissions needed to transfer your playlists.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-2">What if some songs aren't found?</h3>
              <p className="text-gray-400">
                We'll show you a list of any tracks that couldn't be matched, and provide suggestions
                for similar tracks when possible. Our match rate is typically 99% for most music.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-2">Can I transfer multiple playlists at once?</h3>
              <p className="text-gray-400">
                Absolutely! You can select as many playlists as you want to transfer in a single batch.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 rounded-full"></div>
                <div className="absolute inset-[2px] bg-gray-900 rounded-full flex items-center justify-center">
                  <Music className="text-white" />
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
    </div>
  );
}