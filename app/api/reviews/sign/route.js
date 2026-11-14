// app/api/reviews/sign/route.js
// Public upload signature for review photos. Locked to one folder and image formats only.
// Best-effort rate limit per IP (in-memory, so it resets when the server instance restarts).
import crypto from "crypto";
import { NextResponse } from "next/server";

const FOLDER = "portfolio/reviews";
const FORMATS = "jpg,png,webp";
const WINDOW = 10 * 60 * 1000;
const MAX = 12;
const hits = new Map();

export async function POST(req) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: "config" }, { status: 500 });

    const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const now = Date.now();
    const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
    if (list.length >= MAX) return NextResponse.json({ error: "rate" }, { status: 429 });
    list.push(now);
    hits.set(ip, list);
    if (hits.size > 5000) hits.clear();

    const timestamp = Math.floor(now / 1000);
    const signature = crypto
      .createHash("sha1")
      .update(`allowed_formats=${FORMATS}&folder=${FOLDER}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    return NextResponse.json({ cloudName, api_key: apiKey, timestamp, folder: FOLDER, allowed_formats: FORMATS, signature });
  } catch {
    return NextResponse.json({ error: "sign" }, { status: 500 });
  }
}