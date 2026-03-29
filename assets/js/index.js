// ── Data ──────────────────────────────────────────────────────────────────────

const properties = [
  {
    title: "House for Sale",
    location: "Liva, Paoa, Bulacan",
    price: "₱1,000",
    period: "/mo",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  },
  {
    title: "Cozy Studio Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱8,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
  },
  {
    title: "Modern 2BR Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱12,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  },
  {
    title: "Spacious Family Home",
    location: "Bagbaguin, Sta. Maria, Bulacan",
    price: "₱15,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    title: "Studio Loft Unit",
    location: "Pulong Buhangin, Sta. Maria",
    price: "₱6,500",
    period: "/month",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  },
  {
    title: "Townhouse for Rent",
    location: "Tumana, Sta. Maria, Bulacan",
    price: "₱10,500",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const categories = [
  {
    name: "Houses",
    count: "342 listings",
    color: "#1a9e8f",
    bg: "rgba(26,158,143,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    name: "Apartments",
    count: "218 listings",
    color: "#6c63ff",
    bg: "rgba(108,99,255,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/></svg>`,
  },
  {
    name: "Townhouses",
    count: "97 listings",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M1 22h22"/><path d="M5 22V7l7-5 7 5v15"/><path d="M9 22V12h6v10"/></svg>`,
  },
];

const steps = [
  {
    num: "1",
    title: "Create an Account",
    desc: "Sign up as a buyer or seller. Verify your identity to build trust.",
  },
  {
    num: "2",
    title: "Browse or List",
    desc: "Search properties by barangay, budget, and type — or post your listing.",
  },
  {
    num: "3",
    title: "Connect Directly",
    desc: "Message verified sellers securely within the platform.",
  },
  {
    num: "4",
    title: "Close the Deal",
    desc: "Agree on terms confidently with full transparency on both sides.",
  },
];

const features = [
  {
    title: "Verified Sellers",
    desc: "All property owners undergo identity verification with government ID and selfie before publishing listings.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    title: "Local Focus",
    desc: "Find properties by barangay within Sta. Maria, Bulacan with easy filtering options.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    title: "Direct Messaging",
    desc: "Connect directly with verified sellers through our secure in-platform messaging system.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
];

const statsData = [
  { end: 1200, suffix: "+", label: "Verified Sellers" },
  { end: 3450, suffix: "+", label: "Active Listings" },
  { end: 8750, suffix: "+", label: "Successful Connections" },
];

const testimonials = [
  {
    stars: 5,
    quote:
      "Found my apartment in just two days. Every seller was verified — no scams, no stress.",
    name: "Maria Santos",
    role: "Tenant, Poblacion",
    initials: "MS",
  },
  {
    stars: 5,
    quote:
      "Listed my townhouse and got genuine buyers in under a week. The platform is so easy to use.",
    name: "Rolando Cruz",
    role: "Property Owner, Bagbaguin",
    initials: "RC",
  },
  {
    stars: 4,
    quote:
      "Direct messaging made negotiating with the seller so much smoother than the usual process.",
    name: "Jessa Reyes",
    role: "Buyer, Tumana",
    initials: "JR",
  },
];

// ── SVG Helpers ───────────────────────────────────────────────────────────────

const pinIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b8fa0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const checkIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const chevronLeft = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const chevronRight = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const searchIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
const shieldIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const starIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const lockIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const LOGO_SRC = "assets/img/image.png";

// ── React Components ──────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

// Navbar
function Navbar() {
  return React.createElement(
    "nav",
    null,
    React.createElement(
      "a",
      { className: "nav-logo", href: "#" },
      React.createElement("img", {
        src: LOGO_SRC,
        alt: "HomeSure",
        height: 32,
        style: { display: "block" },
      }),
      "HomeSure",
    ),
    React.createElement(
      "div",
      { className: "nav-btns" },
      React.createElement(
        "button",
        {
          className: "btn-outline",
          onClick: () => (window.location.href = "auth/signin.html"),
        },
        "Sign In",
      ),
      React.createElement(
        "button",
        {
          className: "btn-solid",
          onClick: () => (window.location.href = "auth/signup.html"),
        },
        "Sign Up",
      ),
    ),
  );
}

// Hero
function Hero() {
  return React.createElement(
    "section",
    { className: "hero" },
    React.createElement("div", { className: "hero-bg" }),
    React.createElement("div", { className: "hero-overlay" }),
    React.createElement(
      "div",
      { className: "hero-content" },
      React.createElement(
        "div",
        { className: "hero-badge" },
        React.createElement("span", { className: "hero-badge-dot" }),
        "Now Live in Sta. Maria, Bulacan",
      ),
      React.createElement(
        "h1",
        { className: "hero-title" },
        "Find Verified Homes ",
        React.createElement(
          "span",
          { className: "hero-title-accent" },
          "with Confidence",
        ),
      ),
      React.createElement(
        "p",
        { className: "hero-sub" },
        "Browse secure listings for long-term rent and property purchase. No hidden listings. No unverified sellers.",
      ),
      React.createElement(
        "div",
        { className: "hero-search" },
        React.createElement("input", {
          className: "hero-search-input",
          type: "text",
          placeholder: "Search by barangay, property type...",
        }),
        React.createElement("div", { className: "hero-search-divider" }),
        React.createElement(
          "button",
          { className: "hero-search-btn" },
          React.createElement("span", {
            dangerouslySetInnerHTML: { __html: searchIcon },
          }),
          "Search",
        ),
      ),
      React.createElement(
        "div",
        { className: "hero-trust" },
        React.createElement(
          "span",
          { className: "hero-trust-item" },
          React.createElement("span", {
            className: "hero-trust-icon",
            dangerouslySetInnerHTML: { __html: shieldIcon },
          }),
          "Verified Listings",
        ),
        React.createElement(
          "span",
          { className: "hero-trust-item" },
          React.createElement("span", {
            className: "hero-trust-icon",
            dangerouslySetInnerHTML: { __html: starIcon },
          }),
          "4.8/5 Rating",
        ),
        React.createElement(
          "span",
          { className: "hero-trust-item" },
          React.createElement("span", {
            className: "hero-trust-icon",
            dangerouslySetInnerHTML: { __html: lockIcon },
          }),
          "Secure Messaging",
        ),
      ),
    ),
  );
}

// Categories
function Categories() {
  return React.createElement(
    "section",
    { className: "section" },
    React.createElement(
      "span",
      { className: "section-label" },
      "Browse by Type",
    ),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Find What You're Looking For",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Filter by property type or listing category",
    ),
    React.createElement(
      "div",
      { className: "categories-grid" },
      categories.map((c, i) =>
        React.createElement(
          "div",
          { key: i, className: "cat-card" },
          React.createElement(
            "div",
            { className: "cat-icon", style: { background: c.bg } },
            React.createElement("span", {
              style: { color: c.color },
              dangerouslySetInnerHTML: { __html: c.icon },
            }),
          ),
          React.createElement("div", { className: "cat-name" }, c.name),
          React.createElement("div", { className: "cat-count" }, c.count),
        ),
      ),
    ),
  );
}

// Spotlight Carousel
function Carousel() {
  const len = properties.length;
  const [idx, setIdx] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % len), 3500);
    return () => clearInterval(t);
  }, [autoKey]);

  const go = (next) => {
    setIdx((next + len) % len);
    setAutoKey((k) => k + 1);
  };

  const leftProp = properties[(idx - 1 + len) % len];
  const centerProp = properties[idx];
  const rightProp = properties[(idx + 1) % len];

  const SideCard = (prop) =>
    React.createElement(
      "div",
      { className: "crd-side" },
      React.createElement("img", {
        className: "crd-img",
        src: prop.image,
        alt: prop.title,
      }),
      React.createElement(
        "div",
        { className: "crd-body-side" },
        React.createElement(
          "div",
          { className: "card-title-side" },
          prop.title,
        ),
        React.createElement("div", {
          className: "card-loc",
          dangerouslySetInnerHTML: {
            __html: pinIcon + `<span>${prop.location}</span>`,
          },
        }),
        React.createElement(
          "div",
          { className: "card-price-side" },
          prop.price,
        ),
      ),
    );

  return React.createElement(
    "section",
    { className: "section-alt" },
    React.createElement(
      "span",
      { className: "section-label" },
      "Featured Properties",
    ),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Curated Listings Near You",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Hand-picked from verified sellers in Sta. Maria, Bulacan",
    ),
    React.createElement(
      "div",
      { className: "crs-stage" },
      React.createElement(
        "div",
        { className: "crs-row" },
        React.createElement("button", {
          className: "crs-btn",
          onClick: () => go(idx - 1),
          dangerouslySetInnerHTML: { __html: chevronLeft },
        }),
        React.createElement(
          "div",
          { className: "crs-clip" },
          React.createElement(
            "div",
            {
              className: "crd-side-wrap crd-side-left",
              onClick: () => go(idx - 1),
            },
            SideCard(leftProp),
          ),
          React.createElement(
            "div",
            { className: "crd-center" },
            React.createElement(
              "div",
              { style: { position: "relative" } },
              React.createElement("img", {
                className: "crd-img-center",
                src: centerProp.image,
                alt: centerProp.title,
              }),
              centerProp.verified &&
                React.createElement("div", {
                  className: "verified-badge",
                  dangerouslySetInnerHTML: { __html: checkIcon + " Verified" },
                }),
            ),
            React.createElement(
              "div",
              { className: "crd-body-center" },
              React.createElement(
                "div",
                { className: "card-title" },
                centerProp.title,
              ),
              React.createElement("div", {
                className: "card-loc",
                dangerouslySetInnerHTML: {
                  __html: pinIcon + `<span>${centerProp.location}</span>`,
                },
              }),
              React.createElement(
                "div",
                { className: "card-footer-row" },
                React.createElement(
                  "div",
                  { className: "card-price" },
                  centerProp.price,
                  React.createElement("span", null, centerProp.period),
                ),
                React.createElement(
                  "span",
                  {
                    className: "card-link",
                    onClick: () => (window.location.href = "auth/signin.html"),
                  },
                  "View Details",
                ),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              className: "crd-side-wrap crd-side-right",
              onClick: () => go(idx + 1),
            },
            SideCard(rightProp),
          ),
        ),
        React.createElement("button", {
          className: "crs-btn",
          onClick: () => go(idx + 1),
          dangerouslySetInnerHTML: { __html: chevronRight },
        }),
      ),
    ),
    React.createElement(
      "div",
      { className: "dots" },
      properties.map((_, i) =>
        React.createElement("button", {
          key: i,
          className: "dot" + (i === idx ? " active" : ""),
          onClick: () => go(i),
        }),
      ),
    ),
  );
}

