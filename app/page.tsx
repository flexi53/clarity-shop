"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ShoppingCart, X, Plus, Minus, Heart, Search, Menu, ChevronRight, ChevronDown, Star, Zap, Shield, Truck, Award, ArrowRight, Check, Package, Globe } from "lucide-react";

// ─── Font Injection ────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg-deep: #04050d;
        --bg-base: #080910;
        --bg-card: #0d0f1c;
        --bg-card-hover: #121525;
        --bg-surface: #161828;
        --text-primary: #f0f2ff;
        --text-secondary: #8a90b8;
        --text-muted: #4a5070;
        --border: rgba(255,255,255,0.06);
        --border-active: rgba(255,255,255,0.15);
        --plasma-1: #c855ff;
        --plasma-2: #ff40a8;
        --plasma-glow: rgba(200,85,255,0.25);
        --lunar-1: #00d4ff;
        --lunar-2: #7ba5ff;
        --lunar-glow: rgba(0,212,255,0.2);
        --volcanic-1: #ff5500;
        --volcanic-2: #ffaa00;
        --volcanic-glow: rgba(255,85,0,0.25);
        --brand: #7b5cff;
        --brand-glow: rgba(123,92,255,0.3);
      }
      body { background: var(--bg-deep); color: var(--text-primary); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
      h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }
      .font-display { font-family: 'Orbitron', monospace; }
      input, button, select { font-family: 'Inter', sans-serif; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg-base); }
      ::-webkit-scrollbar-thumb { background: var(--bg-surface); border-radius: 2px; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes pulseGlow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
      @keyframes slideIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
      @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
      .animate-float { animation: float 4s ease-in-out infinite; }
      .animate-slideIn { animation: slideIn 0.35s cubic-bezier(0.32,0.72,0,1) forwards; }
      .delay-1 { animation-delay: 0.1s; opacity:0; }
      .delay-2 { animation-delay: 0.2s; opacity:0; }
      .delay-3 { animation-delay: 0.3s; opacity:0; }
      .delay-4 { animation-delay: 0.4s; opacity:0; }
      .delay-5 { animation-delay: 0.5s; opacity:0; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

// ─── Data ──────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, slug: "clarity-plasma", name: "Clarity Plasma", subtitle: "Electric Focus Formula",
    shortDesc: "Intense mental clarity with a surge of electric energy. Purple. Sharp. Limitless.",
    longDesc: "Clarity Plasma is engineered for those who refuse to operate below full capacity. A precisely calibrated blend of nootropics and natural stimulants delivers razor-sharp focus and sustained energy without the crash. Feel the electric pull of pure cognitive performance.",
    price: 3.49, comparePrice: 4.49, flavor: "plasma", category: "single", badge: "BESTSELLER",
    images: ["/images/plasma.jpg", "/images/plasma_icon.png"],
    features: ["200mg Natural Caffeine", "L-Theanine Complex", "B-Vitamin Matrix", "0g Sugar", "160 kcal"],
    color1: "#c855ff", color2: "#ff40a8", glow: "rgba(200,85,255,0.3)",
    rating: 4.8, reviewCount: 2341, sku: "CL-PL-001", stock: "in_stock",
    tags: ["focus", "energy", "nootropic"],
    nutrition: { calories: 15, caffeine: "200mg", sugar: "0g", vitB6: "250%", vitB12: "200%", taurine: "1000mg" }
  },
  {
    id: 2, slug: "clarity-lunar", name: "Clarity Lunar", subtitle: "Deep Space Recovery",
    shortDesc: "Cool, calm, razor-focused. Lunar is your orbit — steady, far-reaching, precise.",
    longDesc: "Clarity Lunar taps into the quiet intensity of deep space. Crafted for sustained performance and mental endurance, Lunar delivers clean energy with a cool, crystalline finish. For thinkers who go the distance.",
    price: 3.49, comparePrice: null, flavor: "lunar", category: "single", badge: "NEW",
    images: ["/images/lunar.jpg", "/images/lunar_icon.png"],
    features: ["180mg Natural Caffeine", "Ashwagandha Extract", "Electrolyte Blend", "0g Sugar", "10 kcal"],
    color1: "#00d4ff", color2: "#7ba5ff", glow: "rgba(0,212,255,0.25)",
    rating: 4.7, reviewCount: 1887, sku: "CL-LN-001", stock: "in_stock",
    tags: ["calm", "focus", "endurance"],
    nutrition: { calories: 10, caffeine: "180mg", sugar: "0g", vitB6: "300%", vitB12: "250%", taurine: "1200mg" }
  },
  {
    id: 3, slug: "clarity-volcanic", name: "Clarity Volcanic", subtitle: "Raw Power Ignited",
    shortDesc: "Raw. Primal. Unstoppable. Volcanic energy for when you need to go all out.",
    longDesc: "Clarity Volcanic channels the raw force beneath the surface. Maximum-intensity energy and heat-fueled performance for your hardest sessions and most demanding days. This is power without compromise.",
    price: 3.49, comparePrice: 4.49, flavor: "volcanic", category: "single", badge: "LIMITED",
    images: ["/images/volcanic.png", "/images/volcanic_icon.png"],
    features: ["220mg Natural Caffeine", "Beta-Alanine", "Creatine HCL", "0g Sugar", "20 kcal"],
    color1: "#ff5500", color2: "#ffaa00", glow: "rgba(255,85,0,0.3)",
    rating: 4.9, reviewCount: 3102, sku: "CL-VC-001", stock: "in_stock",
    tags: ["power", "preworkout", "intensity"],
    nutrition: { calories: 20, caffeine: "220mg", sugar: "0g", vitB6: "200%", vitB12: "150%", taurine: "800mg" }
  },
  {
    id: 4, slug: "clarity-mix-pack", name: "Clarity Mix Pack", subtitle: "All Three Worlds",
    shortDesc: "One of each. The complete Clarity experience — Plasma, Lunar & Volcanic.",
    longDesc: "Can't choose? Don't. The Clarity Mix Pack gives you one of each flavor — Plasma, Lunar, and Volcanic — to find your perfect formula. Or rotate all three. Your clarity, your call.",
    price: 9.99, comparePrice: 10.47, flavor: "mix", category: "bundle", badge: "SAVE 5%",
    images: ["/images/allesorten.png"],
    features: ["1× Plasma", "1× Lunar", "1× Volcanic", "Free Shipping"],
    color1: "#7b5cff", color2: "#c855ff", glow: "rgba(123,92,255,0.3)",
    rating: 4.8, reviewCount: 987, sku: "CL-MX-003", stock: "in_stock",
    tags: ["bundle", "mix", "variety"],
    nutrition: null
  },
  {
    id: 5, slug: "clarity-6-pack-plasma", name: "Clarity Plasma 6-Pack", subtitle: "Stay Charged",
    shortDesc: "Six cans of pure electric focus. Stock up and stay sharp all week.",
    longDesc: null,
    price: 18.99, comparePrice: 20.94, flavor: "plasma", category: "multipack", badge: "10% OFF",
    images: ["/images/plasma.jpg", "/images/plasma_icon.png"],
    features: ["6× Clarity Plasma", "Free Shipping", "Bulk Discount"],
    color1: "#c855ff", color2: "#ff40a8", glow: "rgba(200,85,255,0.3)",
    rating: 4.8, reviewCount: 654, sku: "CL-PL-006", stock: "in_stock",
    tags: ["multipack", "plasma", "value"],
    nutrition: null
  },
  {
    id: 6, slug: "clarity-starter-bundle", name: "Clarity Starter Bundle", subtitle: "Begin Your Journey",
    shortDesc: "The perfect introduction. 6 cans — 2 of each flavor — plus a Clarity shaker.",
    longDesc: "New to Clarity? Start right. Six cans spanning all three formulas, so you can sample every world and find your frequency. Includes an exclusive matte-black Clarity shaker bottle.",
    price: 24.99, comparePrice: 32.99, flavor: "mix", category: "bundle", badge: "BEST VALUE",
    images: ["/images/allesorten.png"],
    features: ["2× Plasma", "2× Lunar", "2× Volcanic", "Clarity Shaker Bottle", "Free Shipping"],
    color1: "#7b5cff", color2: "#00d4ff", glow: "rgba(123,92,255,0.35)",
    rating: 4.9, reviewCount: 2108, sku: "CL-ST-001", stock: "in_stock",
    tags: ["bundle", "starter", "best-value", "shaker"],
    nutrition: null
  },
];

