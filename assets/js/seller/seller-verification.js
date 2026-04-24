
  const user = getSession();
  if (!user || user.role !== 'seller') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'settings' });
  HomeSureTopbar.init({ placeholder: 'Identity Verification' });

  const fullUser   = FAKE_USERS.find(u => u.id === user.id);
  const isVerified = fullUser && fullUser.accountStatus === 'verified';
  const isExpired  = isVerified && fullUser.verificationExpiry && new Date(fullUser.verificationExpiry) < new Date();

  const col = document.getElementById('verifyCol');

  function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  {
    // ── Upload form ─────────────────────────────────────────────────────────
    col.innerHTML = `
      <!-- Verification banner -->
      <div class="banner-card ${isExpired ? 'danger' : ''}">
        <div class="banner-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div>
          <div class="banner-title">${isExpired ? 'Verification Expired' : isVerified ? 'Re-verify Your Identity' : 'Verification Required'}</div>
          <div class="banner-desc">${isVerified ? 'Re-upload your government ID and a selfie to renew your verification and keep your listings active.' : 'Please submit your identity documents to start selling on HomeSure. This helps build trust and ensures a safe marketplace for all users.'}</div>
        </div>
      </div>

      ${(isVerified || isExpired) ? `
      <div class="verif-info-card">
        <div class="verif-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <div class="verif-info-label">Verified On</div>
            <div class="verif-info-value">${fmtDate(fullUser.verifiedAt)}</div>
          </div>
        </div>
        <div class="verif-info-divider"></div>
        <div class="verif-info-item ${isExpired ? 'expired' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <div>
            <div class="verif-info-label">Expires On</div>
            <div class="verif-info-value">${fmtDate(fullUser.verificationExpiry)}${isExpired ? ' <span class="verif-expired-tag">Expired</span>' : ''}</div>
          </div>
        </div>
      </div>` : ''}

      <!-- Submit Documents card -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <div>
            <div class="section-title">Submit Documents</div>
            <div class="section-sub">Upload clear photos of your government-issued ID and a selfie</div>
          </div>
        </div>

        <!-- Upload grid -->
        <div class="upload-grid">
          <!-- Government-Issued ID -->
          <div>
            <div class="upload-label">Government-Issued ID <span class="required-star">*</span></div>
            <div class="upload-box" id="idUploadBox" onclick="document.getElementById('idFileInput').click()">
              <div class="upload-box-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
              </div>
              <div class="upload-filename" id="idFileName">1x1 Picture.png</div>
              <div class="upload-filesub">PNG, JPG up to 10MB &bull; Passport, Driver's License, or National ID</div>
            </div>
            <input type="file" id="idFileInput" accept="image/*" capture="environment" onchange="handleFileSelect('id', this)" />
          </div>

          <!-- Selfie Verification -->
          <div>
            <div class="upload-label">Selfie Verification <span class="required-star">*</span></div>
            <div class="upload-box" id="selfieUploadBox" onclick="document.getElementById('selfieFileInput').click()">
              <div class="upload-box-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
              </div>
              <div class="upload-filename" id="selfieFileName">Click to upload selfie</div>
              <div class="upload-filesub">PNG, JPG up to 10MB &bull; Hold your ID next to your face</div>
            </div>
            <input type="file" id="selfieFileInput" accept="image/*" capture="user" onchange="handleFileSelect('selfie', this)" />
          </div>
        </div>

        <!-- Verification Tips -->
        <div class="tips-box">
          <span class="tips-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </span>
          <ul class="tips-list">
            <li>Ensure your ID is clearly visible and not blurred</li>
            <li>Take the selfie in good lighting conditions</li>
            <li>Make sure your face and ID are both clearly visible</li>
            <li>Documents will be securely stored and only used for verification</li>
          </ul>
        </div>

        <!-- Submit button -->
        <div class="submit-wrap">
          <button class="btn-primary" id="submitBtn" onclick="submitVerification()" disabled>Submit for Verification</button>
        </div>
      </div>
    `;
  }

  // ── File select handler ─────────────────────────────────────────────────────
  function handleFileSelect(type, input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const name = file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name;
    if (type === 'id') {
      document.getElementById('idFileName').textContent = name;
      document.getElementById('idUploadBox').classList.add('has-file');
    } else {
      document.getElementById('selfieFileName').textContent = name;
      document.getElementById('selfieUploadBox').classList.add('has-file');
    }
    const bothFilled = document.getElementById('idUploadBox').classList.contains('has-file')
                    && document.getElementById('selfieUploadBox').classList.contains('has-file');
    document.getElementById('submitBtn').disabled = !bothFilled;
  }

  // ── Submit handler ──────────────────────────────────────────────────────────
  function submitVerification() {
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    showToast("Documents submitted! We'll review and notify you within 1-2 business days.");
  }

  // ── Toast ───────────────────────────────────────────────────────────────────
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
  }
