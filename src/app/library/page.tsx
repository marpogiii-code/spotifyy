"use client";

import TopBar from "@/components/TopBar";
import SongRow from "@/components/SongRow";
import { useLibraryStore } from "@/store/libraryStore";
import { useAuthStore } from "@/store/authStore";
import { songs } from "@/lib/data";
import { Heart, Music } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const { user } = useAuthStore();
  const { likedSongs, userPlaylists } = useLibraryStore();

  const likedTracks = songs.filter((s) => likedSongs.includes(s.id));

  if (!user) {
    return (
      <div>
        <TopBar />
        <div className="px-6 py-16 text-center">
          <Music size={64} className="mx-auto text-spotify-light-gray mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Library</h1>
          <p className="text-spotify-light-gray mb-6">
            Log in to see your saved songs, playlists, and more
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="px-6 pb-8">
        {/* Liked Songs Header */}
        <div className="flex items-end gap-6 mb-8">
          <div className="w-48 h-48 rounded bg-gradient-to-br from-indigo-800 to-zinc-300 flex items-center justify-center flex-shrink-0 shadow-2xl">
            <Heart size={64} className="text-white fill-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white uppercase">
              Playlist
            </p>
            <h1 className="text-5xl font-bold mt-2 mb-4">Liked Songs</h1>
            <p className="text-sm text-spotify-light-gray">
              {user.name} • {likedTracks.length} songs
            </p>
          </div>
        </div>

        {/* Liked Songs List */}
        {likedTracks.length > 0 ? (
          <div>
            <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 border-b border-zinc-700 mb-2">
              <span className="text-xs text-spotify-light-gray">#</span>
              <span className="text-xs text-spotify-light-gray uppercase">
                Title
              </span>
              <span className="text-xs text-spotify-light-gray uppercase">
                Album
              </span>
              <span className="text-xs text-spotify-light-gray text-right">
                Duration
              </span>
            </div>
            {likedTracks.map((song, i) => (
              <SongRow
                key={song.id}
                song={song}
                index={i}
                queue={likedTracks}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-spotify-light-gray text-lg">
              Songs you like will appear here
            </p>
            <p className="text-spotify-light-gray text-sm mt-2">
              Find songs and tap the heart icon to save them
            </p>
            <Link
              href="/search"
              className="inline-block mt-4 bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition"
            >
              Find songs
            </Link>
          </div>
        )}

        {/* User Playlists */}
        {userPlaylists.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userPlaylists.map((p) => (
                <Link
                  key={p.id}
                  href={`/playlist/${p.id}`}
                  className="bg-spotify-dark/60 hover:bg-spotify-gray/80 p-4 rounded-md transition group"
                >
                  <div className="w-full aspect-square bg-spotify-gray rounded-md flex items-center justify-center mb-4 shadow-lg">
                    <Music
                      size={48}
                      className="text-spotify-light-gray"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm truncate">
                    {p.title}
                  </h3>
                  <p className="text-spotify-light-gray text-xs mt-1">
                    {p.songs.length} songs
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
