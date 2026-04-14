
  const user = getSession();
  if (!user || user.role !== 'buyer') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'messages' });
  HomeSureTopbar.init({ placeholder: 'Search messages...' });

  // ── Fake conversations ─────────────────────────────────────────────────────
  const CONVS = [
    {
      id: 'c1', listingId: 'prop-002', sellerId: 'usr-003', unread: 2, dateLabel: 'Feb 27',
      messages: [
        { from: 'buyer',  text: "Hi! I'm interested in this apartment. Is it still available?", time: '9:15 AM', read: true },
        { from: 'seller', text: 'Hello! Thank you for your interest. Yes, the unit is still available.', time: '9:45 AM' },
        { from: 'buyer',  text: 'Great! Can I schedule a viewing this weekend?', time: '10:00 AM', read: true },
        { from: 'seller', text: 'Sure! Saturday or Sunday works for me. What time do you prefer?', time: '10:05 AM' },
      ],
    },
    {
      id: 'c2', listingId: 'prop-003', sellerId: 'usr-003', unread: 0, dateLabel: 'Feb 26',
      messages: [
        { from: 'buyer',  text: 'Hello, is the house still available for viewing?', time: '2:00 PM', read: true },
        { from: 'seller', text: 'Yes it is! The property also includes a garden area, perfect for families.', time: '2:30 PM' },
        { from: 'buyer',  text: 'That sounds great. What is the earliest move-in date?', time: '2:45 PM', read: true },
        { from: 'seller', text: 'We can arrange move-in as early as next month.', time: '3:00 PM' },
      ],
    },
    {
      id: 'c3', listingId: 'prop-009', sellerId: 'usr-004', unread: 0, dateLabel: 'Feb 25',
      messages: [
        { from: 'buyer',  text: 'Is there a possibility of negotiating the price?', time: '11:00 AM', read: true },
        { from: 'seller', text: 'The price is fixed for now but I can include some appliances.', time: '11:20 AM' },
        { from: 'buyer',  text: 'Thank you for the information!', time: '11:35 AM', read: true },
      ],
    },
  ];

  // ── Icons ──────────────────────────────────────────────────────────────────
  const iconCheck2 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const iconSend   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  const iconClip   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;

  const iconVerify = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  let activeConvId = null;

  // ── Render conversation list ───────────────────────────────────────────────
  function renderConvList(filter = '') {
    const list = document.getElementById('convList');
    const filtered = CONVS.filter(c => {
      const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
      const s = FAKE_USERS.find(x => x.id === c.sellerId);
      const q = filter.toLowerCase();
      return !q || (l && l.title.toLowerCase().includes(q)) || (s && (s.firstName + ' ' + s.lastName).toLowerCase().includes(q));
    });

    list.innerHTML = filtered.map(c => {
      const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
      const s = FAKE_USERS.find(x => x.id === c.sellerId);
      if (!l || !s) return '';
      const last = c.messages[c.messages.length - 1];
      const sellerName = s.firstName + ' ' + s.lastName;
      return `
        <div class="conv-item ${c.id === activeConvId ? 'active' : ''}"
             onclick="openConv('${c.id}')">
          <img class="conv-avatar" src="${l.images[0]}" alt="${l.title}" />
          <div class="conv-info">
            <div class="conv-name">
              ${l.title.length > 22 ? l.title.slice(0, 22) + '…' : l.title}
              <span class="conv-verified">${iconVerify}</span>
            </div>
            <div class="conv-preview">${sellerName} · ${last.text.slice(0, 32)}${last.text.length > 32 ? '…' : ''}</div>
          </div>
          <div class="conv-meta">
            <span class="conv-time">${c.dateLabel}</span>
            ${c.unread > 0 ? `<span class="conv-badge">${c.unread}</span>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function filterConvs() {
    renderConvList(document.getElementById('convSearch').value);
  }

  // ── Open a conversation ────────────────────────────────────────────────────
  function openConv(id) {
    activeConvId = id;
    const c = CONVS.find(x => x.id === id);
    const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
    const s = FAKE_USERS.find(x => x.id === c.sellerId);
    c.unread = 0;

    renderConvList(document.getElementById('convSearch').value);

    const isRent     = l.listingFor === 'rent';
    const price      = '₱' + l.price.toLocaleString('en-PH');
    const sellerName = s.firstName + ' ' + s.lastName;

    const messagesHtml = `
      <div class="msg-date-divider">${c.dateLabel}</div>` +
      c.messages.map(m => `
        <div class="msg-row ${m.from}">
          <div class="msg-bubble">${m.text}</div>
          <div class="msg-time">
            ${m.time}
            ${m.from === 'buyer' && m.read ? iconCheck2 : ''}
          </div>
        </div>`).join('');

    document.getElementById('chatPanel').innerHTML = `
      <div class="chat-header">
        <img class="chat-header-img" src="${l.images[0]}" alt="${l.title}" />
        <div class="chat-header-info">
          <div class="chat-header-title">${l.title}</div>
          <div class="chat-header-seller">${iconVerify} ${sellerName}</div>
        </div>
        <div class="chat-header-price">
          ${price}
          ${isRent ? `<span>/month</span>` : ''}
        </div>
      </div>

      <div class="chat-messages" id="chatMessages">${messagesHtml}</div>

      <div class="chat-input-area">
        <button class="chat-input-btn" title="Attach file">${iconClip}</button>
        <input class="chat-input" id="chatInput" placeholder="Type a message..."
               onkeydown="if(event.key==='Enter') sendMessage('${id}')" />
        <button class="chat-send-btn" onclick="sendMessage('${id}')">${iconSend}</button>
      </div>
    `;

    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Send a message ─────────────────────────────────────────────────────────
  function sendMessage(convId) {
    const input = document.getElementById('chatInput');
    const text  = input.value.trim();
    if (!text) return;

    const c = CONVS.find(x => x.id === convId);
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    c.messages.push({ from: 'buyer', text, time, read: false });
    input.value = '';

    const msgs = document.getElementById('chatMessages');
    const row  = document.createElement('div');
    row.className = 'msg-row buyer';
    row.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${time}</div>`;
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  renderConvList();
