// FILE: assets/js/seller/seller-payments.js
// HomeSure – Seller Payment Management

(function () {
  const user = getSession();
  if (!user || user.role !== 'seller') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'payments' });
  HomeSureTopbar.init({ placeholder: 'Payment Management' });

  // ── Fake Data ─────────────────────────────────────────────────────────────────
  const PENDING = [
    {
      id: 'PAY-101', tenantName: 'Maria Santos', initials: 'MS', color: '#0f766e',
      listingTitle: '2BR Apartment — Poblacion', amount: 15000, period: 'June 2026',
      paidDate: '2026-05-28', method: 'GCash', reference: 'GC-78452'
    },
    {
      id: 'PAY-102', tenantName: 'Juan Cruz', initials: 'JC', color: '#7c3aed',
      listingTitle: 'Studio Unit — Bagbaguin', amount: 8000, period: 'June 2026',
      paidDate: '2026-05-30', method: 'Bank Transfer', reference: 'BT-98765'
    },
    {
      id: 'PAY-103', tenantName: 'Ana Lim', initials: 'AL', color: '#b45309',
      listingTitle: '3BR House — Guyong', amount: 22000, period: 'June 2026',
      paidDate: '2026-06-01', method: 'GCash', reference: 'GC-11111'
    },
  ];

  const ALL_PAYMENTS = [
    ...PENDING.map(p => ({ ...p, status: 'pending_confirmation' })),
    {
      id: 'PAY-091', tenantName: 'Maria Santos', initials: 'MS', color: '#0f766e',
      listingTitle: '2BR Apartment — Poblacion', amount: 15000, period: 'May 2026',
      paidDate: '2026-04-29', method: 'GCash', reference: 'GC-54321', status: 'confirmed'
    },
    {
      id: 'PAY-092', tenantName: 'Juan Cruz', initials: 'JC', color: '#7c3aed',
      listingTitle: 'Studio Unit — Bagbaguin', amount: 8000, period: 'May 2026',
      paidDate: '2026-04-30', method: 'Cash', reference: '—', status: 'confirmed'
    },
  ];

  const DEPOSITS = [
    {
      id: 'DEP-001', tenantName: 'Maria Santos', initials: 'MS', color: '#0f766e',
      listingTitle: '2BR Apartment — Poblacion', amount: 30000, status: 'active',
      deductions: [{ reason: 'Broken cabinet door', cost: 2500, date: '2026-05-15', id: 'DMG-001' }]
    },
    {
      id: 'DEP-002', tenantName: 'Juan Cruz', initials: 'JC', color: '#7c3aed',
      listingTitle: 'Studio Unit — Bagbaguin', amount: 16000, status: 'active', deductions: []
    },
    {
      id: 'DEP-003', tenantName: 'Ana Lim', initials: 'AL', color: '#b45309',
      listingTitle: '3BR House — Guyong', amount: 44000, status: 'active',
      deductions: [{ reason: 'Cracked bathroom tile', cost: 5000, date: '2026-05-20', id: 'DMG-002' }]
    },
  ];

  // Track which deposit a damage modal is targeting
  let activeDamageDepositId = null;

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
    const totalReceived = ALL_PAYMENTS
      .filter(p => p.status === 'confirmed')
      .reduce((s, p) => s + p.amount, 0);
    const pendingCount = PENDING.length;
    const depositsHeld = DEPOSITS.reduce((s, d) => s + d.amount, 0);
    const damageDeductions = DEPOSITS.reduce((s, d) =>
      s + d.deductions.reduce((a, x) => a + x.cost, 0), 0);

    document.getElementById('statRow').innerHTML = `
      <div class="stat-card">
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="stat-label">Total Received</div>
        <div class="stat-value">${fmtMoney(452000)}</div>
        <div class="stat-hint">All-time confirmed</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="stat-label">Pending Confirmation</div>
        <div class="stat-value">${pendingCount}</div>
        <div class="stat-hint">Awaiting review</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="stat-label">Deposits Held</div>
        <div class="stat-value">${fmtMoney(depositsHeld)}</div>
        <div class="stat-hint">${DEPOSITS.length} active tenants</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="stat-label">Damage Deductions</div>
        <div class="stat-value">${fmtMoney(damageDeductions)}</div>
        <div class="stat-hint">Across all deposits</div>
      </div>
    `;
  }

  // ── Render Pending Tab ────────────────────────────────────────────────────────
  function renderPending() {
    const badge = document.getElementById('pendingBadge');
    if (badge) badge.textContent = PENDING.length > 0 ? PENDING.length : '';

    const container = document.getElementById('pendingContainer');
    if (!PENDING.length) {
      container.innerHTML = `<div class="pending-empty">No pending payments to review. All caught up!</div>`;
      return;
    }

    container.innerHTML = PENDING.map(p => `
      <div class="pending-card" id="pcard-${p.id}">
        <div class="avatar" style="background:${p.color}">${p.initials}</div>
        <div class="pending-info">
          <div class="pending-name">${p.tenantName}</div>
          <div class="pending-property">${p.listingTitle}</div>
          <div class="pending-meta">
            <div class="pending-meta-item">
              <span class="pending-meta-label">Period</span>
              <span class="pending-meta-value">${p.period}</span>
            </div>
            <div class="pending-meta-item">
              <span class="pending-meta-label">Date Paid</span>
              <span class="pending-meta-value">${fmtDate(p.paidDate)}</span>
            </div>
            <div class="pending-meta-item">
              <span class="pending-meta-label">Method</span>
              <span class="pending-meta-value">${p.method}</span>
            </div>
            <div class="pending-meta-item">
              <span class="pending-meta-label">Reference</span>
              <span class="pending-meta-value" style="font-family:monospace;font-size:12px">${p.reference}</span>
            </div>
          </div>
        </div>
        <div class="pending-amount">${fmtMoney(p.amount)}</div>
        <div class="pending-actions">
          <button class="action-btn confirm" onclick="markReceived('${p.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
            Mark Received
          </button>
          <button class="action-btn reject" onclick="openRejectPaymentModal('${p.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Reject
          </button>
        </div>
      </div>
    `).join('');
  }

  // ── Mark Received ─────────────────────────────────────────────────────────────
  window.markReceived = function (id) {
    const idx = PENDING.findIndex(p => p.id === id);
    if (idx === -1) return;
    const [payment] = PENDING.splice(idx, 1);
    payment.status = 'confirmed';

    // Update in ALL_PAYMENTS if exists, else add
    const allIdx = ALL_PAYMENTS.findIndex(p => p.id === id);
    if (allIdx !== -1) ALL_PAYMENTS[allIdx].status = 'confirmed';
    else ALL_PAYMENTS.unshift(payment);

    renderStats();
    renderPending();
    showToast(`Payment from ${payment.tenantName} marked as received.`);
  };

  // ── Reject Payment Modal ──────────────────────────────────────────────────────
  let pendingRejectPaymentId = null;

  window.openRejectPaymentModal = function(id) {
    pendingRejectPaymentId = id;
    document.getElementById('rejectPaymentModal').style.display = 'flex';
  };

  window.closeRejectPaymentModal = function() {
    document.getElementById('rejectPaymentModal').style.display = 'none';
    pendingRejectPaymentId = null;
  };

  window.confirmRejectPayment = function() {
    if (pendingRejectPaymentId) {
      rejectPayment(pendingRejectPaymentId);
    }
    closeRejectPaymentModal();
  };

  function rejectPayment(id) {
    const idx = PENDING.findIndex(p => p.id === id);
    if (idx === -1) return;
    const [payment] = PENDING.splice(idx, 1);

    // Remove from ALL_PAYMENTS too
    const allIdx = ALL_PAYMENTS.findIndex(p => p.id === id);
    if (allIdx !== -1) ALL_PAYMENTS.splice(allIdx, 1);

    renderStats();
    renderPending();
    showToast(`Payment from ${payment.tenantName} has been rejected.`);
  }

  // ── Render All Payments Tab ───────────────────────────────────────────────────
  window.renderAllPayments = function () {
    const tenantFilter = document.getElementById('tenantFilter')?.value || '';
    const q = (document.getElementById('allSearch')?.value || '').toLowerCase().trim();

    let list = [...ALL_PAYMENTS];
    if (tenantFilter) list = list.filter(p => p.tenantName === tenantFilter);
    if (q) list = list.filter(p =>
      p.reference.toLowerCase().includes(q) ||
      p.period.toLowerCase().includes(q) ||
      p.method.toLowerCase().includes(q)
    );

    const tbody = document.getElementById('allPaymentsBody');
    if (!list.length) {
      tbody.innerHTML = `<tr class="table-empty"><td colspan="6">No payment records found.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(p => `
      <tr>
        <td>
          <div class="tenant-cell">
            <div class="avatar-sm" style="background:${p.color}">${p.initials}</div>
            ${p.tenantName}
          </div>
        </td>
        <td>${p.listingTitle}</td>
        <td>${p.period}</td>
        <td class="amount-cell">${fmtMoney(p.amount)}</td>
        <td>${p.method}</td>
        <td>${statusBadge(p.status)}</td>
      </tr>
    `).join('');
  };

  // ── Render Deposits Tab ───────────────────────────────────────────────────────
  function renderDeposits() {
    const tbody = document.getElementById('depositsBody');
    tbody.innerHTML = DEPOSITS.map(d => {
      const totalDeductions = d.deductions.reduce((s, x) => s + x.cost, 0);
      const refundable = d.amount - totalDeductions;
      return `
        <tr>
          <td>
            <div class="tenant-cell">
              <div class="avatar-sm" style="background:${d.color}">${d.initials}</div>
              ${d.tenantName}
            </div>
          </td>
          <td>${d.listingTitle}</td>
          <td class="amount-cell">${fmtMoney(d.amount)}</td>
          <td style="color: var(--red); font-weight:600">−${fmtMoney(totalDeductions)}</td>
          <td><span class="refund-chip">${fmtMoney(refundable)}</span></td>
          <td><span class="badge badge-active">Active</span></td>
          <td>
            <button class="btn-file-damage" onclick="openDamageModal('${d.id}')">File Damage</button>
          </td>
        </tr>
      `;
    }).join('');

    renderDamageReports();
  }

  // ── Render Damage Reports ─────────────────────────────────────────────────────
  function renderDamageReports() {
    const all = [];
    DEPOSITS.forEach(d => {
      d.deductions.forEach(x => {
        all.push({ ...x, tenantName: d.tenantName, listingTitle: d.listingTitle });
      });
    });
    all.sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.getElementById('damageReportsList');
    if (!all.length) {
      container.innerHTML = `<div class="damage-empty">No damage reports filed yet.</div>`;
      return;
    }

    container.innerHTML = `<div class="damage-list">${all.map(r => `
      <div class="damage-card">
        <div class="damage-card-info">
          <div class="damage-card-tenant">${r.tenantName}</div>
          <div class="damage-card-property">${r.listingTitle}</div>
          <div class="damage-card-reason">${r.reason}</div>
          <div class="damage-card-date">${fmtDate(r.date)} &middot; ${r.id}</div>
        </div>
        <div class="damage-card-right">
          <span class="cost-chip">−${fmtMoney(r.cost)}</span>
        </div>
      </div>
    `).join('')}</div>`;
  }

  // ── Damage Modal ──────────────────────────────────────────────────────────────
  window.openDamageModal = function (depositId) {
    activeDamageDepositId = depositId;
    const dep = DEPOSITS.find(d => d.id === depositId);
    if (!dep) return;

    document.getElementById('dTenant').value = dep.tenantName;
    document.getElementById('dDescription').value = '';
    document.getElementById('dCost').value = '';
    document.getElementById('dDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('damageModalSub').textContent = dep.listingTitle;
    document.getElementById('damageModal').style.display = 'flex';
  };

  window.closeDamageModal = function () {
    document.getElementById('damageModal').style.display = 'none';
    document.getElementById('damageForm').reset();
    activeDamageDepositId = null;
  };

  window.handleDamageBackdrop = function (e) {
    if (e.target === document.getElementById('damageModal')) closeDamageModal();
  };

  window.submitDamage = function (e) {
    e.preventDefault();
    if (!activeDamageDepositId) return;

    const dep = DEPOSITS.find(d => d.id === activeDamageDepositId);
    if (!dep) return;

    const reason = document.getElementById('dDescription').value.trim();
    const cost   = parseInt(document.getElementById('dCost').value, 10);
    const date   = document.getElementById('dDate').value;

    if (!reason || !cost || !date) return;

    const newId = 'DMG-' + Date.now();
    dep.deductions.push({ id: newId, reason, cost, date });

    closeDamageModal();
    renderDeposits();
    renderStats();
    showToast('Damage report filed and deduction applied to deposit.');
  };

  // ── Tab Switching ─────────────────────────────────────────────────────────────
  window.switchTab = function (tab) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(el => {
      el.style.display = el.id === 'tab-' + tab ? '' : 'none';
    });
    if (tab === 'all') renderAllPayments();
    if (tab === 'deposits') renderDeposits();
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
  renderPending();
})();
