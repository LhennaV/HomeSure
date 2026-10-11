// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Buyer Messages
//  Depends on: config.js, session.js, data.js (HS.messages), sidebar.js, topbar.js
//
//  A conversation is the pair of people. Row Level Security only ever returns messages the
//  signed-in user sent or received, so there is nothing to filter by hand here.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  const user = getSession();
  if (!user || user.role !== 'buyer') {
    window.location.href = '../../auth/signin.html';
    return;
  }

  HomeSureSidebar.init({ activePage: 'messages' });
  HomeSureTopbar.init({ placeholder: 'Search messages...' });

  // ── Icons ──────────────────────────────────────────────────────────────────
  const iconCheck2 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const iconSend   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  const iconClip   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;
  const iconVerify = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  // ── State ──────────────────────────────────────────────────────────────────
  let convs = [];            // from HS.messages.conversations()
  let activeConvId = null;   // the other person's id

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' });
  const fmtDay  = (iso) => new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });

  // ── Conversation list ──────────────────────────────────────────────────────
  function renderConvList(filter = '') {
    const list = document.getElementById('convList');
    if (!list) return;

    const q = (filter || '').toLowerCase();
    const filtered = convs.filter((c) => {
      if (!q) return true;
      const title = c.listing ? c.listing.title : '';
      const name = c.other ? c.other.name : '';
      return title.toLowerCase().includes(q) || name.toLowerCase().includes(q);
    });

    if (!filtered.length) {
      list.innerHTML = `<div style="padding:28px 18px;text-align:center;color:var(--muted);font-size:13px">
        ${convs.length ? 'No conversations match your search.' : 'No messages yet. Open a listing and message the seller.'}
      </div>`;
      return;
    }

    list.innerHTML = filtered.map((c) => {
      const name = c.other ? c.other.name : 'HomeSure user';
      const title = c.listing ? c.listing.title : name;
      const preview = previewOf(c.lastMessage);
      const thumb = c.listing ? HS.cover(c.listing) : HS.PLACEHOLDER_IMG;
      return `
        <div class="conv-item ${c.id === activeConvId ? 'active' : ''}"
             onclick="openConv('${c.id}')">
          <img class="conv-avatar" src="${esc(thumb)}" alt="${esc(title)}" />
          <div class="conv-info">
            <div class="conv-name">
              ${esc(title.length > 22 ? title.slice(0, 22) + '…' : title)}
              ${c.other && c.other.verified ? `<span class="conv-verified">${iconVerify}</span>` : ''}
            </div>
            <div class="conv-preview">${esc(name)} · ${esc(preview.slice(0, 32))}${preview.length > 32 ? '…' : ''}</div>
          </div>
          <div class="conv-meta">
            <span class="conv-time">${esc(fmtDay(c.updatedAt))}</span>
            ${c.unread > 0 ? `<span class="conv-badge">${c.unread}</span>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function previewOf(m) {
    if (!m) return '';
    if (m.type === 'viewing-request') return 'Viewing request';
    if (m.type === 'viewing-response') return 'Viewing response';
    return m.text || '';
  }

  window.filterConvs = function () {
    const box = document.getElementById('convSearch');
    renderConvList(box ? box.value : '');
  };

  // ── One message ────────────────────────────────────────────────────────────
  function renderMessage(m, me) {
    const mine = m.senderId === me;
    const side = mine ? 'buyer' : 'seller';

    if (m.type === 'viewing-request' || m.type === 'viewing-response') {
      const d = m.viewingData || {};
      const when = [d.requestedDate || d.proposedDate, d.requestedTime || d.proposedTime].filter(Boolean).join(' at ');
      const notes = d.buyerNotes || d.sellerNotes;
      return `
        <div class="msg-row ${side}">
          <div class="msg-bubble" style="border-left:3px solid var(--teal)">
            <div style="font-weight:700;margin-bottom:4px">
              ${m.type === 'viewing-request' ? 'Viewing request' : 'Viewing response'}
            </div>
            ${d.listingTitle ? `<div style="font-size:12px;opacity:.8">${esc(d.listingTitle)}</div>` : ''}
            ${when ? `<div style="font-size:12px;margin-top:2px">${esc(when)}</div>` : ''}
            ${notes ? `<div style="font-size:12px;margin-top:6px;opacity:.85">${esc(notes)}</div>` : ''}
            ${m.status ? `<div style="font-size:11px;margin-top:6px;text-transform:capitalize;opacity:.7">${esc(m.status)}</div>` : ''}
          </div>
          <div class="msg-time">${esc(fmtTime(m.timestamp))}</div>
        </div>`;
    }

    return `
      <div class="msg-row ${side}">
        <div class="msg-bubble">${esc(m.text)}</div>
        <div class="msg-time">
          ${esc(fmtTime(m.timestamp))}
          ${mine && m.read ? iconCheck2 : ''}
        </div>
      </div>`;
  }

  // ── Open a conversation ────────────────────────────────────────────────────
  window.openConv = async function (otherId) {
    activeConvId = otherId;
    const c = convs.find((x) => x.id === otherId);
    if (!c) return;

    const me = user.id;
    const name = c.other ? c.other.name : 'HomeSure user';
    const l = c.listing;
    const isRent = l && l.listingFor === 'rent';
    const price = l ? '₱' + Number(l.price).toLocaleString('en-PH') : '';

    // Group by day so the divider means something.
    let lastDay = '';
    const messagesHtml = c.messages.map((m) => {
      const day = fmtDay(m.timestamp);
      const divider = day !== lastDay ? `<div class="msg-date-divider">${esc(day)}</div>` : '';
      lastDay = day;
      return divider + renderMessage(m, me);
    }).join('');

    const iconBack = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;

    document.getElementById('chatPanel').innerHTML = `
      <div class="chat-header">
        <button class="chat-back-btn" onclick="closeMobileChat()" aria-label="Back">${iconBack}</button>
        <img class="chat-header-img" src="${esc(l ? HS.cover(l) : HS.PLACEHOLDER_IMG)}" alt="${esc(l ? l.title : name)}" />
        <div class="chat-header-info">
          <div class="chat-header-title">${esc(l ? l.title : name)}</div>
          <div class="chat-header-seller">${c.other && c.other.verified ? iconVerify : ''} ${esc(name)}</div>
        </div>
        <div class="chat-header-price">
          ${esc(price)}
          ${isRent ? `<span>/month</span>` : ''}
        </div>
      </div>

      <div class="chat-messages" id="chatMessages">${messagesHtml}</div>

      <div class="chat-input-area">
        <button class="chat-input-btn" title="Attach file">${iconClip}</button>
        <input class="chat-input" id="chatInput" placeholder="Type a message..."
               onkeydown="if(event.key==='Enter') sendMessage('${c.id}')" />
        <button class="chat-send-btn" onclick="sendMessage('${c.id}')">${iconSend}</button>
      </div>
    `;

    document.querySelector('.messages-layout').classList.add('chat-open');
    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;

    // Their messages are now on screen, so mark them read.
    if (c.unread > 0) {
      try {
        await HS.messages.markRead(otherId);
        c.messages.forEach((m) => { if (m.receiverId === me) m.read = true; });
        c.unread = 0;
        renderConvList(document.getElementById('convSearch')?.value || '');
      } catch (err) {
        console.error('Could not mark messages read:', err);
      }
    }
  };

  window.closeMobileChat = function () {
    document.querySelector('.messages-layout').classList.remove('chat-open');
    activeConvId = null;
    renderConvList(document.getElementById('convSearch')?.value || '');
  };

  // ── Send ───────────────────────────────────────────────────────────────────
  window.sendMessage = async function (otherId) {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const c = convs.find((x) => x.id === otherId);
    if (!c) return;

    input.value = '';
    input.disabled = true;

    try {
      const sent = await HS.messages.send({
        to: otherId,
        body: text,
        propertyId: c.listing ? c.listing.id : null,
      });
      c.messages.push(sent);
      c.lastMessage = sent;
      c.updatedAt = sent.timestamp;

      const msgs = document.getElementById('chatMessages');
      if (msgs) {
        msgs.insertAdjacentHTML('beforeend', renderMessage(sent, user.id));
        msgs.scrollTop = msgs.scrollHeight;
      }
      renderConvList(document.getElementById('convSearch')?.value || '');
    } catch (err) {
      input.value = text;                       // give the text back rather than losing it
      hsToast('Could not send: ' + err.message, 'error');
    } finally {
      input.disabled = false;
      input.focus();
    }
  };

  // ── Empty state ────────────────────────────────────────────────────────────
  function showEmptyState(message) {
    const chatPanel = document.getElementById('chatPanel');
    if (!chatPanel) return;
    chatPanel.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:40px;text-align:center;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64" style="opacity:0.3;margin-bottom:20px;">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <h3 style="font-size:18px;font-weight:700;color:var(--text);margin-bottom:8px;">${esc(message || 'No conversation selected')}</h3>
        <p style="font-size:13px;color:var(--muted);max-width:300px;">Select a conversation from the list to view messages</p>
      </div>`;
  }

  // Payments are not connected to the chat yet; keep the old hook from throwing.
  window.payFromChat = function () {
    hsToast('Paying from chat is not connected yet.');
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  (async function load() {
    const list = document.getElementById('convList');
    if (list) list.innerHTML = `<div style="padding:28px 18px;text-align:center;color:var(--muted);font-size:13px">Loading…</div>`;
    showEmptyState();

    try {
      convs = await HS.messages.conversations();
    } catch (err) {
      console.error('Failed to load messages:', err);
      if (list) list.innerHTML = `<div style="padding:28px 18px;text-align:center;color:var(--muted);font-size:13px">Could not load your messages. Please try again.</div>`;
      return;
    }
    renderConvList();
  })();
})();
