import axios from "axios";

import { config } from "../config";

import {
  PlaylistTransferRequestProps,
  TransferResultResponseProps,
} from "@/types";

const API_BASE_URL = config.apiBaseUrl;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for transfers
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(
    `Making ${config.method?.toUpperCase()} request to ${config.url}`,
  );

  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    return Promise.reject(error);
  },
);

// API functions

/**
 * Direct transfer to match backend endpoint
 * @param data - Playlist transfer request data
 * @returns Transfer result response
 * @throws Error if the transfer fails
 */
export const transferAPI = {
  // Direct transfer to match backend endpoint
  directTransfer: async (
    data: PlaylistTransferRequestProps,
  ): Promise<TransferResultResponseProps> => {

    // Convert POST data to GET query parameters to match backend
    const params = new URLSearchParams({
      playlist_url: data.url,
      playlist_name: data.name,
      is_public: data.isPublic.toString(),
      description: data.description || "",
    });

    const response = await api.post(`/transfer?${params.toString()}`);

    // Transform backend response to match our expected format
    return {
      playlistId: response.data.playlist_id || "unknown",
      playlistUrl: response.data.playlist_url || "#",
      totalSongs: response.data.total_songs || 0,
      transferredSongs: response.data.matched_titles?.length || 0,
      failedSongs: response.data.unmatched_titles?.length || 0,
      songs: [
        // Map matched songs
        ...(response.data.matched_titles || []).map(
          (title: string, index: number) => ({
            id: `matched-${index}`,
            title: title,
            artist: "Unknown Artist", // backend doesn't return artist info
            status: "success" as const,
            spotifyUrl: "#", // backend doesn't return individual URLs
          }),
        ),
        // Map unmatched songs
        ...(response.data.unmatched_titles || []).map(
          (title: string, index: number) => ({
            id: `unmatched-${index}`,
            title: title,
            artist: "Unknown Artist",
            status: "failed" as const,
          }),
        ),
      ],
      transferDuration: 0, // backend doesn't return this
      createdAt: new Date().toISOString(),
    };
  },
};

export default api;
