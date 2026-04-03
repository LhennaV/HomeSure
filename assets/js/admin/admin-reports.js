// HomeSure – Admin Reports

(function () {
  const user = getSession();
  if (!user || user.role !== 'admin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'reports' });
  HomeSureTopbar.init({ placeholder: 'Search reports...' });

  // ── Fake report data ────────────────────────────────────────────────────────
  const REPORTS = [
    {
      id: 'rpt-001', type: 'listing', severity: 'high',
      subject: 'Fake listing with misleading photos',
      description: 'The property photos do not match the actual unit. The seller is using stock photos and the listed price is significantly lower than market value to attract buyers.',
      listingId: 'prop-004', reportedBy: 'usr-001',
      status: 'pending', submittedAt: '2026-03-28',
    },
    {
      id: 'rpt-002', type: 'seller', severity: 'high',
      subject: 'Seller demanding payment outside platform',
      description: 'Seller contacted me via private message asking for a reservation fee through GCash before any formal agreement was signed.',
      listingId: 'prop-005', reportedBy: 'usr-002',
      status: 'pending', submittedAt: '2026-03-27',
    },
    {
      id: 'rpt-003', type: 'listing', severity: 'medium',
      subject: 'Property details are inaccurate',
      description: 'The listing states 3 bedrooms but the actual unit only has 2. Floor area is also overstated by approximately 20 sqm.',
      listingId: 'prop-009', reportedBy: 'usr-001',
      status: 'pending', submittedAt: '2026-03-25',
    },
    {
      id: 'rpt-004', type: 'seller', severity: 'low',
      subject: 'Unresponsive seller',
      description: 'I have sent multiple messages to the seller over the past week and have not received any response.',
      listingId: 'prop-002', reportedBy: 'usr-002',
      status: 'resolved', submittedAt: '2026-03-20',
    },
    {
      id: 'rpt-005', type: 'listing', severity: 'medium',
      subject: 'Duplicate listing',
      description: 'This property appears to be listed twice under different prices. One listing shows ₱8,000/month and another shows ₱9,500/month for what appears to be the same unit.',
      listingId: 'prop-003', reportedBy: 'usr-001',
      status: 'dismissed', submittedAt: '2026-03-15',
    },
  ];

  let activeStatus = 'all';

  // ── Filter tabs ─────────────────────────────────────────────────────────────
  document.getElementById('filterTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeStatus = tab.dataset.status;
    renderReports();
  });

  // ── Severity icon/color ─────────────────────────────────────────────────────
  function severityIcon(severity) {
    if (severity === 'high')   return { cls: 'red',   svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` };
    if (severity === 'medium') return { cls: 'amber', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` };
    return { cls: 'blue', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>` };
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  window.renderReports = function () {
    const q = document.getElementById('reportSearch').value.toLowerCase();
    const filtered = REPORTS.filter(r => {
      const matchStatus = activeStatus === 'all' || r.status === activeStatus;
      const matchQ = !q || r.subject.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return matchStatus && matchQ;
    });

    const container = document.getElementById('reportsContainer');
    if (!filtered.length) {
      container.innerHTML = `<div style="text-align:center;padding:48px;color:var(--muted)">No reports found.</div>`;
      return;
    }

    container.innerHTML = filtered.map(r => {
      const reporter = FAKE_USERS.find(u => u.id === r.reportedBy);
      const reporterName = reporter ? reporter.firstName + ' ' + reporter.lastName : 'Unknown';
      const listing = FAKE_LISTINGS.find(l => l.id === r.listingId);
      const { cls, svg } = severityIcon(r.severity);
      const actionBtns = r.status === 'pending'
        ? `<button class="btn-sm resolve"  onclick="setReportStatus('${r.id}','resolved')">Resolve</button>
           <button class="btn-sm dismiss"  onclick="setReportStatus('${r.id}','dismissed')">Dismiss</button>`
        : '';
      return `
        <div class="report-row" onclick="openModal('${r.id}')">
          <div class="report-icon ${cls}">${svg}</div>
          <div class="report-body">
            <div class="report-title">${r.subject}</div>
            <div class="report-desc">${r.description.slice(0, 100)}${r.description.length > 100 ? '…' : ''}</div>
            <div class="report-meta">Reported by ${reporterName} · ${listing ? listing.title : r.listingId} · ${r.submittedAt}</div>
          </div>
          <div class="report-right" onclick="event.stopPropagation()">
            <span class="badge ${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
            <div class="action-btns">${actionBtns}</div>
          </div>
        </div>`;
    }).join('');
  };

  window.setReportStatus = function (id, status) {
    const r = REPORTS.find(x => x.id === id);
    if (r) { r.status = status; renderReports(); closeModal(); }
  };

  // ── Modal ───────────────────────────────────────────────────────────────────
  window.openModal = function (id) {
    const r = REPORTS.find(x => x.id === id);
    if (!r) return;
    const reporter = FAKE_USERS.find(u => u.id === r.reportedBy);
    const reporterName = reporter ? reporter.firstName + ' ' + reporter.lastName : 'Unknown';
    const listing = FAKE_LISTINGS.find(l => l.id === r.listingId);
    const { cls, svg } = severityIcon(r.severity);

    document.getElementById('reportModalContent').innerHTML = `
      <div class="modal-header">
        <div class="modal-icon ${cls}">${svg}</div>
        <div>
          <div class="modal-title">${r.subject}</div>
          <div class="modal-sub">${r.type === 'seller' ? 'Seller Report' : 'Listing Report'} · Submitted ${r.submittedAt}</div>
        </div>
      </div>
      <div class="modal-section-label">Description</div>
      <div class="modal-text">${r.description}</div>
      <div class="modal-detail">
        <div class="modal-detail-item"><label>Reported By</label><span>${reporterName}</span></div>
        <div class="modal-detail-item"><label>Severity</label><span style="text-transform:capitalize">${r.severity}</span></div>
        <div class="modal-detail-item"><label>Listing</label><span>${listing ? listing.title : r.listingId}</span></div>
        <div class="modal-detail-item"><label>Status</label><span style="text-transform:capitalize">${r.status}</span></div>
      </div>
      <div class="modal-actions">
        ${r.status === 'pending' ? `
          <button class="btn-modal resolve" onclick="setReportStatus('${r.id}','resolved')">Mark Resolved</button>
          <button class="btn-modal dismiss" onclick="setReportStatus('${r.id}','dismissed')">Dismiss</button>
        ` : ''}
        <button class="btn-modal close" onclick="closeModal()">Close</button>
      </div>`;
    document.getElementById('reportModal').classList.add('open');
  };

  window.closeModal = function () {
    document.getElementById('reportModal').classList.remove('open');
  };

  document.getElementById('reportModal').addEventListener('click', e => {
    if (e.target === document.getElementById('reportModal')) closeModal();
  });

  renderReports();
})();
