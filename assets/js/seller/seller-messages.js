
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = getSession();
  if (!session || session.role !== 'seller') {
    window.location.href = '../../auth/signin.html';
  }

  // ── Components ──────────────────────────────────────────────────────────────
  HomeSureSidebar.init({ activePage: 'messages' });
  HomeSureTopbar.init({ placeholder: 'Search messages...' });

  // ── Find seller data ────────────────────────────────────────────────────────
  const sellerData = FAKE_USERS.find(u => u.id === session.id) || {};
  const isVerified = sellerData.accountStatus === 'verified';

  // ── Fake conversations ──────────────────────────────────────────────────────
  const CONVERSATIONS = [
    {
      id: 'conv-1',
      buyerName: 'Maria Santos',
      buyerInitials: 'MS',
      listingTitle: '1-Bedroom Apartment near Town Proper',
      listingId: 'prop-002',
      lastMsg: 'Is it still available?',
      time: '2m ago',
      unread: true,
      messages: [
        { from: 'buyer',  text: 'Hi, is the 1-bedroom apartment still available?', time: '10:02 AM' },
        { from: 'seller', text: "Yes it is! It's available starting April 15.", time: '10:05 AM' },
        { from: 'buyer',  text: 'Is it still available?', time: '10:08 AM' },
        { from: 'seller', text: "It's still open, feel free to schedule a visit.", time: '10:10 AM' },
      ],
    },
    {
      id: 'conv-2',
      buyerName: 'Jose Reyes',
      buyerInitials: 'JR',
      listingTitle: '3-Bedroom House for Sale in Pulong Yantok',
      listingId: 'prop-001',
      lastMsg: 'Thank you for the info!',
      time: '1h ago',
      unread: false,
      messages: [
        { from: 'buyer',  text: "Hello, I'm interested in the house in Pulong Yantok. What's the best price?", time: '9:15 AM' },
        { from: 'seller', text: "We can discuss, it's open for negotiation. Call me at 09191234567.", time: '9:20 AM' },
        { from: 'buyer',  text: 'Thank you for the info!', time: '9:35 AM' },
      ],
    },
    {
      id: 'conv-3',
      buyerName: 'Carlo Mendoza',
      buyerInitials: 'CM',
      listingTitle: 'Studio in Sonoma',
      listingId: 'prop-006',
      lastMsg: 'Can I schedule a viewing?',
      time: 'Yesterday',
      unread: true,
      messages: [
        { from: 'buyer',  text: "Good day, I'd like to inquire about the studio in Sonoma.", time: 'Yesterday 3:10 PM' },
        { from: 'seller', text: "Hello! It's fully furnished and available immediately.", time: 'Yesterday 3:22 PM' },
        { from: 'buyer',  text: 'Can I schedule a viewing?', time: 'Yesterday 3:45 PM' },
      ],
    },
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  let activeConvId = CONVERSATIONS[0].id;

  // ── Helpers ────────────────────────────────────────────────────────────────
  function renderConvItem(conv) {
    const isActive = conv.id === activeConvId;
    return `
      <div class="conv-item${isActive ? ' active' : ''}" data-conv-id="${conv.id}">
        <div class="conv-avatar">${conv.buyerInitials}</div>
        <div class="conv-meta">
          <div class="conv-name">${conv.buyerName}</div>
          <div class="conv-listing">${conv.listingTitle}</div>
          <div class="conv-preview">${conv.lastMsg}</div>
        </div>
        <div class="conv-right">
          <span class="conv-time">${conv.time}</span>
          ${conv.unread ? '<div class="unread-dot"></div>' : '<div style="width:8px;height:8px"></div>'}
        </div>
      </div>
    `;
  }

  function renderThread(conv) {
    const msgs = conv.messages.map(m => {
      if (m.from === 'buyer') {
        return `
          <div class="msg-row buyer">
            <div class="msg-bubble-avatar">${conv.buyerInitials}</div>
            <div class="msg-bubble buyer-bubble">${m.text}</div>
            <span class="msg-time">${m.time}</span>
          </div>`;
      } else {
        return `
          <div class="msg-row seller">
            <span class="msg-time">${m.time}</span>
            <div class="msg-bubble seller-bubble">${m.text}</div>
          </div>`;
      }
    }).join('');

    return `
      <div class="thread-topbar">
        <div>
          <div class="thread-buyer-name">${conv.buyerName}</div>
          <div class="thread-listing-ref">Re: ${conv.listingTitle}</div>
        </div>
        <a href="listings.html" class="view-listing-link">
          View Listing
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
      <div class="thread-messages" id="thread-messages-scroll">
        ${msgs}
      </div>
      <div class="thread-input-area">
        <textarea class="msg-input" id="msg-input-field" placeholder="Type a message..." rows="1"></textarea>
        <button class="send-btn" id="send-btn" title="Send">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    `;
  }

  function scrollToBottom() {
    const el = document.getElementById('thread-messages-scroll');
    if (el) el.scrollTop = el.scrollHeight;
  }

  function refreshConvList() {
    const el = document.getElementById('conv-items');
    if (el) el.innerHTML = CONVERSATIONS.map(renderConvItem).join('');
  }

  function refreshThread(conv) {
    const el = document.getElementById('thread-view');
    if (el) {
      el.innerHTML = renderThread(conv);
      bindSendEvent();
      scrollToBottom();
    }
  }

  function bindSendEvent() {
    const sendBtn = document.getElementById('send-btn');
    const inputField = document.getElementById('msg-input-field');
    if (!sendBtn || !inputField) return;

    function sendMessage() {
      const text = inputField.value.trim();
      if (!text) return;

      const conv = CONVERSATIONS.find(c => c.id === activeConvId);
      if (!conv) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      conv.messages.push({ from: 'seller', text, time: timeStr });
      conv.lastMsg = text;

      inputField.value = '';
      inputField.style.height = 'auto';

      refreshThread(conv);
      refreshConvList();
    }

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    inputField.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 90) + 'px';
    });
  }

  // ── Render: unverified state ───────────────────────────────────────────────
  function renderUnverifiedState() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div class="page-header-row">
        <div>
          <div class="page-title">Messages</div>
        </div>
      </div>

      <div class="amber-banner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>You don't have any messages yet. Messages from buyers will appear here once you publish your first listing.</p>
      </div>

      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00c9a7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <h3>No messages yet</h3>
        <p>Buyers will message you here when they're interested in your listings.</p>
        <a href="verification.html" class="btn-verify">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Complete Verification
        </a>
      </div>
    `;
  }

  // ── Render: verified state ─────────────────────────────────────────────────
  function renderVerifiedState() {
    const content = document.getElementById('main-content');
    content.style.overflow = 'hidden';
    content.style.padding = '22px 26px 26px';

    const activeConv = CONVERSATIONS.find(c => c.id === activeConvId);

    content.innerHTML = `
      <div class="page-header-row">
        <div>
          <div class="page-title">Messages</div>
          <div class="page-sub">Your conversations with buyers</div>
        </div>
      </div>

      <div class="msg-card">
        <div class="conv-list">
          <div class="conv-search-wrap">
            <input type="text" class="conv-search" id="conv-search" placeholder="Search conversations..." />
          </div>
          <div class="conv-items" id="conv-items">
            ${CONVERSATIONS.map(renderConvItem).join('')}
          </div>
        </div>

        <div class="thread-view" id="thread-view">
          ${renderThread(activeConv)}
        </div>
      </div>
    `;

    // Conversation click delegation
    document.getElementById('conv-items').addEventListener('click', function(e) {
      const item = e.target.closest('.conv-item');
      if (!item) return;
      const convId = item.dataset.convId;
      if (convId === activeConvId) return;

      activeConvId = convId;
      const conv = CONVERSATIONS.find(c => c.id === convId);
      if (!conv) return;
      conv.unread = false;

      refreshConvList();
      refreshThread(conv);
    });

    // Conversation search filter
    document.getElementById('conv-search').addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.conv-item').forEach(item => {
        const conv = CONVERSATIONS.find(c => c.id === item.dataset.convId);
        if (!conv) return;
        const match = !q ||
          conv.buyerName.toLowerCase().includes(q) ||
          conv.listingTitle.toLowerCase().includes(q) ||
          conv.lastMsg.toLowerCase().includes(q);
        item.style.display = match ? '' : 'none';
      });
    });

    bindSendEvent();
    scrollToBottom();
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  if (isVerified) {
    renderVerifiedState();
  } else {
    renderUnverifiedState();
  }
