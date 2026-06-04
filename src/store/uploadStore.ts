"use client";

import { create } from "zustand";
import type { Song } from "@/lib/data";

interface UploadState {
  uploadedSongs: Song[];
  isLoading: boolean;
  fetchUploadedSongs: () => Promise<void>;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploadedSongs: [],
  isLoading: false,

  fetchUploadedSongs: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/music/uploaded");
      if (res.ok) {
        const data = await res.json();
        set({ uploadedSongs: data.songs });
      }
    } catch {
      // silently fail
    } finally {
      set({ isLoading: false });
    }
  },
}));
