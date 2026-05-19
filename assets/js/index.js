// ── Data ──────────────────────────────────────────────────────────────────────

const properties = [
  {
    title: "House for Sale",
    location: "Pulong Buhangin, Sta. Maria, Bulacan",
    price: "₱10,000",
    period: "/month",
    verified: true,
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

// GeoJSON polygons for all 24 barangays of Sta. Maria, Bulacan (approximate boundaries)
const barangayGeoJSON = {
  type: 'FeatureCollection',
  features: [
    { type:'Feature', properties:{ name:'Silangan',        count:4  }, geometry:{ type:'Polygon', coordinates:[[ [120.9510,14.8475],[120.9640,14.8475],[120.9660,14.8550],[120.9595,14.8650],[120.9530,14.8620],[120.9510,14.8540],[120.9510,14.8475] ]] } },
    { type:'Feature', properties:{ name:'Mag-asawang Sapa',count:6  }, geometry:{ type:'Polygon', coordinates:[[ [120.9400,14.8370],[120.9510,14.8370],[120.9510,14.8475],[120.9450,14.8480],[120.9400,14.8440],[120.9400,14.8370] ]] } },
    { type:'Feature', properties:{ name:'Pulong Buhangin', count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9640,14.8475],[120.9920,14.8475],[120.9960,14.8430],[120.9960,14.8310],[120.9800,14.8290],[120.9660,14.8350],[120.9640,14.8425],[120.9640,14.8475] ]] } },
    { type:'Feature', properties:{ name:'Cay Pombo',       count:3  }, geometry:{ type:'Polygon', coordinates:[[ [120.9510,14.8370],[120.9570,14.8370],[120.9640,14.8425],[120.9640,14.8475],[120.9510,14.8475],[120.9510,14.8370] ]] } },
    { type:'Feature', properties:{ name:'Balasing',        count:3  }, geometry:{ type:'Polygon', coordinates:[[ [120.9800,14.8290],[120.9960,14.8310],[120.9980,14.8180],[120.9870,14.8160],[120.9780,14.8200],[120.9800,14.8290] ]] } },
    { type:'Feature', properties:{ name:'Bulac',           count:2  }, geometry:{ type:'Polygon', coordinates:[[ [120.9870,14.8160],[120.9980,14.8180],[121.0020,14.8100],[121.0000,14.8010],[120.9900,14.8010],[120.9870,14.8090],[120.9870,14.8160] ]] } },
    { type:'Feature', properties:{ name:'Caysio',          count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9400,14.8370],[120.9510,14.8370],[120.9510,14.8310],[120.9455,14.8270],[120.9390,14.8280],[120.9390,14.8370],[120.9400,14.8370] ]] } },
    { type:'Feature', properties:{ name:'Manggahan',       count:7  }, geometry:{ type:'Polygon', coordinates:[[ [120.9280,14.8350],[120.9390,14.8370],[120.9390,14.8280],[120.9360,14.8230],[120.9280,14.8230],[120.9280,14.8350] ]] } },
    { type:'Feature', properties:{ name:'Santa Cruz',      count:8  }, geometry:{ type:'Polygon', coordinates:[[ [120.9280,14.8230],[120.9360,14.8230],[120.9420,14.8200],[120.9420,14.8120],[120.9310,14.8110],[120.9270,14.8140],[120.9270,14.8230],[120.9280,14.8230] ]] } },
    { type:'Feature', properties:{ name:'Guyong',          count:9  }, geometry:{ type:'Polygon', coordinates:[[ [120.9455,14.8270],[120.9510,14.8310],[120.9570,14.8310],[120.9620,14.8270],[120.9620,14.8200],[120.9540,14.8180],[120.9455,14.8200],[120.9455,14.8270] ]] } },
    { type:'Feature', properties:{ name:'Catmon',          count:6  }, geometry:{ type:'Polygon', coordinates:[[ [120.9620,14.8270],[120.9660,14.8350],[120.9800,14.8290],[120.9780,14.8200],[120.9660,14.8150],[120.9620,14.8200],[120.9620,14.8270] ]] } },
    { type:'Feature', properties:{ name:'San Jose Patag',  count:4  }, geometry:{ type:'Polygon', coordinates:[[ [120.9510,14.8200],[120.9540,14.8180],[120.9620,14.8200],[120.9620,14.8130],[120.9560,14.8100],[120.9510,14.8120],[120.9490,14.8160],[120.9510,14.8200] ]] } },
    { type:'Feature', properties:{ name:'Santa Clara',     count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9270,14.8140],[120.9310,14.8110],[120.9420,14.8120],[120.9420,14.8060],[120.9360,14.8020],[120.9270,14.8030],[120.9260,14.8090],[120.9270,14.8140] ]] } },
    { type:'Feature', properties:{ name:'Poblacion',       count:12 }, geometry:{ type:'Polygon', coordinates:[[ [120.9420,14.8120],[120.9490,14.8160],[120.9510,14.8120],[120.9510,14.8060],[120.9450,14.8030],[120.9420,14.8060],[120.9420,14.8120] ]] } },
    { type:'Feature', properties:{ name:'Bagbaguin',       count:7  }, geometry:{ type:'Polygon', coordinates:[[ [120.9360,14.8020],[120.9420,14.8060],[120.9420,14.8000],[120.9390,14.7960],[120.9340,14.7960],[120.9320,14.8000],[120.9360,14.8020] ]] } },
    { type:'Feature', properties:{ name:'Tumana',          count:6  }, geometry:{ type:'Polygon', coordinates:[[ [120.9450,14.8030],[120.9510,14.8060],[120.9560,14.8040],[120.9570,14.7980],[120.9510,14.7950],[120.9450,14.7970],[120.9450,14.8030] ]] } },
    { type:'Feature', properties:{ name:'Parada',          count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9560,14.8040],[120.9620,14.8130],[120.9660,14.8150],[120.9700,14.8060],[120.9660,14.7990],[120.9580,14.7960],[120.9570,14.7980],[120.9560,14.8040] ]] } },
    { type:'Feature', properties:{ name:'San Vicente',     count:4  }, geometry:{ type:'Polygon', coordinates:[[ [120.9700,14.8060],[120.9780,14.8090],[120.9870,14.8090],[120.9900,14.8010],[120.9800,14.7940],[120.9680,14.7920],[120.9660,14.7990],[120.9700,14.8060] ]] } },
    { type:'Feature', properties:{ name:'Lalakhan',        count:3  }, geometry:{ type:'Polygon', coordinates:[[ [120.9220,14.8030],[120.9260,14.8090],[120.9270,14.8030],[120.9260,14.7970],[120.9220,14.7960],[120.9210,14.7990],[120.9220,14.8030] ]] } },
    { type:'Feature', properties:{ name:'San Gabriel',     count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9320,14.8000],[120.9390,14.7960],[120.9390,14.7910],[120.9340,14.7870],[120.9290,14.7880],[120.9280,14.7930],[120.9320,14.8000] ]] } },
    { type:'Feature', properties:{ name:'Tabing Bakod',    count:3  }, geometry:{ type:'Polygon', coordinates:[[ [120.9260,14.7970],[120.9320,14.8000],[120.9280,14.7930],[120.9230,14.7900],[120.9220,14.7960],[120.9260,14.7970] ]] } },
    { type:'Feature', properties:{ name:'Buenavista',      count:4  }, geometry:{ type:'Polygon', coordinates:[[ [120.9510,14.7950],[120.9580,14.7960],[120.9660,14.7990],[120.9680,14.7920],[120.9600,14.7870],[120.9510,14.7880],[120.9480,14.7910],[120.9510,14.7950] ]] } },
    { type:'Feature', properties:{ name:'Camangyanan',     count:5  }, geometry:{ type:'Polygon', coordinates:[[ [120.9390,14.7910],[120.9450,14.7970],[120.9510,14.7950],[120.9480,14.7910],[120.9450,14.7870],[120.9400,14.7870],[120.9390,14.7910] ]] } },
    { type:'Feature', properties:{ name:'Mahabang Parang', count:2  }, geometry:{ type:'Polygon', coordinates:[[ [120.9230,14.7900],[120.9290,14.7880],[120.9340,14.7870],[120.9400,14.7870],[120.9390,14.7820],[120.9330,14.7800],[120.9240,14.7820],[120.9220,14.7860],[120.9230,14.7900] ]] } },
  ]
};