// How It Works
function HowItWorks() {
  return React.createElement(
    "section",
    { className: "section" },
    React.createElement("span", { className: "section-label" }, "How It Works"),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Simple Steps to Your Next Home",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Get started in minutes — no complicated process",
    ),
    React.createElement(
      "div",
      { className: "how-steps" },
      steps.map((s, i) =>
        React.createElement(
          "div",
          { key: i, className: "how-step" },
          React.createElement("div", { className: "how-step-num" }, s.num),
          React.createElement("div", { className: "how-step-title" }, s.title),
          React.createElement("div", { className: "how-step-desc" }, s.desc),
        ),
      ),
    ),
  );
}

// Features
function Features() {
  return React.createElement(
    "section",
    { className: "section-alt" },
    React.createElement(
      "div",
      { className: "features-inner" },
      React.createElement(
        "span",
        { className: "section-label" },
        "Why HomeSure",
      ),
      React.createElement(
        "h2",
        { className: "section-title" },
        "Built for Trust & Transparency",
      ),
      React.createElement(
        "p",
        { className: "section-sub" },
        "A platform designed with security and convenience at its core",
      ),
      React.createElement(
        "div",
        { className: "features-card-wrap" },
        features.map((f, i) =>
          React.createElement(
            "div",
            { key: i, className: "feature-card" },
            React.createElement("div", {
              className: "feature-icon",
              dangerouslySetInnerHTML: { __html: f.icon },
            }),
            React.createElement("div", { className: "feature-title" }, f.title),
            React.createElement("div", { className: "feature-desc" }, f.desc),
          ),
        ),
      ),
    ),
  );
}

