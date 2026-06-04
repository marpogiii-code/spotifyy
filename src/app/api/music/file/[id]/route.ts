import { NextResponse } from "next/server";
import { getUploadedSongData } from "@/lib/uploadedSongs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = getUploadedSongData(id);

  if (!data) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(data.audioData), {
    headers: {
      "Content-Type": data.audioMimeType,
      "Content-Length": data.audioData.length.toString(),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
