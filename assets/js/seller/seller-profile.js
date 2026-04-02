
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = getSession();
  if (!session || session.role !== 'seller') window.location.href = '../../auth/signin.html';

  // ── Init shared components ──────────────────────────────────────────────────
  HomeSureSidebar.init({ activePage: 'profile' });
  HomeSureTopbar.init({ placeholder: 'Search...' });

  // ── Resolve current seller from FAKE_USERS ──────────────────────────────────
  const seller = FAKE_USERS.find(u => u.id === session.id) || null;
  if (!seller) window.location.href = '../../auth/signin.html';

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const iconBed  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
  const iconBath = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
  const iconArea = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>`;
  const iconPin  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const iconHome = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

  function formatJoinDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  // ── Approved listings for this seller ───────────────────────────────────────
  const approvedListings = FAKE_LISTINGS.filter(
    l => l.sellerId === seller.id && l.status === 'approved'
  );

  // ── Render profile card ──────────────────────────────────────────────────────
  const initials = (seller.firstName[0] || '') + (seller.lastName[0] || '');
  document.getElementById('profileAvatar').textContent = initials.toUpperCase();

  document.getElementById('profileName').textContent =
    seller.firstName + ' ' + seller.lastName;

  const activeCount = approvedListings.length;
  const metaItems = [
    `<span class="profile-meta-item">${activeCount} Active Listing${activeCount !== 1 ? 's' : ''}</span>`,
    `<span class="meta-dot"></span>`,
    `<span class="profile-meta-item">Member since ${formatJoinDate(seller.joinedAt)}</span>`,
  ];
  document.getElementById('profileMeta').innerHTML = metaItems.join('');

  // Status badge
  const status = seller.accountStatus || 'unverified';
  let badgeHTML = '';
  if (status === 'verified') {
    badgeHTML = `
      <div class="status-badge status-verified">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Verified
      </div>`;
  } else if (status === 'pending') {
    badgeHTML = `
      <div class="status-badge status-pending">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        Pending
      </div>`;
  } else {
    badgeHTML = `<div class="status-badge status-unverified">Unverified</div>`;
  }
  document.getElementById('statusBadge').innerHTML = badgeHTML;

  // ── Listings section header ──────────────────────────────────────────────────
  const firstName = seller.firstName;
  document.getElementById('sectionTitle').textContent = `${firstName}'s Listings`;
  document.getElementById('sectionSub').textContent =
    activeCount === 0
      ? 'No properties found'
      : `${activeCount} propert${activeCount !== 1 ? 'ies' : 'y'} found`;

  // ── Render listings ──────────────────────────────────────────────────────────
  const container = document.getElementById('listingsContainer');

  if (approvedListings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${iconHome}</div>
        <div class="empty-title">${seller.firstName} ${seller.lastName} has no active listings yet.</div>
        <div class="empty-sub">Approved listings will appear here once published.</div>
      </div>`;
  } else {
    const grid = document.createElement('div');
    grid.className = 'listings-grid';

    grid.innerHTML = approvedListings.map((l, i) => {
      const isRent = l.listingFor === 'rent';
      const typeBadge = isRent
        ? `<span class="badge-tl badge-rent">For Rent</span>`
        : `<span class="badge-tl badge-sale">For Sale</span>`;
      const photoBadge = `<span class="badge-tr">${l.images.length} Photo${l.images.length !== 1 ? 's' : ''}</span>`;
      const verifiedBadge = l.verified
        ? `<span class="verified-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>`
        : '';
      const bedsLabel = l.bedrooms === 0 ? 'Studio' : l.bedrooms;
      const price     = '&#8369;' + l.price.toLocaleString('en-PH');
      const priceSub  = isRent ? '<span class="prop-price-per"> / month</span>' : '';

      return `
        <div class="prop-card"
             onclick="window.location.href='listing.html?id=${l.id}'">
          <div class="prop-img-wrap">
            <img src="${l.images[0]}" alt="${l.title}" loading="lazy" />
            ${typeBadge}
            ${photoBadge}
          </div>
          <div class="prop-body">
            <div class="prop-title">${l.title}${verifiedBadge}</div>
            <div class="prop-address">${iconPin} ${l.address}</div>
            <div class="prop-amenities">
              <span class="amenity">${iconBed} ${bedsLabel}</span>
              <span class="amenity">${iconBath} ${l.bathrooms}</span>
              <span class="amenity">${iconArea} ${l.floorArea} sqm</span>
            </div>
            <div class="prop-footer">
              <div class="prop-price">${price}${priceSub}</div>
              ${l.negotiable ? `<span class="badge-negotiable">Negotiable</span>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    container.appendChild(grid);
  }
