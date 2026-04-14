
  const user = getSession();
  if (!user || user.role !== 'buyer') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'profile' });
  HomeSureTopbar.init({ placeholder: 'Search...' });

  // ── Populate fields ──────────────────────────────────────────────────────
  document.getElementById('firstName').value = user.firstName || '';
  document.getElementById('lastName').value  = user.lastName  || '';
  document.getElementById('email').value     = user.email     || '';
  document.getElementById('phone').value     = user.phone     || '';

  const avatarCircle = document.getElementById('avatarCircle');
  function renderAvatar() {
    if (user.avatar) {
      avatarCircle.textContent = '';
      avatarCircle.style.backgroundImage = `url(${user.avatar})`;
      avatarCircle.style.backgroundSize = 'cover';
      avatarCircle.style.backgroundPosition = 'center';
    } else {
      avatarCircle.textContent = (user.firstName[0] + user.lastName[0]).toUpperCase();
      avatarCircle.style.backgroundImage = '';
    }
  }
  renderAvatar();
  document.getElementById('identityName').textContent  = user.firstName + ' ' + user.lastName;
  document.getElementById('identityEmail').textContent = user.email;

  const avatarInput = document.getElementById('avatarInput');
  document.getElementById('avatarEditBtn').addEventListener('click', () => avatarInput.click());
  avatarInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      user.avatar = e.target.result;
      saveSession(user);
      renderAvatar();
      showToast('Profile photo updated.');
    };
    reader.readAsDataURL(file);
  });

  const fullUser = FAKE_USERS.find(u => u.id === user.id);
  if (fullUser) {
    const joined = new Date(fullUser.joinedAt);
    document.getElementById('memberSince').textContent =
      joined.toLocaleDateString('en-PH', { month: 'short', year: 'numeric' });
    document.getElementById('savedCount').textContent =
      (fullUser.savedListings || []).length + ' propert' + ((fullUser.savedListings || []).length !== 1 ? 'ies' : 'y');
  }
  document.getElementById('phoneStatus').textContent = user.phone || 'Not set';

  // ── Toast ────────────────────────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    const icon = document.getElementById('toastIcon');
    t.className = 'toast ' + type;
    document.getElementById('toastMsg').textContent = msg;
    icon.innerHTML = type === 'success'
      ? '<polyline points="20 6 9 17 4 12"/>'
      : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ── Save Personal Info ───────────────────────────────────────────────────
  function savePersonal() {
    const fn = document.getElementById('firstName').value.trim();
    const ln = document.getElementById('lastName').value.trim();
    if (!fn || !ln) { showToast('Please fill in both name fields.', 'error'); return; }

    user.firstName = fn; user.lastName = ln;
    saveSession(user);

    document.getElementById('identityName').textContent = fn + ' ' + ln;
    renderAvatar();
    showToast('Profile updated successfully.');
  }

  // ── Save Phone ───────────────────────────────────────────────────────────
  function savePhone() {
    const ph = document.getElementById('phone').value.trim();
    if (!ph) { showToast('Please enter a phone number.', 'error'); return; }
    user.phone = ph;
    saveSession(user);
    document.getElementById('phoneStatus').textContent = ph;
    showToast('Phone number saved.');
  }

  // ── OTP ──────────────────────────────────────────────────────────────────
  let resendInterval = null;

  function openOtp() {
    const ph = document.getElementById('phone').value.trim();
    document.getElementById('otpPhone').textContent = ph || '+63 9XX XXX XXXX';
    document.getElementById('otpPanel').classList.add('open');
    document.getElementById('otpError').classList.remove('show');
    document.querySelectorAll('.otp-box').forEach(b => { b.value = ''; b.classList.remove('filled'); });
    document.querySelectorAll('.otp-box')[0].focus();
    startResendTimer();
  }

  function startResendTimer() {
    clearInterval(resendInterval);
    let secs = 30;
    const timerEl  = document.getElementById('resendTimer');
    const textEl   = document.getElementById('resendText');
    const linkEl   = document.getElementById('resendLink');
    timerEl.textContent = secs + 's';
    textEl.style.display = 'inline'; linkEl.classList.add('disabled');
    resendInterval = setInterval(() => {
      secs--;
      if (secs <= 0) {
        clearInterval(resendInterval);
        textEl.style.display = 'none';
        linkEl.classList.remove('disabled');
      } else { timerEl.textContent = secs + 's'; }
    }, 1000);
  }

  function resendOtp() {
    document.querySelectorAll('.otp-box').forEach(b => { b.value = ''; b.classList.remove('filled'); });
    document.getElementById('otpError').classList.remove('show');
    document.getElementById('resendText').style.display = 'inline';
    startResendTimer();
    showToast('Verification code resent.');
  }

  function verifyOtp() {
    const code = [...document.querySelectorAll('.otp-box')].map(b => b.value).join('');
    if (code.length < 6) { showToast('Please enter the full 6-digit code.', 'error'); return; }

    // Fake: accept "123456" as valid
    if (code === '123456') {
      document.getElementById('otpPanel').classList.remove('open');
      document.getElementById('otpError').classList.remove('show');
      clearInterval(resendInterval);
      document.getElementById('verifyAction').innerHTML =
        `<div class="verified-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Verified</div>`;
      showToast('Phone number verified!');
    } else {
      document.getElementById('otpError').classList.add('show');
      document.querySelectorAll('.otp-box').forEach(b => { b.value = ''; b.classList.remove('filled'); });
      document.querySelectorAll('.otp-box')[0].focus();
    }
  }

  // ── OTP box auto-advance ─────────────────────────────────────────────────
  document.querySelectorAll('.otp-box').forEach((box, i, boxes) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '').slice(-1);
      box.classList.toggle('filled', box.value !== '');
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) boxes[i - 1].focus();
    });
    box.addEventListener('paste', e => {
      e.preventDefault();
      const digits = (e.clipboardData.getData('text').replace(/\D/g, '')).slice(0, 6);
      [...digits].forEach((d, j) => {
        if (boxes[j]) { boxes[j].value = d; boxes[j].classList.add('filled'); }
      });
      if (boxes[digits.length]) boxes[digits.length].focus();
    });
  });