const REVIEWS = [
  { id: 1, name: "Marc K.", avatar: "MK", rating: 5, product: "Plasma", text: "I've tried dozens of energy drinks. Clarity Plasma is in a different league. Clean energy, no jitter, no crash. My morning ritual.", date: "vor 3 Tagen", flavor: "plasma" },
  { id: 2, name: "Julia S.", avatar: "JS", rating: 5, product: "Lunar", text: "Lunar hat meine Arbeits-Sessions transformiert. Fokus ohne das aggressive Kribbeln. Einfach klar.", date: "vor 1 Woche", flavor: "lunar" },
  { id: 3, name: "Tom R.", avatar: "TR", rating: 5, product: "Volcanic", text: "Pre-workout replacement locked in. Volcanic hits hard and keeps me going through the whole session.", date: "vor 2 Wochen", flavor: "volcanic" },
  { id: 4, name: "Ava M.", avatar: "AM", rating: 4, product: "Mix Pack", text: "The mix pack got me hooked on all three. Now I order Plasma by the 6-pack and Lunar for late nights.", date: "vor 1 Monat", flavor: "mix" },
  { id: 5, name: "Leon F.", avatar: "LF", rating: 5, product: "Starter Bundle", text: "Das Starter Bundle war perfekt zum Einstieg. Jetzt verstehe ich den Hype. Clarity ist anders.", date: "vor 5 Tagen", flavor: "mix" },
];

const FAQS = [
  { q: "Wie viel Koffein enthält Clarity?", a: "Je nach Sorte 180–220 mg natürliches Koffein pro Dose. Plasma: 200 mg, Lunar: 180 mg, Volcanic: 220 mg." },
  { q: "Ist Clarity zuckerfrei?", a: "Ja. Alle Clarity-Produkte enthalten 0 g Zucker und werden mit natürlichen Aromen hergestellt." },
  { q: "Wann spüre ich die Wirkung?", a: "Die meisten Nutzer berichten von einem spürbaren Fokus-Boost innerhalb von 15–30 Minuten nach dem Konsum." },
  { q: "Wie oft am Tag kann ich Clarity trinken?", a: "Wir empfehlen maximal 1 Dose pro Tag. Clarity ist kein Ersatz für ausreichend Schlaf und gesunde Ernährung." },
  { q: "Bietet ihr Abonnements an?", a: "Subscribe & Save folgt in Kürze. Trag dich in unseren Newsletter ein und erhalte Zugang als Erster." },
  { q: "Wie lange dauert die Lieferung?", a: "Standardlieferung innerhalb von 2–4 Werktagen nach Deutschland. Express-Optionen verfügbar." },
];

// ─── Utilities ─────────────────────────────────────────────────────────────
const formatPrice = (p: number) => `€${p.toFixed(2).replace(".", ",")}`;
const getFlavorLabel = (f: string) => ({ plasma: "Plasma", lunar: "Lunar", volcanic: "Volcanic", mix: "Mix" }[f] || f);

// ─── Toast ─────────────────────────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
    {toasts.map(t => (
      <div key={t.id} className="animate-slideIn" style={{ background: "#1a1d35", border: "1px solid var(--border-active)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, maxWidth: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.type === "success" ? "rgba(0,212,100,0.2)" : "rgba(123,92,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {t.type === "success" ? <Check size={14} color="#00d464" /> : <Zap size={14} color="var(--brand)" />}
        </div>
        <span style={{ fontSize: 13, color: "var(--text-primary)", flex: 1 }}>{t.message}</span>
        <button onClick={() => removeToast(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}><X size={14} /></button>
      </div>
    ))}
  </div>
);

// ─── Product Visual (Gradient placeholder when real image not present) ──────
const ProductVisual = ({ product, size = 200, style = {} }) => {
  const [imgError, setImgError] = useState(false);
  const src = product.images[0];
  const needsCrop = product.flavor === "plasma" || product.flavor === "lunar";
  if (!imgError) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: needsCrop ? 8 : 16, ...style }}>
        <div style={{ borderRadius: 16, border: `1px solid ${product.color1}33`, boxShadow: `0 0 24px ${product.glow}, 0 4px 16px rgba(0,0,0,0.4)`, overflow: "hidden", maxWidth: "100%", maxHeight: "100%", display: "flex" }}>
          <img src={src} alt={product.name} onError={() => setImgError(true)}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: needsCrop ? "top left" : "center", transform: needsCrop ? "scale(1.08) translate(-2%, -2%)" : "none", display: "block" }} />
        </div>
      </div>
    );
  }
  // Fallback gradient visual
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "inherit", position: "relative", overflow: "hidden", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${product.color1}55 0%, ${product.color2}22 50%, transparent 80%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 80%, ${product.color2}33 0%, transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: size * 0.3, height: size * 0.55, background: `linear-gradient(160deg, ${product.color1}cc, ${product.color2}88)`, borderRadius: "40% 40% 50% 50%", boxShadow: `0 0 ${size * 0.15}px ${product.glow}`, position: "relative" }}>
          <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "30%", background: "rgba(255,255,255,0.15)", borderRadius: "50%", filter: "blur(4px)" }} />
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Orbitron', monospace", fontSize: size * 0.06, color: product.color1, letterSpacing: 1, fontWeight: 700 }}>CLARITY</div>
        <div style={{ fontSize: size * 0.045, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{getFlavorLabel(product.flavor).toUpperCase()}</div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center bottom, rgba(0,0,0,0.4), transparent 60%)" }} />
    </div>
  );
};

