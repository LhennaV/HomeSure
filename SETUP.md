# HomeSure — setup, step by step

Follow this once. It takes about 20 minutes. Do the steps in order; each one says how to tell it worked.

> ### How to run a `.sql` file in the SQL Editor
>
> The editor runs **SQL text**, not file paths. Typing `backend/supabase/migrations/000_check_state.sql`
> into it gives you `ERROR: 42601: syntax error at or near "backend"`. For every `.sql` file below:
>
> 1. Open the file in VS Code (click its name in the Explorer).
> 2. Click inside it, then **Ctrl+A** (select all) → **Ctrl+C** (copy).
> 3. In the SQL Editor, **Ctrl+A** → **Ctrl+V** (replace whatever is there with what you copied).
> 4. **Run**.
>
> You should see real SQL in the editor — `WITH state AS (`, `CREATE TABLE`, `ALTER TABLE` — not a file name.

---

## Step 1 — See what your database already has

Open Supabase Studio for your project (`https://srv1824055.hstgr.cloud`) → **SQL Editor**.

Run `backend/supabase/migrations/000_check_state.sql` (copy its contents in, as described in the box above).

It changes nothing. It prints six rows:

| migration | status |
|---|---|
| 001_initial_schema | APPLIED or RUN THIS |
| … | … |

**Write down which ones say `RUN THIS`.** You only run those.

> **Do not re-run a migration that says APPLIED.** `001` has no "if not exists" guards, so running it twice
> fails with `type "user_role" already exists`. That error is harmless (nothing is changed), but it is confusing.

---

## Step 2 — Run the migrations that say RUN THIS

For each one, in numeric order: open the file in `backend/supabase/migrations/`, **Ctrl+A → Ctrl+C**, then in
the SQL Editor **Ctrl+A → Ctrl+V → Run** (see the box at the top). Finish one before starting the next.

```
001_initial_schema.sql           ← Choya's tables
002_rls_policies.sql             ← Choya's security rules
003_functions_triggers.sql       ← auto-create profile on signup
004_similarity_function.sql      ← FIXED (the old version could not run at all)
005_roles_seller_superadmin.sql  ← NEW: landowner → seller, adds superadmin
006_frontend_alignment.sql       ← NEW: everything your front end needs
```

`005` and `006` are safe to run more than once.

If you run `006` before `005`, it stops with a clear message telling you to run `005` first — nothing is half-applied.

**How to tell it worked:** run `000_check_state.sql` again. All six rows should say `APPLIED`.

### If `005` errors

Run it as the **only** thing in the editor (clear the box first) — a new role value cannot be created and used
in the same transaction.

`005` copes with both shapes a database can be in: `profiles.role` already being the `user_role` enum, or being
a plain text column (in which case it converts the column, preserving your rows and your security policies).
It is atomic — if it fails, nothing changed.

If it still fails, run `000b_diagnose_role_type.sql` (read-only) and send the result. It shows what
`profiles.role` really is and where the enum lives.

### If `006` says "Run 005 … first"

That is the guard working: `005` did not finish. Fix `005`, then come back to `006`. Nothing was half-applied.

---

## Step 3 — Check the two storage buckets

Supabase Studio → **Storage**. You should see:

| Bucket | Public? | Holds |
|---|---|---|
| `listing-images` | **yes** | listing photos |
| `verification-docs` | **no** | IDs, selfies, titles, deeds |

`006` creates them. If they are missing (some self-hosted installs do not expose the `storage` schema to SQL),
create them by hand with exactly those names and those public/private settings.

`verification-docs` **must stay private** — it holds people's IDs. The app opens those files with short-lived
signed links, and only the owner and admins can read them.

---

## Step 4 — Fill in the backend's secrets

Your `backend/.env.local` already has the Supabase URL, the anon key, and the Xendit keys. Three are missing:

```ini
# Supabase Studio → Settings → API → "service_role" secret. Server-side only.
# Payments, refunds, the Xendit webhook and analytics do not work without it.
SUPABASE_SERVICE_ROLE_KEY=paste-the-service-role-key-here

# Where you serve the front end from. Browser calls to /api/* are blocked otherwise (CORS).
FRONTEND_ORIGINS=http://localhost:5500,http://127.0.0.1:5500

# Only needed for the OCR title check. Leave it out and that one feature returns a clear error.
GOOGLE_CLOUD_VISION_API_KEY=
```

