
  const user = getSession();
  if (!user || user.role !== 'buyer') window.location.href = '../../auth/signin.html';

  HomeSureSidebar.init({ activePage: 'profile' });
  HomeSureTopbar.init({ placeholder: 'Identity Verification' });

  const isVerified = user.isVerified && user.verificationExpiry && new Date(user.verificationExpiry) >= new Date();
  const isExpired  = user.isVerified && user.verificationExpiry && new Date(user.verificationExpiry) < new Date();

  const col = document.getElementById('verifyCol');

  col.innerHTML = `
    <div class="banner-card">
      <div class="banner-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div>
        <div class="banner-title">${isExpired ? 'Verification Expired' : isVerified ? 'Re-verify Your Identity' : 'Verification Required'}</div>
        <div class="banner-desc">${isVerified
          ? 'Re-upload your government ID and a selfie to renew your verification and keep your messaging access active.'
          : 'To message sellers and save listings, HomeSure requires identity verification. This keeps the platform safe for everyone.'
        }</div>
      </div>
    </div>

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
          <div class="section-sub">Upload a clear photo of your government-issued ID and a selfie</div>
        </div>
      </div>

      <div class="upload-grid">
        <div>
          <div class="upload-label">Government-Issued ID</div>
          <div class="upload-box" id="idUploadBox" onclick="document.getElementById('idFileInput').click()">
            <div class="upload-box-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
            </div>
            <div class="upload-filename" id="idFileName">Click to upload ID</div>
            <div class="upload-filesub">PNG, JPG up to 10MB &bull; Passport, Driver's License, UMID, SSS, PhilHealth</div>
          </div>
          <input type="file" id="idFileInput" accept="image/*" onchange="handleFileSelect('id', this)" />
        </div>

        <div>
          <div class="upload-label">Selfie Verification</div>
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
          <input type="file" id="selfieFileInput" accept="image/*" onchange="handleFileSelect('selfie', this)" />
        </div>
      </div>

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
          <li>Make sure your face and ID are both clearly visible in the selfie</li>
          <li>Documents will be securely stored and only used for verification</li>
        </ul>
      </div>

      <div class="submit-wrap">
        <button class="btn-primary" id="submitBtn" onclick="submitVerification()">Submit for Verification</button>
      </div>
    </div>
  `;

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
  }

  function submitVerification() {
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;

    const u = getSession();
    u.isVerified = true;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 6);
    u.verificationExpiry = expiry.toISOString().split('T')[0];
    saveSession(u);

    showToast("Documents submitted! You'll be able to message sellers and save listings once verified (within 24 hours).");
    setTimeout(() => window.location.href = 'buyer.html', 4000);
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
  }
