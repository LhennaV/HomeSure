"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ── Fallback Featured Properties Data ──────────────────────────────────────
const fallbackProperties = [
  {
    id: "1",
    title: "House for Sale",
    location: "Pulong Buhangin, Sta. Maria, Bulacan",
    price: "₱10,000",
    period: "/month",
    verified: true,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  },
  {
    id: "2",
    title: "Cozy Studio Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱8,000",
    period: "/month",
    verified: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  },
  {
    id: "3",
    title: "Modern 2BR Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱12,000",
    period: "/month",
    verified: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: "4",
    title: "Spacious Family Home",
    location: "Bagbaguin, Sta. Maria, Bulacan",
    price: "₱15,000",
    period: "/month",
    verified: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: "5",
    title: "Studio Loft Unit",
    location: "Pulong Buhangin, Sta. Maria",
    price: "₱6,500",
    period: "/month",
    verified: false,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: "6",
    title: "Townhouse for Rent",
    location: "Tumana, Sta. Maria, Bulacan",
    price: "₱10,500",
    period: "/month",
    verified: true,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
];

const categories = [
  {
    name: "Houses",
    count: "342 listings",
    color: "#1a9e8f",
    bg: "rgba(26,158,143,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Apartments",
    count: "218 listings",
    color: "#6c63ff",
    bg: "rgba(108,99,255,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="16" y2="21" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <line x1="2" y1="15" x2="22" y2="15" />
      </svg>
    ),
  },
  {
    name: "Townhouses",
    count: "97 listings",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M1 22h22" />
        <path d="M5 22V7l7-5 7 5v15" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
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

const whyFeatures = [
  {
    title: "Verified Sellers",
    desc: "All property owners undergo identity verification with government ID and selfie before publishing listings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Local Focus",
    desc: "Find properties by barangay within Sta. Maria, Bulacan with easy filtering options.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Direct Messaging",
    desc: "Connect directly with verified sellers through our secure in-platform messaging system.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const statsData = [
  { end: 24, suffix: "", label: "Barangays Covered" },
  { end: 1200, suffix: "+", label: "Verified Sellers" },
  { end: 0, suffix: "", label: "Unverified Listings" },
  { end: 100, suffix: "%", label: "Secure Messaging" },
];

const testimonials = [
  {
    stars: 5,
    quote: "Found my apartment in just two days. Every seller was verified — no scams, no stress.",
    name: "Maria Santos",
    role: "Tenant, Poblacion",
    initials: "MS",
  },
  {
    stars: 5,
    quote: "Listed my townhouse and got genuine buyers in under a week. The platform is so easy to use.",
    name: "Rolando Cruz",
    role: "Property Owner, Bagbaguin",
    initials: "RC",
  },
  {
    stars: 4,
    quote: "Direct messaging made negotiating with the seller so much smoother than the usual process.",
    name: "Jessa Reyes",
    role: "Buyer, Tumana",
    initials: "JR",
  },
];

// Helper hook for scroll reveals
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

// Typing Text Component
const typingPhrases = [
  "Find your home.",
  "Find verified properties.",
  "Find your perfect place.",
  "Find trusted listings.",
  "Find your next home.",
];

function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingPhrases[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!deleting) {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          68 + Math.random() * 38
        );
      } else {
        timer = setTimeout(() => setDeleting(true), 1900);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          28 + Math.random() * 18
        );
      } else {
        timer = setTimeout(() => {
          setPhraseIdx((i) => (i + 1) % typingPhrases.length);
          setDeleting(false);
        }, 280);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, phraseIdx]);

  return (
    <>
      {displayed}
      <span className="typing-cursor" />
    </>
  );
}