// ─── Header ────────────────────────────────────────────────────────────────
const Header = ({ page, setPage, cartItems, cartOpen, setCartOpen, wishlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Shop", key: "shop" },
    { label: "Sorten", key: "flavors" },
    { label: "Bundles", key: "bundles" },
    { label: "Story", key: "about" },
  ];

  const logoImg = "/images/logo.png";
  const [logoErr, setLogoErr] = useState(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, transition: "all 0.4s ease", padding: "12px 24px" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        padding: "0 24px",
      }}>
        {/* Logo + Title */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          {!logoErr ? (
            <img src={logoImg} alt="Clarity" onError={() => setLogoErr(true)} style={{ height: 44, width: 44, objectFit: "contain", borderRadius: 10, background: "rgba(255,255,255,0.05)", padding: 2 }} />
          ) : null}
          <span className="font-display" style={{ fontSize: 20, fontWeight: 900, letterSpacing: 3, color: "var(--text-primary)", textShadow: "0 0 20px rgba(123,92,255,0.5)" }}>CLARITY</span>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 2, alignItems: "center" }} aria-label="Hauptnavigation">
          {navLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)}
              style={{
                background: page === l.key ? "rgba(255,255,255,0.12)" : "none",
                border: page === l.key ? "1px solid rgba(255,255,255,0.18)" : "1px solid transparent",
                cursor: "pointer", padding: "8px 18px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                color: page === l.key ? "var(--text-primary)" : "var(--text-secondary)",
                transition: "all 0.2s", backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => { if (page !== l.key) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--text-primary)"; }}}
              onMouseLeave={e => { if (page !== l.key) { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Suche" style={{ background: "none", border: "none", cursor: "pointer", padding: 10, borderRadius: 10, color: "var(--text-secondary)" }}><Search size={18} /></button>
          <button onClick={() => setPage("wishlist")} aria-label="Wunschliste" style={{ background: "none", border: "none", cursor: "pointer", padding: 10, borderRadius: 10, color: "var(--text-secondary)", position: "relative" }}>
            <Heart size={18} />
            {wishlist.length > 0 && <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, borderRadius: "50%", background: "var(--volcanic-1)" }} />}
          </button>
          <button onClick={() => setCartOpen(true)} aria-label={`Warenkorb (${cartCount} Artikel)`} style={{ background: "rgba(123,92,255,0.15)", border: "1px solid rgba(123,92,255,0.3)", cursor: "pointer", padding: "8px 14px", borderRadius: 12, color: "var(--text-primary)", position: "relative", display: "flex", alignItems: "center", gap: 6 }}>
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--brand)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{cartCount}</span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü" style={{ background: "none", border: "none", cursor: "pointer", padding: 10, color: "var(--text-secondary)", display: "none" }}><Menu size={20} /></button>
        </div>
      </div>
      {/* Search bar */}
      {searchOpen && (
        <div style={{ borderTop: "1px solid var(--border)", background: "rgba(4,5,13,0.98)", padding: "12px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input autoFocus placeholder="Suche nach Sorten, Bundles, Angeboten…" style={{ width: "100%", background: "var(--bg-card)", border: "1px solid var(--border-active)", borderRadius: 10, padding: "10px 14px 10px 42px", color: "var(--text-primary)", fontSize: 14, outline: "none" }} />
          </div>
        </div>
      )}
    </header>
  );
};

// ─── Hero Section ──────────────────────────────────────────────────────────
const HeroSection = ({ setPage, addToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { product: PRODUCTS[0], tagline: "FIND YOUR FREQUENCY", sub: "Electric focus. Zero noise. Pure Clarity.", cta: "Plasma entdecken" },
    { product: PRODUCTS[1], tagline: "ORBIT YOUR GOALS", sub: "Sustained energy. Crystalline calm. Deep space clarity.", cta: "Lunar entdecken" },
    { product: PRODUCTS[2], tagline: "IGNITE EVERYTHING", sub: "Raw power. Maximum intensity. Nothing held back.", cta: "Volcanic entdecken" },
  ];
  const s = slides[activeSlide];
  const p = s.product;

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(a => (a + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--bg-deep)" }} aria-label="Hero">
      {/* Background — subtle glow only */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 80% at 70% 50%, ${p.color1}18 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 80% 80%, ${p.color2}12 0%, transparent 50%)` }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,5,13,0.95) 0%, rgba(4,5,13,0.7) 50%, rgba(4,5,13,0.3) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, var(--bg-deep), transparent)" }} />

      {/* Content */}
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", width: "100%" }}>
        {/* Text */}
        <div key={activeSlide} className="animate-fadeUp">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-active)", borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color1, animation: "pulseGlow 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: p.color1 }}>NEW DROP</span>
          </div>
          <div className="font-display" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, marginBottom: 20, background: `linear-gradient(135deg, #f0f2ff 40%, ${p.color1})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {s.tagline}
          </div>
          <p style={{ fontSize: 18, color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.6, maxWidth: 420 }}>{s.sub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("shop")} style={{ background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`, border: "none", borderRadius: 10, padding: "14px 28px", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer", boxShadow: `0 0 24px ${p.glow}` }}>
              {s.cta}
            </button>
            <button onClick={() => setPage("shop")} style={{ background: "transparent", border: "1px solid var(--border-active)", borderRadius: 10, padding: "14px 28px", color: "var(--text-primary)", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
              Alle Produkte
            </button>
          </div>
          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} aria-label={`Slide ${i + 1}`}
                style={{ width: i === activeSlide ? 24 : 8, height: 8, borderRadius: 4, background: i === activeSlide ? p.color1 : "var(--bg-surface)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        {/* Product Visual */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`, filter: "blur(40px)", animation: "pulseGlow 3s ease-in-out infinite" }} />
          <div key={activeSlide + "-img"} className="animate-float" style={{ width: 300, height: 400, position: "relative" }}>
            <ProductVisual product={p} size={300} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: "var(--text-muted)" }}>ENTDECKEN</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--border), transparent)", animation: "fadeIn 1s ease 1s both" }} />
      </div>
    </section>
  );
};

