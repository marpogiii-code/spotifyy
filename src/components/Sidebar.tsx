"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useLibraryStore } from "@/store/libraryStore";
import { playlists } from "@/lib/data";
import { Home, Search, Library, Plus, Heart } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { userPlaylists, createPlaylist } = useLibraryStore();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/library", label: "Your Library", icon: Library },
  ];

  const handleCreatePlaylist = () => {
    if (!user) return;
    const name = prompt("Enter playlist name:");
    if (name) {
      createPlaylist(name);
    }
  };

  return (
    <aside className="w-[300px] flex-shrink-0 flex flex-col gap-2 h-full">
      {/* Navigation */}
      <div className="bg-spotify-dark rounded-lg p-4 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 text-sm font-semibold transition hover:text-white ${
              pathname === item.href ? "text-white" : "text-spotify-light-gray"
            }`}
          >
            <item.icon size={24} />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Library */}
      <div className="bg-spotify-dark rounded-lg flex-1 overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-spotify-light-gray">
            <Library size={24} />
            <span className="font-semibold">Your Library</span>
          </div>
          {user && (
            <button
              onClick={handleCreatePlaylist}
              className="text-spotify-light-gray hover:text-white transition"
            >
              <Plus size={20} />
            </button>
          )}
        </div>

        <div className="overflow-y-auto scrollbar-thin flex-1 px-2 pb-2">
          {/* Liked Songs */}
          <Link
            href="/library"
            className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition"
          >
            <div className="w-12 h-12 rounded bg-gradient-to-br from-indigo-800 to-zinc-300 flex items-center justify-center flex-shrink-0">
              <Heart size={16} className="text-white fill-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Liked Songs
              </p>
              <p className="text-xs text-spotify-light-gray">Playlist</p>
            </div>
          </Link>

          {/* User Playlists */}
          {userPlaylists.map((p) => (
            <Link
              key={p.id}
              href={`/playlist/${p.id}`}
              className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition"
            >
              <div className="w-12 h-12 rounded bg-spotify-gray flex items-center justify-center flex-shrink-0">
                <Library size={16} className="text-spotify-light-gray" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {p.title}
                </p>
                <p className="text-xs text-spotify-light-gray">
                  Playlist • {p.songs.length} songs
                </p>
              </div>
            </Link>
          ))}

          {/* Public Playlists */}
          {playlists.map((p) => (
            <Link
              key={p.id}
              href={`/playlist/${p.id}`}
              className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition"
            >
              <img
                src={p.cover}
                alt={p.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {p.title}
                </p>
                <p className="text-xs text-spotify-light-gray">Playlist</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
