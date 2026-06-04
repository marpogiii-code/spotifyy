import { NextResponse } from "next/server";
import { getUploadedSongData } from "@/lib/uploadedSongs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = getUploadedSongData(id);

  if (!data || !data.coverData || !data.coverMimeType) {
    return NextResponse.json({ error: "Cover not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(data.coverData), {
    headers: {
      "Content-Type": data.coverMimeType,
      "Content-Length": data.coverData.length.toString(),
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
