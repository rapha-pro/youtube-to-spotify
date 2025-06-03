"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import PlaylistForm from "@/components/get-started/playlistForm";
import TransferProgress from "@/components/get-started/transferProgress";
import TransferResults from "@/components/get-started/transferResults";
import AnimatedBackground from "@/components/get-started/animatedBackground";
import { transferAPI } from "@/utils/api_routes.ts/api";
import {
  TransferResultResponseProps,
  PlaylistTransferRequestProps,
} from "@/types";

type TransferStep = "form" | "progress" | "results";

export default function GetStarted() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<TransferStep>("form");
  const [playlistData, setPlaylistData] =
    useState<PlaylistTransferRequestProps | null>(null);
  const [transferResults, setTransferResults] =
    useState<TransferResultResponseProps | null>(null);
  const [transferId, setTransferId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial page animation
    gsap.from(".page-header", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".main-content", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  const handleFormSubmit = async (data: PlaylistTransferRequestProps) => {
    try {
      setError(null);
      setPlaylistData(data);
      setCurrentStep("progress");

      // Try direct transfer first (if your backend supports it)
      try {
        const results = await transferAPI.directTransfer(data);

        setTransferResults(results);
        setCurrentStep("results");
      } catch (directError) {
        // If direct transfer fails, try the async approach
        console.log("Direct transfer failed, trying async approach...");

        const { transferId: id } = await transferAPI.startTransfer(data);

        setTransferId(id);

        // Poll for progress
        const pollProgress = setInterval(async () => {
          try {
            const progress = await transferAPI.getTransferProgress(id);

            if (progress.status === "completed") {
              clearInterval(pollProgress);
              const results = await transferAPI.getTransferResults(id);

              setTransferResults(results);
              setCurrentStep("results");
            } else if (progress.status === "failed") {
              clearInterval(pollProgress);
              setError("Transfer failed. Please try again.");
              setCurrentStep("form");
            }
          } catch (pollError) {
            console.error("Polling error:", pollError);
            clearInterval(pollProgress);
            setError("Failed to get transfer progress. Please try again.");
            setCurrentStep("form");
          }
        }, 2000); // Poll every 2 seconds

        // Cleanup polling on component unmount
        return () => clearInterval(pollProgress);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setError(
        "Failed to start transfer. Please check your playlist URL and try again.",
      );
      setCurrentStep("form");
    }
  };

  const handleStartOver = () => {
    setCurrentStep("form");
    setPlaylistData(null);
    setTransferResults(null);
    setTransferId(null);
    setError(null);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "form":
        return "Fill in your playlist details to begin the transfer";
      case "progress":
        return "Transferring your playlist...";
      case "results":
        return "Transfer completed successfully!";
      default:
        return "";
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-900 relative overflow-hidden"
    >
      <AnimatedBackground />

      {/* Header */}
      <header className="page-header relative z-10 pt-8 pb-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/">
            <Button
              className="group mb-6"
              startContent={
                <ArrowLeft
                  className="group-hover:-translate-x-1 transition-transform"
                  size={18}
                />
              }
              variant="ghost"
            >
              Back to Home
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Get Started
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              {getStepTitle()}
            </p>
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm max-w-md mx-auto">
                {error}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content relative z-10 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          {currentStep === "form" && (
            <PlaylistForm onSubmit={handleFormSubmit} />
          )}

          {currentStep === "progress" && playlistData && (
            <TransferProgress
              playlistData={playlistData}
              transferId={transferId}
            />
          )}

          {currentStep === "results" && transferResults && (
            <TransferResults
              results={transferResults}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>
    </div>
  );
}
