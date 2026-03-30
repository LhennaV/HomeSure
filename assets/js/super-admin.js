// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Super Admin Dashboard Logic
//  Depends on: fake-data.js, sidebar.js, topbar.js
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  const user = getSession();
  if (!user || user.role !== 'superadmin') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'dashboard' });
  HomeSureTopbar.init({ placeholder: 'Search...' });

  document.getElementById('dashTitle').textContent =
    'Super Admin – ' + user.firstName + ' ' + user.lastName;

  document.getElementById('totalUsers').textContent    = FAKE_USERS.length;
  document.getElementById('totalAdmins').textContent   = FAKE_USERS.filter(u => u.role === 'admin').length;
  document.getElementById('totalSellers').textContent  = FAKE_USERS.filter(u => u.role === 'seller').length;
  document.getElementById('totalBuyers').textContent   = FAKE_USERS.filter(u => u.role === 'buyer').length;
  document.getElementById('totalListings').textContent = FAKE_LISTINGS.length;
  document.getElementById('openReports').textContent   = FAKE_REPORTS.filter(r => r.status === 'pending').length;

  const tbody = document.getElementById('activityLog');
  FAKE_ACTIVITY_LOGS.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${log.action}</td><td>${log.detail}</td><td>${log.timestamp}</td>`;
    tbody.appendChild(tr);
  });

})();
