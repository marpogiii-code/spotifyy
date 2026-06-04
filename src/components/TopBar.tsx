"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function TopBar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 z-20 bg-spotify-dark/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="bg-black/40 rounded-full p-1.5 hover:bg-black/60 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => router.forward()}
          className="bg-black/40 rounded-full p-1.5 hover:bg-black/60 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="relative" ref={menuRef}>
        {user ? (
          <>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 bg-black/40 rounded-full p-1 pr-3 hover:bg-black/60 transition"
            >
              <div className="w-7 h-7 rounded-full bg-spotify-green flex items-center justify-center">
                <User size={14} className="text-black" />
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-zinc-800 rounded shadow-xl py-1 w-48">
                <Link
                  href="/library"
                  className="block px-4 py-2 text-sm hover:bg-white/10 transition"
                  onClick={() => setShowMenu(false)}
                >
                  Your Library
                </Link>
                <hr className="border-zinc-700 my-1" />
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Log out
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="text-spotify-light-gray hover:text-white text-sm font-semibold transition"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
