
  const user = getSession();
  if (!user || user.role !== 'buyer') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'dashboard' });
  HomeSureTopbar.init({ placeholder: 'Search properties...' });

  // ── Icons ──────────────────────────────────────────────────────────────────
  const iconCheck = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const iconPin   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const iconBed   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
  const iconBath  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
  const iconArea  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>`;

  // ── Load seller ────────────────────────────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const seller = FAKE_USERS.find(u => u.id === params.get('id') && u.role === 'seller');
  const wrap   = document.getElementById('profileContent');

  if (!seller) {
    wrap.innerHTML = `<p style="color:var(--muted);text-align:center;padding:60px 0">Seller not found.</p>`;
  } else {
    const initials      = seller.firstName[0] + seller.lastName[0];
    const sellerListings = FAKE_LISTINGS.filter(l => l.sellerId === seller.id && l.status === 'approved');
    const joined        = new Date(seller.joinedAt);
    const memberSince   = joined.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const count         = sellerListings.length;

    const cardsHtml = !count
      ? `<div class="empty-state">No active listings from this seller.</div>`
      : sellerListings.map((l, i) => {
          const isRent    = l.listingFor === 'rent';
          const price     = '₱' + l.price.toLocaleString('en-PH');
          const bedsLabel = l.bedrooms === 0 ? 'Studio' : l.bedrooms;
          return `
            <div class="prop-card" style="animation-delay:${0.1 + i * 0.05}s"
                 onclick="window.location.href='listing.html?id=${l.id}'">
              <div class="prop-img-wrap">
                <img src="${l.images[0]}" alt="${l.title}" loading="lazy" />
                <span class="badge-tl ${isRent ? 'badge-rent' : 'badge-sale'}">${isRent ? 'For Rent' : 'For Sale'}</span>
                <span class="badge-tr">${l.images.length} Photo${l.images.length !== 1 ? 's' : ''}</span>
              </div>
              <div class="prop-body">
                <div class="prop-title">
                  ${l.title}
                  <span class="verified-check">${iconCheck}</span>
                </div>
                <div class="prop-address">${iconPin} ${l.address}</div>
                <div class="prop-amenities">
                  <span class="amenity">${iconBed} ${bedsLabel}</span>
                  <span class="amenity">${iconBath} ${l.bathrooms}</span>
                  <span class="amenity">${iconArea} ${l.floorArea} sqm</span>
                </div>
                <div class="prop-footer">
                  <div class="prop-price">${price}${isRent ? `<span class="prop-price-per"> /month</span>` : ''}</div>
                  ${l.negotiable ? `<span class="badge-negotiable">Negotiable</span>` : ''}
                </div>
              </div>
            </div>`;
        }).join('');

    wrap.innerHTML = `
      <div class="profile-card">
        <div class="profile-avatar">${initials}</div>
        <div class="profile-info">
          <div class="profile-name-row">
            <span class="profile-name">${seller.firstName} ${seller.lastName}</span>
            <span class="profile-verified-badge">${iconCheck} Verified</span>
          </div>
          <div class="profile-seller-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Verified Seller
          </div>
          <div class="profile-stats">
            <strong>${count}</strong> Active Listing${count !== 1 ? 's' : ''}
            <span class="profile-stats-dot">•</span>
            Member since ${memberSince}
          </div>
        </div>
      </div>

      <div class="listings-section">
        <div class="listings-section-title">${seller.firstName} ${seller.lastName}'s Listings</div>
        <div class="listings-section-sub">${count} propert${count !== 1 ? 'ies' : 'y'} found</div>
        <div class="listings-grid">${cardsHtml}</div>
      </div>
    `;
  }
