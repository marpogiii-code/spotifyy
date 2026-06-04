"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { useLibraryStore } from "@/store/libraryStore";
import { formatDuration } from "@/lib/data";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
} from "lucide-react";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    togglePlay,
    setVolume,
    setProgress,
    setDuration,
    nextSong,
    prevSong,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const { isLiked, toggleLike } = useLibraryStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong) {
      audio.src = currentSong.audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, repeat, nextSong, setProgress, setDuration]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setProgress(time);
  };

  if (!currentSong) {
    return (
      <div className="h-[90px] bg-spotify-black border-t border-zinc-800 flex items-center justify-center">
        <p className="text-spotify-light-gray text-sm">
          Select a song to start playing
        </p>
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div className="h-[90px] bg-spotify-black border-t border-zinc-800 px-4 grid grid-cols-3 items-center">
      <audio ref={audioRef} />

      {/* Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-spotify-light-gray truncate">
            {currentSong.artist}
          </p>
        </div>
        <button
          onClick={() => toggleLike(currentSong.id)}
          className="ml-2 flex-shrink-0"
        >
          <Heart
            size={16}
            className={
              isLiked(currentSong.id)
                ? "fill-spotify-green text-spotify-green"
                : "text-spotify-light-gray hover:text-white"
            }
          />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={`${shuffle ? "text-spotify-green" : "text-spotify-light-gray"} hover:text-white transition`}
          >
            <Shuffle size={16} />
          </button>
          <button
            onClick={prevSong}
            className="text-spotify-light-gray hover:text-white transition"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="bg-white rounded-full p-2 hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" fill="black" />
            ) : (
              <Play size={16} className="text-black ml-0.5" fill="black" />
            )}
          </button>
          <button
            onClick={nextSong}
            className="text-spotify-light-gray hover:text-white transition"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`${repeat !== "off" ? "text-spotify-green" : "text-spotify-light-gray"} hover:text-white transition`}
          >
            {repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
          </button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-[11px] text-spotify-light-gray w-10 text-right">
            {formatDuration(Math.floor(progress))}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 accent-white show-thumb"
          />
          <span className="text-[11px] text-spotify-light-gray w-10">
            {formatDuration(Math.floor(duration))}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
          className="text-spotify-light-gray hover:text-white"
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 accent-white"
        />
      </div>
    </div>
  );
}
