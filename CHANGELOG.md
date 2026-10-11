# Changelog

What changed in HomeSure, newest first. The front end and the database are the two halves that
move most, so each entry says which one it touches and whether anything has to be run or re-sent
after pulling.

**If an entry has a "You need to" line, pulling the code is not enough on its own.**

---

## 2026-10-11

### One user interface, not two

**Backend**

The repo carried two front ends for overlapping work: the pages in `public/module/` and a second
React dashboard under `src/app/dashboard/`. Removed the React one.

It was never reachable — nothing in the site linked to `/dashboard` — it had **no super-admin
role at all** against seven such pages in `public/`, and only the pages in `public/` were wired
to the live database.

Gone with it:

- `src/app/auth/login/` and `src/app/auth/signup/` — the front end has its own at `public/auth/`
- `src/app/page.tsx` — a listings page `/` never reached, since `next.config.mjs` redirects `/`
  to `/index.html`
- `src/app/notes/` — a "Notes CRUD" tutorial scaffold
- `src/components/` — five components only those pages used
- `src/lib/auth.ts` and `src/lib/supabase/service.ts` — no importers left

`middleware.ts` was guarding `/dashboard` and the React login pages with a cookie session. With
those gone its only job is CORS for `/api/*`; it dropped from 85.5 kB to 26.7 kB. The front end
keeps its session in localStorage and sends a Bearer token, which each route verifies itself.

`/api/auth/callback` now returns to `public/auth/signin.html` instead of the deleted React page.
Nothing uses OAuth yet, but the code exchange is kept so enabling it later is a provider setting
rather than new work.

**Nothing in `public/` changed, and all 12 API routes still answer.** Git keeps the removed files
if any turns out to be wanted again.

### Email confirmation now comes from HomeSure

**Front end · Backend · Database**

Signing up was impossible. The Supabase auth server requires a confirmed email before anyone may
sign in, but it has no SMTP configured, so its own confirmation mail failed and every attempt died
with *"Error sending confirmation email"*. That is a setting on a server we do not control.

HomeSure sends the mail itself now:

- `POST /api/auth/signup` creates the account **unconfirmed** through the admin API — which sends
  nothing, so it cannot fail that way — stores a hashed token, and emails the link.
- `GET /api/auth/verify-email` confirms the account when that link is opened.
- `POST /api/auth/resend-verification` sends it again, with a 60-second cooldown.

The gate is still the auth server's own: an unconfirmed account is refused at sign-in by Supabase
with *"Email not confirmed"*, not by anything in our code, so it cannot be bypassed by talking to
the database directly.

`public/assets/js/auth.js` no longer calls `sb.auth.signUp()` — it posts to `/api/auth/signup`.

**You need to:**
1. Run `supabase/migrations/008_email_verification.sql` in the SQL Editor.
2. Put SMTP settings in `.env.local` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`,
   `SMTP_FROM`). Brevo is free and needs no domain. `.env.example` explains each one.
3. Restart the dev server — `.env.local` is only read at startup.

`npm run check-email` tests the settings on their own and names the one that is wrong, instead of
leaving you to guess from a failed sign-up.

### Fixed a crash that took whole pages down

**Front end**

`components/topbar.js` read `user.firstName[0] + user.lastName[0]`. That throws for any account
whose name is empty — which is every account created straight in Supabase rather than through the
sign-up form. The throw killed `HomeSureTopbar.init()`, and with it **every line of the page script
after it**, so the page was left showing its leftover placeholder markup with no data loaded.

Eight call sites now go through `hsInitials()` in `session.js`, which falls back to the email and
then to `?`. `hsDisplayName()` does the same for names.

If a page ever looks like it "did not load", check the browser console first — one throw early in a
page script stops everything after it.

### Added the logout button

**Front end**

`sidebar.js` had styles for `.hs-logout-btn` but no button to apply them to, so the bottom of every
sidebar was a divider with empty space under it. Added it, wired to `hsSignOut()` so the Supabase
session is cleared too, not just the cached profile.

### Removed the simulated payment flows

**Front end**

Both messages pages carried a fake payment system — a payment sheet, a fake bank gateway screen,
and a `setTimeout` that announced *"Card payment successful"* and *"₱15,000 has been released to
your account"* with no money involved. Both were already unreachable. −968 lines.

Real payments go through `PaymentIntegration` → `/api/payments/*` → Xendit. Payment requests inside
chat are not wired yet and say so plainly rather than pretending.

### Frosted the public navigation

**Front end**

The top bar on the five public pages is frosted glass in both themes, and goes dark while it sits
over the dark hero so the page reads as one piece. New: `assets/css/glass-nav.css`,
`assets/js/glass-nav.js`.

Two things had to be fixed first: `policy.css` never painted `<body>`, so the canvas behind the bar
stayed the browser's default white and the bar looked like a grey slab at the top of the page; and
an `[data-theme="light"] nav` rule in `about.css` outranked the shared rule and kept the bar opaque
in light mode.

### Removed the testimonials section

**Front end**

Three invented reviews on the landing page. To be replaced when there are real users.

---

## 2026-10-11 (earlier)

### Payments, security deposits and the last of the sample data

**Front end · Backend · Database**

The last four pages came off sample data, and `assets/js/fake-data.js` was deleted along with the
three superseded dashboard scripts that used it. There is no sample data left anywhere in
`public/`.

- `007_payments_and_deposits.sql`: payment periods, methods, references and proofs; the
  `security_deposits` table with itemised damage deductions; `profiles.payment_methods`; a private
  `payment-proofs` bucket.
- `/api/payments/create-invoice` now takes a purpose and a period, and **computes the amount from
  the listing price on the server**. A client that could name its own price could pay ₱1 for a
  ₱15,000 month.
- New: `/api/payments/manual-proof` (GCash, bank, cash, with proof) and `/api/payments/confirm`
  (the seller accepts or rejects, and only the listing's landowner may).

Two payment-methods forms were saving the seller's GCash number into the browser session, so it
vanished on sign-out and no buyer ever saw it. They write to the profile now.

**You need to:** run `007_payments_and_deposits.sql`.

---

## How to add to this file

One entry per change that another person would have to know about. Say which half it touches, what
actually changed, and — the part that matters — whether anything has to be **run** after pulling: a
migration, a new setting in `.env.local`, a server restart.

Formatting and copy edits do not need an entry. Anything that changes behaviour does.