// Animated counter hook
function useCounter(end, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active]);
  return val;
}

function StatBox({ stat }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCounter(stat.end, 1800, active);
  return React.createElement(
    "div",
    { className: "stat-box", ref },
    React.createElement(
      "div",
      { className: "stat-value" },
      count.toLocaleString() + stat.suffix,
    ),
    React.createElement("div", { className: "stat-label" }, stat.label),
  );
}

function Stats() {
  return React.createElement(
    "section",
    { className: "section" },
    React.createElement(
      "div",
      { className: "stats-inner" },
      React.createElement(
        "span",
        { className: "section-label" },
        "Our Numbers",
      ),
      React.createElement(
        "h2",
        { className: "section-title" },
        "Trusted by Thousands",
      ),
      React.createElement(
        "p",
        { className: "section-sub" },
        "Building a safer housing marketplace for everyone in Sta. Maria",
      ),
      React.createElement(
        "div",
        { className: "stats-grid" },
        statsData.map((s, i) =>
          React.createElement(StatBox, { key: i, stat: s }),
        ),
      ),
    ),
  );
}

// Testimonials
function Testimonials() {
  return React.createElement(
    "section",
    { className: "section-alt" },
    React.createElement("span", { className: "section-label" }, "Testimonials"),
    React.createElement(
      "h2",
      { className: "section-title" },
      "What Our Users Say",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Real stories from real people in the community",
    ),
    React.createElement(
      "div",
      { className: "testimonials-grid" },
      testimonials.map((t, i) =>
        React.createElement(
          "div",
          { key: i, className: "testimonial-card" },
          React.createElement(
            "div",
            { className: "t-stars" },
            "★".repeat(t.stars) + (t.stars < 5 ? "☆".repeat(5 - t.stars) : ""),
          ),
          React.createElement("p", { className: "t-quote" }, `"${t.quote}"`),
          React.createElement(
            "div",
            { className: "t-author" },
            React.createElement("div", { className: "t-avatar" }, t.initials),
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "t-name" }, t.name),
              React.createElement("div", { className: "t-role" }, t.role),
            ),
          ),
        ),
      ),
    ),
  );
}

