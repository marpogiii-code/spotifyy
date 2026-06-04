"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setUser(data.user);
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-dark to-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-spotify-green">♫</span> Spotifyy
          </h1>
          <p className="text-spotify-light-gray">
            Sign up to start listening
          </p>
        </div>

        {/* Form */}
        <div className="bg-spotify-gray rounded-lg p-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded p-3 mb-4 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a profile name"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Create a password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-white transition"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-spotify-dark border border-zinc-600 rounded text-white placeholder-zinc-400 focus:outline-none focus:border-white transition"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-spotify-green text-black font-bold py-3 rounded-full hover:bg-spotify-green-dark hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-spotify-light-gray text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white underline hover:text-spotify-green transition"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
