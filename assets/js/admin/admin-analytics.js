// HomeSure – Admin Analytics

(function () {
  const user = getSession();
  if (!user || user.role !== 'admin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'analytics' });
  HomeSureTopbar.init({ placeholder: 'Search...' });

  // ── Computed data ────────────────────────────────────────────────────────────
  const totalListings   = FAKE_LISTINGS.length;
  const approved        = FAKE_LISTINGS.filter(l => l.status === 'approved').length;
  const pending         = FAKE_LISTINGS.filter(l => l.status === 'pending').length;
  const forRent         = FAKE_LISTINGS.filter(l => l.listingFor === 'rent').length;
  const forSale         = FAKE_LISTINGS.filter(l => l.listingFor === 'sale').length;
  const totalUsers      = FAKE_USERS.filter(u => ['buyer','seller'].includes(u.role)).length;
  const totalSellers    = FAKE_USERS.filter(u => u.role === 'seller').length;
  const verifiedSellers = FAKE_USERS.filter(u => u.role === 'seller' && u.accountStatus === 'verified').length;
  const totalReports    = typeof FAKE_REPORTS !== 'undefined' ? FAKE_REPORTS.length : 8;
  const approvalRate    = totalListings ? Math.round(approved / totalListings * 100) : 0;
  const avgPrice        = FAKE_LISTINGS.length
    ? Math.round(FAKE_LISTINGS.reduce((s, l) => s + (l.price || 0), 0) / FAKE_LISTINGS.length)
    : 0;

  // ── Stat Cards ───────────────────────────────────────────────────────────────
  document.getElementById('analyticsStats').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon teal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <div class="stat-info">
        <div class="stat-label">Total Listings</div>
        <div class="stat-value">${totalListings}</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div class="stat-info">
        <div class="stat-label">Verified Sellers</div>
        <div class="stat-value">${verifiedSellers}</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div class="stat-info">
        <div class="stat-label">Active Listings</div>
        <div class="stat-value">${approved}</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon amber">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
      </div>
      <div class="stat-info">
        <div class="stat-label">Reported Listings</div>
        <div class="stat-value">${totalReports}</div>
      </div>
    </div>
  `;

  // ── High-Demand Areas (vertical bar chart) ───────────────────────────────────
  const barangayCounts = {};
  FAKE_LISTINGS.forEach(l => { barangayCounts[l.barangay] = (barangayCounts[l.barangay] || 0) + 1; });
  const topAreas = Object.entries(barangayCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  (function drawVerticalBars() {
    const items  = topAreas;
    const max    = Math.max(...items.map(i => i[1]), 1);
    const chartH = 150;
    const barW   = 32;
    const gap    = 18;
    const padL   = 28;
    const padB   = 30;
    const padT   = 16;
    const totalW = padL + items.length * (barW + gap) - gap + 10;
    const totalH = padT + chartH + padB;

    // Y-axis grid lines
    const ySteps  = 4;
    const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
      const val  = Math.round(max / ySteps * (ySteps - i));
      const y    = padT + Math.round(i / ySteps * chartH);
      return `
        <line x1="${padL}" y1="${y}" x2="${totalW}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="9" fill="rgba(255,255,255,0.35)" font-family="Plus Jakarta Sans">${val}</text>`;
    }).join('');

    // Bars + labels
    const bars = items.map(([name, val], i) => {
      const barH = Math.max(Math.round(val / max * chartH), 4);
      const x    = padL + i * (barW + gap);
      const y    = padT + chartH - barH;
      const shortName = name.split(' ')[0];
      return `
        <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="6" fill="#00c9a7" opacity="0.9"/>
        <text x="${x + barW / 2}" y="${padT + chartH + 14}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Plus Jakarta Sans">${shortName}</text>`;
    }).join('');

    document.getElementById('demandChart').innerHTML =
      `<svg viewBox="0 0 ${totalW} ${totalH}" style="width:100%;display:block;overflow:visible">${yLabels}${bars}</svg>`;
  })();

  // ── Search Trends line chart (simulated monthly data) ────────────────────────
  (function drawLineChart() {
    const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
    const values = [110, 128, 142, 158, 175, 204, 240];

    const W = 420; const H = 160;
    const pL = 36; const pR = 12; const pT = 14; const pB = 28;
    const cW = W - pL - pR;
    const cH = H - pT - pB;
    const minV = 80; const maxV = 260;

    const toX = i  => pL + (i / (months.length - 1)) * cW;
    const toY = v  => pT + (1 - (v - minV) / (maxV - minV)) * cH;

    // Grid lines
    const ySteps  = 4;
    const grid    = Array.from({ length: ySteps + 1 }, (_, i) => {
      const val = Math.round(minV + (maxV - minV) * i / ySteps);
      const y   = toY(val);
      return `<line x1="${pL}" y1="${y}" x2="${W - pR}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="${pL - 6}" y="${y + 4}" text-anchor="end" font-size="9" fill="rgba(255,255,255,0.35)" font-family="Plus Jakarta Sans">${val}</text>`;
    }).join('');

    // X labels
    const xLabels = months.map((m, i) =>
      `<text x="${toX(i)}" y="${H - 6}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.45)" font-family="Plus Jakarta Sans">${m}</text>`
    ).join('');

    // Area fill
    const ptArr = values.map((v, i) => `${toX(i)},${toY(v)}`);
    const areaPath = `M ${toX(0)},${pT + cH} ` +
      values.map((v, i) => `L ${toX(i)},${toY(v)}`).join(' ') +
      ` L ${toX(values.length - 1)},${pT + cH} Z`;

    // Dots
    const dots = values.map((v, i) =>
      `<circle cx="${toX(i)}" cy="${toY(v)}" r="4.5" fill="#00c9a7" stroke="var(--card)" stroke-width="2.5"/>`
    ).join('');

    document.getElementById('trendsChart').innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00c9a7" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#00c9a7" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${grid}
        ${xLabels}
        <path d="${areaPath}" fill="url(#lineAreaGrad)"/>
        <polyline points="${ptArr.join(' ')}" fill="none" stroke="#00c9a7" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        ${dots}
      </svg>`;
  })();

  // ── Key Insights ─────────────────────────────────────────────────────────────
  const avgRentDays = 12; // simulated
  const kiItems = [
    {
      label: 'Average Listing Price',
      value: `₱${avgPrice.toLocaleString()}`,
      change: '+5.2% from last month',
      positive: true,
    },
    {
      label: 'Avg. Time to Rent',
      value: `${avgRentDays} days`,
      change: '+13% faster',
      positive: true,
    },
    {
      label: 'Listing Approval Rate',
      value: `${approvalRate}%`,
      change: approvalRate >= 70 ? '+Healthy pipeline' : 'Review pending items',
      positive: approvalRate >= 70,
    },
  ];

  document.getElementById('keyInsights').innerHTML = kiItems.map(k => `
    <div class="ki-card">
      <div class="ki-label">${k.label}</div>
      <div class="ki-value">${k.value}</div>
      <div class="ki-change ${k.positive ? 'positive' : 'neutral'}">${k.change}</div>
    </div>`).join('');

  // ── Barangay Table ───────────────────────────────────────────────────────────
  const barangays = [...new Set(FAKE_LISTINGS.map(l => l.barangay))].sort();
  document.getElementById('barangayTable').innerHTML = barangays.map(b => {
    const bl = FAKE_LISTINGS.filter(l => l.barangay === b);
    const total    = bl.length;
    const approvedB = bl.filter(l => l.status === 'approved').length;
    const pendingB  = bl.filter(l => l.status === 'pending').length;
    const rentB     = bl.filter(l => l.listingFor === 'rent').length;
    const saleB     = bl.filter(l => l.listingFor === 'sale').length;
    return `<tr>
      <td><strong>${b}</strong></td>
      <td>${total}</td>
      <td>${rentB}</td>
      <td>${saleB}</td>
      <td><span class="badge approved">${approvedB}</span></td>
      <td><span class="badge pending">${pendingB}</span></td>
    </tr>`;
  }).join('');

  // ── Export CSV ───────────────────────────────────────────────────────────────
  window.exportCSV = function () {
    const headers = ['ID','Title','Type','For','Barangay','Price','Status','Seller','Posted'];
    const rows = FAKE_LISTINGS.map(l => {
      const seller = FAKE_USERS.find(u => u.id === l.sellerId);
      return [l.id, `"${l.title}"`, l.type, l.listingFor, l.barangay, l.price,
        l.status, seller ? `"${seller.firstName} ${seller.lastName}"` : 'Unknown', l.postedAt].join(',');
    });
    const csv  = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'homesure-listings.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Export JSON ──────────────────────────────────────────────────────────────
  window.exportJSON = function () {
    const data = {
      exportedAt: new Date().toISOString(),
      summary: { totalListings, approved, pending, forRent, forSale, totalUsers, totalSellers, verifiedSellers },
      listings: FAKE_LISTINGS,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'homesure-analytics.json'; a.click();
    URL.revokeObjectURL(url);
  };

})();
