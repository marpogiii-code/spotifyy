"use client";

import { create } from "zustand";
import type { Song } from "@/lib/data";

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  shuffle: false,
  repeat: "off",

  playSong: (song, queue) => {
    set({
      currentSong: song,
      isPlaying: true,
      progress: 0,
      ...(queue ? { queue } : {}),
    });
  },

  togglePlay: () => {
    const { currentSong } = get();
    if (currentSong) {
      set((state) => ({ isPlaying: !state.isPlaying }));
    }
  },

  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),

  nextSong: () => {
    const { queue, currentSong, shuffle, repeat } = get();
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      set({ currentSong: queue[randomIndex], isPlaying: true, progress: 0 });
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        set({ currentSong: queue[nextIndex], isPlaying: true, progress: 0 });
      } else if (repeat === "all") {
        set({ currentSong: queue[0], isPlaying: true, progress: 0 });
      } else {
        set({ isPlaying: false });
      }
    }
  },

  prevSong: () => {
    const { queue, currentSong, progress } = get();
    if (progress > 3) {
      set({ progress: 0 });
      return;
    }
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({ currentSong: queue[prevIndex], isPlaying: true, progress: 0 });
    }
  },

  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),

  toggleRepeat: () =>
    set((state) => ({
      repeat:
        state.repeat === "off"
          ? "all"
          : state.repeat === "all"
            ? "one"
            : "off",
    })),
}));
