"use client";

import Link from "next/link";
import { usePlayerStore } from "@/store/playerStore";
import { getPlaylistSongs } from "@/lib/data";
import type { Playlist } from "@/lib/data";
import { Play } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playSong } = usePlayerStore();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const songs = getPlaylistSongs(playlist);
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="bg-spotify-dark/60 hover:bg-spotify-gray/80 p-4 rounded-md transition group relative"
    >
      <div className="relative mb-4">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105"
        >
          <Play size={20} className="text-black" fill="black" />
        </button>
      </div>
      <h3 className="text-white font-semibold text-sm truncate">
        {playlist.title}
      </h3>
      <p className="text-spotify-light-gray text-xs mt-1 line-clamp-2">
        {playlist.description}
      </p>
    </Link>
  );
}
