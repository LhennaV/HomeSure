
  const user = getSession();
  if (!user || user.role !== 'seller') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'messages' });
  HomeSureTopbar.init({ placeholder: 'Search messages...' });

  const sellerData = FAKE_USERS.find(u => u.id === user.id) || {};
  const isVerified = sellerData.accountStatus === 'verified';

  // ── Fake conversations ─────────────────────────────────────────────────────
  const CONVS = [
    {
      id: 'c1', listingId: 'prop-002', buyerName: 'Maria Santos', unread: 2, dateLabel: 'Feb 27',
      messages: [
        { from: 'buyer',  text: "Hi! I'm interested in this apartment. Is it still available?", time: '10:02 AM', read: true },
        { from: 'seller', text: "Yes it is! It's available starting April 15.", time: '10:05 AM' },
        { from: 'buyer',  text: 'Is it still available?', time: '10:08 AM', read: true },
        { from: 'seller', text: "It's still open, feel free to schedule a visit.", time: '10:10 AM' },
      ],
    },
    {
      id: 'c2', listingId: 'prop-001', buyerName: 'Jose Reyes', unread: 0, dateLabel: 'Feb 26',
      messages: [
        { from: 'buyer',  text: "Hello, I'm interested in the house in Pulong Yantok. What's the best price?", time: '9:15 AM', read: true },
        { from: 'seller', text: "We can discuss, it's open for negotiation.", time: '9:20 AM' },
        { from: 'buyer',  text: 'Thank you for the info!', time: '9:35 AM', read: true },
      ],
    },
    {
      id: 'c3', listingId: 'prop-006', buyerName: 'Carlo Mendoza', unread: 1, dateLabel: 'Feb 25',
      messages: [
        { from: 'buyer',  text: "Good day, I'd like to inquire about the studio in Sonoma.", time: 'Yesterday 3:10 PM', read: true },
        { from: 'seller', text: "Hello! It's fully furnished and available immediately.", time: 'Yesterday 3:22 PM' },
        { from: 'buyer',  text: 'Can I schedule a viewing?', time: 'Yesterday 3:45 PM', read: false },
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

    if (!isVerified) {
      list.innerHTML = '';
      return;
    }

    const filtered = CONVS.filter(c => {
      const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
      const q = filter.toLowerCase();
      return !q
        || c.buyerName.toLowerCase().includes(q)
        || (l && l.title.toLowerCase().includes(q));
    });

    list.innerHTML = filtered.map(c => {
      const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
      if (!l) return '';
      const last = c.messages[c.messages.length - 1];
      return `
        <div class="conv-item ${c.id === activeConvId ? 'active' : ''}"
             onclick="openConv('${c.id}')">
          <img class="conv-avatar" src="${l.images[0]}" alt="${l.title}" />
          <div class="conv-info">
            <div class="conv-name">
              ${c.buyerName}
              <span class="conv-verified">${iconVerify}</span>
            </div>
            <div class="conv-preview">${l.title.length > 20 ? l.title.slice(0, 20) + '…' : l.title} · ${last.text.slice(0, 28)}${last.text.length > 28 ? '…' : ''}</div>
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
    c.unread = 0;

    renderConvList(document.getElementById('convSearch').value);

    const isRent  = l.listingFor === 'rent';
    const price   = '₱' + l.price.toLocaleString('en-PH');

    // Seller messages appear on the right (use 'buyer' CSS class = teal/right)
    // Buyer messages appear on the left (use 'seller' CSS class = card/left)
    const messagesHtml = `
      <div class="msg-date-divider">${c.dateLabel}</div>` +
      c.messages.map(m => {
        const side = m.from === 'seller' ? 'buyer' : 'seller';
        return `
          <div class="msg-row ${side}">
            <div class="msg-bubble">${m.text}</div>
            <div class="msg-time">
              ${m.time}
              ${m.from === 'seller' && m.read ? iconCheck2 : ''}
            </div>
          </div>`;
      }).join('');

    const iconBack = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;

    document.getElementById('chatPanel').innerHTML = `
      <div class="chat-header">
        <button class="chat-back-btn" onclick="closeMobileChat()" aria-label="Back">${iconBack}</button>
        <img class="chat-header-img" src="${l.images[0]}" alt="${l.title}" />
        <div class="chat-header-info">
          <div class="chat-header-title">${l.title}</div>
          <div class="chat-header-seller">${iconVerify} ${c.buyerName}</div>
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

    // Mobile: slide into chat view
    document.querySelector('.messages-layout').classList.add('chat-open');

    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function closeMobileChat() {
    document.querySelector('.messages-layout').classList.remove('chat-open');
  }

  // ── Send a message ─────────────────────────────────────────────────────────
  function sendMessage(convId) {
    const input = document.getElementById('chatInput');
    const text  = input.value.trim();
    if (!text) return;

    const c = CONVS.find(x => x.id === convId);
    const now  = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    c.messages.push({ from: 'seller', text, time, read: false });
    input.value = '';

    const msgs = document.getElementById('chatMessages');
    const row  = document.createElement('div');
    row.className = 'msg-row buyer'; // seller messages on right
    row.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${time}</div>`;
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Unverified state ───────────────────────────────────────────────────────
  if (!isVerified) {
    document.getElementById('chatPanel').innerHTML = `
      <div class="chat-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:42px;height:42px;opacity:0.35"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <p>Complete your verification to receive messages from buyers.</p>
        <a href="verification.html" style="margin-top:10px;display:inline-flex;align-items:center;gap:6px;background:#00c9a7;color:#fff;font-size:13px;font-weight:700;border-radius:9px;padding:9px 20px;text-decoration:none;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Complete Verification
        </a>
      </div>
    `;
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  renderConvList();
