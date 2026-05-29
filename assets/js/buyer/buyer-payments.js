// FILE: assets/js/buyer/buyer-payments.js
// HomeSure – Buyer Payments

(function () {
  const user = getSession();
  if (!user || user.role !== 'buyer') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'payments' });
  HomeSureTopbar.init({ placeholder: 'My Payments' });

  // ── Fake Data ─────────────────────────────────────────────────────────────────
  const PAYMENTS = [
    {
      id: 'PAY-001', listingTitle: '2BR Apartment — Poblacion', amount: 15000,
      dueDate: '2026-06-01', paidDate: '2026-05-28', status: 'pending_confirmation',
      method: 'GCash', reference: 'GC-78452', period: 'June 2026'
    },
    {
      id: 'PAY-002', listingTitle: '2BR Apartment — Poblacion', amount: 15000,
      dueDate: '2026-05-01', paidDate: '2026-04-29', status: 'confirmed',
      method: 'GCash', reference: 'GC-54321', period: 'May 2026'
    },
    {
      id: 'PAY-003', listingTitle: '2BR Apartment — Poblacion', amount: 15000,
      dueDate: '2026-04-01', paidDate: '2026-03-30', status: 'confirmed',
      method: 'Bank Transfer', reference: 'BT-22100', period: 'April 2026'
    },
  ];

  const DEPOSIT = {
    amount: 30000,
    deductions: [
      { reason: 'Broken cabinet door', cost: 2500, date: '2026-05-15' }
    ],
    status: 'active'
  };

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function fmtMoney(n) {
    return '₱' + Number(n).toLocaleString('en-PH');
  }

  function fmtDate(d) {
    if (!d) return '—';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function fmtShortDate(d) {
    if (!d) return '—';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusBadge(status) {
    const map = {
      confirmed: { cls: 'badge-confirmed', label: 'Confirmed' },
      pending_confirmation: { cls: 'badge-pending', label: 'Pending Confirmation' },
      pending: { cls: 'badge-pending', label: 'Pending' },
      overdue: { cls: 'badge-overdue', label: 'Overdue' },
    };
    const s = map[status] || { cls: 'badge-pending', label: status };
    return `<span class="badge ${s.cls}">${s.label}</span>`;
  }

  // ── Render Stat Cards ─────────────────────────────────────────────────────────
  function renderStats() {
    const totalDeductions = DEPOSIT.deductions.reduce((s, d) => s + d.cost, 0);
    const refundable = DEPOSIT.amount - totalDeductions;
    const paidThisMonth = PAYMENTS
      .filter(p => p.status === 'confirmed' && p.paidDate && p.paidDate.startsWith('2026-04'))
      .reduce((s, p) => s + p.amount, 0);

    document.getElementById('statRow').innerHTML = `
      <div class="stat-card">
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <div class="stat-label">Next Due</div>
        <div class="stat-value">${fmtMoney(15000)}</div>
        <div class="stat-hint">Due on Jun 1, 2026</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="stat-label">Paid This Month</div>
        <div class="stat-value">${fmtMoney(15000)}</div>
        <div class="stat-hint">May 2026</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="stat-label">Security Deposit</div>
        <div class="stat-value">${fmtMoney(DEPOSIT.amount)}</div>
        <div class="stat-hint">Held by landlord</div>
      </div>
    `;
  }

  // ── Render Upcoming Tab ───────────────────────────────────────────────────────
  function renderUpcoming() {
    const upcoming = PAYMENTS.filter(p => p.status === 'pending_confirmation' || p.status === 'pending');
    const container = document.getElementById('upcomingContainer');

    if (!upcoming.length) {
      container.innerHTML = `<div class="pay-card-empty">No upcoming payments. You are all caught up!</div>`;
      return;
    }

    container.innerHTML = upcoming.map(p => `
      <div class="pay-card">
        <div class="pay-card-left">
          <div class="pay-card-property">${p.listingTitle}</div>
          <div class="pay-card-meta">
            <div class="pay-card-item">
              <span class="pay-card-item-label">Period</span>
              <span class="pay-card-item-value">${p.period}</span>
            </div>
            <div class="pay-card-item">
              <span class="pay-card-item-label">Due Date</span>
              <span class="pay-card-item-value">${fmtDate(p.dueDate)}</span>
            </div>
            <div class="pay-card-item">
              <span class="pay-card-item-label">Method</span>
              <span class="pay-card-item-value">${p.method}</span>
            </div>
            <div class="pay-card-item">
              <span class="pay-card-item-label">Reference</span>
              <span class="pay-card-item-value">${p.reference}</span>
            </div>
          </div>
        </div>
        <div class="pay-card-right">
          <div class="pay-card-amount">${fmtMoney(p.amount)}</div>
          ${statusBadge(p.status)}
        </div>
      </div>
    `).join('');
  }

  // ── Render History Tab ────────────────────────────────────────────────────────
  function renderHistory() {
    const q = (document.getElementById('historySearch')?.value || '').toLowerCase().trim();
    const all = PAYMENTS.filter(p => p.status === 'confirmed' || p.status === 'pending_confirmation');
    const filtered = q
      ? all.filter(p =>
          p.period.toLowerCase().includes(q) ||
          p.method.toLowerCase().includes(q) ||
          p.reference.toLowerCase().includes(q)
        )
      : all;

    const tbody = document.getElementById('historyBody');
    if (!filtered.length) {
      tbody.innerHTML = `<tr class="table-empty"><td colspan="6">No payment records found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td>${p.period}</td>
        <td class="amount-cell">${fmtMoney(p.amount)}</td>
        <td>${p.method}</td>
        <td style="font-family: monospace; font-size: 12.5px;">${p.reference}</td>
        <td>${statusBadge(p.status)}</td>
        <td>${fmtShortDate(p.paidDate)}</td>
      </tr>
    `).join('');
  }

  // ── Render Deposit Tab ────────────────────────────────────────────────────────
  function renderDeposit() {
    const container = document.getElementById('depositContainer');
    const totalDeductions = DEPOSIT.deductions.reduce((s, d) => s + d.cost, 0);
    const refundable = DEPOSIT.amount - totalDeductions;
    const pct = Math.round((refundable / DEPOSIT.amount) * 100);

    const deductionItems = DEPOSIT.deductions.length
      ? DEPOSIT.deductions.map(d => `
          <div class="deduction-item">
            <div class="deduction-info">
              <span class="deduction-reason">${d.reason}</span>
              <span class="deduction-date">${fmtDate(d.date)}</span>
            </div>
            <span class="deduction-cost">−${fmtMoney(d.cost)}</span>
          </div>
        `).join('')
      : `<div class="deduction-empty">No deductions have been filed.</div>`;

    container.innerHTML = `
      <div class="deposit-card">
        <div class="deposit-card-header">
          <span class="deposit-card-title">Security Deposit — 2BR Apartment, Poblacion</span>
          <span class="deposit-card-status">Active</span>
        </div>
        <div class="deposit-body">
          <div class="deposit-row">
            <div class="deposit-item">
              <span class="deposit-item-label">Total Deposit</span>
              <span class="deposit-item-value">${fmtMoney(DEPOSIT.amount)}</span>
            </div>
            <div class="deposit-item">
              <span class="deposit-item-label">Total Deductions</span>
              <span class="deposit-item-value red">−${fmtMoney(totalDeductions)}</span>
            </div>
            <div class="deposit-item">
              <span class="deposit-item-label">Refundable Balance</span>
              <span class="deposit-item-value teal">${fmtMoney(refundable)}</span>
            </div>
          </div>
          <div class="progress-wrap">
            <div class="progress-label-row">
              <span>Refundable</span>
              <span>${pct}% of deposit</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        </div>
        <div class="deduction-section">
          <div class="deduction-title">Damage Deductions</div>
          <div class="deduction-list">${deductionItems}</div>
        </div>
      </div>
    `;
  }

  // ── Tab Switching ─────────────────────────────────────────────────────────────
  window.switchTab = function (tab) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(el => {
      el.style.display = el.id === 'tab-' + tab ? '' : 'none';
    });
    if (tab === 'history') renderHistory();
    if (tab === 'deposit') renderDeposit();
  };

  // ── Mock payment state machine ────────────────────────────────────────────────
  // States: pending_confirmation → confirmed → paid
  let selectedMethod = null;
  let proofFileName  = null;

  // Step 1 — open method selection
  window.openPayModal = function () {
    selectedMethod = null;
    proofFileName  = null;
    goToStep(1);
    document.querySelectorAll('.method-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.method-check').forEach(c => c.style.opacity = '0');
    document.getElementById('proceedBtn').disabled = true;
    document.getElementById('proofLabel').textContent = 'Click to attach screenshot or photo';
    document.getElementById('payModal').style.display = 'flex';
  };

  window.closePayModal = function () {
    document.getElementById('payModal').style.display = 'none';
  };

  window.selectMethod = function (method) {
    selectedMethod = method;
    document.querySelectorAll('.method-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.method-check').forEach(c => c.style.opacity = '0');
    document.getElementById('card-' + method).classList.add('selected');
    document.getElementById('check-' + method).style.opacity = '1';
    document.getElementById('proceedBtn').disabled = false;
  };

  // Step 2 — go to proof upload
  window.goToProofStep = function () {
    if (!selectedMethod) return;
    const labels = { gcash:'GCash', maya:'Maya', bpi:'BPI Bank Transfer', instapay:'InstaPay' };
    document.getElementById('chosenMethodLabel').textContent = labels[selectedMethod] || selectedMethod;
    goToStep(2);
  };

  function goToStep(n) {
    document.getElementById('payStep1').style.display = n === 1 ? '' : 'none';
    document.getElementById('payStep2').style.display = n === 2 ? '' : 'none';
  }

  window.onProofSelect = function (e) {
    proofFileName = e.target.files[0]?.name || null;
    document.getElementById('proofLabel').textContent = proofFileName || 'Click to attach screenshot or photo';
    document.getElementById('submitPayBtn').disabled = !proofFileName;
  };

  // Step 3 — submit (mock: sets status to pending_confirmation)
  window.submitPayment = function (e) {
    e.preventDefault();
    if (!selectedMethod || !proofFileName) return;

    const methodLabels = { gcash:'GCash', maya:'Maya', bpi:'BPI Bank Transfer', instapay:'InstaPay' };
    const ref = 'REF-' + Math.random().toString(36).slice(2,9).toUpperCase();

    PAYMENTS.unshift({
      id: 'PAY-' + Date.now(),
      listingTitle: '2BR Apartment — Poblacion',
      amount: 15000,
      dueDate: '2026-07-01',
      paidDate: new Date().toISOString().split('T')[0],
      status: 'pending_confirmation',
      method: methodLabels[selectedMethod],
      reference: ref,
      period: 'June 2026',
      proofFile: proofFileName,
    });

    closePayModal();
    renderUpcoming();
    renderHistory();
    showToast('Proof of payment submitted. Awaiting seller confirmation.');
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
  renderUpcoming();
})();
