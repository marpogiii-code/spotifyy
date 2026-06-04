"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import SongRow from "@/components/SongRow";
import PlaylistCard from "@/components/PlaylistCard";
import { searchSongs, searchPlaylists, searchArtists, playlists } from "@/lib/data";
import { useUploadStore } from "@/store/uploadStore";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { uploadedSongs, fetchUploadedSongs } = useUploadStore();

  useEffect(() => {
    fetchUploadedSongs();
  }, [fetchUploadedSongs]);

  const songResults = query ? searchSongs(query) : [];
  const playlistResults = query ? searchPlaylists(query) : [];
  const artistResults = query ? searchArtists(query) : [];

  const uploadedResults = query
    ? uploadedSongs.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.artist.toLowerCase().includes(query.toLowerCase()) ||
          s.album.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const allSongResults = [...songResults, ...uploadedResults];

  const genres = [
    { name: "Pop", color: "from-pink-500 to-pink-800" },
    { name: "Hip-Hop", color: "from-orange-500 to-orange-800" },
    { name: "Rock", color: "from-red-500 to-red-800" },
    { name: "R&B", color: "from-purple-500 to-purple-800" },
    { name: "Electronic", color: "from-blue-500 to-blue-800" },
    { name: "Alternative", color: "from-green-500 to-green-800" },
    { name: "Dance", color: "from-teal-500 to-teal-800" },
    { name: "Folk", color: "from-yellow-500 to-yellow-800" },
  ];

  return (
    <div>
      <TopBar />
      <div className="px-6 pb-8">
        {/* Search Input */}
        <div className="relative max-w-md mb-6">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {query ? (
          <div>
            {/* Artist Results */}
            {artistResults.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {artistResults.map((artist) => (
                    <div
                      key={artist.id}
                      className="bg-spotify-dark/60 hover:bg-spotify-gray/80 p-4 rounded-md transition"
                    >
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full shadow-lg mb-4"
                      />
                      <h3 className="text-white font-semibold text-sm truncate">
                        {artist.name}
                      </h3>
                      <p className="text-spotify-light-gray text-xs mt-1">
                        Artist
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Song Results */}
            {allSongResults.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Songs</h2>
                <div>
                  {allSongResults.map((song, i) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={i}
                      queue={allSongResults}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Playlist Results */}
            {playlistResults.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {playlistResults.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            )}

            {allSongResults.length === 0 &&
              playlistResults.length === 0 &&
              artistResults.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl font-bold text-white mb-2">
                    No results found for &quot;{query}&quot;
                  </p>
                  <p className="text-spotify-light-gray">
                    Try different keywords or check the spelling
                  </p>
                </div>
              )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {genres.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => setQuery(genre.name)}
                  className={`bg-gradient-to-br ${genre.color} rounded-lg p-4 h-32 relative overflow-hidden text-left hover:scale-105 transition`}
                >
                  <span className="text-xl font-bold">{genre.name}</span>
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Popular Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
