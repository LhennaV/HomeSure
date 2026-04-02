
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = getSession();
  if (!session || session.role !== 'seller') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'listings' });
  HomeSureTopbar.init({ placeholder: 'Search your listings...' });

  // ── Resolve user & listings ─────────────────────────────────────────────────
  const fullUser   = FAKE_USERS.find(u => u.id === session.id) || {};
  const isVerified = fullUser.accountStatus === 'verified';

  // Mutable copy so deletes don't touch the original array
  let myListings = FAKE_LISTINGS.filter(l => l.sellerId === session.id);

  // ── Add button & warning banner ─────────────────────────────────────────────
  if (!isVerified) {
    document.getElementById('addListingBtn').classList.add('disabled');
    document.getElementById('addListingBtn').setAttribute('title', 'Complete verification to post listings');
    document.getElementById('warnBanner').style.display = 'flex';
  }

  // ── Buckets ─────────────────────────────────────────────────────────────────
  const getActive = () => myListings.filter(l => l.status === 'approved');
  const getDraft  = () => myListings.filter(l => l.status === 'pending' || l.status === 'rejected');
  const getClosed = () => myListings.filter(l => l.status === 'closed');

  // ── Formatting helpers ──────────────────────────────────────────────────────
  function formatPrice(listing) {
    const v = listing.price;
    if (listing.listingFor === 'rent') return '\u20b1' + v.toLocaleString() + '/mo';
    if (v >= 1000000) return '\u20b1' + (v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 1) + 'M';
    if (v >= 1000)    return '\u20b1' + Math.round(v / 1000) + 'K';
    return '\u20b1' + v.toLocaleString();
  }

  function formatDate(str) {
    if (!str) return '';
    return new Date(str).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // ── Build card HTML ─────────────────────────────────────────────────────────
  function buildCard(listing) {
    const thumb = (listing.images && listing.images[0])
      ? listing.images[0]
      : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400';

    const pillCls   = listing.listingFor === 'rent' ? 'pill-rent' : 'pill-sale';
    const pillLabel = listing.listingFor === 'rent' ? 'For Rent' : 'For Sale';

    const statusCls   = { approved: 'approved', pending: 'pending', rejected: 'rejected' }[listing.status] || 'pending';
    const statusLabel = { approved: 'Approved',  pending: 'Pending',  rejected: 'Rejected'  }[listing.status] || listing.status;

    return `
      <div class="listing-card" id="card-${listing.id}">
        <div class="listing-row">
          <img class="listing-thumb" src="${thumb}" alt="${listing.title}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'" />
          <div class="listing-info">
            <div class="listing-title-row">
              <span class="listing-title">${listing.title}</span>
              <span class="pill ${pillCls}">${pillLabel}</span>
            </div>
            <div class="listing-address">${listing.address}</div>
            <div class="listing-price">${formatPrice(listing)}</div>
            <div class="listing-posted">Posted ${formatDate(listing.postedAt)}</div>
          </div>
          <div class="listing-actions">
            <span class="status-badge ${statusCls}">
              <span class="status-dot"></span>${statusLabel}
            </span>
            <div class="action-btns">
              <button class="btn-edit" onclick="handleEdit('${listing.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
              <button class="btn-close" onclick="promptClose('${listing.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="M6 6l12 12"/>
                </svg>
                Close Listing
              </button>
            </div>
          </div>
        </div>
        <div class="close-confirm" id="confirm-${listing.id}" style="display:none">
          <span class="close-confirm-text">Move this listing to Closed?</span>
          <button class="btn-confirm-close" onclick="confirmClose('${listing.id}')">Confirm</button>
          <button class="btn-cancel-close"  onclick="cancelClose('${listing.id}')">Cancel</button>
        </div>
      </div>`;
  }

  // ── Empty state HTML ────────────────────────────────────────────────────────
  function buildEmpty(tab) {
    if (tab === 'active') {
      const cta = isVerified
        ? `<button class="btn-empty-add" onclick="handleAddListing()">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
             </svg>
             Add your first listing
           </button>`
        : `<span style="font-size:13px;color:var(--muted)">Verify your account to start posting</span>`;
      return `<div class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
            <polyline points="9 21 9 12 15 12 15 21"/>
          </svg>
        </div>
        <div class="empty-title">No active listings</div>
        <div class="empty-sub">Your approved listings will appear here once published.</div>
        ${cta}
      </div>`;
    }
    if (tab === 'draft') {
      return `<div class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="empty-title">No draft listings</div>
        <div class="empty-sub">Listings pending review or needing revisions will appear here.</div>
      </div>`;
    }
    return `<div class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <div class="empty-title">No closed listings</div>
      <div class="empty-sub">Listings you've manually closed will appear here.</div>
    </div>`;
  }

  // ── Render a panel ──────────────────────────────────────────────────────────
  function renderPanel(tab, listings, containerId) {
    const el = document.getElementById(containerId);
    if (listings.length === 0) {
      el.innerHTML = buildEmpty(tab);
    } else {
      el.innerHTML = `<div class="listing-list">${listings.map(buildCard).join('')}</div>`;
    }
  }

  // ── Update counts in tabs ───────────────────────────────────────────────────
  function updateCounts() {
    document.getElementById('countActive').textContent = getActive().length;
    document.getElementById('countDraft').textContent  = getDraft().length;
    document.getElementById('countClosed').textContent = getClosed().length;
  }

  // ── Initial full render ─────────────────────────────────────────────────────
  function renderAll() {
    updateCounts();
    renderPanel('active', getActive(), 'listActive');
    renderPanel('draft',  getDraft(),  'listDraft');
    renderPanel('closed', getClosed(), 'listClosed');
  }
  renderAll();

  // ── Tab switching ───────────────────────────────────────────────────────────
  let currentTab = 'active';
  function switchTab(tab) {
    if (tab === currentTab) return;
    currentTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('listActive').style.display = tab === 'active' ? '' : 'none';
    document.getElementById('listDraft').style.display  = tab === 'draft'  ? '' : 'none';
    document.getElementById('listClosed').style.display = tab === 'closed' ? '' : 'none';
  }

  // ── Add listing ─────────────────────────────────────────────────────────────
  function handleAddListing() {
    if (!isVerified) return;
    window.location.href = 'post.html';
  }

  // ── Edit modal ───────────────────────────────────────────────────────────────
  let editingId = null;

  function handleEdit(id) {
    editingId = id;
    const listing = myListings.find(l => l.id === id);
    if (!listing) return;
    document.getElementById('editTitle').value   = listing.title;
    document.getElementById('editPrice').value   = listing.price;
    document.getElementById('editAddress').value = listing.address;
    document.getElementById('editType').value    = listing.listingFor;
    document.getElementById('editDeleteName').textContent = listing.title;
    document.getElementById('editModal').classList.add('open');
  }

  function closeEditModal() {
    document.getElementById('editModal').classList.remove('open');
    editingId = null;
  }

  function saveEdit() {
    if (!editingId) return;
    const listing = myListings.find(l => l.id === editingId);
    if (!listing) return;
    listing.title      = document.getElementById('editTitle').value.trim() || listing.title;
    listing.price      = parseFloat(document.getElementById('editPrice').value) || listing.price;
    listing.address    = document.getElementById('editAddress').value.trim() || listing.address;
    listing.listingFor = document.getElementById('editType').value;
    closeEditModal();
    renderAll();
  }

  function deleteFromEdit() {
    if (!editingId) return;
    closeEditModal();
    const card = document.getElementById('card-' + editingId);
    if (!card) return;
    card.classList.add('removing');
    card.addEventListener('animationend', () => {
      myListings = myListings.filter(l => l.id !== editingId);
      editingId = null;
      renderAll();
    }, { once: true });
  }

  // ── Close Listing: prompt ────────────────────────────────────────────────────
  function promptClose(id) {
    document.querySelectorAll('.close-confirm').forEach(el => {
      if (el.id !== 'confirm-' + id) el.style.display = 'none';
    });
    const row = document.getElementById('confirm-' + id);
    if (row) row.style.display = 'flex';
  }

  function cancelClose(id) {
    const row = document.getElementById('confirm-' + id);
    if (row) row.style.display = 'none';
  }

  // ── Close Listing: move to Closed tab ────────────────────────────────────────
  function confirmClose(id) {
    const listing = myListings.find(l => l.id === id);
    if (!listing) return;
    listing.status = 'closed';
    const card = document.getElementById('card-' + id);
    if (card) {
      card.classList.add('removing');
      card.addEventListener('animationend', () => {
        renderAll();
        switchTab('closed');
      }, { once: true });
    }
  }
