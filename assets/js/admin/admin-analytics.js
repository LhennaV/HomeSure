// HomeSure – Admin Analytics

(function () {
  const user = getSession();
  if (!user || user.role !== 'admin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'analytics' });
  HomeSureTopbar.init({ placeholder: 'Search...' });

  // ── Computed data ───────────────────────────────────────────────────────────
  const totalListings   = FAKE_LISTINGS.length;
  const approved        = FAKE_LISTINGS.filter(l => l.status === 'approved').length;
  const pending         = FAKE_LISTINGS.filter(l => l.status === 'pending').length;
  const rejected        = FAKE_LISTINGS.filter(l => l.status === 'rejected').length;
  const forRent         = FAKE_LISTINGS.filter(l => l.listingFor === 'rent').length;
  const forSale         = FAKE_LISTINGS.filter(l => l.listingFor === 'sale').length;
  const totalUsers      = FAKE_USERS.filter(u => ['buyer','seller'].includes(u.role)).length;
  const totalSellers    = FAKE_USERS.filter(u => u.role === 'seller').length;
  const verifiedSellers = FAKE_USERS.filter(u => u.role === 'seller' && u.accountStatus === 'verified').length;
  const totalBuyers     = FAKE_USERS.filter(u => u.role === 'buyer').length;

  // ── Stat cards ─────────────────────────────────────────────────────────────
  document.getElementById('analyticsStats').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon teal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <div><div class="stat-label">Total Listings</div><div class="stat-value">${totalListings}</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div><div class="stat-label">Total Users</div><div class="stat-value">${totalUsers}</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div><div class="stat-label">Verified Sellers</div><div class="stat-value">${verifiedSellers}</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon amber">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div><div class="stat-label">Pending Listings</div><div class="stat-value">${pending}</div></div>
    </div>
  `;

  // ── Donut chart helper ─────────────────────────────────────────────────────
  function drawDonut(svgId, legendId, segments) {
    const svg = document.getElementById(svgId);
    const total = segments.reduce((s, x) => s + x.value, 0) || 1;
    const cx = 60, cy = 60, r = 44, stroke = 14;
    let offset = -90;

    svg.innerHTML = segments.map(seg => {
      const pct   = seg.value / total;
      const angle = pct * 360;
      const rad1  = (offset * Math.PI) / 180;
      const rad2  = ((offset + angle) * Math.PI) / 180;
      const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
      const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
      const large = angle > 180 ? 1 : 0;
      const path  = angle >= 359.9
        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy - r} Z`
        : `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
      offset += angle;
      return `<path d="${path}" fill="none" stroke="${seg.color}" stroke-width="${stroke}" stroke-linecap="butt"/>`;
    }).join('') + `<circle cx="${cx}" cy="${cy}" r="${r - stroke / 2 - 2}" fill="var(--card)"/>
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="16" font-weight="800" fill="var(--text)" font-family="Plus Jakarta Sans">${total}</text>`;

    document.getElementById(legendId).innerHTML = segments.map(seg => `
      <div class="legend-item">
        <span class="legend-dot" style="background:${seg.color}"></span>
        <span class="legend-label">${seg.label}</span>
        <span class="legend-val">${seg.value}</span>
      </div>`).join('');
  }

  // Listings by status
  drawDonut('donutSvg', 'donutLegend', [
    { label: 'Approved', value: approved, color: '#00c9a7' },
    { label: 'Pending',  value: pending,  color: '#fbbf24' },
    { label: 'Rejected', value: rejected, color: '#f87171' },
  ]);

  // For Rent vs For Sale
  drawDonut('donutSvg2', 'donutLegend2', [
    { label: 'For Rent', value: forRent, color: '#60a5fa' },
    { label: 'For Sale', value: forSale, color: '#a78bfa' },
  ]);

  // ── Bar chart: listings by type ─────────────────────────────────────────────
  const types = ['house','apartment','townhouse','condo','studio'];
  const typeCounts = types.map(t => ({ label: t.charAt(0).toUpperCase() + t.slice(1), count: FAKE_LISTINGS.filter(l => l.type === t).length }));
  const maxCount   = Math.max(...typeCounts.map(t => t.count), 1);
  const barColors  = ['#00c9a7','#60a5fa','#fbbf24','#a78bfa','#f87171'];

  document.getElementById('typeBarChart').innerHTML = typeCounts.map((t, i) => `
    <div class="bar-item">
      <div class="bar-item-label"><span>${t.label}</span><span>${t.count}</span></div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.round(t.count / maxCount * 100)}%;background:${barColors[i]}"></div>
      </div>
    </div>`).join('');

  // ── Barangay table ──────────────────────────────────────────────────────────
  const barangays = [...new Set(FAKE_LISTINGS.map(l => l.barangay))].sort();
  document.getElementById('barangayTable').innerHTML = barangays.map(b => {
    const bl = FAKE_LISTINGS.filter(l => l.barangay === b);
    return `<tr>
      <td>${b}</td>
      <td>${bl.length}</td>
      <td>${bl.filter(l => l.status === 'approved').length}</td>
      <td>${bl.filter(l => l.status === 'pending').length}</td>
      <td>${bl.filter(l => l.listingFor === 'rent').length}</td>
      <td>${bl.filter(l => l.listingFor === 'sale').length}</td>
    </tr>`;
  }).join('');

  // ── Export CSV ──────────────────────────────────────────────────────────────
  window.exportCSV = function () {
    const headers = ['ID','Title','Type','For','Barangay','Price','Status','Seller','Posted'];
    const rows = FAKE_LISTINGS.map(l => {
      const seller = FAKE_USERS.find(u => u.id === l.sellerId);
      return [
        l.id, `"${l.title}"`, l.type, l.listingFor, l.barangay, l.price,
        l.status, seller ? `"${seller.firstName} ${seller.lastName}"` : 'Unknown', l.postedAt,
      ].join(',');
    });
    const csv   = [headers.join(','), ...rows].join('\n');
    const blob  = new Blob([csv], { type: 'text/csv' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = 'homesure-listings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Export JSON ─────────────────────────────────────────────────────────────
  window.exportJSON = function () {
    const data = {
      exportedAt: new Date().toISOString(),
      summary: { totalListings, approved, pending, rejected, forRent, forSale, totalUsers, totalSellers, verifiedSellers, totalBuyers },
      listings: FAKE_LISTINGS,
    };
    const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = 'homesure-analytics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

})();