// ─── Product Card ──────────────────────────────────────────────────────────
const ProductCard = ({ product, onSelect, addToCart, wishlist, toggleWishlist }) => {
  const [hovered, setHovered] = useState(false);
  const inWishlist = wishlist.includes(product.id);
  const perUnit = product.category === "multipack" ? formatPrice(product.price / 6) : null;

  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)", border: `1px solid ${hovered ? product.color1 + "44" : "var(--border)"}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? `0 12px 40px ${product.glow}` : "none", position: "relative" }}>

      {product.badge && (
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: `linear-gradient(135deg, ${product.color1}, ${product.color2})`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "white" }}>
          {product.badge}
        </div>
      )}
      {perUnit && (
        <div style={{ position: "absolute", top: 38, left: 12, zIndex: 2, background: "rgba(0,212,100,0.15)", border: "1px solid rgba(0,212,100,0.4)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 600, color: "#00d464" }}>
          nur {perUnit}/Dose
        </div>
      )}
      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} aria-label={inWishlist ? "Von Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
        style={{ position: "absolute", top: 12, right: 12, zIndex: 2, background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: inWishlist ? product.color1 : "var(--text-muted)" }}>
        <Heart size={14} fill={inWishlist ? product.color1 : "none"} />
      </button>

      {/* Image with zoom on hover */}
      <div onClick={() => onSelect(product)} style={{ height: 220, background: `radial-gradient(ellipse at center, ${product.glow} 0%, var(--bg-deep) 70%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease", height: "100%" }}>
          <ProductVisual product={product} size={180} />
        </div>
      </div>

      {/* Info */}
      <div onClick={() => onSelect(product)} style={{ padding: 16 }}>
        <div style={{ fontSize: 11, color: product.color1, fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>{getFlavorLabel(product.flavor).toUpperCase()}</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{product.name}</h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.5 }}>{product.shortDesc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(product.rating) ? product.color1 : "none"} color={product.color1} />)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({product.reviewCount.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>{formatPrice(product.price)}</span>
            {product.comparePrice && <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through", marginLeft: 8 }}>{formatPrice(product.comparePrice)}</span>}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 16px 16px" }}>
        <button onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
          style={{ width: "100%", background: `linear-gradient(135deg, ${product.color1}22, ${product.color2}11)`, border: `1px solid ${product.color1}55`, borderRadius: 10, padding: "10px", color: product.color1, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <ShoppingCart size={14} /> In den Warenkorb
        </button>
      </div>
    </article>
  );
};

// ─── Featured Products ─────────────────────────────────────────────────────
const FeaturedSection = ({ setPage, addToCart, wishlist, toggleWishlist, onSelect }) => (
  <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="animate-fadeUp" style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>SORTIMENT</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>Drei Welten. Ein Ziel.</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>Jede Clarity-Sorte ist für einen anderen mentalen Zustand entwickelt. Finde deine Frequenz.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {PRODUCTS.filter(p => p.category === "single").map((p, i) => (
          <div key={p.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <ProductCard product={p} onSelect={onSelect} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button onClick={() => setPage("shop")} style={{ background: "transparent", border: "1px solid var(--border-active)", borderRadius: 10, padding: "12px 28px", color: "var(--text-primary)", fontWeight: 500, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
          Alle Produkte <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </section>
);

// ─── Promo Banner ──────────────────────────────────────────────────────────
const useCountdown = (targetDate: string) => {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);
  return t;
};

const PromoBanner = ({ setPage }) => {
  const { d, h, m, s } = useCountdown("2026-05-31T23:59:59");
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 360 }} aria-label="Aktionsangebot">
      {/* Full-width background image */}
      <img src="/images/Werbebanner_Rabatt.png" alt="Rabattaktion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      {/* Dark overlay for readability */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(4,5,13,0.92) 0%, rgba(4,5,13,0.7) 50%, rgba(4,5,13,0.2) 100%)" }} />
      {/* Text — right side */}
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "80px 48px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{ display: "inline-block", background: "rgba(255,85,0,0.2)", border: "1px solid rgba(255,85,0,0.5)", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#ff5500", marginBottom: 20 }}>LIMITIERTES ANGEBOT</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 58px)", fontWeight: 800, letterSpacing: -1, marginBottom: 14, lineHeight: 1.05 }}>Nimm 3.<br /><span style={{ color: "#ff9d00" }}>Zahle 2.</span></h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>Kombiniere beliebige Sorten. Der günstigste Artikel ist gratis.</p>
          {/* Countdown */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {[{ v: pad(d), l: "Tage" }, { v: pad(h), l: "Std" }, { v: pad(m), l: "Min" }, { v: pad(s), l: "Sek" }].map(({ v, l }) => (
              <div key={l} style={{ textAlign: "center", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,85,0,0.3)", borderRadius: 10, padding: "10px 14px", minWidth: 56 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#ff9d00", fontFamily: "'Orbitron', monospace" }}>{v}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setPage("shop")} style={{ background: "linear-gradient(135deg, #ff5500, #ff9d00)", border: "none", borderRadius: 10, padding: "14px 32px", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 0 32px rgba(255,85,0,0.5)" }}>
            Jetzt sparen
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Flavor Worlds ─────────────────────────────────────────────────────────
const FlavorWorlds = ({ setPage, onSelect }) => {
  const worlds = [
    { key: "plasma", name: "Plasma", desc: "Elektrische Energie. Violett wie Blitze, scharf wie Fokus.", color1: "#c855ff", color2: "#ff40a8", img: "/products/plasma.jpg", product: PRODUCTS[0] },
    { key: "lunar", name: "Lunar", desc: "Kristallklare Ausdauer. Kühl wie tiefer Weltraum, präzise wie ein Orbit.", color1: "#00d4ff", color2: "#7ba5ff", img: "/products/lunar.jpg", product: PRODUCTS[1] },
    { key: "volcanic", name: "Volcanic", desc: "Rohe Kraft. Orange wie Lava, heiß wie reine Intensität.", color1: "#ff5500", color2: "#ffaa00", img: "/products/volcanic.jpg", product: PRODUCTS[2] },
  ];
  return (
    <section style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>SORTENWELTEN</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1 }}>Dein Zustand. Deine Wahl.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {worlds.map((w, i) => (
            <button key={w.key} onClick={() => onSelect(w.product)}
              className="animate-fadeUp" style={{ animationDelay: `${i * 0.15}s`, opacity: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", cursor: "pointer", textAlign: "left", position: "relative", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = w.color1 + "66"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ height: 240, position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at center, ${w.color1}22 0%, var(--bg-deep) 70%)` }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 50%, var(--bg-card) 100%)`, zIndex: 1 }} />
                <ProductVisual product={w.product} size={200} />
              </div>
              <div style={{ padding: "20px 24px 24px", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: w.color1 }} />
                  <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>{w.name}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>{w.desc}</p>
                <span style={{ fontSize: 13, color: w.color1, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>Entdecken <ChevronRight size={14} /></span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── USP Bar ───────────────────────────────────────────────────────────────
const USPBar = () => {
  const usps = [
    { icon: <Zap size={20} />, title: "0g Zucker", desc: "Volle Energie, kein Crash" },
    { icon: <Shield size={20} />, title: "Lab-geprüft", desc: "Höchste Qualitätsstandards" },
    { icon: <Truck size={20} />, title: "Gratis ab €30", desc: "Schnelle DE-Lieferung" },
    { icon: <Award size={20} />, title: "100% Natural", desc: "Natürliche Zutaten, kein BS" },
  ];
  return (
    <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
        {usps.map((u, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(123,92,255,0.15)", border: "1px solid rgba(123,92,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", flexShrink: 0 }}>
              {u.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{u.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Bundle Section ────────────────────────────────────────────────────────
const BundleSection = ({ addToCart, onSelect }) => (
  <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>BUNDLES</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1 }}>Mehr Clarity. Besserer Preis.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {PRODUCTS.filter(p => p.category === "bundle" || p.category === "multipack").map((p, i) => (
          <article key={p.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, position: "relative", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.color1 + "55"; e.currentTarget.style.boxShadow = `0 8px 32px ${p.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
            {p.badge && (
              <div style={{ position: "absolute", top: -1, right: 20, background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`, borderRadius: "0 0 10px 10px", padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "white" }}>{p.badge}</div>
            )}
            <div style={{ height: 180, marginBottom: 20, borderRadius: 12, overflow: "hidden" }}>
              <ProductVisual product={p} size={160} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{p.name}</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>{p.shortDesc}</p>
            <ul style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              {p.features.map((f, j) => (
                <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <Check size={13} color={p.color1} /> {f}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 24, fontWeight: 700 }}>{formatPrice(p.price)}</span>
                {p.comparePrice && <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through", marginLeft: 8 }}>{formatPrice(p.comparePrice)}</span>}
              </div>
            </div>
            <button onClick={() => addToCart(p, 1)} style={{ width: "100%", background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`, border: "none", borderRadius: 10, padding: "12px", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: `0 0 20px ${p.glow}` }}>
              Jetzt sichern
            </button>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ─── Announcement Bar ──────────────────────────────────────────────────────
const AnnouncementBar = () => {
  const [idx, setIdx] = useState(0);
  const msgs = ["🚚 Gratis Versand ab €30 · Jetzt bestellen", "⚡ Nimm 3, zahle 2 · Nur bis Ende Mai", "🧪 Neu: Clarity Lunar — jetzt im Shop"];
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 3500); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001, height: 36, background: "linear-gradient(90deg, #7b5cff, #c855ff, #7b5cff)", backgroundSize: "200% 100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, color: "white" }}>{msgs[idx]}</span>
    </div>
  );
};

// ─── Reviews ───────────────────────────────────────────────────────────────
const ReviewsSection = () => {
  const colors: Record<string, string> = { plasma: "#c855ff", lunar: "#00d4ff", volcanic: "#ff5500", mix: "#7b5cff" };
  const featured = REVIEWS[2];
  return (
    <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>COMMUNITY</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1 }}>Was Clarity-Nutzer sagen.</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 }}>
            <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#c855ff" color="#c855ff" />)}</div>
            <span style={{ fontSize: 28, fontWeight: 800 }}>4.8</span>
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>aus 10.438 Bewertungen</span>
          </div>
        </div>
        {/* Featured review */}
        <div style={{ background: "linear-gradient(135deg, rgba(255,85,0,0.08), rgba(123,92,255,0.08))", border: "1px solid rgba(255,85,0,0.2)", borderRadius: 20, padding: "32px 40px", marginBottom: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, left: 20, fontSize: 120, color: "rgba(255,85,0,0.06)", fontFamily: "serif", lineHeight: 1 }}>&ldquo;</div>
          <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#ff5500" color="#ff5500" />)}</div>
          <p style={{ fontSize: 18, color: "var(--text-primary)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic", maxWidth: 700 }}>&ldquo;{featured.text}&rdquo;</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${colors[featured.flavor]}, ${colors[featured.flavor]}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "white" }}>{featured.avatar}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{featured.name}</div>
              <div style={{ fontSize: 12, color: colors[featured.flavor] }}>{featured.product} · Verifizierter Kauf</div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <article key={r.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.1}s`, opacity: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${colors[r.flavor]}44, ${colors[r.flavor]}22)`, border: `1px solid ${colors[r.flavor]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: colors[r.flavor] }}>
                  {r.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: colors[r.flavor] }}>{r.product}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                  {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill={colors[r.flavor]} color={colors[r.flavor]} />)}
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Community Gallery ─────────────────────────────────────────────────────
const CommunityGallery = ({ onSelect }) => {
  const items = [
    { img: "/images/plasma.jpg", product: PRODUCTS[0], label: "@max.focuses" },
    { img: "/images/volcanic.png", product: PRODUCTS[2], label: "@gym.grind" },
    { img: "/images/allesorten.png", product: PRODUCTS[3], label: "@claritylife" },
    { img: "/images/lunar.jpg", product: PRODUCTS[1], label: "@latenight.code" },
    { img: "/images/plasma_icon.png", product: PRODUCTS[0], label: "@morningroutine" },
    { img: "/images/volcanic_icon.png", product: PRODUCTS[2], label: "@fitnation" },
  ];
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>COMMUNITY</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, letterSpacing: -1 }}>Clarity in freier Wildbahn.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 200px)", gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => onSelect(item.product)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", background: "var(--bg-card)" }}
              onMouseEnter={e => { (e.currentTarget.querySelector(".gallery-overlay") as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={e => { (e.currentTarget.querySelector(".gallery-overlay") as HTMLElement).style.opacity = "0"; }}>
              <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="gallery-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", padding: 12, opacity: 0, transition: "opacity 0.25s" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Recently Viewed ───────────────────────────────────────────────────────
const RecentlyViewed = ({ products, onSelect, addToCart, wishlist, toggleWishlist }) => {
  if (products.length === 0) return null;
  return (
    <section style={{ padding: "60px 24px", background: "var(--bg-base)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, letterSpacing: -0.5 }}>Zuletzt angesehen</h3>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
          {products.map(p => (
            <div key={p.id} style={{ minWidth: 200, maxWidth: 200 }}>
              <ProductCard product={p} onSelect={onSelect} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Brand Story ───────────────────────────────────────────────────────────
const StorySection = ({ setPage }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(123,92,255,0.08), transparent)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 16 }}>UNSERE STORY</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24 }}>Gebaut für den,<br />der mehr will.</h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>Clarity entstand aus einer simplen Frage: Warum müssen Energy Drinks entweder wirken oder gut schmecken? Wir wollten keines von beidem opfern.</p>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>Was folgte, waren zwei Jahre Entwicklung, ein Team von Sportwissenschaftlern, Neurowissenschaftlern und Köchen — und drei Formeln, die anders sind als alles davor.</p>
          <button onClick={() => setPage("about")} style={{ background: "transparent", border: "1px solid var(--border-active)", borderRadius: 10, padding: "12px 24px", color: "var(--text-primary)", fontWeight: 500, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Mehr über uns <ArrowRight size={16} />
          </button>
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", height: 400, position: "relative" }}>
          {!imgErr ? (
            <img src="/campaigns/brand-story.jpg" alt="Clarity Brand Story" onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}>
              <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                <Globe size={48} style={{ marginBottom: 12 }} />
                <div className="font-display" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, color: "var(--text-secondary)" }}>CLARITY</div>
                <div style={{ fontSize: 12, marginTop: 8, letterSpacing: 2 }}>SINCE 2024</div>
              </div>
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(4,5,13,0.7))" }} />
        </div>
      </div>
    </section>
  );
};

// ─── Newsletter ────────────────────────────────────────────────────────────
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section style={{ padding: "80px 24px", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 16 }}>CLARITY INSIDER</div>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: -0.5, marginBottom: 12 }}>Als Erster wissen. Als Erster sparen.</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 28, fontSize: 15 }}>Neue Sorten, exklusive Drops, früher Zugang — direkt in dein Postfach.</p>
        {submitted ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#00d464", fontSize: 16, fontWeight: 600 }}>
            <Check size={20} /> Danke! Du bist dabei.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="deine@email.de" aria-label="E-Mail-Adresse"
              style={{ flex: 1, background: "var(--bg-surface)", border: "1px solid var(--border-active)", borderRadius: 10, padding: "12px 16px", color: "var(--text-primary)", fontSize: 14, outline: "none" }} />
            <button onClick={() => email && setSubmitted(true)} style={{ background: "var(--brand)", border: "none", borderRadius: 10, padding: "12px 20px", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
              Anmelden
            </button>
          </div>
        )}
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12 }}>Kein Spam. Jederzeit abmeldbar.</p>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const [logoErr, setLogoErr] = useState(false);
  const links = {
    "Produkte": [{ l: "Clarity Plasma", k: "shop" }, { l: "Clarity Lunar", k: "shop" }, { l: "Clarity Volcanic", k: "shop" }, { l: "Mix Pack", k: "shop" }, { l: "Bundles", k: "bundles" }],
    "Unternehmen": [{ l: "Über uns", k: "about" }, { l: "Kontakt", k: "contact" }, { l: "FAQ", k: "faq" }, { l: "Presse", k: "about" }],
    "Service": [{ l: "Versand & Lieferung", k: "shipping" }, { l: "Zahlungsarten", k: "payment" }, { l: "Widerruf", k: "revocation" }, { l: "Aktionen", k: "bundles" }],
    "Rechtliches": [{ l: "Impressum", k: "imprint" }, { l: "Datenschutz", k: "privacy" }, { l: "AGB", k: "terms" }, { l: "Cookies", k: "cookies" }],
  };
  return (
    <footer style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--border)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            {!logoErr ? (
              <img src="/branding/logo.jpeg" alt="Clarity" onError={() => setLogoErr(true)} style={{ height: 28, marginBottom: 16, objectFit: "contain" }} />
            ) : (
              <div className="font-display" style={{ fontSize: 20, fontWeight: 900, letterSpacing: 3, marginBottom: 16 }}>CLARITY</div>
            )}
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20, maxWidth: 240 }}>Premium Energy Drinks. Engineered for focus. Built for those who demand more.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[Globe, ArrowRight, Zap].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social Media" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textDecoration: "none" }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: "var(--text-muted)", marginBottom: 16 }}>{col.toUpperCase()}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(({ l, k }) => (
                  <li key={l}><button onClick={() => setPage(k)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: 14, padding: 0, textAlign: "left" }}>{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2025 Clarity GmbH. Alle Rechte vorbehalten.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Visa", "Mastercard", "PayPal", "Klarna"].map(p => (
              <span key={p} style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 8px" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Cart Drawer ───────────────────────────────────────────────────────────
const CartDrawer = ({ open, onClose, cartItems, updateQty, removeFromCart, setPage }) => {
  const total = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const freeShipping = total >= 30;

  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1998, backdropFilter: "blur(4px)" }} aria-hidden="true" />}
      <aside role="dialog" aria-label="Warenkorb" aria-modal="true"
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 420, background: "var(--bg-card)", borderLeft: "1px solid var(--border)", zIndex: 1999, display: "flex", flexDirection: "column", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Warenkorb {cartItems.length > 0 && <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 14 }}>({cartItems.reduce((s,i) => s+i.qty, 0)})</span>}</h2>
          <button onClick={onClose} aria-label="Schließen" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><X size={20} /></button>
        </div>

        {/* Free shipping bar */}
        {!freeShipping && cartItems.length > 0 && (
          <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--border)", background: "rgba(123,92,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span>Noch {formatPrice(30 - total)} bis zur kostenlosen Lieferung</span>
              <span>{Math.round((total / 30) * 100)}%</span>
            </div>
            <div style={{ height: 4, background: "var(--bg-surface)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${Math.min((total / 30) * 100, 100)}%`, background: "linear-gradient(to right, var(--brand), #c855ff)", borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>
        )}
        {freeShipping && cartItems.length > 0 && (
          <div style={{ padding: "10px 24px", borderBottom: "1px solid var(--border)", background: "rgba(0,212,100,0.08)", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#00d464" }}>
            <Check size={14} /> Kostenlose Lieferung inklusive!
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              <ShoppingCart size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Dein Warenkorb ist leer</p>
              <p style={{ fontSize: 13 }}>Füge deine erste Dose hinzu.</p>
            </div>
          ) : cartItems.map(item => (
            <div key={item.product.id} style={{ display: "flex", gap: 12, background: "var(--bg-surface)", borderRadius: 12, padding: 12 }}>
              <div style={{ width: 70, height: 70, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: `radial-gradient(ellipse at center, ${item.product.glow}, var(--bg-deep))` }}>
                <ProductVisual product={item.product} size={70} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.product.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{item.product.subtitle}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => updateQty(item.product.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}><Minus size={12} /></button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}><Plus size={12} /></button>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{formatPrice(item.product.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} aria-label="Entfernen" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, alignSelf: "flex-start" }}><X size={14} /></button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
            {/* Promo */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Aktionscode" aria-label="Aktionscode"
                style={{ flex: 1, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--text-primary)", fontSize: 13, outline: "none" }} />
              <button onClick={() => promoCode && setPromoApplied(true)} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: promoApplied ? "#00d464" : "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                {promoApplied ? <Check size={14} /> : "Einlösen"}
              </button>
            </div>
            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 14, color: "var(--text-secondary)" }}>
              <span>Zwischensumme</span><span>{formatPrice(total)}</span>
            </div>
            {promoApplied && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 14, color: "#00d464" }}>
                <span>Rabattcode (10%)</span><span>–{formatPrice(total * 0.1)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, fontSize: 14, color: "var(--text-secondary)" }}>
              <span>Versand</span><span>{freeShipping ? <span style={{ color: "#00d464" }}>Kostenlos</span> : "€3,90"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderTop: "1px solid var(--border)", paddingTop: 14, fontSize: 18, fontWeight: 700 }}>
              <span>Gesamt</span>
              <span>{formatPrice(promoApplied ? (total * 0.9) + (freeShipping ? 0 : 3.9) : total + (freeShipping ? 0 : 3.9))}</span>
            </div>
            <button onClick={() => { onClose(); setPage("checkout"); }}
              style={{ width: "100%", background: "linear-gradient(135deg, var(--brand), #c855ff)", border: "none", borderRadius: 12, padding: "15px", color: "white", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 0 24px var(--brand-glow)" }}>
              Zur Kasse →
            </button>
            <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 10 }}>Sicher bezahlen mit SSL-Verschlüsselung</p>
          </div>
        )}
      </aside>
    </>
  );
};

