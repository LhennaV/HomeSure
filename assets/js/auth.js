const eyeOpen = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeOff  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

const sunIcon  = `<svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonIcon = `<svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function togglePw(id, btn) {
  const input = document.getElementById(id);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.innerHTML = isPassword ? eyeOff : eyeOpen;
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains('light');
  body.classList.toggle('dark', isLight);
  body.classList.toggle('light', !isLight);
  const iconEl = document.getElementById('themeIcon');
  if (iconEl) iconEl.outerHTML = isLight ? moonIcon : sunIcon;
}

function setRole(role) {
  document.getElementById('buyerBtn').classList.toggle('active', role === 'buyer');
  document.getElementById('sellerBtn').classList.toggle('active', role === 'seller');
}

// ── Validation helpers ────────────────────────────────────────────────────────

function showError(input, message) {
  input.classList.add('error');
  const group = input.closest('.field-group');
  let msg = group.querySelector('.field-error-msg');
  if (!msg) {
    msg = document.createElement('span');
    msg.className = 'field-error-msg';
    group.appendChild(msg);
  }
  msg.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  const group = input.closest('.field-group');
  const msg = group && group.querySelector('.field-error-msg');
  if (msg) msg.textContent = '';
}

function attachClearOnInput(input) {
  input.addEventListener('input', () => clearError(input), { once: false });
}

// ── Sign In validation ────────────────────────────────────────────────────────

function submitSignin() {
  const email = document.querySelector('input[type="email"]');
  const pw    = document.getElementById('pw1');
  let valid   = true;

  if (!email.value.trim()) {
    showError(email, 'Email is required'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'Enter a valid email address'); valid = false;
  } else { clearError(email); }

  if (!pw.value) {
    showError(pw, 'Password is required'); valid = false;
  } else { clearError(pw); }

  if (!valid) return;

  // ── Fake Auth (replace with real API call once back-end is ready) ────────────
  const user = fakeLogin(email.value.trim(), pw.value);
  if (!user) {
    showError(email, 'No account found with these credentials');
    showError(pw, 'Incorrect email or password');
    return;
  }
  saveSession(user);
  redirectToDashboard(user.role);
}

// ── Sign Up validation ────────────────────────────────────────────────────────

function validateSignup() {
  let valid = true;

  const surname   = document.querySelector('input[placeholder="Surname"]');
  const firstName = document.querySelector('input[placeholder="First Name"]');
  const email     = document.querySelector('input[type="email"]');
  const phone     = document.querySelector('input[type="tel"]');
  const pw1       = document.getElementById('pw1');
  const pw2       = document.getElementById('pw2');

  if (!surname.value.trim())   { showError(surname,   'Surname is required');          valid = false; } else clearError(surname);
  if (!firstName.value.trim()) { showError(firstName, 'First name is required');       valid = false; } else clearError(firstName);

  if (!email.value.trim()) {
    showError(email, 'Email is required'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'Enter a valid email address'); valid = false;
  } else { clearError(email); }

  if (!phone.value.trim()) { showError(phone, 'Phone number is required'); valid = false; } else clearError(phone);

  if (!pw1.value) {
    showError(pw1, 'Password is required'); valid = false;
  } else if (pw1.value.length < 8) {
    showError(pw1, 'Must be at least 8 characters'); valid = false;
  } else { clearError(pw1); }

  if (!pw2.value) {
    showError(pw2, 'Please confirm your password'); valid = false;
  } else if (pw2.value !== pw1.value) {
    showError(pw2, 'Passwords do not match'); valid = false;
  } else { clearError(pw2); }

  return valid;
}

// ── Verify Email Modal ────────────────────────────────────────────────────────

let _resendTimer = null;

function openVerifyModal() {
  if (!validateSignup()) return;
  const email = document.querySelector('input[type="email"]').value.trim();
  document.getElementById('modalEmail').textContent = email;
  document.getElementById('verifyModal').classList.add('active');
  startCountdown(32);
}

function closeModal() {
  document.getElementById('verifyModal').classList.remove('active');
  clearInterval(_resendTimer);
}

function startCountdown(seconds) {
  const btn = document.getElementById('resendBtn');
  const countdown = document.getElementById('resendCountdown');
  btn.disabled = true;
  let remaining = seconds;
  countdown.textContent = `Resend in ${remaining}s`;
  _resendTimer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(_resendTimer);
      countdown.textContent = '';
      btn.disabled = false;
    } else {
      countdown.textContent = `Resend in ${remaining}s`;
    }
  }, 1000);
}

function resendEmail() {
  clearInterval(_resendTimer);
  startCountdown(32);
}

// ── Forgot Password page ──────────────────────────────────────────────────────

let _fpTimer = null;

function submitForgotPassword() {
  const input = document.getElementById('fpEmail');
  if (!input) return;

  if (!input.value.trim()) {
    showError(input, 'Email is required'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    showError(input, 'Enter a valid email address'); return;
  }
  clearError(input);

  document.getElementById('sentEmail').textContent = input.value.trim();
  document.getElementById('formView').style.display   = 'none';
  document.getElementById('successView').style.display = '';
  startFpCountdown(32);
}

function startFpCountdown(seconds) {
  const btn      = document.getElementById('fpResendBtn');
  const countdown = document.getElementById('fpCountdown');
  btn.disabled   = true;
  let remaining  = seconds;
  countdown.textContent = `Resend in ${remaining}s`;
  _fpTimer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(_fpTimer);
      countdown.textContent = '';
      btn.disabled = false;
    } else {
      countdown.textContent = `Resend in ${remaining}s`;
    }
  }, 1000);
}

function resendReset() {
  clearInterval(_fpTimer);
  startFpCountdown(32);
}

// Close modal when clicking the backdrop
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('verifyModal');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
});