// Exact 24 barangays of Sta. Maria, Bulacan
const STA_MARIA_BARANGAYS = new Set([
  'Bagbaguin','Balasing','Buenavista','Bulac','Camangyanan','Catmon',
  'Cay Pombo','Caysio','Guyong','Lalakhan','Mag-asawang Sapa',
  'Mahabang Parang','Manggahan','Parada','Poblacion','Pulong Buhangin',
  'San Gabriel','San Jose Patag','San Vicente','Santa Clara','Santa Cruz',
  'Silangan','Tabing Bakod','Tumana',
]);

// Name aliases — OSM may use these alternate spellings
const BARANGAY_ALIAS = {
  'Sta. Clara':'Santa Clara','Sta. Cruz':'Santa Cruz',
  'Cay-Pombo':'Cay Pombo','Mag-Asawang Sapa':'Mag-asawang Sapa',
  'Mahabang-Parang':'Mahabang Parang','Tabing-Bakod':'Tabing Bakod',
  'San Jose-Patag':'San Jose Patag',
};

// Listing count per barangay — merged with Overpass API data
const barangayListings = {
  'Poblacion':12,'Guyong':9,'Santa Cruz':8,'Manggahan':7,'Bagbaguin':7,
  'Mag-asawang Sapa':6,'Tumana':6,'Catmon':6,'Caysio':5,'Santa Clara':5,
  'San Gabriel':5,'Camangyanan':5,'Parada':5,'Silangan':4,'San Jose Patag':4,
  'San Vicente':4,'Buenavista':4,'Pulong Buhangin':3,'Cay Pombo':3,
  'Balasing':3,'Lalakhan':3,'Tabing Bakod':3,'Bulac':2,'Mahabang Parang':2,
};

