// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Data layer
//  Depends on: config.js (sb), session.js
//
//  The only place the front end talks to the database (Supabase) — pages call HS.*
//  instead of reading the old fake-data arrays. Database rows are snake_case; the pages use
//  camelCase, so everything returned here is already in the shape the pages expect.
//  What a user may read/change is enforced by Row Level Security (backend/supabase).
//  Functions throw an Error with a readable message; callers catch and show a toast.
// ─────────────────────────────────────────────────────────────────────────────
const HS = (function () {
  'use strict';

  const ASSET_BASE = document.currentScript ? new URL('.', document.currentScript.src).href : '';

  const PLACEHOLDER_IMG =
    'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
      '<rect width="800" height="600" fill="#e2e8f0"/>' +
      '<path d="M400 190l150 120v150H250V310z" fill="#cbd5e1"/>' +
      '<text x="400" y="520" font-family="sans-serif" font-size="28" text-anchor="middle" fill="#64748b">No photo</text></svg>'
    );

  // ── Small helpers ───────────────────────────────────────────────────────────
  const num = (v) => (v === null || v === undefined ? null : Number(v));
  const day = (v) => (v ? String(v).slice(0, 10) : null);

  function unwrap({ data, error }) {
    if (error) throw new Error(error.message || 'Request failed');
    return data;
  }

  async function userId() {
    const { data } = await sb.auth.getSession();
    return data.session ? data.session.user.id : null;
  }

  async function needUserId() {
    const id = await userId();
    if (!id) throw new Error('Your session has expired. Please sign in again.');
    return id;
  }

  // ── Row ⇄ page-shape mapping ────────────────────────────────────────────────
  function mapProfile(r) {
    if (!r) return null;
    const parts = (r.full_name || '').trim().split(/\s+/);
    const firstName = r.first_name || parts[0] || '';
    const lastName = r.last_name || parts.slice(1).join(' ');
    return {
      id: r.id,
      role: r.role,
      firstName, lastName,
      name: (firstName + ' ' + lastName).trim(),
      email: r.email || null,                 // null for other users (public_profiles has no contact info)
      phone: r.phone || null,
      avatar: r.avatar_url || null,
      accountStatus: r.account_status || 'unverified',
      verified: r.account_status === 'verified',
      isVerified: r.account_status === 'verified',
      verifiedAt: day(r.verified_at),
      verificationExpiry: day(r.verification_expiry),
      phoneVerified: !!r.phone_verified,
      submittedVerificationAt: day(r.submitted_verification_at),
      moaSignedAt: day(r.moa_signed_at),
      verificationDocs: r.verification_docs || [],             // [{ label, path }] — private files
      newVerificationDocs: r.new_verification_docs || [],      // a renewal submitted while still verified
      newSubmittedAt: day(r.new_submitted_verification_at),
      verificationRejectReason: r.verification_reject_reason || null,
      warningCount: r.warning_count || 0,
      suspendedAt: r.suspended_at || null,
      joinedAt: day(r.created_at),
    };
  }

  function mapProperty(r) {
    if (!r) return null;
    return {
      id: r.id,
      sellerId: r.landowner_id,
      type: r.property_type,
      listingFor: r.listing_type,
      title: r.title,
      description: r.description || '',
      price: num(r.price),
      // barangay is a lookup table; queries join it in as `barangays(name)`
      barangayId: r.barangay_id,
      barangay: (r.barangays && r.barangays.name) || '',
      address: r.address || '',
      city: r.city || '', province: r.province || '',
      lat: num(r.latitude), lng: num(r.longitude),
      bedrooms: r.bedrooms, bathrooms: r.bathrooms,
      floorArea: num(r.floor_area_sqm), lotArea: num(r.lot_area_sqm),
      status: r.status,
      verified: r.verification_state === 'verified',      // title checked by an admin (LRA)
      titleState: r.verification_state,
      negotiable: !!r.price_negotiable,
      featured: !!r.featured,
      lifecycleStatus: r.lifecycle_status || undefined,
      hasMultipleUnits: !!r.has_multiple_units,
      totalUnits: r.total_units, availableUnits: r.available_units,
      images: Array.isArray(r.images) ? r.images : [],
      thumbnail: r.thumbnail_url || null,
      documents: Array.isArray(r.documents) ? r.documents : [],   // [{ label, path }] — private, see storage.signedUrl()
      amenities: Array.isArray(r.amenities) ? r.amenities : [],
      postedAt: r.created_at,
      rejectionReason: r.rejection_reason || undefined,
      rejectionNotes: r.rejection_notes || undefined,
    };
  }

  const PROPERTY_FIELDS = {
    type: 'property_type', listingFor: 'listing_type', title: 'title', description: 'description', price: 'price',
    barangayId: 'barangay_id', address: 'address', city: 'city', province: 'province',
    lat: 'latitude', lng: 'longitude',
    bedrooms: 'bedrooms', bathrooms: 'bathrooms', floorArea: 'floor_area_sqm', lotArea: 'lot_area_sqm',
    negotiable: 'price_negotiable', amenities: 'amenities', images: 'images', documents: 'documents',
    thumbnail: 'thumbnail_url',
    hasMultipleUnits: 'has_multiple_units', totalUnits: 'total_units', availableUnits: 'available_units',
    status: 'status', lifecycleStatus: 'lifecycle_status',
  };

  // Pages pass a barangay NAME; the table stores a barangay_id.
  async function toPropertyRow(listing) {
    const row = {};
    Object.keys(PROPERTY_FIELDS).forEach((k) => { if (listing[k] !== undefined) row[PROPERTY_FIELDS[k]] = listing[k]; });
    if (listing.barangay !== undefined && listing.barangayId === undefined) {
      row.barangay_id = await barangayId(listing.barangay);
    }
    if (row.images && row.images.length && !listing.thumbnail) row.thumbnail_url = row.images[0];
    return row;
  }

  // Everything that reads a listing needs the barangay name joined in.
  const PROPERTY_SELECT = '*, barangays(name)';

  function cover(listing) {
    return (listing && listing.images && listing.images[0]) || PLACEHOLDER_IMG;
  }

  function mapViewing(r) {
    return {
      id: r.id, listingId: r.property_id, buyerId: r.buyer_id, sellerId: r.seller_id, status: r.status,
      requestedDate: r.requested_date, requestedTime: (r.requested_time || '').slice(0, 5),
      proposedDate: r.proposed_date || null, proposedTime: r.proposed_time ? r.proposed_time.slice(0, 5) : null,
      buyerNotes: r.buyer_notes || null, sellerNotes: r.seller_notes || null,
      createdAt: r.created_at, updatedAt: r.updated_at,
    };
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  const auth = {
    async signIn(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        if (/confirm/i.test(error.message)) throw new Error('Please confirm your email first — check your inbox.');
        throw new Error('Incorrect email or password');
      }
      const user = await auth.refresh();
      if (!user) { await hsSignOut(); throw new Error('Your profile could not be loaded. Please try again.'); }
      if (user.suspendedAt) {
        await hsSignOut();
        throw new Error('This account has been suspended. Please contact HomeSure support.');
      }
      return user;
    },

    // Re-read the profile (and saved listings) from the database and refresh the cached copy.
    async refresh() {
      const profile = await profiles.me();
      if (!profile) return null;
      profile.savedListings = await favorites.ids();
      saveSession(profile);
      return profile;
    },

    async changePassword(current, next) {
      const { data } = await sb.auth.getUser();
      if (!data || !data.user) throw new Error('Your session has expired. Please sign in again.');
      const check = await sb.auth.signInWithPassword({ email: data.user.email, password: current });
      if (check.error) throw new Error('Current password is incorrect.');
      const { error } = await sb.auth.updateUser({ password: next });
      if (error) throw new Error(error.message);
    },
  };

  // ── Profiles ────────────────────────────────────────────────────────────────
  const profiles = {
    async me() {
      const id = await userId();
      if (!id) return null;
      return mapProfile(unwrap(await sb.from('profiles').select('*').eq('id', id).maybeSingle()));
    },

    // Update the signed-in user's own profile. Accepts page-shape keys.
    async updateMe(patch) {
      const id = await needUserId();
      const row = {};
      if (patch.firstName !== undefined) row.first_name = patch.firstName;
      if (patch.lastName !== undefined) row.last_name = patch.lastName;
      if (patch.firstName !== undefined || patch.lastName !== undefined) {
        const cur = await profiles.me();
        const first = patch.firstName !== undefined ? patch.firstName : cur.firstName;
        const last = patch.lastName !== undefined ? patch.lastName : cur.lastName;
        row.full_name = (first + ' ' + last).trim();
      }
      if (patch.phone !== undefined) row.phone = patch.phone;
      if (patch.avatar !== undefined) row.avatar_url = patch.avatar;
      unwrap(await sb.from('profiles').update(row).eq('id', id));
      return auth.refresh();
    },

    // Public view of other users (name, avatar, verified badge — never email/phone).
    async byIds(ids) {
      const unique = [...new Set((ids || []).filter(Boolean))];
      if (!unique.length) return {};
      const rows = unwrap(await sb.from('public_profiles').select('*').in('id', unique));
      const out = {};
      (rows || []).forEach((r) => { out[r.id] = mapProfile(r); });
      return out;
    },

    async publicById(id) {
      return (await profiles.byIds([id]))[id] || null;
    },
  };

  // ── Listings ────────────────────────────────────────────────────────────────
  const listings = {
    // Marketplace: admin-approved and still available.
    async approved() {
      const rows = unwrap(await sb.from('properties').select(PROPERTY_SELECT).eq('status', 'approved').order('created_at', { ascending: false }));
      return (rows || []).map(mapProperty).filter((l) => l.lifecycleStatus !== 'sold' && l.lifecycleStatus !== 'rented');
    },

    // One listing, if the current user is allowed to see it (RLS).
    async get(id) {
      return mapProperty(unwrap(await sb.from('properties').select(PROPERTY_SELECT).eq('id', id).maybeSingle()));
    },

    // The signed-in seller's own listings, every status.
    async mine() {
      const id = await needUserId();
      const rows = unwrap(await sb.from('properties').select(PROPERTY_SELECT).eq('landowner_id', id).order('created_at', { ascending: false }));
      return (rows || []).map(mapProperty);
    },

    // Admins: every listing, every status.
    async all() {
      const rows = unwrap(await sb.from('properties').select(PROPERTY_SELECT).order('created_at', { ascending: false }));
      return (rows || []).map(mapProperty);
    },

    // All listings of one seller that the current user may see (admins: every status; others: approved only).
    async bySeller(sellerId) {
      const rows = unwrap(await sb.from('properties').select(PROPERTY_SELECT).eq('landowner_id', sellerId).order('created_at', { ascending: false }));
      return (rows || []).map(mapProperty);
    },

    // Attach the (public) seller profile to each listing as `l.seller`.
    async withSellers(list) {
      const people = await profiles.byIds(list.map((l) => l.sellerId));
      list.forEach((l) => { l.seller = people[l.sellerId] || null; });
      return list;
    },

    // New listings always start as a draft; call submit() once photos/documents are uploaded.
    async create(listing) {
      const id = await needUserId();
      const row = await toPropertyRow(listing);
      row.landowner_id = id;
      row.status = 'draft';
      return mapProperty(unwrap(await sb.from('properties').insert(row).select(PROPERTY_SELECT).single()));
    },

    async update(id, patch) {
      const row = await toPropertyRow(patch);
      return mapProperty(unwrap(await sb.from('properties').update(row).eq('id', id).select(PROPERTY_SELECT).single()));
    },

    submit(id) { return listings.update(id, { status: 'pending' }); },

    // Seller closes a listing (optionally because it was sold / rented).
    close(id, lifecycleStatus) {
      const patch = { status: 'closed' };
      if (lifecycleStatus) patch.lifecycleStatus = lifecycleStatus;
      return listings.update(id, patch);
    },

    reopen(id) { return listings.update(id, { status: 'pending', lifecycleStatus: null }); },

    async remove(id) {
      unwrap(await sb.from('properties').delete().eq('id', id));
    },

    // ── Admin moderation ──
    async approve(id) {
      const adminId = await needUserId();
      const row = unwrap(await sb.from('properties').update({
        status: 'approved', approved_by: adminId, approved_at: new Date().toISOString(),
        rejection_reason: null, rejection_notes: null,
      }).eq('id', id).select(PROPERTY_SELECT).single());
      return mapProperty(row);
    },

    async reject(id, reason, notes) {
      return mapProperty(unwrap(await sb.from('properties').update({
        status: 'rejected', rejection_reason: reason || null, rejection_notes: notes || null,
      }).eq('id', id).select(PROPERTY_SELECT).single()));
    },
  };

  // ── Saved listings (favorites) ──────────────────────────────────────────────
  function cacheSaved(ids) {
    const s = getSession();
    if (s) { s.savedListings = ids; sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  }

  const favorites = {
    async ids() {
      const id = await userId();
      if (!id) return [];
      const rows = unwrap(await sb.from('saved_properties').select('property_id').eq('user_id', id));
      return (rows || []).map((r) => r.property_id);
    },

    // [{ listing, savedAt }] newest first
    async list() {
      const id = await needUserId();
      const rows = unwrap(await sb.from('saved_properties').select('created_at, properties(*, barangays(name))').eq('user_id', id).order('created_at', { ascending: false }));
      return (rows || []).filter((r) => r.properties).map((r) => ({ listing: mapProperty(r.properties), savedAt: r.created_at }));
    },

    // Returns true when the listing is saved afterwards.
    async toggle(propertyId) {
      const id = await needUserId();
      const current = await favorites.ids();
      let next;
      if (current.includes(propertyId)) {
        unwrap(await sb.from('saved_properties').delete().eq('user_id', id).eq('property_id', propertyId));
        next = current.filter((p) => p !== propertyId);
      } else {
        unwrap(await sb.from('saved_properties').insert({ user_id: id, property_id: propertyId }));
        next = current.concat(propertyId);
      }
      cacheSaved(next);
      return next.includes(propertyId);
    },
  };

  // ── Files (Supabase Storage) ────────────────────────────────────────────────
  // listing-images : public bucket  — listing photos
  // verification-docs : private bucket — IDs, titles, deeds (only the owner and admins can read)
  // Files live under "<user id>/…" so storage policies can check ownership from the path.
  const storage = {
    async toBlob(source) {
      if (source instanceof Blob) return source;
      return (await fetch(source)).blob();      // data: / blob: URLs from the camera or file input
    },

    async upload(bucket, source, name) {
      const id = await needUserId();
      const blob = await storage.toBlob(source);
      const ext = (blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg').split('+')[0];
      const safe = (name || 'file').replace(/[^a-z0-9_-]+/gi, '-').slice(0, 40);
      const path = `${id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}.${ext}`;
      const { error } = await sb.storage.from(bucket).upload(path, blob, { contentType: blob.type, upsert: false });
      if (error) throw new Error('Upload failed: ' + error.message);
      return path;
    },

    // Public URLs for listing photos.
    async uploadListingImages(sources) {
      const urls = [];
      for (const src of sources) {
        const path = await storage.upload('listing-images', src, 'photo');
        urls.push(sb.storage.from('listing-images').getPublicUrl(path).data.publicUrl);
      }
      return urls;
    },

    // Private files: returns storage paths (resolve to links with signedUrl()).
    async uploadPrivate(sources, name) {
      const paths = [];
      for (const src of sources) paths.push(await storage.upload('verification-docs', src, name));
      return paths;
    },

    async signedUrl(path, seconds) {
      const { data, error } = await sb.storage.from('verification-docs').createSignedUrl(path, seconds || 3600);
      if (error) throw new Error(error.message);
      return data.signedUrl;
    },

    // [{ label, path }] → [{ label, url }] (url is a short-lived signed link). Unreadable files are skipped.
    async resolveDocs(docs) {
      const out = [];
      for (const d of docs || []) {
        if (d.url) { out.push(d); continue; }
        try { out.push({ label: d.label, url: await storage.signedUrl(d.path) }); } catch (e) { /* not allowed / missing */ }
      }
      return out;
    },
  };

  // ── Account verification (buyers & sellers) ────────────────────────────────
  const verification = {
    // docs: [{ label, sources: [File | dataURL, …] }]. Files go to the private bucket; the account moves
    // to "pending" (first time) or "reverification" (renewing; the approved documents are kept for comparison).
    async submit(docs) {
      const id = await needUserId();
      const me = await profiles.me();
      const stored = [];
      for (const d of docs) {
        const paths = await storage.uploadPrivate(d.sources, d.label);
        paths.forEach((p, i) => stored.push({ label: paths.length > 1 ? `${d.label} (page ${i + 1})` : d.label, path: p }));
      }
      const now = new Date().toISOString();
      const patch = me && me.accountStatus === 'verified'
        ? { new_verification_docs: stored, new_submitted_verification_at: now, account_status: 'reverification' }
        : { verification_docs: stored, submitted_verification_at: now, account_status: 'pending' };
      unwrap(await sb.from('profiles').update(patch).eq('id', id));
      return auth.refresh();
    },
  };

  // ── Viewing requests ───────────────────────────────────────────────────────
  const viewing = {
    // Buyer asks to view a listing. Also drops a "viewing-request" card into the chat with the seller.
    async request({ propertyId, sellerId, listingTitle, date, time, notes }) {
      const me = await needUserId();
      const row = unwrap(await sb.from('viewing_requests').insert({
        property_id: propertyId, buyer_id: me, seller_id: sellerId,   // seller_id is re-set to the listing owner by the database
        requested_date: date, requested_time: time, buyer_notes: notes || null,
      }).select('*').single());

      unwrap(await sb.from('messages').insert({
        sender_id: me, receiver_id: row.seller_id, type: 'viewing-request', property_id: propertyId,
        viewing_request_id: row.id, status: 'pending',
        viewing_data: { listingId: propertyId, listingTitle, requestedDate: date, requestedTime: time, buyerNotes: notes || null },
      }));
      return mapViewing(row);
    },
  };

  // ── Listing reports ─────────────────────────────────────────────────────────
  const reports = {
    async file(propertyId, category, reason) {
      const me = await needUserId();
      unwrap(await sb.from('listing_reports').insert({
        property_id: propertyId, reported_by: me, category, reason: reason || category,
      }));
    },
  };

  // ── Admin: users ────────────────────────────────────────────────────────────
  const admin = {
    async users() {
      const rows = unwrap(await sb.from('profiles').select('*').order('created_at', { ascending: false }));
      return (rows || []).map(mapProfile);
    },

    async user(id) {
      return mapProfile(unwrap(await sb.from('profiles').select('*').eq('id', id).maybeSingle()));
    },

    // Listings that have a confirmed payment (admins see every payment).
    async paidPropertyIds() {
      const rows = unwrap(await sb.from('payments').select('property_id').eq('status', 'paid'));   // payments.user_id is the payer
      return new Set((rows || []).map((r) => r.property_id));
    },

    // Approve a user's verification. Sellers are verified for 12 months, buyers for 6.
    // A renewal's new documents replace the old ones.
    async approveVerification(userId_) {
      const u = await admin.user(userId_);
      if (!u) throw new Error('User not found');
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + (u.role === 'seller' ? 12 : 6));
      const patch = {
        account_status: 'verified',
        verified_at: new Date().toISOString(),
        verification_expiry: expiry.toISOString().slice(0, 10),
        verification_reject_reason: null,
      };
      if (u.newVerificationDocs && u.newVerificationDocs.length) {
        patch.verification_docs = u.newVerificationDocs;
        patch.new_verification_docs = [];
        patch.new_submitted_verification_at = null;
      }
      unwrap(await sb.from('profiles').update(patch).eq('id', userId_));
    },

    async rejectVerification(userId_, reason) {
      unwrap(await sb.from('profiles').update({
        account_status: 'unverified',
        verified_at: null,
        verification_expiry: null,
        verification_reject_reason: reason || null,
        new_verification_docs: [],
        new_submitted_verification_at: null,
      }).eq('id', userId_));
    },

    async savedCount(userId_) {
      const { count, error } = await sb.from('saved_properties').select('property_id', { count: 'exact', head: true }).eq('user_id', userId_);
      if (error) throw new Error(error.message);
      return count || 0;
    },

    async openReportsCount() {
      const { count, error } = await sb.from('listing_reports').select('id', { count: 'exact', head: true }).eq('status', 'pending');
      if (error) throw new Error(error.message);
      return count || 0;
    },
  };

  // ── Audit trail (admin actions) ────────────────────────────────────────────
  const audit = {
    // Best effort: never blocks the action it describes.
    async log(action, type, details, status) {
      try {
        const me = getSession();
        if (!me) return;
        await sb.from('audit_logs').insert({
          actor_id: me.id,
          actor_name: ((me.firstName || '') + ' ' + (me.lastName || '')).trim(),
          actor_role: me.role,
          action, type: type || 'system', details: details || null, status: status || 'success',
        });
      } catch (e) { /* ignore */ }
    },
  };

  // ── Static reference data ──────────────────────────────────────────────────
  // The barangays table is the source of truth (properties.barangay_id points at it).
  let barangayCache = null;
  async function barangayRows() {
    if (!barangayCache) {
      const rows = unwrap(await sb.from('barangays').select('id, name').order('name'));
      barangayCache = rows || [];
    }
    return barangayCache;
  }

  async function barangays() {
    return (await barangayRows()).map((b) => b.name);
  }

  async function barangayId(name) {
    if (!name) return null;
    const hit = (await barangayRows()).find((b) => b.name.toLowerCase() === String(name).toLowerCase());
    return hit ? hit.id : null;
  }

  return {
    PLACEHOLDER_IMG, cover, mapProfile, mapProperty, userId,
    auth, profiles, listings, favorites, storage, verification, viewing, reports, admin, audit, barangays, barangayId,
  };
})();
