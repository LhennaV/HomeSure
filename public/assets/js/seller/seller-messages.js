// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Seller Messages
//  Depends on: config.js, session.js, data.js (HS.messages, HS.viewing), sidebar.js, topbar.js
//
//  A conversation is the pair of people. Row Level Security only ever returns messages the
//  signed-in user sent or received, so there is nothing to filter by hand here.
//
//  Viewing requests can be answered straight from the chat; the answer is written to
//  viewing_requests and mirrored back into the thread. Payment requests are not connected to the
//  database yet, so those buttons explain themselves rather than pretending to work.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  const user = getSession();
  if (!user || user.role !== 'seller') {
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
  let convs = [];
  let viewings = [];         // so a card can show the request's current status
  let activeConvId = null;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' });
  const fmtDay  = (iso) => new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  const fmtDate = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : '');
  function fmtClock(t) {
    if (!t) return '';
    const [h, m] = String(t).split(':');
    const hour = parseInt(h, 10);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  }

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
        ${convs.length ? 'No conversations match your search.' : 'No messages yet. Buyers who contact you will appear here.'}
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
            <div class="conv-name">${esc(name)}</div>
            <div class="conv-preview">${esc(title.slice(0, 20))} · ${esc(preview.slice(0, 28))}${preview.length > 28 ? '…' : ''}</div>
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


  // Only the search box uses this. filterConvs() itself stays immediate, so the first render and
  // every call from code are unaffected.
  window.filterConvsSoon = hsDebounce(() => window.filterConvs(), 200);

  window.filterConvs = function () {
    const box = document.getElementById('convSearch');
    renderConvList(box ? box.value : '');
  };

  // ── One message ────────────────────────────────────────────────────────────
  function renderMessage(m, me) {
    const mine = m.senderId === me;
    const side = mine ? 'seller' : 'buyer';

    if (m.type === 'viewing-request') return renderViewingRequestCard(m, side);
    if (m.type === 'viewing-response') return renderViewingResponseCard(m, side);

    return `
      <div class="msg-row ${side}">
        <div class="msg-bubble">${esc(m.text)}</div>
        <div class="msg-time">
          ${esc(fmtTime(m.timestamp))}
          ${mine && m.read ? iconCheck2 : ''}
        </div>
      </div>`;
  }

  // A buyer's request, with the answer buttons while it is still pending.
  function renderViewingRequestCard(m, side) {
    const d = m.viewingData || {};
    const req = viewings.find((v) => v.id === m.viewingRequestId);
    const status = req ? req.status : (m.status || 'pending');
    const when = [fmtDate(d.requestedDate), fmtClock(d.requestedTime)].filter(Boolean).join(' at ');

    const actions = status === 'pending' && m.viewingRequestId
      ? `<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
           <button class="pr-pay-btn" onclick="answerViewing('${m.viewingRequestId}','confirmed')">Confirm</button>
           <button class="pr-pay-btn" style="background:transparent;border:1px solid var(--border);color:var(--text)"
                   onclick="answerViewing('${m.viewingRequestId}','declined')">Decline</button>
         </div>`
      : `<div style="font-size:11px;margin-top:8px;text-transform:capitalize;opacity:.75">${esc(status)}</div>`;

    return `
      <div class="msg-row ${side}">
        <div class="msg-bubble" style="border-left:3px solid var(--teal)">
          <div style="font-weight:700;margin-bottom:4px">Viewing request</div>
          ${d.listingTitle ? `<div style="font-size:12px;opacity:.8">${esc(d.listingTitle)}</div>` : ''}
          ${when ? `<div style="font-size:12px;margin-top:2px">${esc(when)}</div>` : ''}
          ${d.buyerNotes ? `<div style="font-size:12px;margin-top:6px;opacity:.85">${esc(d.buyerNotes)}</div>` : ''}
          ${actions}
        </div>
        <div class="msg-time">${esc(fmtTime(m.timestamp))}</div>
      </div>`;
  }

  function renderViewingResponseCard(m, side) {
    const d = m.viewingData || {};
    const proposed = [fmtDate(d.proposedDate), fmtClock(d.proposedTime)].filter(Boolean).join(' at ');
    return `
      <div class="msg-row ${side}">
        <div class="msg-bubble" style="border-left:3px solid var(--teal)">
          <div style="font-weight:700;margin-bottom:4px">Viewing response</div>
          ${d.listingTitle ? `<div style="font-size:12px;opacity:.8">${esc(d.listingTitle)}</div>` : ''}
          ${proposed ? `<div style="font-size:12px;margin-top:2px">New time: ${esc(proposed)}</div>` : ''}
          ${d.sellerNotes ? `<div style="font-size:12px;margin-top:6px;opacity:.85">${esc(d.sellerNotes)}</div>` : ''}
          ${m.status ? `<div style="font-size:11px;margin-top:6px;text-transform:capitalize;opacity:.7">${esc(m.status)}</div>` : ''}
        </div>
        <div class="msg-time">${esc(fmtTime(m.timestamp))}</div>
      </div>`;
  }

  // ── Answer a viewing request from inside the chat ──────────────────────────
  window.answerViewing = async function (viewingId, status) {
    if (status === 'declined' && !confirm('Decline this viewing request?')) return;
    try {
      const updated = await HS.viewing.respond(viewingId, { status });
      const i = viewings.findIndex((v) => v.id === viewingId);
      if (i >= 0) Object.assign(viewings[i], updated); else viewings.push(updated);
      hsToast(status === 'confirmed' ? 'Viewing confirmed. The buyer has been notified.'
                                     : 'Viewing declined. The buyer has been notified.');
      await reload(activeConvId);
    } catch (err) {
      hsToast('Could not send your answer: ' + err.message, 'error');
    }
  };

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
          <div class="chat-header-title">${esc(name)}</div>
          <div class="chat-header-seller">${c.other && c.other.verified ? iconVerify : ''} ${esc(l ? l.title : '')}</div>
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

    const layout = document.querySelector('.messages-layout');
    if (layout) layout.classList.add('chat-open');
    const msgs = document.getElementById('chatMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;

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
    const layout = document.querySelector('.messages-layout');
    if (layout) layout.classList.remove('chat-open');
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
      input.value = text;
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

  // ── Payments in chat: not connected yet ────────────────────────────────────
  // The modals in messages.html call these; they say so plainly instead of failing silently.
  const notWired = () => hsToast('Payment requests in chat are not connected yet.');
  window.openPayReqModal     = notWired;
  window.sendPaymentRequest  = (e) => { if (e && e.preventDefault) e.preventDefault(); notWired(); };
  window.confirmPaymentProof = notWired;
  window.rejectPaymentProof  = notWired;
  window.confirmProof        = notWired;
  window.proceedReject       = notWired;
  window.closePayReqModal = function () {
    const m = document.getElementById('payReqModal');
    if (m) m.classList.remove('active');
  };
  window.closeRejectModal = function () {
    const m = document.getElementById('rejectConfirmModal');
    if (m) m.classList.remove('active');
  };

  // ── Load ───────────────────────────────────────────────────────────────────
  async function reload(keepOpen) {
    convs = await HS.messages.conversations();
    try { viewings = await HS.viewing.list(); } catch (e) { viewings = []; }
    renderConvList(document.getElementById('convSearch')?.value || '');
    if (keepOpen && convs.some((c) => c.id === keepOpen)) await window.openConv(keepOpen);
  }

  (async function init() {
    const list = document.getElementById('convList');
    if (list) list.innerHTML = `<div style="padding:28px 18px;text-align:center;color:var(--muted);font-size:13px">Loading…</div>`;
    showEmptyState();

    // The Tenants page links here as messages.html?to=<buyer id>, so the conversation with that
    // person opens straight away instead of landing on an empty panel.
    const wanted = new URLSearchParams(window.location.search).get('to');

    try {
      await reload(wanted || null);
    } catch (err) {
      console.error('Failed to load messages:', err);
      if (list) list.innerHTML = `<div style="padding:28px 18px;text-align:center;color:var(--muted);font-size:13px">Could not load your messages. Please try again.</div>`;
    }
  })();
})();
