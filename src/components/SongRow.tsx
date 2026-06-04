"use client";

import { usePlayerStore } from "@/store/playerStore";
import { useLibraryStore } from "@/store/libraryStore";
import { formatDuration } from "@/lib/data";
import type { Song } from "@/lib/data";
import { Play, Pause, Heart } from "lucide-react";

interface SongRowProps {
  song: Song;
  index: number;
  queue: Song[];
}

export default function SongRow({ song, index, queue }: SongRowProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayerStore();
  const { isLiked, toggleLike } = useLibraryStore();

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, queue);
    }
  };

  return (
    <div
      className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 rounded group hover:bg-white/10 items-center cursor-pointer"
      onDoubleClick={handlePlay}
    >
      <div className="flex items-center justify-center">
        <span className="text-spotify-light-gray text-sm group-hover:hidden">
          {isCurrentSong && isPlaying ? (
            <span className="text-spotify-green">♫</span>
          ) : (
            index + 1
          )}
        </span>
        <button onClick={handlePlay} className="hidden group-hover:block">
          {isCurrentSong && isPlaying ? (
            <Pause size={14} className="text-white" fill="white" />
          ) : (
            <Play size={14} className="text-white" fill="white" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.cover}
          alt={song.title}
          className="w-10 h-10 rounded flex-shrink-0"
        />
        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate ${isCurrentSong ? "text-spotify-green" : "text-white"}`}
          >
            {song.title}
          </p>
          <p className="text-xs text-spotify-light-gray truncate">
            {song.artist}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-spotify-light-gray truncate">
          {song.album}
        </span>
      </div>

      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <Heart
            size={14}
            className={
              isLiked(song.id)
                ? "fill-spotify-green text-spotify-green"
                : "text-spotify-light-gray hover:text-white"
            }
          />
        </button>
        <span className="text-sm text-spotify-light-gray">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}
