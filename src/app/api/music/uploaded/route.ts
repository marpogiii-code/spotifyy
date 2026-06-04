import { NextResponse } from "next/server";
import { getUploadedSongs } from "@/lib/uploadedSongs";

export const dynamic = "force-dynamic";

export async function GET() {
  const songs = getUploadedSongs();
  return NextResponse.json({ songs });
}
