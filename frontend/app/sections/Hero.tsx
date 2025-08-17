"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { TvMinimalPlay, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SpotifyIcon } from "@/components/icons";
import Phone from "@/components/phone";
import { authAPI, tokenManager, oauthFlow } from "@/utils/api_routes.ts/api";
import { AuthStatus } from "@/types";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    spotify: false,
    youtube: false,
  });
  const [isLoading, setIsLoading] = useState({
    spotify: false,
    youtube: false,
  });
  const [backendStatus, setBackendStatus] = useState<{
    spotify_configured: boolean;
    youtube_configured: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    console.log("[Hero] - Component mounted, checking auth status");
    gsap.registerPlugin(ScrollTrigger);

    // Check authentication status
    checkAuthStatus();

    // Kill any existing animations first
    gsap.killTweensOf([
      ".hero-title",
      ".hero-description",
      ".hero-buttons",
      ".hero-image",
    ]);

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-description",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-buttons",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-image",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: "elastic.out(1, 0.75)",
        },
      );
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      gsap.killTweensOf([
        ".hero-title",
        ".hero-description",
        ".hero-buttons",
        ".hero-image",
      ]);
    };
  }, []);

  const checkAuthStatus = async () => {
    console.log("[Hero] - Checking authentication status");

    // Check local storage for tokens
    const localAuthStatus = tokenManager.getAuthStatus();

    setAuthStatus(localAuthStatus);

    // Check backend OAuth configuration
    try {
      const status = await authAPI.checkStatus();

      setBackendStatus(status);
      console.log("[Hero] - Backend OAuth status:", status);
    } catch (error) {
      console.error("[Hero] - Failed to check backend OAuth status:", error);
    }
  };

  const handleSpotifyLogin = async () => {
    console.log("[Hero] - Starting Spotify OAuth flow");
    setIsLoading((prev) => ({ ...prev, spotify: true }));

    try {
      oauthFlow.startSpotifyAuth();
    } catch (error) {
      console.error("[Hero] - Spotify OAuth error:", error);
      setIsLoading((prev) => ({ ...prev, spotify: false }));
      alert("Failed to start Spotify login. Please check your configuration.");
    }
  };

  const handleYouTubeLogin = async () => {
    console.log("[Hero] - Starting YouTube OAuth flow");
    setIsLoading((prev) => ({ ...prev, youtube: true }));

    try {
      oauthFlow.startYouTubeAuth();
    } catch (error) {
      console.error("[Hero] - YouTube OAuth error:", error);
      setIsLoading((prev) => ({ ...prev, youtube: false }));
      alert("Failed to start YouTube login. Please check your configuration.");
    }
  };

  const handleLogout = (service: "spotify" | "youtube") => {
    console.log(`[Hero] - Logging out from ${service}`);

    if (service === "spotify") {
      tokenManager.clearSpotifyTokens();
    } else {
      tokenManager.clearYouTubeTokens();
    }

    checkAuthStatus();
  };

  const canProceed = authStatus.spotify && authStatus.youtube;
  const isBackendConfigured =
    backendStatus?.spotify_configured && backendStatus?.youtube_configured;

  return (
    <section ref={heroRef} className="pt-32 pb-24 px-4 lg:px-16 md:pt-40 md:pb-32">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="block">Transfer Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
              YouTube
            </span>
            <span className="block">Playlists to</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
              Spotify
            </span>
          </h1>
          <p className="hero-description text-gray-300 text-lg md:text-xl mb-8">
            Seamlessly migrate your music collections between platforms with
            just a few clicks. No more manual searching and rebuilding
            playlists.
          </p>

          {/* Development-only sections */}
          {process.env.NODE_ENV === "development" && (
            <>
              {/* Authentication Status */}
              {(authStatus.spotify || authStatus.youtube) && (
                <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-white font-medium mb-2">
                    Connected Accounts:
                  </h3>
                  <div className="flex gap-4">
                    {authStatus.spotify && (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check size={16} />
                        <span>Spotify Connected</span>
                        <button
                          className="text-xs text-gray-400 hover:text-white ml-2"
                          onClick={() => handleLogout("spotify")}
                        >
                          (logout)
                        </button>
                      </div>
                    )}
                    {authStatus.youtube && (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check size={16} />
                        <span>YouTube Connected</span>
                        <button
                          className="text-xs text-gray-400 hover:text-white ml-2"
                          onClick={() => handleLogout("youtube")}
                        >
                          (logout)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          <div
            className="hero-buttons flex flex-col sm:flex-row gap-4"
            id="get-started"
          >
            <Button
              className="group flex items-center gap-2"
              color="success"
              // isDisabled={authStatus.spotify || !isBackendConfigured}
              isLoading={isLoading.spotify}
              size="lg"
              startContent={
                authStatus.spotify ? (
                  <Check
                    className="group-hover:scale-110 transition-transform"
                    size={20}
                  />
                ) : (
                  <SpotifyIcon
                    className="group-hover:scale-110 transition-transform"
                    size={20}
                  />
                )
              }
              variant={authStatus.spotify ? "solid" : "shadow"}
              onPress={authStatus.spotify ? undefined : handleSpotifyLogin}
            >
              {authStatus.spotify ? "Spotify Connected" : "Login with Spotify"}
            </Button>

            <Button
              className="group flex items-center gap-2"
              color="danger"
              // isDisabled={authStatus.youtube || !isBackendConfigured}
              isLoading={isLoading.youtube}
              size="lg"
              startContent={
                authStatus.youtube ? (
                  <Check
                    className="group-hover:scale-110 transition-transform"
                    size={20}
                  />
                ) : (
                  <TvMinimalPlay
                    className="group-hover:scale-110 transition-transform"
                    size={20}
                  />
                )
              }
              variant={authStatus.youtube ? "solid" : "shadow"}
              onPress={authStatus.youtube ? undefined : handleYouTubeLogin}
            >
              {authStatus.youtube ? "YouTube Connected" : "Login with YouTube"}
            </Button>
          </div>

          {/* Proceed Button */}
          {canProceed && (
            <div className="mt-6">
              <Button
                className="w-full sm:w-auto"
                color="primary"
                size="lg"
                variant="shadow"
                onPress={() => (window.location.href = "/get-started")}
              >
                Start Transferring Playlists
              </Button>
            </div>
          )}

          {/* Help Text */}
          <p className="text-gray-400 text-sm mt-4">
            {!isBackendConfigured &&
              "Please configure OAuth in your backend first"}
            {isBackendConfigured &&
              !authStatus.spotify &&
              !authStatus.youtube &&
              "Connect both accounts to start transferring your playlists"}
            {isBackendConfigured &&
              (authStatus.spotify || authStatus.youtube) &&
              !canProceed &&
              "Connect your remaining account to continue"}
            {canProceed && "All set! You can now transfer your playlists"}
          </p>
        </div>

        <div className="hero-image relative">
          <div className="relative h-[400px] w-full">
            <div className="absolute top-0 right-0 h-64 w-64 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-red-500/20 rounded-full filter blur-3xl animate-pulse" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Phone />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-16 text-center">
        <div className="inline-flex gap-2 items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-sm">
            <span className="font-bold text-green-400">100+</span> playlists
            transferred today
          </p>
        </div>
      </div>

      {/* Development Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="container mx-auto max-w-6xl mt-8">
          <div className="p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">OAuth Debug Info</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                Spotify Client ID:{" "}
                {process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? "Set" : "Missing"}
              </p>
              <p>
                Google Client ID:{" "}
                {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "Set" : "Missing"}
              </p>
              <p>
                Backend Status:{" "}
                {backendStatus ? JSON.stringify(backendStatus) : "Loading..."}
              </p>
              <p>
                Auth Status: Spotify=
                {authStatus.spotify ? "Yes" : "No"}, YouTube=
                {authStatus.youtube ? "Yes" : "No"}
              </p>
              <p>
                Current Origin:{" "}
                {typeof window !== "undefined"
                  ? window.location.origin
                  : "Server"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
