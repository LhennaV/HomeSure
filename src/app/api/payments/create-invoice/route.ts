import { NextResponse } from "next/server";
import { guardApi } from "@/lib/api";
import { getAdminSupabase } from "@/lib/supabase/admin-client";

export async function POST(request: Request) {
  const guard = await guardApi();
  if (!guard.ok) return guard.response;
  const { supabase, user } = guard;

  const { propertyId } = (await request.json().catch(() => ({}))) as { propertyId?: string };
  if (!propertyId) return NextResponse.json({ error: "propertyId is required" }, { status: 400 });

  // RLS only lets the caller see publicly visible (admin-approved) listings.
  const { data: property } = await supabase
    .from("properties")
    .select("id, price, status, lifecycle_status, listing_type, landowner_id")
    .eq("id", propertyId)
    .single();
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  if (property.status !== "approved") return NextResponse.json({ error: "Property is not available" }, { status: 400 });
  if (property.lifecycle_status === "sold" || property.lifecycle_status === "rented") {
    return NextResponse.json({ error: "Property is no longer available" }, { status: 400 });
  }
  if (property.landowner_id === user.id) {
    return NextResponse.json({ error: "You cannot pay for your own listing" }, { status: 400 });
  }

  const xenditSecret = process.env.XENDIT_SECRET_KEY;
  if (!xenditSecret) return NextResponse.json({ error: "Xendit not configured" }, { status: 500 });

  const auth = Buffer.from(`${xenditSecret}:`).toString("base64");

  const xenditRes = await fetch("https://api.xendit.co/qr_codes", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reference_id: `property-${propertyId}-${Date.now()}`,
      amount: property.price,
      currency: "PHP",
      channel_codes: ["PH_QRPH"],
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    }),
  });

  if (!xenditRes.ok) {
    const err = await xenditRes.text();
    return NextResponse.json({ error: `Xendit error: ${err}` }, { status: 500 });
  }

  const qr = await xenditRes.json();

  // No INSERT policy on payments for end users by design -> write with the service role.
  const { data: payment, error } = await getAdminSupabase()
    .from("payments")
    .insert({
      property_id: propertyId,
      user_id: user.id,
      amount: property.price,
      type: property.listing_type === "rent" ? "rent" : "sale",
      xendit_charge_id: qr.id,
      xendit_qr_string: qr.qr_string,
      qr_code_url: qr.qr_code_url,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: `Could not record payment: ${error.message}` }, { status: 500 });

  return NextResponse.json({ payment, qr }, { status: 200 });
}
