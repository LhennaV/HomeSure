(function() {
  // DEMO MODE: Create test seller session if not logged in
  let user = getSession();
  if (!user || user.role !== 'seller') {
    // Create demo seller session
    const demoUser = {
      id: 'usr-003',
      role: 'seller',
      firstName: 'Juan',
      lastName: 'Santos',
      email: 'juan.santos@example.com',
      phone: '09187654321',
      verified: true,
      accountStatus: 'verified'
    };
    sessionStorage.setItem('homesure_user', JSON.stringify(demoUser));
    user = demoUser;
  }

  HomeSureSidebar.init({ activePage: 'messages' });
  HomeSureTopbar.init({ placeholder: 'Search messages...' });

  const sellerData = FAKE_USERS.find(u => u.id === user.id) || {};
  const isVerified = sellerData.accountStatus === 'verified';

  // ── Fake conversations ─────────────────────────────────────────────────────
  const CONVS = [
    {
      id: 'c1', listingId: 'prop-002', buyerName: 'Maria Santos', unread: 1, dateLabel: 'Today',
      messages: [
        { from: 'buyer',  text: "Hi! I'm interested in this apartment. Is it still available?", time: '9:45 AM', read: true },
        { from: 'seller', text: "Yes it is! It's available starting April 15.", time: '9:50 AM' },
        { from: 'seller', text: 'Here is your payment request for June 2026:', time: '10:05 AM' },
        {
          from: 'seller', type: 'payment_request', time: '10:05 AM',
          payment: {
            id: 'PR-001', property: '1-Bedroom Apartment for Rent near Town Proper',
            period: 'June 2026', amount: 15000,
            methods: ['GCash', 'Bank Transfer', 'Cash'],
            status: 'paid',
          },
        },
        // Buyer submitted proof — this is what appears after buyer uploads receipt
        {
          from: 'buyer', type: 'payment_proof', time: '10:22 AM',
          proof: {
            id: 'PROOF-001', reqId: 'PR-001',
            method: 'GCash', amount: 15000,
            period: 'June 2026',
            property: '1-Bedroom Apartment for Rent near Town Proper',
            fileName: 'gcash_receipt_june2026.jpg',
            ref: 'REF-AB3X9K',
            status: 'pending',
          },
        },
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
    {
      id: 'c4', listingId: 'prop-003', buyerName: 'Anna Reyes', unread: 0, dateLabel: 'Feb 24',
      messages: [
        { from: 'buyer',  text: 'Hello po! Interested ako sa 2BR apartment.', time: '10:00 AM', read: true },
        { from: 'seller', text: 'Hi Anna! Yes available pa. ₱12,000/month with parking.', time: '10:15 AM' },
        { from: 'buyer',  text: 'Perfect! When can I move in?', time: '10:20 AM', read: true },
        { from: 'seller', text: 'Anytime this week. Here is your payment request:', time: '10:25 AM' },
        {
          from: 'seller', type: 'payment_request', time: '10:25 AM',
          payment: {
            id: 'PR-004', property: 'Modern 2BR Apartment',
            period: 'June 2026', amount: 12000,
            methods: ['GCash', 'Bank Transfer', 'Cash'],
            status: 'confirmed',
          },
        },
        {
          from: 'buyer', type: 'payment_proof', time: '11:00 AM',
          proof: {
            id: 'PROOF-004', reqId: 'PR-004',
            method: 'GCash', amount: 12000,
            period: 'June 2026',
            property: 'Modern 2BR Apartment',
            fileName: 'gcash_12k_june.jpg',
            ref: 'REF-GC7M4P',
            status: 'confirmed',
          },
        },
        { from: 'seller', text: 'Received and confirmed! Welcome to the building Anna!', time: '11:10 AM' },
        { from: 'buyer',  text: 'Salamat po! See you this weekend.', time: '11:15 AM', read: true },
      ],
    },
    {
      id: 'c5', listingId: 'prop-009', buyerName: 'David Cruz', unread: 0, dateLabel: 'Feb 23',
      messages: [
        { from: 'buyer',  text: 'Available pa ba yung house and lot?', time: '2:00 PM', read: true },
        { from: 'seller', text: 'Yes po! ₱25,000/month. 3BR, 2 bath, with garage.', time: '2:10 PM' },
        { from: 'seller', text: 'Sending payment request for first month + deposit:', time: '2:15 PM' },
        {
          from: 'seller', type: 'payment_request', time: '2:15 PM',
          payment: {
            id: 'PR-005', property: 'Spacious Family Home',
            period: 'June 2026 + Deposit', amount: 50000,
            methods: ['GCash', 'Bank Transfer', 'Cash'],
            status: 'pending',
          },
        },
        { from: 'buyer',  text: 'Ok po, let me check my budget first.', time: '2:30 PM', read: true },
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

  // ── Render payment request card (seller's own sent card) ──────────────────
  function renderSellerPayReqCard(m) {
    const p = m.payment;
    const statusMap = {
      pending:   { cls: 'pr-status-pending', label: 'Awaiting Payment'   },
      paid:      { cls: 'pr-status-paid',    label: 'Proof Submitted'     },
      confirmed: { cls: 'pr-status-done',    label: 'Confirmed — Paid ✓' },
    };
    const s = statusMap[p.status] || statusMap.pending;
    return `
      <div class="msg-row buyer">
        <div class="payment-request-card">
          <div class="pr-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Payment Request (sent)
            <span class="pr-status ${s.cls}">${s.label}</span>
          </div>
          <div class="pr-property">${p.property}</div>
          <div class="pr-period">Period: ${p.period}</div>
          <div class="pr-amount">₱${p.amount.toLocaleString('en-PH')}</div>
        </div>
        <div class="msg-time">${m.time}</div>
      </div>`;
  }

  // ── Render buyer's proof card (seller side — with Confirm / Reject) ────────
  function renderProofCardSeller(m, convId) {
    const p = m.proof;
    const statusMap = {
      pending:   { cls: 'pr-status-pending', label: 'Proof Received — Action Required' },
      confirmed: { cls: 'pr-status-done',    label: 'Confirmed — Marked as Paid ✓'    },
      rejected:  { cls: 'pr-status-rej',     label: 'Rejected'                         },
    };
    const s = statusMap[p.status] || statusMap.pending;

    const actions = p.status === 'pending' ? `
      <div class="proof-actions">
        <button class="proof-btn proof-btn-confirm" onclick="confirmProof('${convId}','${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
          Confirm Receipt
        </button>
        <button class="proof-btn proof-btn-reject" onclick="rejectProof('${convId}','${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Reject
        </button>
      </div>` : '';

    return `
      <div class="msg-row seller" id="proof-card-${p.id}">
        <div class="payment-request-card proof-card">
          <div class="pr-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Proof of Payment
            <span class="pr-status ${s.cls}">${s.label}</span>
          </div>
          <div class="pr-property">${p.property}</div>
          <div class="pr-period">Period: ${p.period}</div>
          <div class="pr-amount">₱${p.amount.toLocaleString('en-PH')}</div>
          <div class="proof-detail-row">
            <span class="proof-detail-label">Method</span>
            <span class="proof-detail-val">${p.method}</span>
          </div>
          <div class="proof-detail-row">
            <span class="proof-detail-label">Reference</span>
            <span class="proof-detail-val" style="font-family:monospace;font-size:12px;">${p.ref}</span>
          </div>
          <div class="proof-file-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            ${p.fileName}
          </div>
          ${actions}
        </div>
        <div class="msg-time">${m.time}</div>
      </div>`;
  }

  // ── Confirm / Reject proof ────────────────────────────────────────────────
  window.confirmProof = function (convId, proofId) {
    const c   = CONVS.find(x => x.id === convId);
    const msg = c?.messages.find(m => m.proof?.id === proofId);
    if (!msg) return;
    msg.proof.status = 'confirmed';

    // Also mark the original payment request as confirmed
    const req = c.messages.find(m => m.payment?.id === msg.proof.reqId);
    if (req) req.payment.status = 'confirmed';

    // Re-render just the proof card in place
    const card = document.getElementById('proof-card-' + proofId);
    if (card) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderProofCardSeller(msg, convId);
      card.replaceWith(wrapper.firstElementChild);
    }

    // Append a system confirmation message
    const msgs = document.getElementById('chatMessages');
    if (msgs) {
      const row = document.createElement('div');
      row.className = 'msg-date-divider';
      row.style.cssText = 'color:#22c55e;font-weight:700;font-size:12px;';
      row.textContent = '✓ Payment confirmed. Transaction marked as Paid.';
      msgs.appendChild(row);
      msgs.scrollTop = msgs.scrollHeight;
    }
  };

  window.rejectProof = function (convId, proofId) {
    const c   = CONVS.find(x => x.id === convId);
    const msg = c?.messages.find(m => m.proof?.id === proofId);
    if (!msg) return;
    msg.proof.status = 'rejected';

    const card = document.getElementById('proof-card-' + proofId);
    if (card) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderProofCardSeller(msg, convId);
      card.replaceWith(wrapper.firstElementChild);
    }

    const msgs = document.getElementById('chatMessages');
    if (msgs) {
      const row = document.createElement('div');
      row.className = 'msg-date-divider';
      row.style.cssText = 'color:#f87171;font-weight:700;font-size:12px;';
      row.textContent = 'Proof rejected. Buyer will be notified to resubmit.';
      msgs.appendChild(row);
      msgs.scrollTop = msgs.scrollHeight;
    }
  };

  // ── Open a conversation ────────────────────────────────────────────────────
  function openConv(id) {
    activeConvId = id;
    const c = CONVS.find(x => x.id === id);
    const l = FAKE_LISTINGS.find(x => x.id === c.listingId);
    c.unread = 0;

    renderConvList(document.getElementById('convSearch').value);

    const isRent  = l.listingFor === 'rent';
    const price   = '₱' + l.price.toLocaleString('en-PH');

    const messagesHtml = `
      <div class="msg-date-divider">${c.dateLabel}</div>` +
      c.messages.map(m => {
        if (m.type === 'payment_request') return renderSellerPayReqCard(m);
        if (m.type === 'payment_proof')   return renderProofCardSeller(m, id);
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
        <button class="chat-pay-req-btn" onclick="openPayReqModal('${id}')" title="Send Payment Request">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          Request
        </button>
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

  // ── Payment Request (seller sends to buyer) ────────────────────────────────
  let payReqConvId = null;

  window.openPayReqModal = function (convId) {
    payReqConvId = convId;
    const c = CONVS.find(x => x.id === convId);
    const l = FAKE_LISTINGS.find(x => x.id === c?.listingId);
    if (l) {
      document.getElementById('prPropertyName').textContent = l.title;
      document.getElementById('prAmount').value = l.price;
    }
    const now = new Date();
    document.getElementById('prPeriod').value =
      now.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });
    document.getElementById('payReqModal').style.display = 'flex';
  };

  window.closePayReqModal = function () {
    document.getElementById('payReqModal').style.display = 'none';
  };

  window.sendPaymentRequest = function (e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById('prAmount').value, 10);
    const period = document.getElementById('prPeriod').value.trim();
    if (!amount || !period || !payReqConvId) return;

    const c = CONVS.find(x => x.id === payReqConvId);
    const l = FAKE_LISTINGS.find(x => x.id === c?.listingId);
    const now  = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    // Push intro message
    const introMsg = { from: 'seller', text: `Here is your payment request for ${period}:`, time };
    c.messages.push(introMsg);

    // Push payment request card
    const prMsg = {
      from: 'seller', type: 'payment_request', time,
      payment: {
        id: 'PR-' + Date.now(),
        property: l?.title || 'Your rental unit',
        period,
        amount,
        methods: ['GCash', 'Bank Transfer', 'Cash'],
        status: 'pending',
      },
    };
    c.messages.push(prMsg);

    closePayReqModal();

    // Re-render the chat
    const msgs = document.getElementById('chatMessages');
    if (msgs) {
      const introRow = document.createElement('div');
      introRow.className = 'msg-row buyer';
      introRow.innerHTML = `<div class="msg-bubble">${introMsg.text}</div><div class="msg-time">${time}</div>`;
      msgs.appendChild(introRow);

      const cardRow = document.createElement('div');
      cardRow.innerHTML = `
        <div class="msg-row seller">
          <div class="payment-request-card">
            <div class="pr-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Payment Request
              <span class="pr-status pr-status-pending">Awaiting Payment</span>
            </div>
            <div class="pr-property">${prMsg.payment.property}</div>
            <div class="pr-period">Period: ${period}</div>
            <div class="pr-amount">₱${amount.toLocaleString('en-PH')}</div>
            <div class="pr-methods">
              <span class="pr-method-pill">💙 GCash</span>
              <span class="pr-method-pill">🏦 Bank Transfer</span>
              <span class="pr-method-pill">💵 Cash</span>
            </div>
            <div class="pr-waiting" style="margin-top:6px;font-size:12px;color:rgba(255,255,255,0.45);text-align:center;padding:8px 0;">
              Sent — waiting for buyer payment
            </div>
          </div>
          <div class="msg-time">${time}</div>
        </div>`;
      msgs.appendChild(cardRow.firstElementChild);
      msgs.scrollTop = msgs.scrollHeight;
    }
  };

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
})();
