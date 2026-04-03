// HomeSure – Admin Listings Management

(function () {
  const user = getSession();
  if (!user || user.role !== 'admin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'listings' });
  HomeSureTopbar.init({ placeholder: 'Search listings...' });

  let activeStatus = 'all';

  // ── Filter tabs ─────────────────────────────────────────────────────────────
  document.getElementById('filterTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeStatus = tab.dataset.status;
    renderListings();
  });

  // ── Render table ────────────────────────────────────────────────────────────
  window.renderListings = function () {
    const q = document.getElementById('listingSearch').value.toLowerCase();
    const filtered = FAKE_LISTINGS.filter(l => {
      const matchStatus = activeStatus === 'all' || l.status === activeStatus;
      const matchQ = !q || l.title.toLowerCase().includes(q) || l.barangay.toLowerCase().includes(q);
      return matchStatus && matchQ;
    });

    const tbody = document.getElementById('listingsBody');
    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--muted)">No listings found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(l => {
      const seller = FAKE_USERS.find(u => u.id === l.sellerId);
      const sellerName = seller ? seller.firstName + ' ' + seller.lastName : 'Unknown';
      const price = l.listingFor === 'rent'
        ? '₱' + l.price.toLocaleString('en-PH') + '/mo'
        : '₱' + l.price.toLocaleString('en-PH');
      const actionBtns = l.status === 'pending'
        ? `<button class="btn-sm approve" onclick="setStatus('${l.id}','approved')">Approve</button>
           <button class="btn-sm reject"  onclick="setStatus('${l.id}','rejected')">Reject</button>`
        : l.status === 'approved'
        ? `<button class="btn-sm reject" onclick="setStatus('${l.id}','rejected')">Reject</button>`
        : `<button class="btn-sm approve" onclick="setStatus('${l.id}','approved')">Approve</button>`;

      return `
        <tr>
          <td>
            <div class="listing-col">
              <img class="thumb" src="${l.images[0]}" alt="${l.title}" />
              <div class="listing-col-info">
                <div class="l-title">${l.title}</div>
                <div class="l-loc">${l.barangay}</div>
              </div>
            </div>
          </td>
          <td>${sellerName}</td>
          <td style="text-transform:capitalize">${l.type}</td>
          <td>${price}</td>
          <td>${l.postedAt}</td>
          <td><span class="badge ${l.status}">${l.status.charAt(0).toUpperCase() + l.status.slice(1)}</span></td>
          <td>
            <div class="action-btns">
              ${actionBtns}
              <button class="btn-sm view" onclick="openModal('${l.id}')">View</button>
            </div>
          </td>
        </tr>`;
    }).join('');
  };

  // ── Set status ──────────────────────────────────────────────────────────────
  window.setStatus = function (id, status) {
    const l = FAKE_LISTINGS.find(x => x.id === id);
    if (l) { l.status = status; renderListings(); closeModal(); }
  };

  // ── Modal ───────────────────────────────────────────────────────────────────
  window.openModal = function (id) {
    const l = FAKE_LISTINGS.find(x => x.id === id);
    if (!l) return;
    const seller = FAKE_USERS.find(u => u.id === l.sellerId);
    const sellerName = seller ? seller.firstName + ' ' + seller.lastName : 'Unknown';
    const price = l.listingFor === 'rent'
      ? '₱' + l.price.toLocaleString('en-PH') + '/month'
      : '₱' + l.price.toLocaleString('en-PH');

    document.getElementById('listingModalContent').innerHTML = `
      <img class="modal-img" src="${l.images[0]}" alt="${l.title}" />
      <div class="modal-inner">
        <div class="modal-title">${l.title}</div>
        <div class="modal-meta">${l.barangay} · ${l.address}</div>
        <div class="modal-detail">
          <div class="modal-detail-item"><label>Seller</label><span>${sellerName}</span></div>
          <div class="modal-detail-item"><label>Price</label><span>${price}</span></div>
          <div class="modal-detail-item"><label>Type</label><span style="text-transform:capitalize">${l.type}</span></div>
          <div class="modal-detail-item"><label>For</label><span style="text-transform:capitalize">${l.listingFor}</span></div>
          <div class="modal-detail-item"><label>Bedrooms</label><span>${l.bedrooms ?? '—'}</span></div>
          <div class="modal-detail-item"><label>Bathrooms</label><span>${l.bathrooms ?? '—'}</span></div>
          <div class="modal-detail-item"><label>Floor Area</label><span>${l.floorArea ? l.floorArea + ' sqm' : '—'}</span></div>
          <div class="modal-detail-item"><label>Posted</label><span>${l.postedAt}</span></div>
        </div>
      </div>
      <div class="modal-actions">
        ${l.status !== 'approved' ? `<button class="btn-modal approve" onclick="setStatus('${l.id}','approved')">Approve</button>` : ''}
        ${l.status !== 'rejected' ? `<button class="btn-modal reject"  onclick="setStatus('${l.id}','rejected')">Reject</button>` : ''}
        <button class="btn-modal close" onclick="closeModal()">Close</button>
      </div>`;
    document.getElementById('listingModal').classList.add('open');
  };

  window.closeModal = function () {
    document.getElementById('listingModal').classList.remove('open');
  };

  document.getElementById('listingModal').addEventListener('click', e => {
    if (e.target === document.getElementById('listingModal')) closeModal();
  });

  renderListings();
})();
