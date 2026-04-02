// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Topbar Component
//  Usage:
//    <div id="hs-topbar"></div>
//    <script src="../components/topbar.js"></script>
//    <script>HomeSureTopbar.init({ placeholder: 'Search properties...' })</script>
// ─────────────────────────────────────────────────────────────────────────────
(function (global) {
  'use strict';

  const CSS = `
    @keyframes hs-topbar-in {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    .hs-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 26px;
      background: #364153;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      gap: 14px;
      animation: hs-topbar-in 0.35s ease both;
      position: relative;
      z-index: 100;
    }

    /* ── Search ── */
    .hs-topbar-search {
      flex: 1;
      max-width: 400px;
      position: relative;
    }
    .hs-topbar-search svg {
      position: absolute; left: 13px; top: 50%;
      transform: translateY(-50%);
      color: rgba(255,255,255,0.35);
      width: 14px; height: 14px;
      pointer-events: none;
      transition: color 0.2s;
    }
    .hs-topbar-search:focus-within svg { color: #00c9a7; }

    .hs-topbar-input {
      width: 100%;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 9px 13px 9px 37px;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    .hs-topbar-input::placeholder { color: rgba(255,255,255,0.35); }
    .hs-topbar-input::-webkit-search-cancel-button { -webkit-appearance: none; display: none; }
    .hs-topbar-input:-webkit-autofill,
    .hs-topbar-input:-webkit-autofill:hover,
    .hs-topbar-input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #2d3f55 inset !important;
      -webkit-text-fill-color: #f1f5f9 !important;
      caret-color: #f1f5f9;
    }
    [data-theme="light"] .hs-topbar-input:-webkit-autofill,
    [data-theme="light"] .hs-topbar-input:-webkit-autofill:hover,
    [data-theme="light"] .hs-topbar-input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #f1f5f9 inset !important;
      -webkit-text-fill-color: #1e293b !important;
      caret-color: #1e293b;
    }
    .hs-topbar-input:focus {
      border-color: rgba(0,201,167,0.55);
      background: rgba(0,0,0,0.3);
    }

    /* ── Right side ── */
    .hs-topbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hs-topbar-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(0,201,167,0.15);
      color: #00c9a7;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700;
      cursor: pointer;
      border: 2px solid rgba(0,201,167,0.4);
      font-family: 'Plus Jakarta Sans', sans-serif;
      transition: border-color 0.2s, transform 0.18s;
      user-select: none;
    }
    .hs-topbar-avatar:hover {
      border-color: #00c9a7;
      transform: scale(1.07);
    }

    /* ── Notification bell ── */
    .hs-notif-btn {
      position: relative;
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.18s;
      flex-shrink: 0;
    }
    .hs-notif-btn:hover {
      background: rgba(255,255,255,0.13);
      transform: scale(1.07);
    }
    .hs-notif-btn svg {
      width: 16px; height: 16px;
      color: rgba(255,255,255,0.7);
      transition: color 0.2s;
    }
    .hs-notif-btn:hover svg { color: #ffffff; }

    .hs-notif-dot {
      position: absolute;
      top: 6px; right: 6px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #00c9a7;
      border: 2px solid #364153;
      animation: hs-notif-pulse 2s ease-in-out infinite;
    }
    @keyframes hs-notif-pulse {
      0%, 100% { transform: scale(1);   opacity: 1; }
      50%       { transform: scale(1.3); opacity: 0.7; }
    }

    /* ── Notification panel ── */
    .hs-notif-wrap {
      position: relative; flex-shrink: 0;
    }
    .hs-notif-panel {
      display: none; position: absolute; top: calc(100% + 10px); right: 0; z-index: 9999;
      width: 320px; background: #253347; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,0.45);
      overflow: hidden;
      animation: hs-notif-panel-in 0.18s ease both;
    }
    @keyframes hs-notif-panel-in {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .hs-notif-panel.open { display: block; }

    .hs-notif-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 10px;
    }
    .hs-notif-title { font-size: 15px; font-weight: 800; color: #f1f5f9; font-family: 'Plus Jakarta Sans', sans-serif; }
    .hs-notif-more {
      width: 28px; height: 28px; border-radius: 8px; border: none;
      background: transparent; cursor: pointer; color: rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .hs-notif-more:hover { background: rgba(255,255,255,0.08); color: #f1f5f9; }
    .hs-notif-more svg { width: 16px; height: 16px; }

    .hs-notif-tabs {
      display: flex; gap: 4px; padding: 0 16px 10px;
    }
    .hs-notif-tab {
      padding: 5px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
      font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; border: none;
      background: transparent; color: rgba(255,255,255,0.45);
      transition: background 0.15s, color 0.15s;
    }
    .hs-notif-tab.active { background: #00c9a7; color: #fff; }
    .hs-notif-tab:not(.active):hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.8); }

    .hs-notif-body { max-height: 320px; overflow-y: auto; }
    .hs-notif-body::-webkit-scrollbar { width: 3px; }
    .hs-notif-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

    .hs-notif-section-label {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 16px 4px;
      font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35);
      text-transform: uppercase; letter-spacing: 0.06em;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .hs-notif-see-all {
      font-size: 11.5px; font-weight: 600; color: #00c9a7;
      cursor: pointer; text-transform: none; letter-spacing: 0;
    }
    .hs-notif-see-all:hover { text-decoration: underline; }

    .hs-notif-item {
      display: flex; align-items: flex-start; gap: 11px;
      padding: 11px 16px; cursor: pointer;
      transition: background 0.15s;
      position: relative;
    }
    .hs-notif-item:hover { background: rgba(255,255,255,0.05); }
    .hs-notif-item.unread { background: rgba(0,201,167,0.06); }
    .hs-notif-item.unread::before {
      content: ''; position: absolute; left: 6px; top: 50%; transform: translateY(-50%);
      width: 5px; height: 5px; border-radius: 50%; background: #00c9a7;
    }
    .hs-notif-avatar {
      width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
      background: rgba(0,201,167,0.15); display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: #00c9a7;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .hs-notif-avatar.system {
      background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.5);
    }
    .hs-notif-avatar svg { width: 16px; height: 16px; }
    .hs-notif-content { flex: 1; min-width: 0; }
    .hs-notif-msg {
      font-size: 12.5px; color: #cbd5e1; line-height: 1.45;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .hs-notif-msg strong { color: #f1f5f9; font-weight: 600; }
    .hs-notif-time {
      font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 3px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .hs-notif-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 2px 0; }

    .hs-notif-footer {
      padding: 10px 16px 14px;
    }
    .hs-notif-prev-btn {
      width: 100%; padding: 10px; border-radius: 9px;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.55); font-size: 12.5px; font-weight: 600;
      font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .hs-notif-prev-btn:hover { background: rgba(255,255,255,0.1); color: #f1f5f9; }

    /* ── Light mode ── */
    [data-theme="light"] .hs-topbar {
      background: #ffffff;
      border-bottom: 1px solid rgba(0,0,0,0.08);
    }
    [data-theme="light"] .hs-topbar-input {
      background: #f1f5f9;
      border-color: rgba(0,0,0,0.1);
      color: #1e293b;
    }
    [data-theme="light"] .hs-topbar-input::placeholder { color: rgba(0,0,0,0.35); }
    [data-theme="light"] .hs-topbar-input:focus {
      background: #ffffff;
      border-color: rgba(0,201,167,0.55);
    }
    [data-theme="light"] .hs-topbar-search svg { color: rgba(0,0,0,0.35); }
    [data-theme="light"] .hs-topbar-search:focus-within svg { color: #00c9a7; }
    [data-theme="light"] .hs-notif-btn {
      background: #f1f5f9;
      border-color: rgba(0,0,0,0.1);
    }
    [data-theme="light"] .hs-notif-btn:hover { background: #e2e8f0; }
    [data-theme="light"] .hs-notif-btn svg { color: rgba(0,0,0,0.5); }
    [data-theme="light"] .hs-notif-btn:hover svg { color: #1e293b; }
    [data-theme="light"] .hs-notif-dot { border-color: #ffffff; }
    [data-theme="light"] .hs-topbar-avatar {
      background: rgba(0,201,167,0.12);
      color: #00a88c;
      border-color: rgba(0,201,167,0.4);
    }
    [data-theme="light"] .hs-notif-panel {
      background: #ffffff; border-color: rgba(0,0,0,0.09);
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .hs-notif-title { color: #1e293b; }
    [data-theme="light"] .hs-notif-more { color: rgba(0,0,0,0.35); }
    [data-theme="light"] .hs-notif-more:hover { background: rgba(0,0,0,0.06); color: #1e293b; }
    [data-theme="light"] .hs-notif-tab:not(.active) { color: rgba(0,0,0,0.45); }
    [data-theme="light"] .hs-notif-tab:not(.active):hover { background: rgba(0,0,0,0.05); }
    [data-theme="light"] .hs-notif-section-label { color: rgba(0,0,0,0.35); }
    [data-theme="light"] .hs-notif-item:hover { background: rgba(0,0,0,0.03); }
    [data-theme="light"] .hs-notif-item.unread { background: rgba(0,201,167,0.05); }
    [data-theme="light"] .hs-notif-msg { color: #475569; }
    [data-theme="light"] .hs-notif-msg strong { color: #1e293b; }
    [data-theme="light"] .hs-notif-time { color: rgba(0,0,0,0.3); }
    [data-theme="light"] .hs-notif-divider { background: rgba(0,0,0,0.06); }
    [data-theme="light"] .hs-notif-prev-btn { background: #f1f5f9; border-color: rgba(0,0,0,0.08); color: rgba(0,0,0,0.5); }
    [data-theme="light"] .hs-notif-prev-btn:hover { background: #e2e8f0; color: #1e293b; }
  `;

  function injectCSS() {
    if (document.getElementById('hs-topbar-style')) return;
    const style = document.createElement('style');
    style.id = 'hs-topbar-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function init({ placeholder = 'Search...', onSearch = null } = {}) {
    injectCSS();

    const el = document.getElementById('hs-topbar');
    if (!el) { console.warn('HomeSureTopbar: #hs-topbar not found.'); return; }

    const user = typeof getSession === 'function' ? getSession() : null;
    const initials = user ? user.firstName[0] + user.lastName[0] : 'U';

    el.className = 'hs-topbar';
    el.innerHTML = `
      <div class="hs-topbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          class="hs-topbar-input"
          id="hsSearch"
          type="text"
          placeholder="${placeholder}"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          readonly
          onfocus="this.removeAttribute('readonly')"
          onblur="if(!this.value)this.setAttribute('readonly','')"
        />
      </div>
      <div class="hs-topbar-right">
        <div class="hs-notif-wrap">
          <div class="hs-notif-btn" id="hsNotifBtn" title="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="hs-notif-dot" id="hsNotifDot"></span>
          </div>

          <div class="hs-notif-panel" id="hsNotifPanel">
            <div class="hs-notif-header">
              <span class="hs-notif-title">Notifications</span>
              <button class="hs-notif-more" title="More options">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
            <div class="hs-notif-tabs">
              <button class="hs-notif-tab active" data-tab="all">All</button>
              <button class="hs-notif-tab" data-tab="unread">Unread</button>
            </div>
            <div class="hs-notif-body" id="hsNotifBody"></div>
            <div class="hs-notif-footer">
              <button class="hs-notif-prev-btn">See previous notifications</button>
            </div>
          </div>
        </div>
        <div class="hs-topbar-avatar" title="${user ? user.firstName + ' ' + user.lastName : ''}">${initials}</div>
      </div>
    `;

    // Wire up search callback if provided
    if (typeof onSearch === 'function') {
      const input = el.querySelector('#hsSearch');
      if (input) input.addEventListener('input', onSearch);
    }

    // ── Notification panel ──────────────────────────────────────────────────
    const sessionRole = user ? user.role : 'buyer';
    const NOTIFS_BY_ROLE = {
      buyer: [
        { id: 1, type: 'message', unread: true,  time: '2m ago',    msg: '<strong>Ramon Cruz</strong> sent you a message about a property.' },
        { id: 2, type: 'listing', unread: true,  time: '18m ago',   msg: '<strong>New listing</strong> in Poblacion matches your saved preferences.' },
        { id: 3, type: 'price',   unread: false, time: '2h ago',    msg: 'Price dropped on a saved listing — <strong>1-Bedroom Apartment near Town Proper</strong>.' },
        { id: 4, type: 'system',  unread: false, time: 'Yesterday', msg: 'Your account was successfully verified.' },
      ],
      seller: [
        { id: 1, type: 'message', unread: true,  time: '5m ago',    msg: '<strong>Maria Santos</strong> sent an inquiry about your listing in Poblacion.' },
        { id: 2, type: 'listing', unread: true,  time: '1h ago',    msg: 'Your listing <strong>2-Bedroom Unit in Sta. Maria</strong> has been approved.' },
        { id: 3, type: 'price',   unread: false, time: '3h ago',    msg: '3 buyers viewed your listing in Pulong Yantok today.' },
        { id: 4, type: 'system',  unread: false, time: 'Yesterday', msg: 'Your seller account has been successfully verified.' },
      ],
      admin: [
        { id: 1, type: 'listing', unread: true,  time: '10m ago',   msg: '<strong>New listing</strong> submitted by Juan Dela Cruz — pending approval.' },
        { id: 2, type: 'message', unread: true,  time: '45m ago',   msg: 'User <strong>Maria Santos</strong> filed a report against a listing.' },
        { id: 3, type: 'system',  unread: false, time: '4h ago',    msg: '2 listings flagged for review by the content filter.' },
        { id: 4, type: 'system',  unread: false, time: 'Yesterday', msg: 'System backup completed successfully.' },
      ],
      superadmin: [
        { id: 1, type: 'system',  unread: true,  time: '15m ago',   msg: 'Admin <strong>Jose Reyes</strong> approved 5 new listings.' },
        { id: 2, type: 'message', unread: true,  time: '2h ago',    msg: 'New admin account registered — pending super admin approval.' },
        { id: 3, type: 'system',  unread: false, time: 'Yesterday', msg: 'Monthly report generated for March 2026.' },
        { id: 4, type: 'system',  unread: false, time: '2 days ago', msg: 'Platform usage hit 500 active users this week.' },
      ],
    };
    const NOTIFS = NOTIFS_BY_ROLE[sessionRole] || NOTIFS_BY_ROLE.buyer;

    const ICONS = {
      listing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      price:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      system:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    };

    let activeTab = 'all';

    function renderNotifs(tab) {
      const body = document.getElementById('hsNotifBody');
      if (!body) return;
      const list = tab === 'unread' ? NOTIFS.filter(n => n.unread) : NOTIFS;
      const newItems    = list.filter(n => n.unread);
      const earlierItems = list.filter(n => !n.unread);

      let html = '';
      if (newItems.length) {
        html += `<div class="hs-notif-section-label"><span>New</span><span class="hs-notif-see-all" data-goto-notifs>See all</span></div>`;
        html += newItems.map(n => notifItem(n)).join('');
        if (earlierItems.length) html += `<div class="hs-notif-divider"></div>`;
      }
      if (earlierItems.length) {
        html += `<div class="hs-notif-section-label"><span>Earlier</span></div>`;
        html += earlierItems.map(n => notifItem(n)).join('');
      }
      if (!list.length) {
        html = `<div style="padding:28px 16px;text-align:center;font-size:13px;color:rgba(255,255,255,0.35);font-family:'Plus Jakarta Sans',sans-serif;">No notifications</div>`;
      }
      body.innerHTML = html;
    }

    function notifItem(n) {
      return `
        <div class="hs-notif-item ${n.unread ? 'unread' : ''}">
          <div class="hs-notif-avatar ${n.type === 'system' ? 'system' : ''}">${ICONS[n.type] || ''}</div>
          <div class="hs-notif-content">
            <div class="hs-notif-msg">${n.msg}</div>
            <div class="hs-notif-time">${n.time}</div>
          </div>
        </div>`;
    }

    renderNotifs('all');

    // Tab switching
    el.querySelectorAll('.hs-notif-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        el.querySelectorAll('.hs-notif-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.dataset.tab;
        renderNotifs(activeTab);
      });
    });

    // Navigate to full notifications page (shared helper)
    function goToNotifPage() {
      const p = window.location.pathname;
      let path;
      if (p.includes('/module/'))    path = 'notifications.html';
      else if (p.includes('/auth/')) path = '../module/' + sessionRole + '/notifications.html';
      else                           path = 'module/' + sessionRole + '/notifications.html';
      window.location.href = path;
    }

    // "See all" inside panel body (event delegation — re-rendered on tab switch)
    const notifBody = el.querySelector('#hsNotifBody');
    if (notifBody) {
      notifBody.addEventListener('click', e => {
        if (e.target.closest('[data-goto-notifs]')) goToNotifPage();
      });
    }

    // Wire "See previous notifications" to full notifications page
    const prevBtn = el.querySelector('.hs-notif-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', goToNotifPage);

    // Toggle panel
    const notifBtn   = el.querySelector('#hsNotifBtn');
    const notifPanel = el.querySelector('#hsNotifPanel');
    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', e => {
        e.stopPropagation();
        notifPanel.classList.toggle('open');
      });
      document.addEventListener('click', e => {
        if (!e.target.closest('.hs-notif-wrap')) notifPanel.classList.remove('open');
      });
    }

    // Hide dot when panel opened
    notifBtn && notifBtn.addEventListener('click', () => {
      const dot = el.querySelector('#hsNotifDot');
      if (dot) dot.style.display = 'none';
    });
  }

  global.HomeSureTopbar = { init };

})(window);