// Assemble ordered OSM way segments into a single closed ring
function assembleRing(ways) {
  if (!ways || !ways.length) return null;
  if (ways.length === 1) {
    const w = ways[0]; if (w.length < 3) return null;
    const f = w[0], l = w[w.length-1];
    return (f[0]===l[0]&&f[1]===l[1]) ? w : [...w, f];
  }
  let ring = [...ways[0]];
  const rem = [...ways.slice(1)];
  while (rem.length) {
    const tail = ring[ring.length-1]; let found = false;
    for (let i = 0; i < rem.length; i++) {
      const w = rem[i];
      if (Math.abs(w[0][0]-tail[0])<1e-7 && Math.abs(w[0][1]-tail[1])<1e-7)
        { ring.push(...w.slice(1)); rem.splice(i,1); found=true; break; }
      if (Math.abs(w[w.length-1][0]-tail[0])<1e-7 && Math.abs(w[w.length-1][1]-tail[1])<1e-7)
        { ring.push(...[...w].reverse().slice(1)); rem.splice(i,1); found=true; break; }
    }
    if (!found) break;
  }
  if (ring.length < 4) return null;
  const f = ring[0], l = ring[ring.length-1];
  if (Math.abs(f[0]-l[0])>1e-7||Math.abs(f[1]-l[1])>1e-7) ring.push(f);
  return ring;
}