// ─── Product Detail ────────────────────────────────────────────────────────
const ProductDetail = ({ product, addToCart, wishlist, toggleWishlist, setPage, addToast }) => {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("desc");
  const inWishlist = wishlist.includes(product.id);
  const tabs = [{ k: "desc", l: "Beschreibung" }, { k: "ingr", l: "Inhaltsstoffe" }, { k: "nutr", l: "Nährwerte" }];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={() => setPage("shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginBottom: 32, padding: 0 }}>
          ← Zurück zum Shop
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          {/* Gallery */}
          <div>
            <div style={{ height: 480, borderRadius: 20, overflow: "hidden", background: `radial-gradient(ellipse at center, ${product.glow} 0%, var(--bg-card) 70%)`, marginBottom: 12, position: "relative" }}>
              <ProductVisual product={product} size={400} />
              {product.badge && (
                <div style={{ position: "absolute", top: 16, left: 16, background: `linear-gradient(135deg, ${product.color1}, ${product.color2})`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: "white" }}>
                  {product.badge}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {product.images.slice(0, 3).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} aria-label={`Bild ${i + 1}`}
                  style={{ width: 80, height: 80, borderRadius: 12, overflow: "hidden", border: `2px solid ${activeImg === i ? product.color1 : "var(--border)"}`, background: "var(--bg-card)", cursor: "pointer" }}>
                  <div style={{ width: "100%", height: "100%", background: `radial-gradient(ellipse at center, ${product.glow}, var(--bg-deep))` }}>
                    <ProductVisual product={product} size={80} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: 12, color: product.color1, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>{getFlavorLabel(product.flavor).toUpperCase()} · {product.category.toUpperCase()}</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>{product.name}</h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 16 }}>{product.subtitle}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, i) => <Star key={i} size={15} fill={i < Math.floor(product.rating) ? product.color1 : "none"} color={product.color1} />)}</div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>({product.reviewCount.toLocaleString()} Bewertungen)</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 36, fontWeight: 800 }}>{formatPrice(product.price)}</span>
              {product.comparePrice && <span style={{ fontSize: 18, color: "var(--text-muted)", textDecoration: "line-through" }}>{formatPrice(product.comparePrice)}</span>}
              {product.comparePrice && <span style={{ fontSize: 13, color: "#00d464", background: "rgba(0,212,100,0.1)", borderRadius: 6, padding: "3px 8px", fontWeight: 600 }}>–{Math.round((1 - product.price / product.comparePrice) * 100)}%</span>}
            </div>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>{product.shortDesc}</p>

            {/* Features */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {product.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <Check size={13} color={product.color1} style={{ flexShrink: 0 }} /> {f}
                </div>
              ))}
            </div>

            {/* Quantity & Add */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menge verringern" style={{ width: 44, height: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}><Minus size={16} /></button>
                <span style={{ minWidth: 36, textAlign: "center", fontSize: 16, fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Menge erhöhen" style={{ width: 44, height: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}><Plus size={16} /></button>
              </div>
              <button onClick={() => { addToCart(product, qty); addToast(`${product.name} hinzugefügt`, "success"); }}
                style={{ flex: 1, background: `linear-gradient(135deg, ${product.color1}, ${product.color2})`, border: "none", borderRadius: 10, color: "white", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: `0 0 28px ${product.glow}` }}>
                In den Warenkorb
              </button>
              <button onClick={() => toggleWishlist(product.id)} aria-label={inWishlist ? "Von Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
                style={{ width: 50, height: 50, borderRadius: 10, background: "var(--bg-card)", border: `1px solid ${inWishlist ? product.color1 : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: inWishlist ? product.color1 : "var(--text-muted)" }}>
                <Heart size={18} fill={inWishlist ? product.color1 : "none"} />
              </button>
            </div>

            {/* Trust */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              {[{ icon: <Truck size={14} />, t: "Gratis ab €30" }, { icon: <Shield size={14} />, t: "Sicherer Kauf" }, { icon: <Package size={14} />, t: "14 Tage Rückgabe" }].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>{b.icon} {b.t}</div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid var(--border)" }}>
                {tabs.map(t => (
                  <button key={t.k} onClick={() => setActiveTab(t.k)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 16px", fontSize: 14, fontWeight: activeTab === t.k ? 600 : 400, color: activeTab === t.k ? product.color1 : "var(--text-muted)", borderBottom: `2px solid ${activeTab === t.k ? product.color1 : "transparent"}`, marginBottom: -1 }}>
                    {t.l}
                  </button>
                ))}
              </div>
              {activeTab === "desc" && <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>{product.longDesc || product.shortDesc}</p>}
              {activeTab === "ingr" && (
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  <p style={{ color: "#ff9d00", fontWeight: 600, marginBottom: 8 }}>⚠ Platzhalter — vor Livegang mit realen Zutaten befüllen</p>
                  <p>Wasser, Kohlensäure, Zitronensäure, Aroma, L-Theanin, Taurin, Koffein (natürlicher Ursprung), Niacin (Vitamin B3), Pantothensäure (Vitamin B5), Pyridoxin (Vitamin B6), Cyanocobalamin (Vitamin B12), Süßungsmittel (Sucralose, Acesulfam K).</p>
                </div>
              )}
              {activeTab === "nutr" && product.nutrition && (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <tbody>
                    {Object.entries(product.nutrition).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "8px 0", color: "var(--text-secondary)", textTransform: "capitalize" }}>{k}</td>
                        <td style={{ padding: "8px 0", textAlign: "right", fontWeight: 600 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Das könnte dich auch interessieren</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} onSelect={() => {}} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Shop Page ─────────────────────────────────────────────────────────────
const ShopPage = ({ addToCart, wishlist, toggleWishlist, onSelect }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const filters = [{ k: "all", l: "Alle" }, { k: "single", l: "Einzeldosen" }, { k: "bundle", l: "Bundles" }, { k: "multipack", l: "Multipacks" }];
  const filtered = PRODUCTS
    .filter(p => filter === "all" || p.category === filter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>Shop</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>Alle Produkte. Alle Welten. Deine Wahl.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)}
                style={{ background: filter === f.k ? "var(--brand)" : "var(--bg-card)", border: `1px solid ${filter === f.k ? "transparent" : "var(--border)"}`, borderRadius: 8, padding: "8px 16px", color: filter === f.k ? "white" : "var(--text-secondary)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                {f.l}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suche…" aria-label="Produkte suchen"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px 8px 32px", color: "var(--text-primary)", fontSize: 13, outline: "none", width: 180 }} />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sortierung"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer" }}>
              <option value="default">Standard</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
              <option value="rating">Beste Bewertung</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16, fontSize: 13, color: "var(--text-muted)" }}>{filtered.length} Produkte</div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <Search size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p>Keine Produkte gefunden.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onSelect={onSelect} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Checkout Page ─────────────────────────────────────────────────────────
const CheckoutPage = ({ cartItems, setPage, clearCart }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", fname: "", lname: "", address: "", city: "", zip: "", country: "DE" });
  const [success, setSuccess] = useState(false);
  const total = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (success) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: 24, paddingTop: 80 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,212,100,0.15)", border: "2px solid rgba(0,212,100,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <Check size={36} color="#00d464" />
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Bestellung aufgegeben!</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 32 }}>Danke für deine Bestellung. Eine Bestätigung wurde an {form.email || "deine E-Mail"} gesendet.</p>
      <button onClick={() => { clearCart(); setPage("home"); }} style={{ background: "var(--brand)", border: "none", borderRadius: 10, padding: "14px 28px", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>Zurück zum Shop</button>
    </div>
  );

  const inp = (label, k, type = "text", placeholder = "") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: 0.5 }}>{label.toUpperCase()}</label>
      <input type={type} value={form[k]} onChange={e => update(k, e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", color: "var(--text-primary)", fontSize: 14, outline: "none" }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }}>
        <div>
          {/* Steps */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
            {["Kontakt", "Versand", "Zahlung"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <button onClick={() => setStep(i + 1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i ? "var(--brand)" : step === i + 1 ? "var(--brand)" : "var(--bg-surface)", border: `1px solid ${step >= i + 1 ? "var(--brand)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>
                    {step > i + 1 ? <Check size={12} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? "var(--text-primary)" : "var(--text-muted)" }}>{s}</span>
                </button>
                {i < 2 && <div style={{ width: 32, height: 1, background: "var(--border)", margin: "0 8px" }} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Kontaktdaten</h2>
              {inp("E-Mail", "email", "email", "deine@email.de")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>{inp("Vorname", "fname", "text", "Max")}</div>
                <div>{inp("Nachname", "lname", "text", "Muster")}</div>
              </div>
              <button onClick={() => setStep(2)} style={{ background: "linear-gradient(135deg, var(--brand), #c855ff)", border: "none", borderRadius: 10, padding: "14px 28px", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer", marginTop: 8 }}>Weiter zur Lieferadresse</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Lieferadresse</h2>
              {inp("Straße und Hausnummer", "address", "text", "Musterstraße 1")}
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12 }}>
                <div>{inp("PLZ", "zip", "text", "10115")}</div>
                <div>{inp("Stadt", "city", "text", "Berlin")}</div>
              </div>
              <button onClick={() => setStep(3)} style={{ background: "linear-gradient(135deg, var(--brand), #c855ff)", border: "none", borderRadius: 10, padding: "14px 28px", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer", marginTop: 8 }}>Weiter zur Zahlung</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Zahlung</h2>
              <div style={{ background: "rgba(123,92,255,0.08)", border: "1px solid rgba(123,92,255,0.3)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>💡 Dies ist eine Demo. Keine echten Zahlungsdaten eingeben.</p>
              </div>
              {[{ l: "Kreditkarte (Demo)", sub: "Visa / Mastercard" }, { l: "PayPal (Demo)", sub: "Sofort bezahlen" }, { l: "Klarna (Demo)", sub: "Jetzt kaufen, später zahlen" }].map((m, i) => (
                <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{m.l}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.sub}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid var(--border)", background: i === 0 ? "var(--brand)" : "transparent" }} />
                </div>
              ))}
              <button onClick={() => setSuccess(true)} style={{ background: "linear-gradient(135deg, var(--brand), #c855ff)", border: "none", borderRadius: 10, padding: "14px 28px", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer", marginTop: 16, width: "100%", boxShadow: "0 0 24px var(--brand-glow)" }}>
                Jetzt kaufen – {formatPrice(total + 3.90)}
              </button>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>Mit dem Kauf akzeptierst du unsere AGB und Datenschutzerklärung. [Demo]</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, height: "fit-content", position: "sticky", top: 90 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Bestellübersicht</h3>
          {cartItems.map(item => (
            <div key={item.product.id} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: `radial-gradient(ellipse at center, ${item.product.glow}, var(--bg-deep))` }}>
                <ProductVisual product={item.product} size={48} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.product.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>×{item.qty}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{formatPrice(item.product.price * item.qty)}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}><span>Versand</span><span>€3,90</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, marginTop: 8 }}><span>Gesamt</span><span>{formatPrice(total + 3.9)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FAQ Page ──────────────────────────────────────────────────────────────
const FAQPage = () => {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 12 }}>FAQ</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>Häufige Fragen</h1>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: 8, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{f.q}</span>
              <ChevronDown size={18} color="var(--text-muted)" style={{ transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none", flexShrink: 0 }} />
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── About Page ────────────────────────────────────────────────────────────
const AboutPage = () => (
  <div style={{ minHeight: "100vh", paddingTop: 80 }}>
    <div style={{ position: "relative", height: 400, display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(123,92,255,0.2), transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 60%, rgba(0,212,255,0.1), transparent 50%)" }} />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--brand)", fontWeight: 600, marginBottom: 16 }}>ÜBER UNS</div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>Wir sind Clarity.</h1>
      </div>
    </div>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 80 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: -0.5 }}>Aus einer Idee, die nicht loslässt.</h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>Clarity entstand aus einer einfachen Frustration: Existierende Energy Drinks fühlten sich entweder wie Zuckerwasser oder wie Chemie-Experimente an. Wir wollten beides nicht.</p>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>Zwei Jahre Entwicklung, drei Formeln, hunderte Geschmackstests. Das Ergebnis: Energy, das funktioniert — klar, sauber, ohne Kompromisse.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[{ n: "10.000+", l: "Zufriedene Kunden" }, { n: "3", l: "Einzigartige Formeln" }, { n: "0g", l: "Zucker" }, { n: "2024", l: "Gegründet" }].map((s, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: 32, fontWeight: 900, color: "var(--brand)", marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Legal Page Template ───────────────────────────────────────────────────
const LegalPage = ({ title, children }) => (
  <div style={{ minHeight: "100vh", paddingTop: 100, padding: "100px 24px 80px" }}>
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ background: "#ff9d0022", border: "1px solid #ff9d0055", borderRadius: 12, padding: "12px 16px", marginBottom: 32, fontSize: 13, color: "#ff9d00" }}>
        ⚠ Hinweis: Dies ist eine technische Platzhaltervorlage und keine Rechtsberatung. Vor Livegang rechtlich prüfen und individuell vervollständigen.
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32, letterSpacing: -1 }}>{title}</h1>
      <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

const ImprintPage = () => (
  <LegalPage title="Impressum">
    <p><strong>Angaben gemäß § 5 TMG</strong></p>
    <p>[Firmenname] [Rechtsform]<br />[Anschrift]<br />[PLZ] [Ort]</p>
    <p><strong>Vertreten durch:</strong> [Vertretungsberechtigte Person]</p>
    <p><strong>Kontakt:</strong><br />Telefon: [Telefon]<br />E-Mail: [E-Mail]</p>
    <p><strong>Registereintrag:</strong><br />Eintragung im Handelsregister.<br />Registergericht: [Registergericht]<br />Registernummer: [Registernummer]</p>
    <p><strong>Umsatzsteuer-ID:</strong> [USt-ID]</p>
  </LegalPage>
);

const PrivacyPage = () => (
  <LegalPage title="Datenschutzerklärung">
    <p><strong>1. Verantwortlicher</strong><br />Verantwortlich im Sinne der DSGVO: [Firmenname], [Anschrift], [E-Mail]</p>
    <p><strong>2. Erhebung und Verarbeitung personenbezogener Daten</strong><br />[Platzhalter: Art der Datenerhebung, Zweck, Rechtsgrundlage ergänzen]</p>
    <p><strong>3. Eingesetzte Tools und Dienste</strong><br />[Verwendete Tools und Dienste ergänzen — z. B. Google Analytics, Shopify, Klaviyo]</p>
    <p><strong>4. Datenschutzkontakt</strong><br />[Datenschutzkontakt]</p>
    <p><strong>5. Rechte der betroffenen Person</strong><br />Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch. Beschwerde bei der zuständigen Aufsichtsbehörde.</p>
  </LegalPage>
);

const TermsPage = () => (
  <LegalPage title="Allgemeine Geschäftsbedingungen">
    <p><strong>§1 Geltungsbereich</strong><br />[Platzhalter: Geltungsbereich der AGB, Vertragspartner, Definitionen]</p>
    <p><strong>§2 Vertragsschluss</strong><br />[Platzhalter: Zustandekommen des Vertrages, Bestellprozess]</p>
    <p><strong>§3 Preise und Zahlung</strong><br />[Platzhalter: Preisangaben, akzeptierte Zahlungsmittel]</p>
    <p><strong>§4 Lieferung</strong><br />[Platzhalter: Lieferzeiten, -gebiete, Versandkosten]</p>
    <p><strong>§5 Widerruf</strong><br />Verbraucher haben ein vierzehntägiges Widerrufsrecht. [Platzhalter: vollständige Widerrufsbelehrung ergänzen]</p>
  </LegalPage>
);

// ─── Home Page ─────────────────────────────────────────────────────────────
const HomePage = ({ setPage, addToCart, wishlist, toggleWishlist, onSelect, recentlyViewed }) => (
  <>
    <HeroSection setPage={setPage} addToCart={addToCart} />
    <USPBar />
    <FeaturedSection setPage={setPage} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelect={onSelect} />
    <PromoBanner setPage={setPage} />
    <FlavorWorlds setPage={setPage} onSelect={onSelect} />
    <BundleSection addToCart={addToCart} onSelect={onSelect} />
    <CommunityGallery onSelect={onSelect} />
    <ReviewsSection />
    <RecentlyViewed products={recentlyViewed} onSelect={onSelect} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
    <StorySection setPage={setPage} />
    <NewsletterSection />
  </>
);

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
    addToast(`${product.name} zum Warenkorb hinzugefügt`, "success");
  }, [addToast]);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) { setCartItems(p => p.filter(i => i.product.id !== id)); return; }
    setCartItems(p => p.map(i => i.product.id === id ? { ...i, qty } : i));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(p => p.filter(i => i.product.id !== id));
    addToast("Artikel entfernt", "info");
  }, [addToast]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  }, []);

  const onSelect = useCallback((product) => {
    setSelectedProduct(product);
    setPage("product");
    setRecentlyViewed(prev => [product, ...prev.filter(p => p.id !== product.id)].slice(0, 4));
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    if (page === "product" && selectedProduct) return <ProductDetail product={selectedProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} setPage={setPage} addToast={addToast} />;
    if (page === "shop" || page === "flavors" || page === "bundles") return <ShopPage addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelect={onSelect} />;
    if (page === "about") return <AboutPage />;
    if (page === "faq") return <FAQPage />;
    if (page === "checkout") return <CheckoutPage cartItems={cartItems} setPage={setPage} clearCart={() => setCartItems([])} />;
    if (page === "imprint") return <ImprintPage />;
    if (page === "privacy") return <PrivacyPage />;
    if (page === "terms") return <TermsPage />;
    return <HomePage setPage={setPage} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelect={onSelect} recentlyViewed={recentlyViewed} />;
  };

  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <FontLoader />
      <AnnouncementBar />
      <div style={{ paddingTop: 36 }}>
      <Header page={page} setPage={(p) => { setPage(p); window.scrollTo(0, 0); }} cartItems={cartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} wishlist={wishlist} />
      <main id="main-content">
        {renderPage()}
      </main>
      {!["checkout", "imprint", "privacy", "terms"].includes(page) && <Footer setPage={(p) => { setPage(p); window.scrollTo(0, 0); }} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} updateQty={updateQty} removeFromCart={removeFromCart} setPage={setPage} />
      <Toast toasts={toasts} removeToast={(id) => setToasts(t => t.filter(x => x.id !== id))} />
      </div>
    </div>
  );
}
