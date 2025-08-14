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
  // Direct transfer using POST with enhanced backend
  directTransfer: async (
    data: PlaylistTransferRequestProps,
  ): Promise<TransferResultResponseProps> => {
    console.log("Sending transfer request:", data);

    const response = await api.post("/transfer", {
      playlist_url: data.url,
      playlist_name: data.name,
      is_public: data.isPublic,
      description: data.description || "",
    });

    console.log("📦 Backend response:", response.data);

    // Backend now returns the exact format we need!
    const backendData = response.data;

    return {
      playlistId: backendData.playlist_id,
      playlistUrl: backendData.playlist_url,
      totalSongs: backendData.total_songs,
      transferredSongs: backendData.transferred_songs,
      failedSongs: backendData.failed_songs,
      songs: backendData.songs.map((song: any) => ({
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        thumbnail: song.thumbnail,
        status: song.status,
        spotifyUrl: song.spotify_url,
        youtubeUrl: song.youtube_url,
        error: song.error,
      })),
      transferDuration: backendData.transfer_duration,
      createdAt: backendData.created_at,
    };
  },
};

export default api;
