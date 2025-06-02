"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Chip, Divider, Image } from "@heroui/react";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  RotateCcw,
  Share2,
  Music,
} from "lucide-react";
import { gsap } from "gsap";
import { TransferResultsProps } from "@/types";


export default function TransferResults({
  results,
  onStartOver,
}: TransferResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAllSongs, setShowAllSongs] = useState(false);

  useEffect(() => {
    // Success animation
    gsap.from(".success-header", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    gsap.from(".stats-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".song-item", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      delay: 0.6,
      ease: "power3.out",
    });

    // Celebration particles effect
    createCelebrationEffect();
  }, []);

  const createCelebrationEffect = () => {
    const container = containerRef.current;

    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");

      particle.className =
        "absolute w-2 h-2 bg-green-400 rounded-full opacity-0";
      particle.style.left = "50%";
      particle.style.top = "20%";
      container.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 400,
        y: Math.random() * 300 + 100,
        opacity: 1,
        scale: Math.random() * 2 + 0.5,
        duration: Math.random() * 2 + 1,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      });
    }
  };

  const successRate = Math.round(
    (results.transferredSongs / results.totalSongs) * 100,
  );
  const displayedSongs = showAllSongs
    ? results.songs
    : results.songs.slice(0, 5);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-8 relative">
      {/* Success Header */}
      <div className="success-header text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
          <CheckCircle className="text-green-400" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Transfer Complete!
        </h2>
        <p className="text-gray-400 text-lg">
          Your playlist has been successfully transferred to Spotify
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="stats-card bg-green-500/20 border border-green-500/50">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {results.transferredSongs}
            </div>
            <div className="text-green-300 text-sm">
              Successfully Transferred
            </div>
          </CardBody>
        </Card>

        <Card className="stats-card bg-red-500/20 border border-red-500/50">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {results.failedSongs}
            </div>
            <div className="text-red-300 text-sm">Not Found</div>
          </CardBody>
        </Card>

        <Card className="stats-card bg-blue-500/20 border border-blue-500/50">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {results.totalSongs}
            </div>
            <div className="text-blue-300 text-sm">Total Songs</div>
          </CardBody>
        </Card>

        <Card className="stats-card bg-purple-500/20 border border-purple-500/50">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {successRate}%
            </div>
            <div className="text-purple-300 text-sm">Success Rate</div>
          </CardBody>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          className="group"
          color="success"
          size="lg"
          startContent={
            <ExternalLink
              className="group-hover:scale-110 transition-transform"
              size={18}
            />
          }
          variant="shadow"
          onPress={() => window.open(results.playlistUrl, "_blank")}
        >
          Open in Spotify
        </Button>

        <Button
          className="group"
          color="primary"
          size="lg"
          startContent={
            <Share2
              className="group-hover:scale-110 transition-transform"
              size={18}
            />
          }
          variant="bordered"
          onPress={() => {
            navigator.clipboard.writeText(results.playlistUrl);
            // You could add a toast notification here
          }}
        >
          Share Playlist
        </Button>

        <Button
          className="group"
          size="lg"
          startContent={
            <RotateCcw
              className="group-hover:rotate-180 transition-transform duration-500"
              size={18}
            />
          }
          variant="ghost"
          onPress={onStartOver}
        >
          Transfer Another
        </Button>
      </div>

      {/* Songs List */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Music size={20} />
              Transferred Songs
            </h3>
            {results.songs.length > 5 && (
              <Button
                size="sm"
                variant="ghost"
                onPress={() => setShowAllSongs(!showAllSongs)}
              >
                {showAllSongs
                  ? "Show Less"
                  : `Show All (${results.songs.length})`}
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {displayedSongs.map((song, index) => (
              <div
                key={song.id}
                className="song-item flex items-center gap-4 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  {song.thumbnail ? (
                    <Image
                      alt={song.title}
                      className="w-12 h-12 rounded-md object-cover"
                      src={song.thumbnail}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center">
                      <Music className="text-gray-400" size={20} />
                    </div>
                  )}
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {song.artist}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {song.status === "success" ? (
                    <>
                      <Chip
                        className="bg-green-500/20 text-green-400"
                        startContent={<CheckCircle size={14} />}
                        variant="flat"
                      >
                        Added
                      </Chip>
                      {song.spotifyUrl && (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          onPress={() => window.open(song.spotifyUrl, "_blank")}
                        >
                          <ExternalLink size={14} />
                        </Button>
                      )}
                    </>
                  ) : (
                    <Chip
                      className="bg-red-500/20 text-red-400"
                      startContent={<XCircle size={14} />}
                      variant="flat"
                    >
                      Not Found
                    </Chip>
                  )}
                </div>
              </div>
            ))}
          </div>

          {results.failedSongs > 0 && (
            <>
              <Divider className="my-6 bg-gray-600" />
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">
                  {results.failedSongs} songs couldn't be found on Spotify
                </p>
                <p className="text-gray-500 text-xs">
                  This usually happens when songs are not available in your
                  region or have different titles
                </p>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <CardBody className="p-6">
          <h4 className="text-lg font-semibold text-white mb-3">💡 Pro Tips</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-medium text-blue-400 mb-1">Missing songs?</p>
              <p>
                Try searching for them manually on Spotify - they might have
                different titles or artists.
              </p>
            </div>
            <div>
              <p className="font-medium text-purple-400 mb-1">Love the tool?</p>
              <p>
                Share it with friends who also want to transfer their playlists!
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
