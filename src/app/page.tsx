"use client";

import { useEffect } from "react";
import TopBar from "@/components/TopBar";
import PlaylistCard from "@/components/PlaylistCard";
import SongRow from "@/components/SongRow";
import { playlists, songs } from "@/lib/data";
import { usePlayerStore } from "@/store/playerStore";
import { useUploadStore } from "@/store/uploadStore";
import { Play } from "lucide-react";

function QuickPlayCard({
  title,
  image,
  songIds,
}: {
  title: string;
  image: string;
  songIds: string[];
}) {
  const { playSong } = usePlayerStore();

  const handlePlay = () => {
    const trackList = songIds
      .map((id) => songs.find((s) => s.id === id))
      .filter((s) => s !== undefined);
    if (trackList.length > 0) {
      playSong(trackList[0], trackList);
    }
  };

  return (
    <div
      onClick={handlePlay}
      className="bg-white/10 hover:bg-white/20 rounded flex items-center gap-4 overflow-hidden cursor-pointer group transition"
    >
      <img src={image} alt={title} className="w-12 h-12 object-cover" />
      <span className="text-sm font-semibold flex-1 truncate">{title}</span>
      <button className="mr-3 bg-spotify-green rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition hover:scale-105">
        <Play size={14} className="text-black" fill="black" />
      </button>
    </div>
  );
}

export default function HomePage() {
  const { uploadedSongs, fetchUploadedSongs } = useUploadStore();

  useEffect(() => {
    fetchUploadedSongs();
  }, [fetchUploadedSongs]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const quickPlays = [
    { title: "Liked Songs", image: playlists[0].cover, songIds: songs.slice(0, 4).map((s) => s.id) },
    { title: playlists[0].title, image: playlists[0].cover, songIds: playlists[0].songs },
    { title: playlists[1].title, image: playlists[1].cover, songIds: playlists[1].songs },
    { title: playlists[2].title, image: playlists[2].cover, songIds: playlists[2].songs },
    { title: playlists[3].title, image: playlists[3].cover, songIds: playlists[3].songs },
    { title: playlists[4].title, image: playlists[4].cover, songIds: playlists[4].songs },
  ];

  return (
    <div>
      <TopBar />
      <div className="px-6 pb-8">
        <h1 className="text-3xl font-bold mb-6">{greeting()}</h1>

        {/* Quick Play Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          {quickPlays.map((item) => (
            <QuickPlayCard
              key={item.title}
              title={item.title}
              image={item.image}
              songIds={item.songIds}
            />
          ))}
        </div>

        {/* Made For You */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Made For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.slice(0, 5).map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Uploaded Songs */}
        {uploadedSongs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Uploaded Songs</h2>
            <div>
              {uploadedSongs.map((song, i) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={i}
                  queue={uploadedSongs}
                />
              ))}
            </div>
          </section>
        )}

        {/* Popular Playlists */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={`pop-${playlist.id}`} playlist={playlist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
