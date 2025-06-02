import axios from "axios";
import { config } from './config';

import {
  PlaylistTransferRequestProps,
  TransferProgressResponseProps,
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

// Types

// API functions
export const transferAPI = {
  // Start playlist transfer
  startTransfer: async (
    data: PlaylistTransferRequestProps,
  ): Promise<{ transferId: string }> => {
    const response = await api.post("/transfer/start", data);

    return response.data;
  },

  // Get transfer progress
  getTransferProgress: async (
    transferId: string,
  ): Promise<TransferProgressResponseProps> => {
    const response = await api.get(`/transfer/progress/${transferId}`);

    return response.data;
  },

  // Get transfer results
  getTransferResults: async (
    transferId: string,
  ): Promise<TransferResultResponseProps> => {
    const response = await api.get(`/transfer/results/${transferId}`);

    return response.data;
  },

  // Direct transfer (if your backend supports it)
  directTransfer: async (
    data: PlaylistTransferRequestProps,
  ): Promise<TransferResultResponseProps> => {
    const response = await api.post("/transfer", data);

    return response.data;
  },
};

export const youtubeAPI = {
  // Get playlist info
  getPlaylistInfo: async (playlistUrl: string) => {
    const response = await api.get(
      `/youtube/playlist-info?url=${encodeURIComponent(playlistUrl)}`,
    );

    return response.data;
  },

  // Validate playlist URL
  validatePlaylistUrl: async (
    playlistUrl: string,
  ): Promise<{ isValid: boolean; message?: string }> => {
    try {
      const response = await api.post("/youtube/validate-url", {
        url: playlistUrl,
      });

      return response.data;
    } catch (error) {
      return { isValid: false, message: "Invalid YouTube playlist URL" };
    }
  },
};

export const spotifyAPI = {
  // Get user profile (for authentication check)
  getUserProfile: async () => {
    const response = await api.get("/spotify/me");

    return response.data;
  },

  // Search for a song
  searchSong: async (query: string) => {
    const response = await api.get(
      `/spotify/search?q=${encodeURIComponent(query)}`,
    );

    return response.data;
  },
};

export default api;