// Convert Overpass API `out geom` response to GeoJSON — only Sta. Maria barangays
function overpassToGeoJSON(osm) {
  const features = [];
  (osm.elements || []).forEach(el => {
    if (el.type !== 'relation') return;
    let name = el.tags?.name || el.tags?.['name:en'] || ''; if (!name) return;
    name = name.replace(/^(Barangay|Brgy\.?)\s+/i, '').trim();
    if (BARANGAY_ALIAS[name]) name = BARANGAY_ALIAS[name];
    if (!STA_MARIA_BARANGAYS.has(name)) return;

    // `out geom` puts geometry directly on each member way; skip inner rings (holes)
    const outerWays = (el.members || [])
      .filter(m => m.type === 'way' && m.role !== 'inner' && m.geometry && m.geometry.length > 1)
      .map(m => m.geometry.map(g => [g.lon, g.lat]));
    if (!outerWays.length) return;

    const ring = assembleRing(outerWays);
    if (!ring || ring.length < 4) return;
    features.push({
      type: 'Feature',
      properties: { name, count: barangayListings[name] || 2 },
      geometry: { type: 'Polygon', coordinates: [ring] },
    });
  });
  return { type: 'FeatureCollection', features };
}

// ── Theme init (read localStorage, default dark) ──────────────────────────────
(function () {
  const t = localStorage.getItem('hs-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

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

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Typing Animation
const typingPhrases = [
  "Find your home.",
  "Find verified properties.",
  "Find your perfect place.",
  "Find trusted listings.",
  "Find your next home.",
];

function TypingText() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingPhrases[phraseIdx];
    let timer;

    if (!deleting) {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          68 + Math.random() * 38,
        );
      } else {
        timer = setTimeout(() => setDeleting(true), 1900);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(d => d.slice(0, -1)),
          28 + Math.random() * 18,
        );
      } else {
        timer = setTimeout(() => {
          setPhraseIdx(i => (i + 1) % typingPhrases.length);
          setDeleting(false);
        }, 280);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, phraseIdx]);

  return React.createElement(
    React.Fragment, null,
    displayed,
    React.createElement('span', { className: 'typing-cursor' }),
  );
}

// Hero Wheel — center is fixed, only arms orbit clockwise
function HeroCards() {
  const cards = properties.slice(0, 3);
  return React.createElement(
    'div', { className: 'hero-cards' },
    cards.map((prop, i) =>
      React.createElement(
        'div', { key: i, className: 'hero-card' },
        React.createElement(
          'div', { className: 'wc-img-wrap' },
          React.createElement('img', { className: 'wc-img', src: prop.image, alt: prop.title }),
          prop.verified
            ? React.createElement(
                'span', { className: 'wc-verified-badge' },
                React.createElement('span', { dangerouslySetInnerHTML: { __html: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` } }),
                'Verified',
              )
            : null,
        ),
        React.createElement(
          'div', { className: 'wc-info' },
          React.createElement('div', { className: 'wc-title' }, prop.title),
          React.createElement('div', { className: 'wc-location' },
            React.createElement('span', { dangerouslySetInnerHTML: { __html: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>` } }),
            prop.location,
          ),
          React.createElement('div', { className: 'wc-footer' },
            React.createElement('span', { className: 'wc-price' }, prop.price, React.createElement('span', { className: 'wc-period' }, prop.period)),
            React.createElement('span', { className: 'wc-view' }, 'View Details'),
          ),
        ),
      )
    ),
  );
}

