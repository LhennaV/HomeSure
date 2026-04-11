
      const user = getSession();
      if (!user) window.location.href = "../../auth/signin.html";

      HomeSureSidebar.init({ activePage: "dashboard" });
      HomeSureTopbar.init({ placeholder: "Search properties..." });

      // ── Icons ──────────────────────────────────────────────────────────────────
      const iconPin = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
      const iconBed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
      const iconBath = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
      const iconArea = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>`;
      const iconMsg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
      const iconCheck = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      const iconFlag = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
      const iconHeart = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

      // ── Save / unsave ──────────────────────────────────────────────────────────
      function updateSaveBtn(listingId) {
        const cu = getSession();
        const isSaved = (cu.savedListings || []).includes(listingId);
        const btn = document.getElementById("saveBtn");
        if (!btn) return;
        if (isSaved) {
          btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Saved`;
          btn.classList.add("saved");
        } else {
          btn.innerHTML = `${iconHeart} Save Listing`;
          btn.classList.remove("saved");
        }
      }

      function toggleSave(listingId) {
        const cu = getSession();
        const saved = cu.savedListings || [];
        const idx = saved.indexOf(listingId);
        if (idx === -1) saved.push(listingId);
        else saved.splice(idx, 1);
        cu.savedListings = saved;
        saveSession(cu);
        updateSaveBtn(listingId);
      }

      // ── Thumbnail swap ─────────────────────────────────────────────────────────
      function swapImage(src, el) {
        document.getElementById("mainImg").src = src;
        document
          .querySelectorAll(".thumb-item")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
      }

      // ── Modal helpers ──────────────────────────────────────────────────────────
      function openReportModal() {
        document.getElementById("reportReason").value = "";
        document.getElementById("reportDetails").value = "";
        document.getElementById("reportReasonErr").style.display = "none";
        document.getElementById("reportModal").classList.add("open");
      }

      function closeReportModal() {
        document.getElementById("reportModal").classList.remove("open");
      }

      function submitReport() {
        const reason = document.getElementById("reportReason").value;
        const err = document.getElementById("reportReasonErr");
        if (!reason) {
          err.style.display = "block";
          return;
        }
        err.style.display = "none";
        closeReportModal();
        // Show a brief success toast (inline, no alert)
        const toast = document.createElement("div");
        toast.textContent = "Report submitted. Thank you.";
        Object.assign(toast.style, {
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#253347",
          color: "#f1f5f9",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: "600",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: "9999",
          transition: "opacity 0.4s",
          opacity: "1",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        });
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = "0";
        }, 2200);
        setTimeout(() => toast.remove(), 2700);
      }

      // Close modal on overlay click
      document
        .getElementById("reportModal")
        .addEventListener("click", function (e) {
          if (e.target === this) closeReportModal();
        });

      // ── Dynamic back button ────────────────────────────────────────────────────
      const params = new URLSearchParams(window.location.search);
      const fromPage = params.get("from");
      const backBtn = document.querySelector(".back-link");
      if (fromPage === "saved") {
        backBtn.textContent = "";
        backBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back to Saved Listings`;
        backBtn.onclick = () => (window.location.href = "saved.html");
      }

      // ── Load listing ───────────────────────────────────────────────────────────
      const listing = FAKE_LISTINGS.find((l) => l.id === params.get("id"));
      const seller = listing
        ? FAKE_USERS.find((u) => u.id === listing.sellerId)
        : null;
      const detail = document.getElementById("listingDetail");

      if (!listing) {
        detail.innerHTML = `<p style="color:var(--muted);text-align:center;padding:60px 0">Listing not found.</p>`;
      } else {
        const isRent = listing.listingFor === "rent";
        const price = "₱" + listing.price.toLocaleString("en-PH");
        const bedsLabel =
          listing.bedrooms === 0
            ? "Studio"
            : listing.bedrooms +
              " Bedroom" +
              (listing.bedrooms !== 1 ? "s" : "");
        const bathLabel =
          listing.bathrooms +
          " Bathroom" +
          (listing.bathrooms !== 1 ? "s" : "");
        const sellerName = seller
          ? seller.firstName + " " + seller.lastName
          : "Unknown Seller";
        const amenitiesHtml = (listing.amenities || [])
          .map((a) => `<span class="amenity-tag">${a}</span>`)
          .join("");

        const thumbsHtml =
          listing.images.length > 1
            ? `<div class="thumb-strip">` +
              listing.images
                .map(
                  (src, i) => `
          <div class="thumb-item ${i === 0 ? "active" : ""}" onclick="swapImage('${src}', this)">
            <img src="${src}" alt="" loading="lazy" />
          </div>`,
                )
                .join("") +
              `</div>`
            : "";

        detail.innerHTML = `
      <div class="detail-img-wrap">
        <img id="mainImg" src="${listing.images[0]}" alt="${listing.title}" />
        <span class="badge-tl ${isRent ? "badge-rent" : "badge-sale"}">${isRent ? "For Rent" : "For Sale"}</span>
        ${listing.negotiable ? `<span class="badge-negotiable-img">Negotiable</span>` : ""}
        <span class="badge-avail">Available</span>
      </div>
      ${thumbsHtml}

      <div class="detail-body">
        <div class="detail-title-row">
          <div class="detail-title">${listing.title}</div>
          <div class="detail-price-block">
            <div class="detail-price">${price}</div>
            ${isRent ? `<span class="detail-price-per">/month</span>` : ""}
            ${listing.negotiable ? `<span class="price-negotiable">Price negotiable</span>` : ""}
          </div>
        </div>

        <div class="detail-location">${iconPin} ${listing.address}</div>

        <div class="detail-specs">
          <div class="spec-item">${iconBed} ${bedsLabel}</div>
          <div class="spec-item">${iconBath} ${bathLabel}</div>
          <div class="spec-item">${iconArea} ${listing.floorArea} sqm</div>
        </div>

        <div class="detail-section-title">Description</div>
        <div class="detail-desc">${listing.description}</div>

        ${amenitiesHtml ? `<div class="amenities-wrap">${amenitiesHtml}</div>` : ""}

        <div class="seller-card">
          <div>
            <div class="seller-label">Listed by</div>
            <div class="seller-name">
              <span class="seller-name-link" onclick="window.location.href='seller-profile.html?id=${listing.sellerId}'">${sellerName}</span>
              <span class="verified-sm">${iconCheck} Verified</span>
            </div>
          </div>
          <div class="seller-actions">
            <button class="save-btn" id="saveBtn">
              ${iconHeart} Save Listing
            </button>
            ${user.id !== listing.sellerId ? `<button class="msg-btn" onclick="window.location.href='${user.role === 'seller' ? '../../module/seller/messages.html' : 'messages.html'}'"> ${iconMsg} Message Seller </button>` : ''}
          </div>
        </div>

        <button class="report-link" onclick="openReportModal()">
          ${iconFlag} Report Listing
        </button>
      </div>
    `;

        updateSaveBtn(listing.id);
        document
          .getElementById("saveBtn")
          .addEventListener("click", () => toggleSave(listing.id));
      }
    