// CTA
function CTA() {
  return React.createElement(
    "div",
    { className: "cta-section" },
    React.createElement(
      "div",
      { className: "cta-inner" },
      React.createElement(
        "h2",
        { className: "cta-title" },
        "Ready to Find Your Next Home?",
      ),
      React.createElement(
        "p",
        { className: "cta-sub" },
        "Join thousands of verified users discovering trusted properties in Sta. Maria, Bulacan",
      ),
      React.createElement(
        "div",
        { className: "cta-btns" },
        React.createElement(
          "button",
          {
            className: "cta-btn-white",
            onClick: () => (window.location.href = "auth/signup.html"),
          },
          "Sign Up as Buyer",
        ),
        React.createElement(
          "button",
          {
            className: "cta-btn-ghost",
            onClick: () => (window.location.href = "auth/signup.html"),
          },
          "List Your Property",
        ),
      ),
    ),
  );
}

// Footer
function Footer() {
  const platformLinks = ["Browse Listings", "List Your Property", "About Us"];
  const supportLinks = ["Contact Us", "Report a Listing"];
  const legalLinks = ["Privacy Policy", "Terms of Service"];

  return React.createElement(
    "footer",
    null,
    React.createElement(
      "div",
      { className: "footer-grid" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-logo" },
          React.createElement("img", {
            src: LOGO_SRC,
            alt: "HomeSure",
            height: 28,
            style: { display: "block" },
          }),
          "HomeSure",
        ),
        React.createElement(
          "p",
          { className: "footer-tagline" },
          "A verified housing platform for secure property rentals and purchases in Sta. Maria, Bulacan.",
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-col-title" },
          "Platform",
        ),
        ...platformLinks.map((l) =>
          React.createElement(
            "a",
            { key: l, className: "footer-link", href: "#" },
            l,
          ),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-col-title" },
          "Support",
        ),
        ...supportLinks.map((l) =>
          React.createElement(
            "a",
            { key: l, className: "footer-link", href: "#" },
            l,
          ),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "footer-col-title" }, "Legal"),
        ...legalLinks.map((l) =>
          React.createElement(
            "a",
            { key: l, className: "footer-link", href: "#" },
            l,
          ),
        ),
      ),
    ),
    React.createElement("div", { className: "footer-divider" }),
    React.createElement(
      "div",
      { className: "footer-copy" },
      "© 2026 HomeSure. All rights reserved.",
    ),
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar),
    React.createElement(Hero),
    React.createElement(Categories),
    React.createElement(Carousel),
    React.createElement(HowItWorks),
    React.createElement(Features),
    React.createElement(Stats),
    React.createElement(Testimonials),
    React.createElement(CTA),
    React.createElement(Footer),
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
