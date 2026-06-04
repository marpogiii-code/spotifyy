"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUploadStore } from "@/store/uploadStore";
import TopBar from "@/components/TopBar";
import { Upload, Music, X, CheckCircle } from "lucide-react";

const ADMIN_EMAIL = "mar23pogi@gmail.com";

export default function UploadPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { uploadedSongs, fetchUploadedSongs } = useUploadStore();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUploadedSongs();
  }, [fetchUploadedSongs]);

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-spotify-light-gray">Loading...</p>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !artist || !audioFile) {
      setError("Title, artist, and audio file are required");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("album", album);
      formData.append("audio", audioFile);
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      const res = await fetch("/api/music/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      setSuccess(`"${data.song.title}" uploaded successfully!`);
      setTitle("");
      setArtist("");
      setAlbum("");
      setAudioFile(null);
      setCoverFile(null);
      if (audioInputRef.current) audioInputRef.current.value = "";
      if (coverInputRef.current) coverInputRef.current.value = "";

      fetchUploadedSongs();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="px-6 pb-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-spotify-green to-emerald-700 flex items-center justify-center">
            <Upload size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Upload Music</h1>
            <p className="text-spotify-light-gray text-sm">
              Add new songs to the platform
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-spotify-gray rounded-lg p-6 mb-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded p-3 mb-4 text-sm text-red-200 flex items-center gap-2">
              <X size={16} />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 rounded p-3 mb-4 text-sm text-green-200 flex items-center gap-2">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Song Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-spotify-green transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Artist *
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-spotify-green transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Album
              </label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Enter album name (optional)"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-spotify-green transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Audio File * (MP3, WAV, OGG — max 15MB)
              </label>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-spotify-green file:text-black file:font-semibold file:text-sm file:cursor-pointer hover:file:bg-spotify-green-dark transition"
                required
              />
              {audioFile && (
                <p className="text-xs text-spotify-light-gray mt-1">
                  Selected: {audioFile.name} (
                  {(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Cover Image (JPG, PNG — max 5MB)
              </label>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-zinc-700 file:text-white file:font-semibold file:text-sm file:cursor-pointer hover:file:bg-zinc-600 transition"
              />
              {coverFile && (
                <p className="text-xs text-spotify-light-gray mt-1">
                  Selected: {coverFile.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-spotify-green text-black font-bold py-3 rounded-full hover:bg-spotify-green-dark hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload size={18} />
                  Upload Song
                </>
              )}
            </button>
          </form>
        </div>

        {/* Uploaded Songs List */}
        {uploadedSongs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Uploaded Songs</h2>
            <div className="space-y-2">
              {uploadedSongs.map((song, i) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <span className="text-spotify-light-gray text-sm w-6 text-center">
                    {i + 1}
                  </span>
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {song.title}
                    </p>
                    <p className="text-xs text-spotify-light-gray truncate">
                      {song.artist}
                      {song.album !== "Unknown Album" && ` • ${song.album}`}
                    </p>
                  </div>
                  <Music size={16} className="text-spotify-green flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