// Interactive Map Component
function HeroMap() {
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/assets/img/Sta. Maria Map.svg")
      .then((res) => res.text())
      .then((svg) => setSvgContent(svg))
      .catch((err) => console.error("Map SVG load error:", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    // Clear existing markers if any
    const existingMarkers = containerRef.current.querySelectorAll(".property-marker");
    existingMarkers.forEach((m) => m.remove());

    const markers = [
      { x: 35, y: 68, count: 12, barangay: "Poblacion" },
      { x: 40, y: 58, count: 8, barangay: "Guyong" },
      { x: 25, y: 73, count: 15, barangay: "Bagbaguin" },
      { x: 45, y: 78, count: 10, barangay: "Tumana" },
      { x: 63, y: 58, count: 6, barangay: "Catmon" },
      { x: 63, y: 28, count: 20, barangay: "Pulong Buhangin" },
    ];

    markers.forEach((marker, i) => {
      const pin = document.createElement("div");
      pin.className = "property-marker";
      pin.style.left = `${marker.x}%`;
      pin.style.top = `${marker.y}%`;
      pin.style.animationDelay = `${i * 0.3}s`;
      pin.innerHTML = `
        <div class="marker-pulse"></div>
        <div class="marker-icon">
          <img src="/assets/img/House Icon.svg" alt="Property" />
        </div>
        <div class="marker-tooltip">${marker.count} properties in ${marker.barangay}</div>
      `;
      containerRef.current?.appendChild(pin);
    });
  }, [svgContent]);

  useEffect(() => {
    if (!mapWrapRef.current) return;
    const wrap = mapWrapRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(0.5, transform.scale + delta), 3);
      setTransform((prev) => ({ ...prev, scale: newScale }));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.shiftKey) {
        setIsRotating(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      } else {
        setIsDragging(true);
        setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isRotating) {
        const deltaX = e.clientX - dragStart.x;
        setTransform((prev) => ({
          ...prev,
          rotate: prev.rotate + deltaX * 0.5,
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      } else if (isDragging) {
        setTransform((prev) => ({
          ...prev,
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsRotating(false);
    };

    wrap.addEventListener("wheel", handleWheel, { passive: false });
    wrap.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      wrap.removeEventListener("wheel", handleWheel);
      wrap.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [transform, isDragging, isRotating, dragStart]);

  return (
    <div
      className="hero-map-wrap"
      ref={mapWrapRef}
      style={{ cursor: isDragging ? "grabbing" : isRotating ? "crosshair" : "grab" }}
    >
      <div
        ref={containerRef}
        className="hero-map-container"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
          transformOrigin: "center center",
          transition: isDragging || isRotating ? "none" : "transform 0.1s ease-out",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("hs-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("hs-theme", next);
    setTheme(next);
  };

  return (
    <nav>
      <Link className="nav-logo" href="/">
        <span className="nav-catstone-wrap">
          <img src="/assets/img/CatsTone Logo.png" alt="CatsTone" className="nav-catstone-img" />
        </span>
        <span className="nav-logo-divider" />
        <img src="/assets/img/HomeSure_Logo.svg" alt="HomeSure" class="img-logo" style={{ display: "block" }} />
        <span>HomeSure</span>
      </Link>
      <div className="nav-btns">
        <button
          className="nav-theme-btn"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <Link href="/auth/login" className="btn-outline">
          Sign In
        </Link>
        <Link href="/auth/signup" className="btn-solid">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

// Hero Section Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero-particles" />
      <div className="hero-left">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Sta. Maria, Bulacan — Property Platform
        </div>
        <h1 className="hero-title">
          Buy. Sell. Rent.<br />
          All in one place.<br />
          <span className="hero-title-accent">
            <TypingText />
          </span>
        </h1>
        <p className="hero-desc">
          HomeSure connects buyers with verified property owners across Sta. Maria, Bulacan. No hidden listings. No unverified sellers.
        </p>
        <div className="hero-ctas">
          <Link href="/dashboard/properties" className="hero-btn-primary hero-btn-browse" style={{ textDecoration: 'none' }}>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span>Browse Listings</span>
          </Link>
          <Link href="/auth/signup" className="hero-btn-secondary hero-btn-list" style={{ textDecoration: 'none' }}>
            <span>List Your Property</span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
          <Link href="/auth/login" className="hero-btn-mobile-signin">
            Sign In
          </Link>
          <Link href="/auth/signup" className="hero-btn-mobile-signup">
            Sign Up
          </Link>
        </div>
        <div className="hero-trust">
          <span className="hero-trust-item">
            <span className="hero-trust-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <span>Verified Listings</span>
          </span>
          <span className="hero-trust-item">
            <span className="hero-trust-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            <span>4.8/5 Rating</span>
          </span>
          <span className="hero-trust-item">
            <span className="hero-trust-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span>Secure Messaging</span>
          </span>
        </div>
      </div>
      <div className="hero-right">
        <HeroMap />
      </div>
    </section>
  );
}

// Feature Highlights Section
function FeatureHighlights() {
  const highlights = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Admin-Verified Listings",
      desc: "Every listing reviewed before publishing",
      color: "#00c9a7",
      badge: "VERIFIED",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Secure In-Chat Payments",
      desc: "Agree on price and send payment requests within the chat",
      color: "#3b82f6",
      badge: "SECURE",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Anti-Fraud Protection",
      desc: "Government ID verification for all sellers",
      color: "#f59e0b",
      badge: "PROTECTED",
    },
  ];

  return (
    <section className="feature-highlights">
      <div className="feature-grid">
        {highlights.map((feat, i) => (
          <div key={i} className="feature-card" style={{ "--feature-color": feat.color } as React.CSSProperties}>
            <div className="feature-card-icon">{feat.icon}</div>
            <div className="feature-card-badge">{feat.badge}</div>
            <h3 className="feature-card-title">{feat.title}</h3>
            <p className="feature-card-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Trust Banner Component
function TrustBanner() {
  return (
    <section className="trust-banner">
      <div className="trust-content">
        <div className="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="trust-text">
          Every listing is reviewed. Every seller is verified. <span className="trust-highlight">No exceptions.</span>
        </h3>
        <p className="trust-subtext">
          Your safety is our priority. All sellers undergo government ID verification before posting.
        </p>
      </div>
    </section>
  );
}

// Platform Features Component
function PlatformFeatures() {
  const platformList = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "In-Chat Payment Requests",
      desc: "Request and track payments directly in conversations",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Security Deposit Management",
      desc: "Automated deposit tracking and refund processing",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Damage Reporting System",
      desc: "Photo uploads and dispute resolution tools",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Barangay-Level Search",
      desc: "Find properties in all 24 barangays of Sta. Maria",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Verified Seller Badges",
      desc: "Government ID verification for all property owners",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Real-Time Messaging",
      desc: "Instant chat with sellers, no phone numbers required",
    },
  ];

  return (
    <section className="platform-features">
      <h2 className="section-title">Platform Features</h2>
      <p className="section-subtitle">Everything you need for safe and secure property rentals</p>
      <div className="platform-grid">
        {platformList.map((feat, i) => (
          <div key={i} className="platform-item">
            <div className="platform-icon">{feat.icon}</div>
            <h3 className="platform-title">{feat.title}</h3>
            <p className="platform-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Categories Component
function Categories() {
  const [ref, visible] = useReveal();
  return (
    <section className={`section reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <span className="section-label">Browse by Type</span>
      <h2 className="section-title">Find What You're Looking For</h2>
      <p className="section-sub">Filter by property type or listing category</p>
      <div className="categories-grid">
        {categories.map((c, i) => (
          <div key={i} className="cat-card">
            <div className="cat-icon" style={{ background: c.bg }}>
              <span style={{ color: c.color }}>{c.icon}</span>
            </div>
            <div className="cat-name">{c.name}</div>
            <div className="cat-count">{c.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Carousel / Featured Properties Component
function Carousel({ propertiesList }: { propertiesList: any[] }) {
  const [ref, visible] = useReveal();
  const list = propertiesList.length > 0 ? propertiesList : fallbackProperties;
  const len = list.length;
  const [idx, setIdx] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % len), 3500);
    return () => clearInterval(t);
  }, [autoKey, len]);

  const go = (next: number) => {
    setIdx((next + len) % len);
    setAutoKey((k) => k + 1);
  };

  const leftProp = list[(idx - 1 + len) % len];
  const centerProp = list[idx];
  const rightProp = list[(idx + 1) % len];

  const SideCard = (prop: any) => (
    <div className="crd-side">
      <img className="crd-img" src={prop.image || prop.images?.[0] || fallbackProperties[0].image} alt={prop.title} />
      <div className="crd-body-side">
        <div className="card-title-side">{prop.title}</div>
        <div className="card-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b8fa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{prop.location || prop.address}</span>
        </div>
        <div className="card-price-side">
          {typeof prop.price === "number" ? `₱${prop.price.toLocaleString()}` : prop.price}
        </div>
      </div>
    </div>
  );

  return (
    <section className={`section-alt reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <span className="section-label">Featured Properties</span>
      <h2 className="section-title">Curated Listings Near You</h2>
      <p className="section-sub">Hand-picked from verified sellers in Sta. Maria, Bulacan</p>
      <div className="crs-stage">
        <div className="crs-row">
          <button className="crs-btn" onClick={() => go(idx - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="crs-clip">
            <div className="crd-side-wrap crd-side-left" onClick={() => go(idx - 1)}>
              {SideCard(leftProp)}
            </div>
            <div className="crd-center">
              <div style={{ position: "relative" }}>
                <img
                  className="crd-img-center"
                  src={centerProp.image || centerProp.images?.[0] || fallbackProperties[0].image}
                  alt={centerProp.title}
                />
                {(centerProp.verified || centerProp.seller?.is_verified) && (
                  <div className="verified-badge">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Verified
                  </div>
                )}
              </div>
              <div className="crd-body-center">
                <div className="card-title">{centerProp.title}</div>
                <div className="card-loc">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b8fa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{centerProp.location || centerProp.address}</span>
                </div>
                <div className="card-footer-row">
                  <div className="card-price">
                    {typeof centerProp.price === "number" ? `₱${centerProp.price.toLocaleString()}` : centerProp.price}
                    <span>{centerProp.period || "/month"}</span>
                  </div>
                  <Link href="/dashboard/properties" className="card-link">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="crd-side-wrap crd-side-right" onClick={() => go(idx + 1)}>
              {SideCard(rightProp)}
            </div>
          </div>
          <button className="crs-btn" onClick={() => go(idx + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="dots">
        {list.map((_, i) => (
          <button key={i} className={`dot${i === idx ? " active" : ""}`} onClick={() => go(i)} />
        ))}
      </div>
    </section>
  );
}

// How It Works Component
function HowItWorks() {
  const [ref, visible] = useReveal();
  return (
    <section className={`section reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <span className="section-label">How It Works</span>
      <h2 className="section-title">Simple Steps to Your Next Home</h2>
      <p className="section-sub">Get started in minutes — no complicated process</p>
      <div className="how-steps">
        {steps.map((s, i) => (
          <div key={i} className="how-step">
            <div className="how-step-num">{s.num}</div>
            <div className="how-step-title">{s.title}</div>
            <div className="how-step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Features Component
function WhyHomeSure() {
  const [ref, visible] = useReveal();
  return (
    <section className={`section-alt reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <div className="features-inner">
        <span className="section-label">Why HomeSure</span>
        <h2 className="section-title">Built for Trust & Transparency</h2>
        <p className="section-sub">A platform designed with security and convenience at its core</p>
        <div className="features-card-wrap">
          {whyFeatures.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stat Box Component
function StatBox({ stat }: { stat: (typeof statsData)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active || stat.end === 0) {
      if (active && stat.end === 0) setVal(0);
      return;
    }
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(stat.end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= stat.end) {
        setVal(stat.end);
        clearInterval(timer);
      } else {
        setVal(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, stat.end]);

  return (
    <div className="stat-box" ref={ref}>
      <div className="stat-value">
        {val.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

// Stats Component
function Stats() {
  const [ref, visible] = useReveal();
  return (
    <section className={`section reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <div className="stats-inner">
        <span className="section-label">Our Numbers</span>
        <h2 className="section-title">Trusted by Thousands</h2>
        <p className="section-sub">Building a safer housing marketplace for everyone in Sta. Maria</p>
        <div className="stats-grid">
          {statsData.map((s, i) => (
            <StatBox key={i} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
function Testimonials() {
  const [ref, visible] = useReveal();
  return (
    <section className={`section-alt reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <span className="section-label">Testimonials</span>
      <h2 className="section-title">What Our Users Say</h2>
      <p className="section-sub">Real stories from real people in the community</p>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="t-stars">{"★".repeat(t.stars) + (t.stars < 5 ? "☆".repeat(5 - t.stars) : "")}</div>
            <p className="t-quote">"{t.quote}"</p>
            <div className="t-author">
              <div className="t-avatar">{t.initials}</div>
              <div>
                <div className="t-name">{t.name}</div>
                <div className="t-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// CTA Banner Component
function CTA() {
  const [ref, visible] = useReveal();
  return (
    <div className={`cta-section reveal-section${visible ? " in-view" : ""}`} ref={ref}>
      <div className="cta-inner">
        <h2 className="cta-title">Ready to Find Your Next Home?</h2>
        <p className="cta-sub">
          Join thousands of verified users discovering trusted properties in Sta. Maria, Bulacan
        </p>
        <div className="cta-btns">
          <Link href="/auth/signup" className="cta-btn-white" style={{ textDecoration: 'none' }}>
            Sign Up as Buyer
          </Link>
          <Link href="/auth/signup" className="cta-btn-ghost" style={{ textDecoration: 'none' }}>
            List Your Property
          </Link>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <img src="/assets/img/HomeSure_Logo.svg" alt="HomeSure" height={28} style={{ display: "block" }} />
            HomeSure
          </div>
          <p className="footer-tagline">
            A verified housing platform for secure property rentals and purchases in Sta. Maria, Bulacan.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <Link href="/dashboard/properties" className="footer-link">
            Browse Listings
          </Link>
          <Link href="/auth/signup" className="footer-link">
            List Your Property
          </Link>
          <Link href="/about.html" className="footer-link">
            About Us
          </Link>
        </div>
        <div>
          <div className="footer-col-title">Support</div>
          <Link href="/help.html" className="footer-link">
            Help & Support
          </Link>
          <Link href="/help.html" className="footer-link">
            Contact Us
          </Link>
          <Link href="/help.html" className="footer-link">
            Report a Listing
          </Link>
        </div>
        <div>
          <div className="footer-col-title">Legal</div>
          <Link href="/privacy-policy.html" className="footer-link">
            Privacy Policy
          </Link>
          <Link href="/terms.html" className="footer-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export default function HomePage() {
  const [propertiesList, setPropertiesList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*, seller:profiles(*)")
          .eq("status", "available")
          .limit(6);
        if (!error && data && data.length > 0) {
          setPropertiesList(data);
        }
      } catch (e) {
        console.error("Error fetching properties for landing page:", e);
      }
    }
    fetchProperties();
  }, []);

  return (
    <>
    <link rel="stylesheet" href="/assets/css/index.css" />
   
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      <Hero />
      <FeatureHighlights />
      <TrustBanner />
      <PlatformFeatures />
      <Categories />
      <Carousel propertiesList={propertiesList} />
      <HowItWorks />
      <WhyHomeSure />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
    </>
  );
}
