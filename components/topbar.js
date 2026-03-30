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
        />
      </div>
      <div class="hs-topbar-right">
        <div class="hs-notif-btn" title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="hs-notif-dot"></span>
        </div>
        <div class="hs-topbar-avatar" title="${user ? user.firstName + ' ' + user.lastName : ''}">${initials}</div>
      </div>
    `;

    // Wire up search callback if provided
    if (typeof onSearch === 'function') {
      const input = el.querySelector('#hsSearch');
      if (input) input.addEventListener('input', onSearch);
    }
  }

  global.HomeSureTopbar = { init };

})(window);
