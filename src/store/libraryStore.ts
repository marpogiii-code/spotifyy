"use client";

import { create } from "zustand";

interface UserPlaylist {
  id: string;
  title: string;
  songs: string[];
  createdAt: string;
}

interface LibraryState {
  likedSongs: string[];
  userPlaylists: UserPlaylist[];
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
  createPlaylist: (title: string) => string;
  addToPlaylist: (playlistId: string, songId: string) => void;
  removeFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  loadFromStorage: () => void;
}

function saveToStorage(likedSongs: string[], userPlaylists: UserPlaylist[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("spotifyy-liked", JSON.stringify(likedSongs));
    localStorage.setItem("spotifyy-playlists", JSON.stringify(userPlaylists));
  }
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  likedSongs: [],
  userPlaylists: [],

  toggleLike: (songId) => {
    const { likedSongs, userPlaylists } = get();
    const newLiked = likedSongs.includes(songId)
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];
    set({ likedSongs: newLiked });
    saveToStorage(newLiked, userPlaylists);
  },

  isLiked: (songId) => get().likedSongs.includes(songId),

  createPlaylist: (title) => {
    const id = `user-playlist-${Date.now()}`;
    const newPlaylist: UserPlaylist = {
      id,
      title,
      songs: [],
      createdAt: new Date().toISOString(),
    };
    const { userPlaylists, likedSongs } = get();
    const updated = [...userPlaylists, newPlaylist];
    set({ userPlaylists: updated });
    saveToStorage(likedSongs, updated);
    return id;
  },

  addToPlaylist: (playlistId, songId) => {
    const { userPlaylists, likedSongs } = get();
    const updated = userPlaylists.map((p) =>
      p.id === playlistId && !p.songs.includes(songId)
        ? { ...p, songs: [...p.songs, songId] }
        : p
    );
    set({ userPlaylists: updated });
    saveToStorage(likedSongs, updated);
  },

  removeFromPlaylist: (playlistId, songId) => {
    const { userPlaylists, likedSongs } = get();
    const updated = userPlaylists.map((p) =>
      p.id === playlistId
        ? { ...p, songs: p.songs.filter((id) => id !== songId) }
        : p
    );
    set({ userPlaylists: updated });
    saveToStorage(likedSongs, updated);
  },

  deletePlaylist: (playlistId) => {
    const { userPlaylists, likedSongs } = get();
    const updated = userPlaylists.filter((p) => p.id !== playlistId);
    set({ userPlaylists: updated });
    saveToStorage(likedSongs, updated);
  },

  loadFromStorage: () => {
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem("spotifyy-liked");
      const playlists = localStorage.getItem("spotifyy-playlists");
      set({
        likedSongs: liked ? JSON.parse(liked) : [],
        userPlaylists: playlists ? JSON.parse(playlists) : [],
      });
    }
  },
}));
