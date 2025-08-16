"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardBody, Spinner } from "@heroui/react";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function YouTubeCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState(
    "Processing YouTube authentication...",
  );

  useEffect(() => {
    console.log("[YouTubeCallback] - Component mounted");
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Get parameters from URL
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      console.log("[YouTubeCallback] - URL parameters:", {
        code: !!code,
        state,
        error,
      });

      // Check for errors from Google
      if (error) {
        throw new Error(`Google error: ${error}`);
      }

      // Check if we have authorization code
      if (!code) {
        throw new Error("No authorization code received from Google");
      }

      // Verify state parameter for security
      const storedState = localStorage.getItem("oauth_state");

      if (state !== storedState) {
        throw new Error("Invalid state parameter - possible CSRF attack");
      }

      console.log(
        "[YouTubeCallback] - Sending code to backend for token exchange",
      );
      setMessage("Exchanging authorization code for access token...");

      // Send code to your backend to exchange for access token
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/youtube/callback`,
        {
          code: code,
          redirect_uri: `${window.location.origin}/auth/youtube/callback`,
        },
      );

      const data = response.data;

      console.log("[YouTubeCallback] - Token exchange successful:", data);

      // Store tokens in localStorage
      localStorage.setItem("youtube_access_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("youtube_refresh_token", data.refresh_token);
      }

      // Store user info if provided
      if (data.user_info) {
        localStorage.setItem("youtube_user", JSON.stringify(data.user_info));
      }

      // Clean up OAuth state
      localStorage.removeItem("oauth_state");

      setStatus("success");
      setMessage("Successfully connected to YouTube!");

      // Redirect back to home page after 2 seconds
      setTimeout(() => {
        console.log("[YouTubeCallback] - Redirecting to home page");
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("[YouTubeCallback] - Authentication failed:", error);
      setStatus("error");

      // Better error handling with axios
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          `HTTP ${error.response?.status}: ${error.message}`;

        setMessage(`Authentication failed: ${errorMessage}`);
      } else {
        setMessage(
          error instanceof Error ? error.message : "Authentication failed",
        );
      }
    }
  };

  const handleGoBack = () => {
    console.log("[YouTubeCallback] - User clicked go back");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-gray-800/50 border border-gray-700">
        <CardBody className="p-8 text-center">
          <div className="mb-6">
            {status === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <Spinner color="danger" size="lg" />
                <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            {status === "loading" && "Connecting to YouTube"}
            {status === "success" && "Success!"}
            {status === "error" && "Authentication Failed"}
          </h2>

          <p className="text-gray-300 mb-6">{message}</p>

          {status === "success" && (
            <p className="text-sm text-gray-400 mb-6">
              Redirecting you back to the home page...
            </p>
          )}

          {status === "error" && (
            <button
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mx-auto"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} />
              Go Back to Home
            </button>
          )}

          {/* Debug info in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-600 text-left">
              <h4 className="text-white font-medium mb-2">Debug Info</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Status: {status}</p>
                <p>Code: {searchParams.get("code") ? "Present" : "Missing"}</p>
                <p>State: {searchParams.get("state") || "Missing"}</p>
                <p>Error: {searchParams.get("error") || "None"}</p>
                <p>Backend URL: {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
