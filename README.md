# HomeSure

One repo, two parts:

| Folder | What it is |
|---|---|
| `/` (`index.html`, `auth/`, `module/`, `assets/`, `components/`) | The front end — static HTML/CSS/JS. Talks to Supabase directly (auth, listings, saved, …). |
| `backend/` | Next.js API (payments, refunds, OCR, webhooks) **and** the database definition (`backend/supabase/migrations`). |

The front end is the source of truth for what the app does; the database was reshaped to fit it.

## Run it locally

**Setting this up for the first time? Follow [SETUP.md](SETUP.md)** — step by step, with a check at each stage.
The short version:

**1. Database** — run `backend/supabase/migrations/000_check_state.sql` to see what is missing, then run the
migrations it marks `RUN THIS`, in numeric order. (`001`–`003` are probably already applied.)

**2. Backend**

```bash
cd backend
npm install
cp .env.example .env.local     # fill in the values; SUPABASE_SERVICE_ROLE_KEY is required for payments/refunds
npm run dev                    # http://localhost:3000
```

**3. Front end** — serve the repo root over HTTP (VS Code *Live Server* on port 5500 works out of the box):

```bash
npx serve -l 5500 .
```

If you serve it from another origin, add it to `FRONTEND_ORIGINS` in `backend/.env.local` (CORS).
Supabase URL / anon key / backend URL for the front end live in `assets/js/config.js`.

## First admin

Roles are `buyer`, `seller`, `admin`, `superadmin`. Users cannot change their own role. After signing up normally, promote the account in the SQL editor:

```sql
update profiles set role = 'superadmin' where email = 'you@example.com';
```

## How the front end reads data

```
config.js  → Supabase client (sb)
session.js → cached profile (getSession) + sign-out / guards
data.js    → HS.*  the only place that talks to the database; returns the shapes the pages already use
```

Pages call `HS.listings…`, `HS.favorites…`, `HS.admin…` instead of reading `FAKE_*` arrays.
`assets/js/fake-data.js` is being retired: a page still loads it only if its script still uses sample data.

**Still on sample data:** messages, viewing requests (seller side), reviews, payments/transactions, notifications,
reports, analytics, profile & settings pages, MOA, and the super-admin pages. The tables for them already exist
(`messages`, `viewing_requests`, `reviews`, `listing_reports`, `notifications`, `audit_logs`, `payments`).
