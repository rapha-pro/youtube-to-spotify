"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardBody, Progress, Chip } from "@heroui/react";
import { Music, Search, CheckCircle, Download, Loader2 } from "lucide-react";
import { gsap } from "gsap";

import { ProgressStepProps, TransferProgressProps } from "@/types";

export default function TransferProgress({
  playlistData,
}: TransferProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [foundSongs, setFoundSongs] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);

  const steps: ProgressStepProps[] = [
    {
      id: "fetch",
      label: "Fetching YouTube playlist",
      status: currentStepIndex >= 0 ? "completed" : "pending",
      icon: <Download size={20} />,
    },
    {
      id: "search",
      label: "Searching songs on Spotify",
      status:
        currentStepIndex >= 1
          ? currentStepIndex === 1
            ? "active"
            : "completed"
          : "pending",
      icon: <Search size={20} />,
    },
    {
      id: "create",
      label: "Creating Spotify playlist",
      status:
        currentStepIndex >= 2
          ? currentStepIndex === 2
            ? "active"
            : "completed"
          : "pending",
      icon: <Music size={20} />,
    },
    {
      id: "complete",
      label: "Transfer completed",
      status: currentStepIndex >= 3 ? "completed" : "pending",
      icon: <CheckCircle size={20} />,
    },
  ];

  useEffect(() => {
    // Initial animation
    gsap.from(".progress-container", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    gsap.from(".step-item", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(progressInterval);

        return prev;
      });
    }, 2000);

    // Simulate progress bar
    const progressBarInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + Math.random() * 15;
        }
        clearInterval(progressBarInterval);

        return 100;
      });
    }, 300);

    // Simulate song counting
    const songCountInterval = setInterval(() => {
      setTotalSongs(42); // Mock total
      setFoundSongs((prev) => {
        if (prev < 38) {
          // Mock found songs
          return prev + 1;
        }
        clearInterval(songCountInterval);

        return 38;
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(progressBarInterval);
      clearInterval(songCountInterval);
    };
  }, []);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return "completed";
    if (stepIndex === currentStepIndex) return "active";

    return "pending";
  };

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-8">
      {/* Main Progress Card */}
      <Card className="progress-container bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Transferring `{playlistData.name}`
            </h2>
            <p className="text-gray-400">
              Please wait while we process your playlist...
            </p>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Overall Progress</span>
              <span className="text-gray-400">{Math.round(progress)}%</span>
            </div>
            <Progress
              className="w-full"
              classNames={{
                track: "bg-gray-700",
                indicator: "bg-gradient-to-r from-green-500 to-blue-500",
              }}
              value={progress}
            />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index);

              return (
                <div
                  key={step.id}
                  className={`step-item flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                    status === "active"
                      ? "bg-blue-500/20 border border-blue-500/50"
                      : status === "completed"
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-gray-700/30 border border-gray-600"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                      status === "active"
                        ? "bg-blue-500 text-white animate-pulse"
                        : status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-400"
                    }`}
                  >
                    {status === "active" ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      step.icon
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`font-medium transition-colors duration-500 ${
                        status === "completed"
                          ? "text-green-400"
                          : status === "active"
                            ? "text-blue-400"
                            : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  <Chip
                    className={
                      status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : status === "active"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                    }
                    variant="flat"
                  >
                    {status === "completed"
                      ? "Done"
                      : status === "active"
                        ? "Processing"
                        : "Waiting"}
                  </Chip>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {totalSongs}
            </div>
            <div className="text-gray-400 text-sm">Total Songs</div>
          </CardBody>
        </Card>

        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {foundSongs}
            </div>
            <div className="text-gray-400 text-sm">Songs Found</div>
          </CardBody>
        </Card>

        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {totalSongs - foundSongs}
            </div>
            <div className="text-gray-400 text-sm">Not Found</div>
          </CardBody>
        </Card>
      </div>

      {/* Current Activity */}
      {currentStepIndex === 1 && (
        <Card className="bg-gray-800/30 border border-gray-700">
          <CardBody className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="animate-spin text-blue-400" size={20} />
              <h3 className="font-semibold text-white">Currently Processing</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Searching for songs on Spotify... This may take a few moments
              depending on your playlist size.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