function HeroMap() {
  const mapRef     = useRef(null);
  const mapInstRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!mapRef.current || mapInstRef.current) return;

    const map = new maplibregl.Map({
      container:          mapRef.current,
      style:              'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center:             [120.963, 14.820],
      zoom:               12.6,
      pitch:              35,
      bearing:            0,
      antialias:          true,
      attributionControl: false,
    });


    map.on('load', () => {
      // Start with fallback data so all 24 barangay outlines are visible immediately
      map.addSource('barangays', { type: 'geojson', data: barangayGeoJSON, generateId: true });

      // Layer 1 — flat ground fill (establishes the outline footprint)
      map.addLayer({
        id:   'barangays-fill',
        type: 'fill',
        source: 'barangays',
        paint: {
          'fill-color': [
            'interpolate', ['linear'], ['get', 'count'],
            0, '#0a2e26', 6, '#009e83', 12, '#00c9a7',
          ],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.35, 0.18],
        },
      });

      // Layer 2 — crisp teal outline for each barangay boundary
      map.addLayer({
        id:   'barangays-outline',
        type: 'line',
        source: 'barangays',
        paint: {
          'line-color': '#00c9a7',
          'line-width': 1.6,
          'line-opacity': 0.85,
        },
      });

      // Layer 3 — 3D extrusion rising from the outline footprint
      map.addLayer({
        id:   'barangays-3d',
        type: 'fill-extrusion',
        source: 'barangays',
        paint: {
          'fill-extrusion-color': [
            'interpolate', ['linear'], ['get', 'count'],
            0, '#0a2e26', 4, '#005c49', 8, '#009e83', 12, '#00c9a7',
          ],
          'fill-extrusion-height':  ['*', ['get', 'count'], 50],
          'fill-extrusion-base':    0,
          'fill-extrusion-opacity': 0.88,
        },
      });

      // Layer 4 — barangay name labels
      map.addLayer({
        id:     'barangay-labels',
        type:   'symbol',
        source: 'barangays',
        layout: {
          'text-field':     ['get', 'name'],
          'text-size':      10,
          'text-anchor':    'center',
          'text-max-width': 6,
        },
        paint: {
          'text-color':      '#ffffff',
          'text-halo-color': 'rgba(0,0,0,0.7)',
          'text-halo-width': 1.2,
        },
      });

      // Hover — tooltip + ground fill highlight (works at any camera angle)
      let hoveredId = null;
      const setHover = (id) => {
        if (hoveredId !== null) map.setFeatureState({ source: 'barangays', id: hoveredId }, { hover: false });
        hoveredId = id;
        if (hoveredId !== null) map.setFeatureState({ source: 'barangays', id: hoveredId }, { hover: true });
      };
      map.on('mousemove', 'barangays-fill', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const p = e.features[0].properties;
        setTooltip({ name: p.name, count: p.count });
        setHover(e.features[0].id);
      });
      map.on('mouseleave', 'barangays-fill', () => {
        map.getCanvas().style.cursor = '';
        setTooltip(null);
        setHover(null);
      });

      // Fetch real OSM barangay boundaries and swap in when ready
      const q = `[out:json][timeout:90];relation["admin_level"="10"]["boundary"="administrative"](14.773,120.912,14.876,121.015);out geom;`;
      const body = 'data=' + encodeURIComponent(q);
      const tryFetch = url => fetch(url, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
      tryFetch('https://overpass-api.de/api/interpreter')
        .catch(() => tryFetch('https://overpass.kumi.systems/api/interpreter'))
        .then(r => r.json())
        .then(data => {
          const gj = overpassToGeoJSON(data);
          console.log('[HeroMap] Overpass:', data.elements?.length, 'elements,', gj.features.length, 'matched barangays');
          if (gj.features.length > 0) map.getSource('barangays').setData(gj);
        })
        .catch(() => {});
    });

    mapInstRef.current = map;
    return () => {
      if (mapInstRef.current) { mapInstRef.current.remove(); mapInstRef.current = null; }
    };
  }, []);

  const total = barangayGeoJSON.features.reduce((s, f) => s + f.properties.count, 0);

  return React.createElement(
    'div', { className: 'hero-map-wrap' },
    React.createElement('div', { ref: mapRef, className: 'hero-map-el' }),
    tooltip && React.createElement(
      'div', { className: 'map-hover-tip' },
      React.createElement('div', { className: 'mp-name' }, tooltip.name),
      React.createElement('div', { className: 'mp-count' }, `${tooltip.count} listings`),
    ),
    React.createElement('div', { className: 'map-badge' },
      React.createElement('span', { className: 'map-badge-dot' }),
      `${total} listings · 24 barangays`,
    ),
  );
}

const sunSVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

// Navbar
function Navbar() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hs-theme', next);
    setTheme(next);
  }

  return React.createElement(
    "nav",
    null,
    React.createElement(
      "a",
      { className: "nav-logo", href: "#" },
      React.createElement("span", { className: "nav-catstone-wrap" },
        React.createElement("img", { src: "assets/img/CatsTone Logo.png", alt: "CatsTone", className: "nav-catstone-img" }),
      ),
      React.createElement("span", { className: "nav-logo-divider" }),
      React.createElement("img", { src: LOGO_SRC, alt: "HomeSure", height: 30, style: { display: "block" } }),
      "HomeSure",
    ),
    React.createElement(
      "div",
      { className: "nav-btns" },
      React.createElement("button", {
        className: "nav-theme-btn",
        onClick: toggleTheme,
        title: theme === 'dark' ? 'Switch to Light' : 'Switch to Dark',
        dangerouslySetInnerHTML: { __html: theme === 'dark' ? sunSVG : moonSVG },
      }),
      React.createElement("button", { className: "btn-outline", onClick: () => (window.location.href = "auth/signin.html") }, "Sign In"),
      React.createElement(
        "button",
        { className: "btn-solid", onClick: () => (window.location.href = "auth/signup.html") },
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
    React.createElement(HeroMap),
    React.createElement("div", { className: "hero-overlay" }),

    // ── Content ──
    React.createElement(
      "div",
      { className: "hero-left" },
      React.createElement(
        "div",
        { className: "hero-badge" },
        React.createElement("span", { className: "hero-badge-dot" }),
        "Sta. Maria, Bulacan — Property Platform",
      ),
      React.createElement(
        "h1",
        { className: "hero-title" },
        "Buy. Sell. Rent.",
        React.createElement("br"),
        "All in one place.",
        React.createElement("br"),
        React.createElement(
          "span", { className: "hero-title-accent" },
          React.createElement(TypingText),
        ),
      ),
      React.createElement(
        "p",
        { className: "hero-desc" },
        "HomeSure connects buyers with verified property owners across Sta. Maria, Bulacan. No hidden listings. No unverified sellers.",
      ),
      React.createElement(
        "div",
        { className: "hero-ctas" },
        React.createElement(
          "button",
          { className: "hero-btn-primary", onClick: () => (window.location.href = "auth/signin.html") },
          React.createElement("span", { dangerouslySetInnerHTML: { __html: searchIcon } }),
          React.createElement("span", null, "Browse Listings"),
        ),
        React.createElement(
          "button",
          { className: "hero-btn-secondary", onClick: () => (window.location.href = "auth/signup.html") },
          React.createElement("span", null, "List Your Property"),
          React.createElement("span", { dangerouslySetInnerHTML: { __html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>` } }),
        ),
      ),
      React.createElement(
        "div",
        { className: "hero-trust" },
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: shieldIcon } }),
          React.createElement("span", null, "Verified Listings"),
        ),
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: starIcon } }),
          React.createElement("span", null, "4.8/5 Rating"),
        ),
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: lockIcon } }),
          React.createElement("span", null, "Secure Messaging"),
        ),
      ),
    ),

  );
}

// Categories
function Categories() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
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
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
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
  const [ref, visible] = useReveal();
  return React.createElement(
    "div",
    { className: `cta-section reveal-section${visible ? ' in-view' : ''}`, ref },
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
            {
              key: l,
              className: "footer-link",
              href: l === "About Us" ? "about.html" : "#",
            },
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
            {
              key: l,
              className: "footer-link",
              href: l === "Privacy Policy" ? "privacy-policy.html" : "terms.html",
            },
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
