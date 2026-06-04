"use client";

import { useParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import SongRow from "@/components/SongRow";
import { playlists, songs, getPlaylistSongs } from "@/lib/data";
import { usePlayerStore } from "@/store/playerStore";
import { useLibraryStore } from "@/store/libraryStore";
import { Play, Clock, Music } from "lucide-react";

export default function PlaylistPage() {
  const params = useParams();
  const id = params.id as string;
  const { playSong } = usePlayerStore();
  const { userPlaylists } = useLibraryStore();

  const publicPlaylist = playlists.find((p) => p.id === id);
  const userPlaylist = userPlaylists.find((p) => p.id === id);

  if (publicPlaylist) {
    const playlistSongs = getPlaylistSongs(publicPlaylist);

    const handlePlayAll = () => {
      if (playlistSongs.length > 0) {
        playSong(playlistSongs[0], playlistSongs);
      }
    };

    return (
      <div>
        <div
          className="relative"
          style={{
            background: `linear-gradient(to bottom, ${publicPlaylist.color}, transparent)`,
          }}
        >
          <TopBar />
          <div className="px-6 pb-6 flex items-end gap-6">
            <img
              src={publicPlaylist.cover}
              alt={publicPlaylist.title}
              className="w-48 h-48 rounded shadow-2xl object-cover"
            />
            <div>
              <p className="text-sm font-medium uppercase">Playlist</p>
              <h1 className="text-5xl font-bold mt-2 mb-4">
                {publicPlaylist.title}
              </h1>
              <p className="text-sm text-spotify-light-gray">
                {publicPlaylist.description} • {playlistSongs.length} songs
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={handlePlayAll}
              className="bg-spotify-green rounded-full p-4 hover:scale-105 transition shadow-xl"
            >
              <Play size={24} className="text-black" fill="black" />
            </button>
          </div>

          <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 border-b border-zinc-700 mb-2">
            <span className="text-xs text-spotify-light-gray">#</span>
            <span className="text-xs text-spotify-light-gray uppercase">
              Title
            </span>
            <span className="text-xs text-spotify-light-gray uppercase">
              Album
            </span>
            <div className="flex justify-end">
              <Clock size={14} className="text-spotify-light-gray" />
            </div>
          </div>

          {playlistSongs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              index={i}
              queue={playlistSongs}
            />
          ))}
        </div>
      </div>
    );
  }

  if (userPlaylist) {
    const playlistSongs = userPlaylist.songs
      .map((songId) => songs.find((s) => s.id === songId))
      .filter((s) => s !== undefined);

    const handlePlayAll = () => {
      if (playlistSongs.length > 0) {
        playSong(playlistSongs[0], playlistSongs);
      }
    };

    return (
      <div>
        <TopBar />
        <div className="px-6 pb-8">
          <div className="flex items-end gap-6 mb-8">
            <div className="w-48 h-48 rounded bg-spotify-gray flex items-center justify-center shadow-2xl flex-shrink-0">
              <Music size={64} className="text-spotify-light-gray" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase">Playlist</p>
              <h1 className="text-5xl font-bold mt-2 mb-4">
                {userPlaylist.title}
              </h1>
              <p className="text-sm text-spotify-light-gray">
                {playlistSongs.length} songs
              </p>
            </div>
          </div>

          {playlistSongs.length > 0 && (
            <>
              <div className="flex items-center gap-6 mb-6">
                <button
                  onClick={handlePlayAll}
                  className="bg-spotify-green rounded-full p-4 hover:scale-105 transition shadow-xl"
                >
                  <Play size={24} className="text-black" fill="black" />
                </button>
              </div>

              <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 border-b border-zinc-700 mb-2">
                <span className="text-xs text-spotify-light-gray">#</span>
                <span className="text-xs text-spotify-light-gray uppercase">
                  Title
                </span>
                <span className="text-xs text-spotify-light-gray uppercase">
                  Album
                </span>
                <div className="flex justify-end">
                  <Clock size={14} className="text-spotify-light-gray" />
                </div>
              </div>

              {playlistSongs.map((song, i) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={i}
                  queue={playlistSongs}
                />
              ))}
            </>
          )}

          {playlistSongs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-spotify-light-gray text-lg">
                This playlist is empty
              </p>
              <p className="text-spotify-light-gray text-sm mt-2">
                Add songs from the search page
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Playlist not found</h1>
        <p className="text-spotify-light-gray">
          This playlist doesn&apos;t exist or has been removed
        </p>
      </div>
    </div>
  );
}
