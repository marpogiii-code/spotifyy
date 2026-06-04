"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { useAuthStore } from "@/store/authStore";
import { useLibraryStore } from "@/store/libraryStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useAuthStore();
  const { loadFromStorage } = useLibraryStore();
  const pathname = usePathname();

  useEffect(() => {
    fetchUser();
    loadFromStorage();
  }, [fetchUser, loadFromStorage]);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex flex-1 gap-2 p-2 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-spotify-dark rounded-lg overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
      <Player />
    </div>
  );
}
