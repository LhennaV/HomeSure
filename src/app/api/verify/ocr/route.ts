import { NextResponse } from "next/server";
import { guardApi } from "@/lib/api";
import { getAdminSupabase } from "@/lib/supabase/admin-client";

export async function POST(request: Request) {
  const guard = await guardApi();
  if (!guard.ok) return guard.response;
  const { supabase, user } = guard;

  const body = await request.json().catch(() => ({}));
  const { propertyId, imagePath } = body;

  if (!propertyId || !imagePath) {
    return NextResponse.json({ error: "propertyId and imagePath are required" }, { status: 400 });
  }

  // Only the owner may run OCR on a listing (RLS lets owners read their own, non-public listings).
  const { data: property } = await supabase.from("properties").select("id, landowner_id").eq("id", propertyId).single();
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  if (property.landowner_id !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { data: { publicUrl } } = supabase.storage.from("titles").getPublicUrl(imagePath);

    const visionApiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
    if (!visionApiKey) return NextResponse.json({ error: "Vision API not configured" }, { status: 500 });
    const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`;

    const visionBody = {
      requests: [
        {
          image: { source: { imageUri: publicUrl } },
          features: [{ type: "TEXT_DETECTION", maxResults: 10 }],
        },
      ],
    };

    const visionRes = await fetch(visionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visionBody),
    });

    const visionData = await visionRes.json();
    const fullText = visionData.responses?.[0]?.fullTextAnnotation?.text || "";

    const titleNumberMatch = fullText.match(/Title\s*(?:No\.?|Number)?\s*:?\s*([A-Z0-9\-]+)/i);
    const ownerMatch = fullText.match(/Owner[s]?\s*:?\s*([A-Z][A-Z\s\.]+)/i);

    const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();

    let matchScore: number | null = null;
    if (profile && ownerMatch) {
      const titleOwner = ownerMatch[1].trim();
      const profileName = profile.full_name.toUpperCase();
      const { data: similarityData } = await supabase.rpc("name_similarity", {
        str1: profileName,
        str2: titleOwner,
      });
      matchScore = similarityData;
    }

    // verification_state is admin/system-owned (owners are blocked by a DB trigger) -> service role.
    await getAdminSupabase().from("properties").update({
      verification_state: matchScore !== null && matchScore >= 0.85 ? "pending_lra" : "rejected",
      ocr_match_score: matchScore ? parseFloat((matchScore * 100).toFixed(2)) : null,
    }).eq("id", propertyId);

    return NextResponse.json({
      fullText,
      extractedTitleNumber: titleNumberMatch?.[1] || null,
      extractedOwner: ownerMatch?.[1] || null,
      matchScore,
    });
  } catch (error) {
    return NextResponse.json({ error: "OCR processing failed" }, { status: 500 });
  }
}
