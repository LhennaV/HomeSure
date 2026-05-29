// FILE: assets/js/admin/admin-payments.js
// HomeSure – Admin Payments Overview

(function () {
  const user = getSession();
  if (!user || user.role !== 'admin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'payments' });
  HomeSureTopbar.init({ placeholder: 'Payments Overview' });

  // ── Fake Data ─────────────────────────────────────────────────────────────────
  const ALL_TRANSACTIONS = [
    // Ramon Cruz landlord
    {
      id: 'PAY-101', tenantName: 'Maria Santos', tenantInitials: 'MS', tenantColor: '#0f766e',
      landlord: 'Ramon Cruz', listingTitle: '2BR Apartment — Poblacion',
      period: 'June 2026', amount: 15000, method: 'GCash', reference: 'GC-78452',
      status: 'pending_confirmation', paidDate: '2026-05-28'
    },
    {
      id: 'PAY-102', tenantName: 'Juan Cruz', tenantInitials: 'JC', tenantColor: '#7c3aed',
      landlord: 'Ramon Cruz', listingTitle: 'Studio Unit — Bagbaguin',
      period: 'June 2026', amount: 8000, method: 'Bank Transfer', reference: 'BT-98765',
      status: 'pending_confirmation', paidDate: '2026-05-30'
    },
    {
      id: 'PAY-103', tenantName: 'Ana Lim', tenantInitials: 'AL', tenantColor: '#b45309',
      landlord: 'Lourdes Navarro', listingTitle: '3BR House — Guyong',
      period: 'June 2026', amount: 22000, method: 'GCash', reference: 'GC-11111',
      status: 'pending_confirmation', paidDate: '2026-06-01'
    },
    {
      id: 'PAY-091', tenantName: 'Maria Santos', tenantInitials: 'MS', tenantColor: '#0f766e',
      landlord: 'Ramon Cruz', listingTitle: '2BR Apartment — Poblacion',
      period: 'May 2026', amount: 15000, method: 'GCash', reference: 'GC-54321',
      status: 'confirmed', paidDate: '2026-04-29'
    },
    {
      id: 'PAY-092', tenantName: 'Juan Cruz', tenantInitials: 'JC', tenantColor: '#7c3aed',
      landlord: 'Ramon Cruz', listingTitle: 'Studio Unit — Bagbaguin',
      period: 'May 2026', amount: 8000, method: 'Cash', reference: '—',
      status: 'confirmed', paidDate: '2026-04-30'
    },
    {
      id: 'PAY-093', tenantName: 'Ana Lim', tenantInitials: 'AL', tenantColor: '#b45309',
      landlord: 'Lourdes Navarro', listingTitle: '3BR House — Guyong',
      period: 'May 2026', amount: 22000, method: 'Bank Transfer', reference: 'BT-44512',
      status: 'confirmed', paidDate: '2026-04-28'
    },
    {
      id: 'PAY-081', tenantName: 'Maria Santos', tenantInitials: 'MS', tenantColor: '#0f766e',
      landlord: 'Ramon Cruz', listingTitle: '2BR Apartment — Poblacion',
      period: 'April 2026', amount: 15000, method: 'GCash', reference: 'GC-33201',
      status: 'confirmed', paidDate: '2026-03-30'
    },
    {
      id: 'PAY-082', tenantName: 'Juan Cruz', tenantInitials: 'JC', tenantColor: '#7c3aed',
      landlord: 'Ramon Cruz', listingTitle: 'Studio Unit — Bagbaguin',
      period: 'April 2026', amount: 8000, method: 'GCash', reference: 'GC-29988',
      status: 'confirmed', paidDate: '2026-03-29'
    },
    {
      id: 'PAY-OD1', tenantName: 'Carlo Reyes', tenantInitials: 'CR', tenantColor: '#be185d',
      landlord: 'Lourdes Navarro', listingTitle: 'Townhouse Unit A — Centro',
      period: 'June 2026', amount: 18000, method: '—', reference: '—',
      status: 'overdue', paidDate: null
    },
  ];

  const ALL_DEPOSITS = [
    {
      id: 'DEP-001', tenantName: 'Maria Santos', tenantInitials: 'MS', tenantColor: '#0f766e',
      landlord: 'Ramon Cruz', listingTitle: '2BR Apartment — Poblacion',
      amount: 30000, status: 'active',
      deductions: [{ reason: 'Broken cabinet door', cost: 2500, date: '2026-05-15' }]
    },
    {
      id: 'DEP-002', tenantName: 'Juan Cruz', tenantInitials: 'JC', tenantColor: '#7c3aed',
      landlord: 'Ramon Cruz', listingTitle: 'Studio Unit — Bagbaguin',
      amount: 16000, status: 'active', deductions: []
    },
    {
      id: 'DEP-003', tenantName: 'Ana Lim', tenantInitials: 'AL', tenantColor: '#b45309',
      landlord: 'Lourdes Navarro', listingTitle: '3BR House — Guyong',
      amount: 44000, status: 'active',
      deductions: [{ reason: 'Cracked bathroom tile', cost: 5000, date: '2026-05-20' }]
    },
    {
      id: 'DEP-004', tenantName: 'Carlo Reyes', tenantInitials: 'CR', tenantColor: '#be185d',
      landlord: 'Lourdes Navarro', listingTitle: 'Townhouse Unit A — Centro',
      amount: 36000, status: 'active', deductions: []
    },
    {
      id: 'DEP-005', tenantName: 'Elena Bautista', tenantInitials: 'EB', tenantColor: '#0369a1',
      landlord: 'Ramon Cruz', listingTitle: '4BR House — Patubig',
      amount: 60000, status: 'active',
      deductions: [
        { reason: 'Damaged kitchen sink', cost: 12000, date: '2026-04-10' },
        { reason: 'Missing aircon remote', cost: 1500, date: '2026-05-01' }
      ]
    },
    {
      id: 'DEP-006', tenantName: 'Gerald Tan', tenantInitials: 'GT', tenantColor: '#166534',
      landlord: 'Lourdes Navarro', listingTitle: '2BR Condo — Bulac',
      amount: 40000, status: 'active',
      deductions: [{ reason: 'Broken bedroom door lock', cost: 4000, date: '2026-03-25' }]
    },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function fmtMoney(n) {
    return '₱' + Number(n).toLocaleString('en-PH');
  }

  function fmtDate(d) {
    if (!d) return '—';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusBadge(status) {
    const map = {
      confirmed: { cls: 'badge-confirmed', label: 'Confirmed' },
      pending_confirmation: { cls: 'badge-pending_confirmation', label: 'Pending' },
      pending: { cls: 'badge-pending', label: 'Pending' },
      overdue: { cls: 'badge-overdue', label: 'Overdue' },
    };
    const s = map[status] || { cls: 'badge-pending', label: status };
    return `<span class="badge ${s.cls}">${s.label}</span>`;
  }

  // ── Render Stats ──────────────────────────────────────────────────────────────
  function renderStats() {
    const totalCollected = ALL_TRANSACTIONS
      .filter(t => t.status === 'confirmed')
      .reduce((s, t) => s + t.amount, 0);
    const pendingCount = ALL_TRANSACTIONS
      .filter(t => t.status === 'pending_confirmation').length;
    const depositsHeld = ALL_DEPOSITS
      .reduce((s, d) => s + d.amount, 0);
    const damageDeductions = ALL_DEPOSITS
      .reduce((s, d) => s + d.deductions.reduce((a, x) => a + x.cost, 0), 0);

    document.getElementById('statRow').innerHTML = `
      <div class="stat-card">
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="stat-label">Total Collected</div>
        <div class="stat-value">${fmtMoney(1248000)}</div>
        <div class="stat-hint">All-time platform total</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="stat-label">Pending Confirmation</div>
        <div class="stat-value">${pendingCount}</div>
        <div class="stat-hint">Awaiting landlord action</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="stat-label">Security Deposits Held</div>
        <div class="stat-value">${fmtMoney(624000)}</div>
        <div class="stat-hint">${ALL_DEPOSITS.length} active deposits</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="stat-label">Damage Deductions</div>
        <div class="stat-value">${fmtMoney(32500)}</div>
        <div class="stat-hint">Across all deposits</div>
      </div>
    `;
  }

  // ── Render Transactions ───────────────────────────────────────────────────────
  window.renderTransactions = function () {
    const dateFrom = document.getElementById('fDateFrom')?.value || '';
    const dateTo   = document.getElementById('fDateTo')?.value || '';
    const landlord = document.getElementById('fLandlord')?.value || '';
    const status   = document.getElementById('fStatus')?.value || '';
    const q        = (document.getElementById('fSearch')?.value || '').toLowerCase().trim();

    let list = [...ALL_TRANSACTIONS];

    if (dateFrom) list = list.filter(t => t.paidDate && t.paidDate >= dateFrom);
    if (dateTo)   list = list.filter(t => t.paidDate && t.paidDate <= dateTo);
    if (landlord) list = list.filter(t => t.landlord === landlord);
    if (status)   list = list.filter(t => t.status === status);
    if (q)        list = list.filter(t =>
      t.tenantName.toLowerCase().includes(q) ||
      t.landlord.toLowerCase().includes(q) ||
      t.reference.toLowerCase().includes(q) ||
      t.listingTitle.toLowerCase().includes(q) ||
      t.period.toLowerCase().includes(q)
    );

    const countEl = document.getElementById('txCount');
    if (countEl) countEl.textContent = list.length + ' record' + (list.length !== 1 ? 's' : '');

    const tbody = document.getElementById('transactionsBody');
    if (!list.length) {
      tbody.innerHTML = `<tr class="table-empty"><td colspan="8">No transactions match the current filters.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(t => `
      <tr>
        <td>
          <div class="user-cell">
            <div class="avatar-sm" style="background:${t.tenantColor}">${t.tenantInitials}</div>
            ${t.tenantName}
          </div>
        </td>
        <td>${t.landlord}</td>
        <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.listingTitle}</td>
        <td style="white-space:nowrap">${t.period}</td>
        <td class="amount-cell">${fmtMoney(t.amount)}</td>
        <td>${t.method}</td>
        <td>${statusBadge(t.status)}</td>
        <td>
          <button class="btn-view" onclick="viewTransaction('${t.id}')">View</button>
        </td>
      </tr>
    `).join('');
  };

  // ── Render Deposits ───────────────────────────────────────────────────────────
  function renderDeposits() {
    const countEl = document.getElementById('depCount');
    if (countEl) countEl.textContent = ALL_DEPOSITS.length + ' deposit' + (ALL_DEPOSITS.length !== 1 ? 's' : '');

    const tbody = document.getElementById('depositsBody');
    tbody.innerHTML = ALL_DEPOSITS.map(d => {
      const totalDed = d.deductions.reduce((s, x) => s + x.cost, 0);
      const refund = d.amount - totalDed;
      return `
        <tr>
          <td>
            <div class="user-cell">
              <div class="avatar-sm" style="background:${d.tenantColor}">${d.tenantInitials}</div>
              ${d.tenantName}
            </div>
          </td>
          <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.listingTitle}</td>
          <td class="amount-cell">${fmtMoney(d.amount)}</td>
          <td style="color: var(--red); font-weight:600; white-space:nowrap">
            ${totalDed > 0 ? '−' + fmtMoney(totalDed) : '—'}
          </td>
          <td><span class="refund-chip">${fmtMoney(refund)}</span></td>
          <td><span class="badge badge-active">Active</span></td>
          <td>${d.landlord}</td>
        </tr>
      `;
    }).join('');
  }

  // ── View Transaction (stub) ───────────────────────────────────────────────────
  window.viewTransaction = function (id) {
    const t = ALL_TRANSACTIONS.find(x => x.id === id);
    if (!t) return;
    showToast(`Viewing transaction ${t.id} — ${t.tenantName} (${t.period})`);
  };

  // ── Toast ─────────────────────────────────────────────────────────────────────
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
  }

  // ── Init ──────────────────────────────────────────────────────────────────────
  renderStats();
  renderTransactions();
  renderDeposits();
})();
