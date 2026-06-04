import type { Song } from "./data";

export const ADMIN_EMAIL = "mar23pogi@gmail.com";

export interface UploadedSongData {
  song: Song;
  audioData: Buffer;
  audioMimeType: string;
  coverData?: Buffer;
  coverMimeType?: string;
}

const uploadedSongs: UploadedSongData[] = [];

export function addUploadedSong(data: UploadedSongData): void {
  uploadedSongs.push(data);
}

export function getUploadedSongs(): Song[] {
  return uploadedSongs.map((d) => d.song);
}

export function getUploadedSongData(id: string): UploadedSongData | undefined {
  return uploadedSongs.find((d) => d.song.id === id);
}

export function getAllUploadedSongData(): UploadedSongData[] {
  return uploadedSongs;
}
