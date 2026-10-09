// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Session helpers
//  Depends on: config.js (sb)
//
//  The real session lives in Supabase (localStorage, auto-refreshed). 'homesure_user' in
//  sessionStorage is only a cached copy of the signed-in user's profile so pages can read
//  it synchronously with getSession(). It is for UX (menus, redirects); the database never
//  trusts it — Row Level Security decides what each request may do.
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'homesure_user';

function saveSession(user) {
  const session = {
    id: user.id, role: user.role,
    firstName: user.firstName, lastName: user.lastName,
    email: user.email, phone: user.phone,
    verified: user.verified, accountStatus: user.accountStatus || null,
    savedListings: user.savedListings || [],
    avatar: user.avatar || null,
    isVerified: user.isVerified || false,
    verifiedAt: user.verifiedAt || null,
    verificationExpiry: user.verificationExpiry || null,
    phoneVerified: user.phoneVerified || false,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function redirectToDashboard(role) {
  const routes = {
    buyer:      '../module/buyer/buyer.html',
    seller:     '../module/seller/seller.html',
    admin:      '../module/admin/admin.html',
    superadmin: '../module/super-admin/super-admin.html',
  };
  const path = routes[role];
  if (path) window.location.href = path;
}

function signinUrl() {
  return location.pathname.includes('/module/') ? '../../auth/signin.html' : 'auth/signin.html';
}

// Sign out of Supabase and drop the cached profile.
async function hsSignOut() {
  try { await sb.auth.signOut(); } catch (e) { /* offline: still clear the local copy */ }
  clearSession();
}

// For pages that need a signed-in user of a given role. Redirects to sign-in otherwise.
//   const user = await requireRole('seller'); if (!user) return;
async function requireRole(...roles) {
  const cached = getSession();
  const { data } = await sb.auth.getSession();

  if (!data.session) {
    clearSession();
    window.location.href = signinUrl();
    return null;
  }
  if (!cached || !roles.includes(cached.role)) {
    window.location.href = signinUrl();
    return null;
  }
  return cached;
}

// If the Supabase session is gone (expired, signed out in another tab) the cached profile is stale.
(function dropStaleSession() {
  if (typeof sb === 'undefined') return;
  const inModule = location.pathname.includes('/module/');

  if (getSession()) {
    sb.auth.getSession().then(({ data }) => {
      if (data && data.session) return;
      clearSession();
      if (inModule) window.location.href = signinUrl();
    });
  }

  sb.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      clearSession();
      if (inModule) window.location.href = signinUrl();
    }
  });
})();

// Small toast for reporting database/network results on pages that have no toast of their own.
function hsToast(text, kind) {
  const el = document.createElement('div');
  el.textContent = text;
  Object.assign(el.style, {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    background: kind === 'error' ? '#b91c1c' : '#253347', color: '#f1f5f9',
    padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: '99999', transition: 'opacity 0.4s',
    opacity: '1', fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: '90vw',
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; }, 2800);
  setTimeout(() => el.remove(), 3300);
}
