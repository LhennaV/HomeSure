// ── Data ──────────────────────────────────────────────────────────────────────

const properties = [
  { title: "House for Sale",        location: "Liva, Paoa, Bulacan",             price: "₱1,000",  period: "/mo",    verified: false, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80" },
  { title: "Cozy Studio Apartment", location: "Poblacion, Sta. Maria, Bulacan",  price: "₱8,000",  period: "/month", verified: true,  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80" },
  { title: "Modern 2BR Apartment",  location: "Poblacion, Sta. Maria, Bulacan",  price: "₱12,000", period: "/month", verified: true,  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" },
  { title: "Spacious Family Home",  location: "Bagbaguin, Sta. Maria, Bulacan",  price: "₱15,000", period: "/month", verified: true,  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { title: "Studio Loft Unit",      location: "Pulong Buhangin, Sta. Maria",     price: "₱6,500",  period: "/month", verified: false, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80" },
  { title: "Townhouse for Rent",    location: "Tumana, Sta. Maria, Bulacan",     price: "₱10,500", period: "/month", verified: true,  image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
];

const features = [
  {
    title: "Verified Sellers",
    desc: "All property owners undergo identity verification with government ID and selfie before publishing listings.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    title: "Local Focus",
    desc: "Find properties by barangay within Sta. Maria, Bulacan with easy filtering options.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
  },
  {
    title: "Direct Messaging",
    desc: "Connect directly with verified sellers through our secure in-platform messaging system.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  },
];

const stats = [
  { value: "1,200", label: "Verified Sellers" },
  { value: "3,450", label: "Active Listings" },
  { value: "8,750", label: "Successful Connections" },
];

// ── SVG Helpers ───────────────────────────────────────────────────────────────

const pinIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b8fa0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const checkIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const chevronLeft = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fc8b4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const chevronRight = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1fc8b4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const logoIcon = (fill = "#1c2f42") => `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="${fill}"/><path d="M7 16L16 8l9 8" stroke="#1fc8b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14v8h5v-5h2v5h5v-8" stroke="#1fc8b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ── React Components ──────────────────────────────────────────────────────────

const { useState, useEffect } = React;

// Navbar
function Navbar() {
  return React.createElement('nav', null,
    React.createElement('a', { className: 'nav-logo', href: '#' },
      React.createElement('span', { dangerouslySetInnerHTML: { __html: logoIcon() } }),
      'HomeSure'
    ),
    React.createElement('div', { className: 'nav-btns' },
      React.createElement('button', { className: 'btn-outline' }, 'Login'),
      React.createElement('button', { className: 'btn-solid' }, 'Sign Up')
    )
  );
}

// Hero
function Hero() {
  return React.createElement('section', { className: 'hero' },
    React.createElement('div', { className: 'hero-bg' }),
    React.createElement('div', { className: 'hero-overlay' }),
    React.createElement('div', { className: 'hero-content' },
      React.createElement('h1', { className: 'hero-title' }, 'Discover Verified Homes with Confidence'),
      React.createElement('p', { className: 'hero-sub' }, 'Browse secure listings for long-term rent and property purchase. No hidden listings. No unverified sellers.'),
      React.createElement('div', { className: 'hero-btns' },
        React.createElement('button', { className: 'hero-btn-white' }, 'Browse Listings'),
        React.createElement('button', { className: 'hero-btn-ghost' }, 'List Your Property')
      )
    )
  );
}

// Property Card (side)
function SideCard({ property, onClick }) {
  return React.createElement('div', { className: 'card-side', onClick },
    React.createElement('img', { className: 'card-img-side', src: property.image, alt: property.title }),
    React.createElement('div', { className: 'card-body-side' },
      React.createElement('div', { className: 'card-title-side' }, property.title),
      React.createElement('div', { className: 'card-loc', dangerouslySetInnerHTML: { __html: pinIcon + `<span>${property.location}</span>` } }),
      React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: '#1fc8b4' } }, property.price)
    )
  );
}

// Property Card (center)
function CenterCard({ property }) {
  return React.createElement('div', { className: 'card-center' },
    React.createElement('div', { style: { position: 'relative' } },
      React.createElement('img', { className: 'card-img', src: property.image, alt: property.title }),
      property.verified && React.createElement('div', {
        className: 'verified-badge',
        dangerouslySetInnerHTML: { __html: checkIcon + ' Verified' }
      })
    ),
    React.createElement('div', { className: 'card-body' },
      React.createElement('div', { className: 'card-title' }, property.title),
      React.createElement('div', { className: 'card-loc', dangerouslySetInnerHTML: { __html: pinIcon + `<span>${property.location}</span>` } }),
      React.createElement('div', { className: 'card-footer-row' },
        React.createElement('div', { className: 'card-price' },
          property.price,
          React.createElement('span', null, property.period)
        ),
        React.createElement('span', { className: 'card-link' }, 'View Details')
      )
    )
  );
}

// Carousel
function Carousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const len = properties.length;
  const prev = () => setActiveIndex(i => (i - 1 + len) % len);
  const next = () => setActiveIndex(i => (i + 1) % len);

  const left   = properties[(activeIndex - 1 + len) % len];
  const center = properties[activeIndex];
  const right  = properties[(activeIndex + 1) % len];

  return React.createElement('section', { className: 'section' },
    React.createElement('h2', { className: 'section-title' }, 'Featured Properties'),
    React.createElement('p', { className: 'section-sub' }, 'Curated listings from verified sellers in Sta. Maria, Bulacan'),
    React.createElement('div', { className: 'carousel-wrap' },
      React.createElement('button', { className: 'carousel-btn', onClick: prev, dangerouslySetInnerHTML: { __html: chevronLeft } }),
      React.createElement(SideCard, { property: left, onClick: prev }),
      React.createElement(CenterCard, { property: center }),
      React.createElement(SideCard, { property: right, onClick: next }),
      React.createElement('button', { className: 'carousel-btn', onClick: next, dangerouslySetInnerHTML: { __html: chevronRight } })
    ),
    React.createElement('div', { className: 'dots' },
      properties.map((_, i) =>
        React.createElement('button', {
          key: i,
          className: 'dot' + (i === activeIndex ? ' active' : ''),
          onClick: () => setActiveIndex(i)
        })
      )
    )
  );
}

// Features
function Features() {
  return React.createElement('section', { className: 'section-alt' },
    React.createElement('div', { className: 'features-inner' },
      React.createElement('h2', { className: 'section-title' }, 'Why Choose HomeSure?'),
      React.createElement('p', { className: 'section-sub' }, 'A trusted platform built for security, transparency, and convenience'),
      React.createElement('div', { className: 'features-card-wrap' },
        features.map((f, i) =>
          React.createElement('div', { key: i, className: 'feature-card' },
            React.createElement('div', { className: 'feature-icon', dangerouslySetInnerHTML: { __html: f.icon } }),
            React.createElement('div', { className: 'feature-title' }, f.title),
            React.createElement('div', { className: 'feature-desc' }, f.desc)
          )
        )
      )
    )
  );
}

// Stats
function Stats() {
  return React.createElement('section', { className: 'section' },
    React.createElement('div', { className: 'stats-inner' },
      React.createElement('h2', { className: 'section-title' }, 'Trusted by Thousands'),
      React.createElement('p', { className: 'section-sub' }, 'Building a safer housing marketplace for everyone'),
      React.createElement('div', { className: 'stats-grid' },
        stats.map((s, i) =>
          React.createElement('div', { key: i, className: 'stat-box' },
            React.createElement('div', { className: 'stat-value' }, s.value),
            React.createElement('div', { className: 'stat-label' }, s.label)
          )
        )
      )
    )
  );
}

// CTA
function CTA() {
  return React.createElement('div', { className: 'cta-section' },
    React.createElement('div', { className: 'cta-inner' },
      React.createElement('h2', { className: 'cta-title' }, 'Ready to Get Started?'),
      React.createElement('p', { className: 'cta-sub' }, 'Join thousands of verified users finding their perfect home through HomeSure'),
      React.createElement('div', { className: 'cta-btns' },
        React.createElement('button', { className: 'cta-btn-white' }, 'Sign Up as Buyer'),
        React.createElement('button', { className: 'cta-btn-ghost' }, 'List Your Property')
      )
    )
  );
}

// Footer
function Footer() {
  const platformLinks = ['Browse Listings', 'List Your Property', 'How It Works', 'Messages'];
  const supportLinks  = ['Contact', 'FAQs', 'Report a Listing'];
  const legalLinks    = ['Privacy Policy', 'Terms of Service'];

  return React.createElement('footer', null,
    React.createElement('div', { className: 'footer-grid' },
      React.createElement('div', null,
        React.createElement('div', { className: 'footer-logo', dangerouslySetInnerHTML: { __html: logoIcon('#1c2f42') + ' HomeSure' } }),
        React.createElement('p', { className: 'footer-tagline' }, 'A verified housing platform for secure property rentals and purchases.')
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'footer-col-title' }, 'Platform'),
        ...platformLinks.map(l => React.createElement('a', { key: l, className: 'footer-link', href: '#' }, l))
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'footer-col-title' }, 'Support'),
        ...supportLinks.map(l => React.createElement('a', { key: l, className: 'footer-link', href: '#' }, l))
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'footer-col-title' }, 'Legal'),
        ...legalLinks.map(l => React.createElement('a', { key: l, className: 'footer-link', href: '#' }, l))
      )
    ),
    React.createElement('div', { className: 'footer-copy' }, '© 2026 HomeSure. All rights reserved.')
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

function App() {
  return React.createElement(React.Fragment, null,
    React.createElement(Navbar),
    React.createElement(Hero),
    React.createElement(Carousel),
    React.createElement(Features),
    React.createElement(Stats),
    React.createElement(CTA),
    React.createElement(Footer)
  );
}

// ── Mount ─────────────────────────────────────────────────────────────────────

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));