export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  year: number;
  songs: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  color: string;
  songs: string[];
  isPublic: boolean;
}

export const artists: Artist[] = [
  { id: "artist-1", name: "The Weeknd", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_5_erjyb7.jpg", genres: ["R&B", "Pop"] },
  { id: "artist-2", name: "Ed Sheeran", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_5_rd5xqa.jpg", genres: ["Pop", "Folk"] },
  { id: "artist-3", name: "Travis Scott", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_3_td9ncs.jpg", genres: ["Hip-Hop", "Rap"] },
  { id: "artist-4", name: "Billie Eilish", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_7_m7f0mh.jpg", genres: ["Pop", "Alternative"] },
  { id: "artist-5", name: "Post Malone", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_2_cijs8v.jpg", genres: ["Hip-Hop", "Pop"] },
  { id: "artist-6", name: "Imagine Dragons", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_10_sz0cib.jpg", genres: ["Rock", "Alternative"] },
  { id: "artist-7", name: "Avicii", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776174/spotify-astro/playlist_1_yci5uf.jpg", genres: ["EDM", "Dance"] },
  { id: "artist-8", name: "Bruno Mars", image: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_6_f1lt7y.jpg", genres: ["Pop", "R&B", "Funk"] },
];

export const songs: Song[] = [
  {
    id: "song-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    artistId: "artist-1",
    album: "After Hours",
    albumId: "album-1",
    duration: 202,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_4_lwumgu.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "song-2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    artistId: "artist-2",
    album: "÷ (Divide)",
    albumId: "album-2",
    duration: 233,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_5_rd5xqa.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "song-3",
    title: "SICKO MODE",
    artist: "Travis Scott",
    artistId: "artist-3",
    album: "ASTROWORLD",
    albumId: "album-3",
    duration: 313,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_3_td9ncs.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "song-4",
    title: "Bad Guy",
    artist: "Billie Eilish",
    artistId: "artist-4",
    album: "When We All Fall Asleep",
    albumId: "album-4",
    duration: 194,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_7_m7f0mh.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "song-5",
    title: "Saint-Tropez",
    artist: "Post Malone",
    artistId: "artist-5",
    album: "Hollywood's Bleeding",
    albumId: "album-5",
    duration: 143,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_2_cijs8v.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "song-6",
    title: "Radioactive",
    artist: "Imagine Dragons",
    artistId: "artist-6",
    album: "Night Visions",
    albumId: "album-6",
    duration: 187,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_10_sz0cib.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "song-7",
    title: "The Nights",
    artist: "Avicii",
    artistId: "artist-7",
    album: "The Days / Nights",
    albumId: "album-7",
    duration: 176,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_1_qitfwl.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "song-8",
    title: "Uptown Funk",
    artist: "Bruno Mars",
    artistId: "artist-8",
    album: "Uptown Special",
    albumId: "album-8",
    duration: 270,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_6_f1lt7y.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "song-9",
    title: "Save Your Tears",
    artist: "The Weeknd",
    artistId: "artist-1",
    album: "After Hours",
    albumId: "album-1",
    duration: 215,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_4_lwumgu.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "song-10",
    title: "Perfect",
    artist: "Ed Sheeran",
    artistId: "artist-2",
    album: "÷ (Divide)",
    albumId: "album-2",
    duration: 263,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_5_rd5xqa.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "song-11",
    title: "Starboy",
    artist: "The Weeknd",
    artistId: "artist-1",
    album: "Starboy",
    albumId: "album-9",
    duration: 230,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_5_erjyb7.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
  {
    id: "song-12",
    title: "Believer",
    artist: "Imagine Dragons",
    artistId: "artist-6",
    album: "Evolve",
    albumId: "album-10",
    duration: 204,
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776176/spotify-astro/song_10_sz0cib.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  },
];

export const playlists: Playlist[] = [
  {
    id: "playlist-1",
    title: "Today's Top Hits",
    description: "The hottest tracks right now",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776174/spotify-astro/playlist_1_yci5uf.jpg",
    color: "#1a237e",
    songs: ["song-1", "song-2", "song-4", "song-8", "song-11"],
    isPublic: true,
  },
  {
    id: "playlist-2",
    title: "RapCaviar",
    description: "New music from the biggest names in hip-hop",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_3_grshca.jpg",
    color: "#b71c1c",
    songs: ["song-3", "song-5", "song-9"],
    isPublic: true,
  },
  {
    id: "playlist-3",
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776174/spotify-astro/playlist_2_f9ymlx.jpg",
    color: "#004d40",
    songs: ["song-2", "song-6", "song-7", "song-8", "song-10"],
    isPublic: true,
  },
  {
    id: "playlist-4",
    title: "Chill Vibes",
    description: "Kick back and relax with these chill tracks",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_5_erjyb7.jpg",
    color: "#880e4f",
    songs: ["song-1", "song-9", "song-10", "song-11"],
    isPublic: true,
  },
  {
    id: "playlist-5",
    title: "Rock Classics",
    description: "Rock legends & iconic songs",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_4_ap5xnb.jpg",
    color: "#e65100",
    songs: ["song-6", "song-12"],
    isPublic: true,
  },
  {
    id: "playlist-6",
    title: "Dance Party",
    description: "Get up and dance with these EDM bangers",
    cover: "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776474/spotify-astro/R-15112137-1586815179-1911_fsyl58.jpg",
    color: "#1b5e20",
    songs: ["song-7", "song-1", "song-4", "song-8"],
    isPublic: true,
  },
];

export function getSongById(id: string): Song | undefined {
  return songs.find((s) => s.id === id);
}

export function getPlaylistSongs(playlist: Playlist): Song[] {
  return playlist.songs
    .map((id) => getSongById(id))
    .filter((s): s is Song => s !== undefined);
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function searchSongs(query: string): Song[] {
  const q = query.toLowerCase();
  return songs.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
  );
}

export function searchPlaylists(query: string): Playlist[] {
  const q = query.toLowerCase();
  return playlists.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function searchArtists(query: string): Artist[] {
  const q = query.toLowerCase();
  return artists.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.genres.some((g) => g.toLowerCase().includes(q))
  );
}
