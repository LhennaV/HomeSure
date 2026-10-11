// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Front-end configuration
//  Load order on every page: supabase-js (CDN) → config.js → session.js → data.js
//
//  The anon key is meant to be public: what a visitor can read or change is decided
//  by Row Level Security in backend/supabase/migrations, not by hiding this key.
//  NEVER put the service-role key (or any Xendit / Google secret) in this file.
// ─────────────────────────────────────────────────────────────────────────────

// Next.js backend: only for things that need secrets (payments, refunds, OCR).
const API_URL = "http://localhost:3000";

const SUPABASE_URL = "https://srv1824055.hstgr.cloud";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzgzODYyNzgyLCJleHAiOjIwOTkyMjI3ODJ9.VZhJGJ7CG4NJpdcIoSAGLjsWiGrh491UpAhtjem15tw";

// Supabase persists the signed-in session in localStorage and refreshes the token for us.
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
