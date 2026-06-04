import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { ADMIN_EMAIL, addUploadedSong } from "@/lib/uploadedSongs";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Only the admin can upload music" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const album = formData.get("album") as string;
    const audioFile = formData.get("audio") as File | null;
    const coverFile = formData.get("cover") as File | null;

    if (!title || !artist || !audioFile) {
      return NextResponse.json(
        { error: "Title, artist, and audio file are required" },
        { status: 400 }
      );
    }

    if (audioFile.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file must be under 15MB" },
        { status: 400 }
      );
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const songId = `uploaded-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    let coverData: Buffer | undefined;
    let coverMimeType: string | undefined;
    if (coverFile && coverFile.size > 0) {
      if (coverFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Cover image must be under 5MB" },
          { status: 400 }
        );
      }
      coverData = Buffer.from(await coverFile.arrayBuffer());
      coverMimeType = coverFile.type;
    }

    const audioUrl = `/api/music/file/${songId}`;
    const coverUrl = coverData
      ? `/api/music/cover/${songId}`
      : "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/song_1_qitfwl.jpg";

    const duration = 0;

    const song = {
      id: songId,
      title,
      artist,
      artistId: `uploaded-artist-${artist.toLowerCase().replace(/\s+/g, "-")}`,
      album: album || "Unknown Album",
      albumId: `uploaded-album-${Date.now()}`,
      duration,
      cover: coverUrl,
      audioUrl,
    };

    addUploadedSong({
      song,
      audioData: audioBuffer,
      audioMimeType: audioFile.type || "audio/mpeg",
      coverData,
      coverMimeType,
    });

    return NextResponse.json(
      { song, message: "Song uploaded successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