Never put the service-role key in `assets/js/config.js` or anywhere in the front end — it bypasses every
security rule in the database.

---

## Step 5 — Start the backend

```bash
cd backend
npm install
npm run dev
```

**How to tell it worked:** `http://localhost:3000` opens, and the terminal shows no red errors.

---

## Step 6 — Serve the front end

The front end must be served over HTTP, **not** opened as a `file://` path (the Supabase library needs an origin).

Easiest: in VS Code, right-click `index.html` → **Open with Live Server** (it uses port 5500, which is already
in `FRONTEND_ORIGINS` above).

Or:

```bash
npx serve -l 5500 .
```

**How to tell it worked:** open `http://localhost:5500/browse.html`. It should say "0 properties found"
(not "Could not load listings"). Zero is correct — the database is empty at this point.

If it says *Could not load listings*, open the browser console (F12). Check `assets/js/config.js` has the right
`SUPABASE_URL` and `SUPABASE_ANON_KEY`.

---

## Step 7 — Make yourself a superadmin

Roles are `buyer`, `seller`, `admin`, `superadmin`. Nobody can change their own role — not even an admin;
only a superadmin can. So the first one is set by hand.

1. Go to `http://localhost:5500/auth/signup.html` and sign up normally.
2. Confirm the email (Supabase Studio → **Authentication** → your user → confirm, if email sending is not set up).
3. SQL Editor:

```sql
update profiles set role = 'superadmin' where email = 'YOUR-EMAIL-HERE';
```

4. Sign out and sign in again — you land on the super-admin dashboard.

To make an admin later, do the same with `role = 'admin'` (or add them from the super-admin page).

---

## Step 8 — Walk one listing end to end

This proves front end, backend and database all agree. Make a second account for the seller
(`auth/signup.html` → pick **Seller**).

| # | Who | Do this | Should happen |
|---|---|---|---|
| 1 | Seller | sign in | lands on the seller dashboard, badge says **Unverified** |
| 2 | Seller | *My Listings* → Add | blocked — "Complete verification to post listings" |
| 3 | Seller | Settings → verification → take ID + selfie → submit | badge becomes **Pending Review** |
| 4 | Admin | *Users* → the seller → **Approve** | seller becomes **Verified** |
| 5 | Seller | reload → *Add listing* → fill in, add a photo + a title document → **Submit for Review** | appears under **Pending**, and the photo really uploaded (Storage → `listing-images`) |
| 6 | Admin | *Listings* → the listing → **Approve** | status becomes **Approved** |
| 7 | Anyone | `browse.html` (even signed out) | the listing is now visible to the public |
| 8 | Buyer | open it → **Save Listing** | the heart fills; it is in *Saved Listings* after a reload |
| 9 | Buyer | **Schedule Viewing** | the seller gets a viewing request |

If step 7 does not show the listing, the admin approval did not go through — check the browser console on the
admin page.

---

## What is NOT wired up yet

These pages still show sample data from `assets/js/fake-data.js`. They work and look right, but nothing is saved:

messages · viewing requests (seller side) · reviews · payments / transactions · notifications ·
reports · analytics · profile & settings · MOA · the super-admin pages

The database tables for all of them already exist (`messages`, `viewing_requests`, `reviews`,
`listing_reports`, `notifications`, `audit_logs`, `payments`) — they just need the page scripts pointed at
`HS.*` in `assets/js/data.js`, the same way the converted pages were done.

A page still loads `fake-data.js` only if its script still needs sample data. When a page is converted,
remove that one `<script>` line.

---

## Secrets

`backend/.env.local` is never committed (`.gitignore` covers `.env*`). It holds the Supabase anon and
service-role keys. The Xendit and Google entries are still the example placeholders — fill them in when
those integrations are actually wired up.

The **service-role key bypasses every security rule in the database**. It belongs in `.env.local` and
nowhere else — never in `assets/js/config.js`, never in a screenshot, never in a commit.
