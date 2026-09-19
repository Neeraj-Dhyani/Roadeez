import React, { useState, useEffect, useRef } from "react";

/* =====================================================================
   ROADEEZ - two-wheeler body & lighting parts
   Single file. Sample data only: verify part numbers and fitment before
   going live.
   ===================================================================== */

// ---------- DATA ----------
const CATEGORIES = ["Headlight", "Indicator", "Mud Guard", "Side Panel", "Tail Guard"];
const BRANDS = ["Hero", "Honda", "TVS", "Bajaj", "Yamaha"];
const CAT_NOTE = {
  Headlight: "Halogen and LED units, direct bolt-on",
  Indicator: "Flexible and LED turn signals",
  "Mud Guard": "Front fenders that protect the engine",
  "Side Panel": "Replacement cowls and side sets",
  "Tail Guard": "Rear guards with reflector mounts",
};
const WHATSAPP = "919876543210";

// id, name, category, brand, price, partNo, stock, fits, description, [material, warranty, fitting], popular
const p = (id, name, category, brand, price, partNo, stock, fits, desc, [material, warranty, fitting], popular = false) => ({
  id, name, category, brand, price, partNo, stock, fits, desc, popular,
  specs: { Material: material, Warranty: warranty, Fitting: fitting },
});

const PRODUCTS = [
  p(1, "Halogen Crystal Headlamp Unit", "Headlight", "Hero", 850, "RD-HL-101", "in",
    ["Splendor Plus", "HF Deluxe", "Passion Pro"],
    "Clear lens direct bolt replacement headlight assembly with factory-spec reflector alignment.",
    ["Polycarbonate lens / ABS housing", "1 year replacement", "Direct OEM replacement"], true),
  p(2, "Dual-Tone LED Projector Headlight", "Headlight", "Yamaha", 2150, "RD-HL-215", "in",
    ["FZ-S", "MT-15"],
    "High-intensity focused beam headlight suitable for long distance and night highway riding.",
    ["Die-cast aluminium heat sink", "2 years limited", "Plug and play harness"], true),
  p(3, "Amber Flexible Turn Indicators (Pair)", "Indicator", "Honda", 340, "RD-IN-114", "in",
    ["Shine", "SP 125", "Unicorn"],
    "Vibration-proof flexible rubber arm indicators designed to avoid breakage during minor falls.",
    ["High-flex EPDM rubber", "6 months", "Universal M10 thread"], true),
  p(4, "Matte Black Reinforced Front Mud Guard", "Mud Guard", "TVS", 620, "RD-MG-306", "low",
    ["Apache RTR 160", "Raider 125"],
    "High-density polymer mud guard designed to protect the engine block from road debris and mud splash.",
    ["Virgin grade ABS", "1 year colour fastness", "Pre-drilled OEM holes"], true),
  p(5, "Aerodynamic Side Panel Set", "Side Panel", "Bajaj", 1180, "RD-SP-412", "in",
    ["Pulsar 150", "Pulsar NS200"],
    "Vibration dampening replacement side cowls with heat-resistant foil backing on exhaust-facing edges.",
    ["Impact polypropylene", "1 year", "Clip and bolt retention"]),
  p(6, "Extended Rear Tail Guard Assembly", "Tail Guard", "Hero", 490, "RD-TG-120", "in",
    ["Splendor Plus", "Passion Pro", "Glamour"],
    "Extended rear splash guard with an integrated reflector and license plate bracket.",
    ["Reinforced composite", "1 year", "Factory sub-frame mount"]),
  p(7, "Round Halogen Headlamp Assembly", "Headlight", "Honda", 780, "RD-HL-112", "in",
    ["Shine", "Unicorn"],
    "Round multi-reflector headlamp with a sealed lens, tuned to the stock beam pattern.",
    ["Polycarbonate lens / ABS housing", "1 year replacement", "Direct OEM replacement"]),
  p(8, "Twin-Pod LED Headlight", "Headlight", "Bajaj", 1890, "RD-HL-408", "in",
    ["Pulsar 150", "Pulsar NS200"],
    "Twin-pod LED unit with a sharp cut-off, brighter than the stock halogen without extra load on the stator.",
    ["Die-cast aluminium heat sink", "2 years limited", "Plug and play harness"]),
  p(9, "Smoked Lens LED Indicators (Set of 4)", "Indicator", "Bajaj", 560, "RD-IN-411", "in",
    ["Pulsar 150", "Platina", "CT 110X"],
    "Smoked-lens LED turn signals that stay clear in daylight and flash sharply at night.",
    ["Polycarbonate lens / ABS body", "1 year", "Plug and play connector"]),
  p(10, "Sequential Amber Indicator Pair", "Indicator", "TVS", 420, "RD-IN-305", "low",
    ["Apache RTR 160", "Raider 125"],
    "Amber indicators with a sequential flash pattern. Fits the stock wiring connector.",
    ["ABS housing / amber lens", "6 months", "Plug and play connector"]),
  p(11, "Chrome-Finish Front Mud Guard", "Mud Guard", "Hero", 540, "RD-MG-121", "in",
    ["Splendor Plus", "HF Deluxe"],
    "Bright-finish front fender that keeps mud off the fork and the engine block.",
    ["Chrome-coated ABS", "1 year colour fastness", "Pre-drilled OEM holes"]),
  p(12, "Flexible Front Fender", "Mud Guard", "Yamaha", 780, "RD-MG-215", "out",
    ["FZ-S", "R15 V3"],
    "Flexible fender that springs back after knocks and parking-lot bumps instead of cracking.",
    ["Flex-grade polypropylene", "1 year", "Pre-drilled OEM holes"]),
  p(13, "Left and Right Side Panel Set", "Side Panel", "Hero", 960, "RD-SP-122", "in",
    ["Splendor Plus", "HF Deluxe"],
    "Matched left and right panels with the mounting lugs moulded in, so nothing rattles loose.",
    ["Impact polypropylene", "1 year", "Clip and bolt retention"]),
  p(14, "Body-Colour Side Cowl Kit", "Side Panel", "Honda", 1240, "RD-SP-114", "in",
    ["Shine", "SP 125"],
    "Side cowl kit with a UV-stable finish that resists fading in summer sun.",
    ["UV-stabilised ABS", "1 year colour fastness", "Clip and bolt retention"]),
  p(15, "Side Panel with Heat Shield", "Side Panel", "TVS", 1050, "RD-SP-307", "in",
    ["Apache RTR 160", "Star City Plus"],
    "Side panel with a foil heat shield on the edge that faces the exhaust.",
    ["Impact polypropylene", "1 year", "Clip and bolt retention"]),
  p(16, "Rear Tail Guard with Reflector", "Tail Guard", "TVS", 470, "RD-TG-306", "in",
    ["Apache RTR 160", "Star City Plus"],
    "Rear guard with a moulded reflector and a stiffened number-plate seat.",
    ["Reinforced composite", "1 year", "Factory sub-frame mount"]),
  p(17, "Slim Tail Section Guard", "Tail Guard", "Yamaha", 690, "RD-TG-216", "in",
    ["FZ-S", "MT-15"],
    "Slim rear guard that keeps the tail clean and clears the chain and tyre.",
    ["Reinforced composite", "1 year", "Factory sub-frame mount"]),
  p(18, "Reinforced Rear Splash Guard", "Tail Guard", "Bajaj", 520, "RD-TG-412", "in",
    ["Pulsar 150", "Platina"],
    "Reinforced splash guard with a reflector and a bracket for the licence plate.",
    ["Reinforced composite", "1 year", "Factory sub-frame mount"]),
];

const COUNTS = {
  cat: Object.fromEntries(CATEGORIES.map((c) => [c, PRODUCTS.filter((x) => x.category === c).length])),
  brand: Object.fromEntries(BRANDS.map((b) => [b, PRODUCTS.filter((x) => x.brand === b).length])),
  pair: (c, b) => PRODUCTS.filter((x) => x.category === c && x.brand === b).length,
};

const inr = (n) => "\u20B9" + n.toLocaleString("en-IN");
const STOCK = { in: "In stock", low: "Only a few left", out: "Out of stock" };
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// ---------- PART ILLUSTRATIONS ----------
const INK = "#15181C";
const STEEL = "#C9D0D6";
const AMBER = "#F2B705";
const RED = "#D41F1F";

function PartArt({ category }) {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" focusable="false">
      {category === "Headlight" && (
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <rect x="92" y="14" width="16" height="14" fill={INK} />
          <rect x="92" y="112" width="16" height="14" fill={INK} />
          <ellipse cx="100" cy="70" rx="62" ry="46" fill="#fff" />
          <ellipse cx="100" cy="70" rx="48" ry="34" fill="#DCE1E5" />
          <circle cx="100" cy="70" r="18" fill="#fff" />
          <circle cx="100" cy="70" r="7" fill={AMBER} />
        </g>
      )}
      {category === "Indicator" &&
        [52, 148].map((cx) => (
          <g key={cx}>
            <path d={`M${cx} 124 L${cx} 92`} stroke={INK} strokeWidth="9" strokeLinecap="round" />
            <ellipse cx={cx} cy="68" rx="30" ry="22" fill={AMBER} stroke={INK} strokeWidth="3" />
            <ellipse cx={cx} cy="68" rx="16" ry="11" fill="#FFD95C" />
          </g>
        ))}
      {category === "Mud Guard" && (
        <g>
          <path
            d="M18 116 Q26 38 100 34 Q174 38 182 116 L160 116 Q152 64 100 60 Q48 64 40 116 Z"
            fill="#2B3036" stroke={INK} strokeWidth="3" strokeLinejoin="round"
          />
          <path d="M32 100 Q40 54 96 44" stroke="#59616A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g fill="#EEF0F1">
            <circle cx="30" cy="104" r="3.5" />
            <circle cx="170" cy="104" r="3.5" />
            <circle cx="100" cy="47" r="4" />
          </g>
        </g>
      )}
      {category === "Side Panel" && (
        <g strokeLinejoin="round">
          <path
            d="M52 20 Q122 10 152 38 L158 98 Q152 124 112 126 L66 120 Q46 100 52 20 Z"
            fill={STEEL} stroke={INK} strokeWidth="3"
          />
          <g stroke={INK} strokeWidth="3" strokeLinecap="round">
            <path d="M84 52 H132" />
            <path d="M84 66 H132" />
            <path d="M84 80 H132" />
          </g>
          <path d="M60 106 Q104 120 150 100" stroke={RED} strokeWidth="5" fill="none" strokeLinecap="round" />
          <g fill={INK}>
            <circle cx="66" cy="34" r="3.5" />
            <circle cx="144" cy="48" r="3.5" />
          </g>
        </g>
      )}
      {category === "Tail Guard" && (
        <g strokeLinejoin="round">
          <path
            d="M18 62 L150 46 Q186 42 186 70 Q186 96 150 96 L18 82 Z"
            fill="#2B3036" stroke={INK} strokeWidth="3"
          />
          <rect x="34" y="62" width="34" height="14" rx="3" fill={RED} stroke={INK} strokeWidth="2" />
          <rect x="102" y="58" width="54" height="26" rx="3" fill="#EEF0F1" stroke={INK} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

// ---------- HERO: THE BIKE, WITH FIVE SHOPPABLE PARTS ----------
function BikeMap({ active, setActive, onPick }) {
  const on = (c) => active === c;
  const fill = (c) => (on(c) ? RED : "#3A424B");
  const edge = (c) => (on(c) ? "#fff" : "#C6CDD4");
  const hot = (c) => ({
    className: "part",
    tabIndex: 0,
    role: "button",
    "aria-label": `Shop ${c} parts`,
    onMouseEnter: () => setActive(c),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(c),
    onBlur: () => setActive(null),
    onClick: () => onPick(c),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPick(c);
      }
    },
  });
  const Dot = ({ c, x, y }) => (
    <circle className="dot" cx={x} cy={y} r={on(c) ? 9 : 6.5} fill={RED} stroke="#fff" strokeWidth="2" />
  );

  return (
    <svg viewBox="0 0 640 330" role="group" aria-label="Motorcycle with five parts you can shop">
      <line x1="30" y1="302" x2="610" y2="302" stroke="#3A424B" strokeWidth="2" strokeDasharray="6 8" />

      <g fill="none" stroke="#C6CDD4" strokeWidth="2.5" strokeLinejoin="round">
        {/* wheels */}
        <circle className="draw" pathLength="1" cx="150" cy="235" r="60" stroke="#8B95A0" strokeWidth="12" />
        <circle className="draw" pathLength="1" cx="500" cy="235" r="60" stroke="#8B95A0" strokeWidth="12" />
        <circle className="draw" pathLength="1" cx="150" cy="235" r="43" />
        <circle className="draw" pathLength="1" cx="500" cy="235" r="43" />
        <circle cx="150" cy="235" r="8" fill="#C6CDD4" />
        <circle cx="500" cy="235" r="8" fill="#C6CDD4" />
        {/* fork, bars, swingarm */}
        <path className="draw" pathLength="1" d="M500 235 L468 118" strokeWidth="7" />
        <path className="draw" pathLength="1" d="M468 118 L448 104 L418 102" strokeWidth="6" />
        <path className="draw" pathLength="1" d="M150 235 L306 240" strokeWidth="6" />
        {/* tank, seat, engine, muffler */}
        <path className="draw" pathLength="1" d="M300 150 Q305 112 360 114 L426 126 Q436 146 418 158 L310 168 Z" fill="#20262C" />
        <path className="draw" pathLength="1" d="M196 156 Q210 144 296 150 L310 168 L196 172 Z" fill="#20262C" />
        <rect className="draw" pathLength="1" x="304" y="200" width="118" height="68" rx="10" fill="#20262C" />
        <rect className="draw" pathLength="1" x="336" y="178" width="50" height="24" rx="4" fill="#20262C" />
        <path className="draw" pathLength="1" d="M330 222 H396 M330 236 H396 M330 250 H396" strokeWidth="1.5" />
        <rect className="draw" pathLength="1" x="226" y="272" width="150" height="18" rx="9" fill="#20262C" />
        <path className="draw" pathLength="1" d="M400 268 Q400 281 372 281" strokeWidth="5" />
      </g>

      {/* shoppable parts */}
      <g {...hot("Tail Guard")}>
        <path d="M196 158 L108 160 Q80 166 72 192 L100 196 Q122 178 196 174 Z" fill={fill("Tail Guard")} stroke={edge("Tail Guard")} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="96" cy="178" r="30" fill="transparent" />
        <Dot c="Tail Guard" x={96} y={178} />
      </g>
      <g {...hot("Side Panel")}>
        <path d="M196 178 L296 174 L288 226 Q246 240 206 222 Z" fill={fill("Side Panel")} stroke={edge("Side Panel")} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="246" cy="204" r="32" fill="transparent" />
        <Dot c="Side Panel" x={246} y={204} />
      </g>
      <g {...hot("Mud Guard")}>
        <path d="M426.6 215.3 A76 76 0 0 1 562.3 191.4" fill="none" stroke={edge("Mud Guard")} strokeWidth="16" />
        <path d="M426.6 215.3 A76 76 0 0 1 562.3 191.4" fill="none" stroke={fill("Mud Guard")} strokeWidth="11" />
        <circle cx="540" cy="170" r="30" fill="transparent" />
        <Dot c="Mud Guard" x={540} y={170} />
      </g>
      <g {...hot("Headlight")}>
        <path d="M470 108 Q508 104 514 130 Q508 152 470 148 Z" fill={fill("Headlight")} stroke={edge("Headlight")} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="494" cy="128" r="30" fill="transparent" />
        <Dot c="Headlight" x={494} y={128} />
      </g>
      <g {...hot("Indicator")}>
        <ellipse cx="450" cy="164" rx="13" ry="8" fill={fill("Indicator")} stroke={edge("Indicator")} strokeWidth="2.5" />
        <circle cx="450" cy="164" r="26" fill="transparent" />
        <Dot c="Indicator" x={450} y={164} />
      </g>
    </svg>
  );
}

// ---------- SMALL SHARED PIECES ----------
function Stock({ level }) {
  return <span className={`stock ${level}`}>{STOCK[level]}</span>;
}

function ProductCard({ product, onOpen, onAdd }) {
  return (
    <article className="card">
      <button className="card-art" tabIndex={-1} aria-hidden="true" onClick={() => onOpen(product)}>
        <PartArt category={product.category} />
      </button>
      <div className="card-body">
        <div className="brandline">{product.brand} {product.category}</div>
        <h3>
          <button className="link" onClick={() => onOpen(product)}>{product.name}</button>
        </h3>
        <Stock level={product.stock} />
        <div className="card-foot">
          <span className="price">{inr(product.price)}</span>
          <button className="btn btn-line btn-sm" onClick={() => onAdd(product, 1)}>
            {product.stock === "out" ? "Ask availability" : "Add to enquiry"}
          </button>
        </div>
      </div>
    </article>
  );
}

// ---------- HEADER ----------
function Header({ page, go, onFilter, cartCount, openDrawer }) {
  const [mega, setMega] = useState(false);
  const [nav, setNav] = useState(false);
  const [hot, setHot] = useState(CATEGORIES[0]);

  const goPage = (pg) => { go(pg); setNav(false); setMega(false); };
  const pick = (c, b) => { onFilter(c, b); setNav(false); setMega(false); };
  const cur = (pg) => (page === pg ? "page" : undefined);

  return (
    <header className="hdr">
      <div className="hdr-in">
        <button className="logo" onClick={() => goPage("home")} aria-label="ROADEEZ home">
          RO<b>A</b>DEEZ <span className="tag">It's time to GLIDE</span>
        </button>

        <nav id="site-nav" className={"nav" + (nav ? " open" : "")} aria-label="Main">
          <button className="nav-btn" aria-current={cur("home")} onClick={() => goPage("home")}>Home</button>

          <div
            className="has-mega"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            onKeyDown={(e) => e.key === "Escape" && setMega(false)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMega(false); }}
          >
            <button
              className="nav-btn"
              aria-expanded={mega}
              aria-current={page === "products" || page === "detail" ? "page" : undefined}
              onClick={() => setMega(true)}
            >
              Products <span aria-hidden="true">&#9662;</span>
            </button>
            {mega && (
              <div className="mega">
                <ul className="mega-cats">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        className={"mega-cat" + (hot === c ? " on" : "")}
                        onMouseEnter={() => setHot(c)}
                        onFocus={() => setHot(c)}
                        onClick={() => pick(c, "All")}
                      >
                        {c} <span className="n">{COUNTS.cat[c]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mega-brands">
                  <button className="mega-all" onClick={() => pick(hot, "All")}>All {hot} parts</button>
                  {BRANDS.map((b) => {
                    const n = COUNTS.pair(hot, b);
                    return (
                      <button key={b} disabled={n === 0} onClick={() => pick(hot, b)}>
                        {b} <span className="n">{n}</span>
                      </button>
                    );
                  })}
                </div>
                <button className="mega-foot" onClick={() => pick("All", "All")}>Browse all {PRODUCTS.length} products</button>
              </div>
            )}
          </div>

          <button className="nav-btn" aria-current={cur("about")} onClick={() => goPage("about")}>About Us</button>
          <button className="nav-btn" aria-current={cur("contact")} onClick={() => goPage("contact")}>Contact Us</button>
        </nav>

        <div className="hdr-actions">
          <button className="btn btn-line btn-sm enq" onClick={openDrawer}>
            Enquiry
            {cartCount > 0 && <span className="badge" aria-label={`${cartCount} items`}>{cartCount}</span>}
          </button>
          <button
            className="burger btn btn-line btn-sm"
            aria-expanded={nav}
            aria-controls="site-nav"
            onClick={() => setNav(!nav)}
          >
            {nav ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- PAGES ----------
function HomePage({ onExplore, onOpen, onAdd }) {
  const [active, setActive] = useState(null);
  const [fBrand, setFBrand] = useState("All");
  const [fPart, setFPart] = useState("All");

  return (
    <div>
      <section className="hero">
        <div>
          <h1>Spare parts that fit the first time.</h1>
          <p className="lede">
            Headlights, indicators, mud guards, side panels and tail guards for Hero, Honda, TVS, Bajaj and Yamaha bikes,
            made to OEM dimensions and drilled for the original mounts.
          </p>
          <form
            className="finder"
            onSubmit={(e) => { e.preventDefault(); onExplore(fPart, fBrand); }}
          >
            <div className="field">
              <label htmlFor="f-brand">Your bike's brand</label>
              <select id="f-brand" value={fBrand} onChange={(e) => setFBrand(e.target.value)}>
                <option value="All">Any brand</option>
                {BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-part">Part you need</label>
              <select id="f-part" value={fPart} onChange={(e) => setFPart(e.target.value)}>
                <option value="All">Any part</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-red">Show parts</button>
          </form>
        </div>

        <div className="bikepanel dark">
          <BikeMap active={active} setActive={setActive} onPick={(c) => onExplore(c, "All")} />
          <div className="readout" aria-live="polite">
            {active ? (
              <>
                <div>
                  <strong>{active}</strong>
                  <span>{CAT_NOTE[active]}</span>
                </div>
                <button className="btn btn-red btn-sm" onClick={() => onExplore(active, "All")}>
                  Shop {COUNTS.cat[active]} parts
                </button>
              </>
            ) : (
              <div>
                <strong>Pick a part on the bike</strong>
                <span>Or choose one below to see what we stock.</span>
              </div>
            )}
          </div>
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={"chip" + (active === c ? " is-on" : "")}
                onMouseEnter={() => setActive(c)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c)}
                onBlur={() => setActive(null)}
                onClick={() => onExplore(c, "All")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-h">
          <div>
            <h2>Shop by brand</h2>
            <p>Find parts for the bike you ride.</p>
          </div>
        </div>
        <div className="brands">
          {BRANDS.map((b) => (
            <button key={b} className="brand" onClick={() => onExplore("All", b)}>
              <strong>{b}</strong>
              <span>{COUNTS.brand[b]} parts</span>
            </button>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="sec-h">
          <div>
            <h2>Popular parts</h2>
            <p>What riders and workshops reorder most.</p>
          </div>
          <button className="btn btn-line btn-sm" onClick={() => onExplore("All", "All")}>See all parts</button>
        </div>
        <div className="grid">
          {PRODUCTS.filter((x) => x.popular).map((x) => (
            <ProductCard key={x.id} product={x} onOpen={onOpen} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className="sec promises">
        <div>
          <h3>Bolts on without drilling</h3>
          <p>Every part is checked against OEM sub-frames and brackets for dimensional tolerance.</p>
        </div>
        <div>
          <h3>Material that survives the road</h3>
          <p>Virgin-grade ABS and impact polypropylene resist stress cracks and vibration.</p>
        </div>
        <div>
          <h3>Lights sealed against rain</h3>
          <p>Lighting assemblies use IP65-rated silicone gaskets, so water stays out.</p>
        </div>
      </section>

      <section className="band dark">
        <div>
          <h2>Workshop or dealer?</h2>
          <p>Send us your parts list and we will come back with a quote.</p>
        </div>
        <a className="btn btn-red" href={waLink("Hi ROADEEZ, I run a workshop / dealership and would like a quote.")} target="_blank" rel="noreferrer">
          Get a quote on WhatsApp
        </a>
      </section>
    </div>
  );
}

function ProductsPage({ f, set, clear, onOpen, onAdd }) {
  const q = f.query.trim().toLowerCase();
  const match = (x, c = f.cat, b = f.brand) =>
    (c === "All" || x.category === c) &&
    (b === "All" || x.brand === b) &&
    (!q || [x.name, x.brand, x.category, x.partNo, ...x.fits].join(" ").toLowerCase().includes(q));

  const sorters = {
    featured: (a, b) => (b.popular - a.popular) || a.id - b.id,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  const list = PRODUCTS.filter((x) => match(x)).sort(sorters[f.sort]);
  const dirty = f.cat !== "All" || f.brand !== "All" || q;

  const title =
    f.cat === "All"
      ? f.brand === "All" ? "All parts" : `${f.brand} parts`
      : `${f.brand === "All" ? "" : f.brand + " "}${f.cat} parts`;

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <button onClick={() => set.go("home")}>Home</button>
        <span aria-hidden="true">/</span>
        <button onClick={clear}>Products</button>
        {f.cat !== "All" && (<><span aria-hidden="true">/</span><span>{f.cat}</span></>)}
      </nav>
      <h1 className="page-h">{title}</h1>

      <div className="toolbar">
        <div className="field">
          <label htmlFor="q">Search by name, part number or bike model</label>
          <input id="q" type="search" value={f.query} placeholder="e.g. Splendor, RD-HL-101" onChange={(e) => set.query(e.target.value)} />
        </div>
        <div className="field sort">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={f.sort} onChange={(e) => set.sort(e.target.value)}>
            <option value="featured">Popular first</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="filters">
        <div className="frow" role="group" aria-label="Filter by part">
          <span className="frow-l">Part</span>
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} className="chip" aria-pressed={f.cat === c} onClick={() => set.cat(c)}>
              {c === "All" ? "All" : c} <span className="n">{PRODUCTS.filter((x) => match(x, c)).length}</span>
            </button>
          ))}
        </div>
        <div className="frow" role="group" aria-label="Filter by brand">
          <span className="frow-l">Brand</span>
          {["All", ...BRANDS].map((b) => (
            <button key={b} className="chip" aria-pressed={f.brand === b} onClick={() => set.brand(b)}>
              {b} <span className="n">{PRODUCTS.filter((x) => match(x, f.cat, b)).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="count" aria-live="polite">
        {list.length} {list.length === 1 ? "part" : "parts"}
        {dirty && <button className="link u" onClick={clear}>Clear filters</button>}
      </div>

      {list.length === 0 ? (
        <div className="empty">
          <h3>No parts match those filters</h3>
          <p>Try a different brand or clear the filters. If you cannot find your part, we can source it.</p>
          <div className="row">
            <button className="btn btn-line" onClick={clear}>Clear filters</button>
            <a className="btn btn-red" target="_blank" rel="noreferrer" href={waLink("Hi ROADEEZ, I'm looking for a part I couldn't find on the site.")}>
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="grid">
          {list.map((x) => <ProductCard key={x.id} product={x} onOpen={onOpen} onAdd={onAdd} />)}
        </div>
      )}
    </div>
  );
}

function DetailPage({ product, backLabel, onBack, onOpen, onAdd, onCrumb }) {
  const [qty, setQty] = useState(1);
  const related = PRODUCTS.filter((x) => x.id !== product.id)
    .sort((a, b) => ((b.category === product.category) - (a.category === product.category)) || ((b.brand === product.brand) - (a.brand === product.brand)))
    .slice(0, 3);

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <button onClick={() => onCrumb("All", "All")}>Products</button>
        <span aria-hidden="true">/</span>
        <button onClick={() => onCrumb(product.category, "All")}>{product.category}</button>
        <span aria-hidden="true">/</span>
        <span>{product.partNo}</span>
      </nav>
      <button className="btn btn-line btn-sm back" onClick={onBack}>&#8592; {backLabel}</button>

      <div className="detail">
        <div className="detail-art"><PartArt category={product.category} /></div>
        <div>
          <div className="brandline">{product.brand} {product.category}, part no. {product.partNo}</div>
          <h1>{product.name}</h1>
          <div className="price big">{inr(product.price)}</div>
          <Stock level={product.stock} />
          <p className="desc">{product.desc}</p>

          <dl className="specs">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <div className="fits">
            <div className="fits-l">Fits</div>
            <ul>{product.fits.map((m) => <li key={m}>{product.brand} {m}</li>)}</ul>
          </div>

          <div className="buy">
            <div className="qty" role="group" aria-label="Quantity">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>&minus;</button>
              <output>{qty}</output>
              <button aria-label="Increase quantity" onClick={() => setQty(Math.min(99, qty + 1))}>+</button>
            </div>
            <button className="btn btn-red grow" onClick={() => onAdd(product, qty)}>
              {product.stock === "out" ? "Ask about availability" : "Add to enquiry"}
            </button>
          </div>
          <a
            className="btn btn-line wa"
            target="_blank" rel="noreferrer"
            href={waLink(`Hi ROADEEZ, is the ${product.name} (${product.partNo}) available?`)}
          >
            Ask about this part on WhatsApp
          </a>
        </div>
      </div>

      <section className="sec">
        <div className="sec-h"><h2>You may also need</h2></div>
        <div className="grid">
          {related.map((x) => <ProductCard key={x.id} product={x} onOpen={onOpen} onAdd={onAdd} />)}
        </div>
      </section>
    </div>
  );
}

function AboutPage({ onExplore }) {
  return (
    <div className="page narrow">
      <h1 className="page-h">About ROADEEZ</h1>
      <p className="lede">
        We make replacement body and lighting parts for the two-wheelers Indian riders actually use. Every part is
        inspected against OEM dimensions, so it bolts on without modification.
      </p>
      <dl className="facts">
        <div>
          <dt>Direct bolt-on fit</dt>
          <dd>Engineered against OEM sub-frames and brackets, with pre-drilled mounting points.</dd>
        </div>
        <div>
          <dt>High-impact materials</dt>
          <dd>High-yield ABS and virgin polymers resist stress cracking and vibration.</dd>
        </div>
        <div>
          <dt>All-weather sealed</dt>
          <dd>Lighting assemblies use IP65-rated silicone sealing gaskets.</dd>
        </div>
        <div>
          <dt>Made for these brands</dt>
          <dd>{BRANDS.join(", ")}.</dd>
        </div>
      </dl>
      <button className="btn btn-red" onClick={() => onExplore("All", "All")}>Browse all parts</button>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(null);

  return (
    <div className="page">
      <h1 className="page-h">Contact us</h1>
      <p className="lede">Dealer enquiries, replacement orders and fitment questions.</p>

      <div className="contact">
        <div className="panel">
          {sent ? (
            <div className="ok" role="status">
              <h3>Thanks, {sent}</h3>
              <p>We have your enquiry and will contact you shortly.</p>
              <button className="btn btn-line btn-sm" onClick={() => setSent(null)}>Send another enquiry</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(new FormData(e.target).get("name")); }}>
              <div className="field">
                <label htmlFor="c-name">Full name</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email address</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="ramesh@example.com" />
              </div>
              <div className="field">
                <label htmlFor="c-bike">Bike brand and model</label>
                <input id="c-bike" name="bike" placeholder="e.g. Hero Splendor Plus" />
              </div>
              <div className="field">
                <label htmlFor="c-msg">Which part do you need?</label>
                <textarea id="c-msg" name="message" required rows={4} placeholder="Tell us the part, quantity and model year." />
              </div>
              <button type="submit" className="btn btn-red block">Send enquiry</button>
            </form>
          )}
        </div>

        <div className="side">
          <div className="panel">
            <h3>Distribution hub</h3>
            <p>ROADEEZ Automotive Components Ltd.<br />Industrial Area Phase 2, Gurugram, India</p>
          </div>
          <div className="panel">
            <h3>Talk to us</h3>
            <p>
              Email: <a href="mailto:support@roadeez.com">support@roadeez.com</a><br />
              Phone: <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
            <a className="btn btn-line btn-sm" target="_blank" rel="noreferrer" href={waLink("Hi ROADEEZ, I have a question about fitment.")}>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ENQUIRY DRAWER ----------
function EnquiryDrawer({ items, setQty, remove, onClose, onDone, onBrowse }) {
  const [sent, setSent] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current && closeRef.current.focus();
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []); // eslint-disable-line

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const lines = items.map((i) => `${i.qty} x ${i.name} (${i.partNo})`).join("\n");

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your enquiry">
        <div className="drawer-h">
          <h2>Your enquiry</h2>
          <button ref={closeRef} className="btn btn-line btn-sm" onClick={onClose}>Close</button>
        </div>

        {sent ? (
          <div className="drawer-b ok" role="status">
            <h3>Thanks, {sent.name}</h3>
            <p>We have your enquiry and will call you on {sent.phone}. For the fastest reply, send the same list on WhatsApp.</p>
            <a
              className="btn btn-red block"
              target="_blank" rel="noreferrer"
              href={waLink(`Hi ROADEEZ, I'd like a quote for:\n${lines}\n\nName: ${sent.name}\nPhone: ${sent.phone}`)}
            >
              Send on WhatsApp
            </a>
            <button className="btn btn-line block" onClick={onDone}>Done</button>
          </div>
        ) : items.length === 0 ? (
          <div className="drawer-b">
            <p>Your enquiry is empty. Add the parts you need and send them to us in one go.</p>
            <button className="btn btn-red" onClick={onBrowse}>Browse products</button>
          </div>
        ) : (
          <form
            className="drawer-form"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              setSent({ name: fd.get("name"), phone: fd.get("phone") });
            }}
          >
            <div className="drawer-b">
              {items.map((i) => (
                <div className="line-item" key={i.id}>
                  <div className="line-thumb"><PartArt category={i.category} /></div>
                  <div>
                    <div className="li-name">{i.name}</div>
                    <div className="li-meta">{inr(i.price)} each</div>
                    <button type="button" className="link u sm" onClick={() => remove(i.id)}>Remove</button>
                  </div>
                  <div className="qty sm" role="group" aria-label={`Quantity for ${i.name}`}>
                    <button type="button" aria-label="Decrease" onClick={() => setQty(i.id, i.qty - 1)}>&minus;</button>
                    <output>{i.qty}</output>
                    <button type="button" aria-label="Increase" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                  </div>
                </div>
              ))}
              <div className="total">
                <span>Estimated total</span>
                <strong>{inr(total)}</strong>
              </div>
              <p className="note">Estimate only. We confirm the final price with your quote.</p>

              <div className="field">
                <label htmlFor="d-name">Your name</label>
                <input id="d-name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="d-phone">Phone number</label>
                <input id="d-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" />
              </div>
            </div>
            <div className="drawer-f">
              <button type="submit" className="btn btn-red block">Send enquiry</button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}

// ---------- FOOTER ----------
function Footer({ go, onExplore }) {
  return (
    <footer className="ftr dark">
      <div className="ftr-in">
        <div>
          <div className="logo static">RO<b>A</b>DEEZ</div>
          <p className="muted">It's time to GLIDE</p>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c}><button onClick={() => onExplore(c, "All")}>{c}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><button onClick={() => go("about")}>About Us</button></li>
            <li><button onClick={() => go("contact")}>Contact Us</button></li>
          </ul>
        </div>
        <div>
          <h3>Compatible with</h3>
          <p className="muted">{BRANDS.join(", ")}</p>
        </div>
      </div>
      <div className="ftr-b">&copy; 2026 ROADEEZ Automotive Ltd.</div>
    </footer>
  );
}

// ---------- APP ----------
export default function Roadeez() {
  const [page, setPage] = useState("home");
  const [backTo, setBackTo] = useState("home");
  const [cat, setCat] = useState("All");
  const [brand, setBrand] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page, selectedId]);
  useEffect(() => {
    const t = { home: "Motorcycle spare parts", products: "Products", about: "About Us", contact: "Contact Us" };
    const sel = PRODUCTS.find((x) => x.id === selectedId);
    document.title = "ROADEEZ | " + (page === "detail" && sel ? sel.name : t[page]);
  }, [page, selectedId]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const explore = (c, b) => {
    setCat(c); setBrand(b); setQuery(""); setPage("products"); setDrawer(false);
  };
  const clear = () => { setCat("All"); setBrand("All"); setQuery(""); setPage("products"); };
  const open = (prod) => {
    if (page !== "detail") setBackTo(page);
    setSelectedId(prod.id);
    setPage("detail");
  };
  const add = (prod, qty = 1) => {
    setCart((c) =>
      c.some((i) => i.id === prod.id)
        ? c.map((i) => (i.id === prod.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...c, { id: prod.id, qty }]
    );
    setToast({ msg: `${qty > 1 ? qty + " x " : ""}${prod.name} added to your enquiry`, n: Date.now() });
  };
  const setQty = (id, qty) =>
    setCart((c) => (qty < 1 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i))));
  const remove = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const items = cart.map((c) => ({ ...PRODUCTS.find((x) => x.id === c.id), qty: c.qty }));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const selected = PRODUCTS.find((x) => x.id === selectedId);

  return (
    <div className="rd">
      <style>{CSS}</style>
      <a className="skip" href="#main">Skip to content</a>

      <Header page={page} go={setPage} onFilter={explore} cartCount={cartCount} openDrawer={() => setDrawer(true)} />

      <main id="main" className="wrap main">
        {page === "home" && <HomePage onExplore={explore} onOpen={open} onAdd={add} />}
        {page === "products" && (
          <ProductsPage
            f={{ cat, brand, query, sort }}
            set={{ cat: setCat, brand: setBrand, query: setQuery, sort: setSort, go: setPage }}
            clear={clear}
            onOpen={open}
            onAdd={add}
          />
        )}
        {page === "detail" && selected && (
          <DetailPage
            key={selected.id}
            product={selected}
            backLabel={backTo === "home" ? "Back to home" : "Back to results"}
            onBack={() => setPage(backTo)}
            onOpen={open}
            onAdd={add}
            onCrumb={explore}
          />
        )}
        {page === "about" && <AboutPage onExplore={explore} />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer go={setPage} onExplore={explore} />

      {drawer && (
        <EnquiryDrawer
          items={items}
          setQty={setQty}
          remove={remove}
          onClose={() => setDrawer(false)}
          onDone={() => { setCart([]); setDrawer(false); }}
          onBrowse={() => explore("All", "All")}
        />
      )}

      {toast && (
        <div className="toast" role="status" key={toast.n}>
          <span>{toast.msg}</span>
          <button onClick={() => { setToast(null); setDrawer(true); }}>Review enquiry</button>
        </div>
      )}
    </div>
  );
}

// ---------- STYLES ----------
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap");

.rd{--ink:#15181C;--paper:#EEF0F1;--card:#FFFFFF;--steel:#586470;--line:#D2D7DC;--tile:#E3E7EA;
  --red:#D41F1F;--red-dark:#A81515;--ok:#1F7A45;--warn:#96560A;
  --display:"Barlow Condensed","Arial Narrow","Roboto Condensed",sans-serif;
  min-height:100vh;display:flex;flex-direction:column;background:var(--paper);color:var(--ink);
  font-family:"Barlow",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:1rem;line-height:1.55}
.rd *{box-sizing:border-box}
.rd button{font:inherit;color:inherit;cursor:pointer}
.rd h1,.rd h2,.rd h3{font-family:var(--display);font-weight:700;line-height:1.05;margin:0}
.rd p{margin:0}
.rd a{color:inherit}
.rd :focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.rd .dark :focus-visible,.rd .dark:focus-visible{outline-color:#fff}
.skip{position:absolute;left:-999px;top:0;background:var(--ink);color:#fff;padding:.6rem 1rem;z-index:100}
.skip:focus{left:0}
.wrap{max-width:1180px;margin:0 auto;padding:0 1.25rem;width:100%}
.main{flex:1}

/* buttons and fields */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border:2px solid transparent;border-radius:4px;
  padding:.7rem 1.25rem;font-weight:600;text-decoration:none;line-height:1.2;background:none}
.btn-red{background:var(--red);color:#fff!important}
.btn-red:hover{background:var(--red-dark)}
.btn-line{border-color:var(--ink)}
.btn-line:hover{background:var(--ink);color:#fff}
.btn-sm{padding:.5rem .9rem;font-size:.92rem}
.btn.block{display:flex;width:100%;margin-top:.6rem}
.btn:disabled{opacity:.5;cursor:not-allowed}
.link{background:none;border:0;padding:0;text-align:left;font:inherit}
.link:hover{color:var(--red);text-decoration:underline}
.link.u{text-decoration:underline;margin-left:.75rem}
.link.u.sm{margin:0;font-size:.85rem;color:var(--steel)}
.field{margin-bottom:1rem}
.field label{display:block;font-size:.88rem;font-weight:600;margin-bottom:.3rem}
.field input,.field select,.field textarea{width:100%;padding:.65rem .75rem;border:1px solid #9AA4AD;border-radius:4px;background:#fff;font:inherit;color:var(--ink)}
.field textarea{resize:vertical}
.chip{display:inline-flex;gap:.4rem;align-items:center;padding:.35rem .8rem;border:1px solid #9AA4AD;background:var(--card);border-radius:999px;font-size:.92rem}
.chip:hover{border-color:var(--ink)}
.chip[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:#fff}
.chip .n{color:var(--steel);font-size:.82rem}
.chip[aria-pressed="true"] .n{color:#C6CDD4}

/* header */
.hdr{position:sticky;top:0;z-index:40;background:var(--card);border-bottom:1px solid var(--line)}
.hdr-in{position:relative;max-width:1180px;margin:0 auto;padding:.6rem 1.25rem;display:flex;align-items:center;gap:1rem}
.logo{background:none;border:0;padding:0;display:flex;align-items:baseline;gap:.65rem;font-family:var(--display);font-size:2rem;font-weight:700;letter-spacing:.05em;line-height:1}
.logo b{color:var(--red)}
.logo.static{color:#fff;cursor:default}
.tag{font-family:"Barlow",sans-serif;font-size:.82rem;font-weight:500;color:var(--steel);letter-spacing:0}
.nav{margin-left:auto;display:flex;align-items:center;gap:.25rem}
.nav-btn{background:none;border:0;padding:.55rem .8rem;font-weight:600;border-bottom:2px solid transparent}
.nav-btn[aria-current="page"]{border-bottom-color:var(--red)}
.nav-btn:hover{color:var(--red)}
.has-mega{position:relative}
.mega{position:absolute;top:100%;left:-1rem;display:grid;grid-template-columns:210px 230px;background:var(--card);border:1px solid var(--line);
  border-radius:6px;box-shadow:0 14px 30px rgba(21,24,28,.16);overflow:hidden;z-index:50}
.mega ul{list-style:none;margin:0;padding:.4rem}
.mega button{display:flex;justify-content:space-between;align-items:center;gap:.5rem;width:100%;padding:.55rem .75rem;background:none;border:0;border-radius:4px;text-align:left}
.mega button:hover:not(:disabled),.mega-cat.on{background:var(--paper)}
.mega-cat.on{font-weight:600}
.mega button:disabled{color:#8A949E;cursor:not-allowed}
.mega .n{color:var(--steel);font-size:.85rem}
.mega-brands{padding:.4rem;border-left:1px solid var(--line)}
.mega-all{font-weight:600;color:var(--red)!important}
.mega-foot{grid-column:1/-1;border-top:1px solid var(--line)!important;border-radius:0!important;font-weight:600;padding:.7rem 1rem!important}
.hdr-actions{display:flex;gap:.5rem}
.badge{background:var(--red);color:#fff;border-radius:999px;min-width:1.35rem;height:1.35rem;padding:0 .35rem;font-size:.8rem;display:inline-grid;place-items:center}
.enq:hover .badge{background:#fff;color:var(--ink)}
.burger{display:none}

/* hero */
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:2.5rem;align-items:center;padding:2.75rem 0 3rem}
.hero h1{font-size:clamp(2.9rem,6.4vw,5rem);letter-spacing:-.005em}
.lede{max-width:36rem;color:var(--steel);font-size:1.1rem;margin:1rem 0 1.5rem}
.finder{display:grid;grid-template-columns:1fr 1fr auto;gap:.75rem;align-items:end;max-width:36rem;background:var(--card);
  border:1px solid var(--line);border-radius:6px;padding:1rem}
.finder .field{margin:0}
.bikepanel{background:var(--ink);color:#fff;border-radius:8px;padding:1.25rem}
.bikepanel svg{width:100%;height:auto;display:block}
.part{cursor:pointer;outline:none}
.part:focus-visible .dot{stroke:#fff;stroke-width:4}
.part .dot{transition:r .12s}
.draw{stroke-dasharray:1;stroke-dashoffset:1;stroke-linecap:butt;animation:draw 1.5s ease-out .1s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.readout{display:flex;justify-content:space-between;align-items:center;gap:1rem;min-height:3.6rem;margin-top:.5rem}
.readout strong{display:block;font-family:var(--display);font-size:1.7rem;line-height:1.1}
.readout span{color:#B7C0C8;font-size:.95rem}
.chips{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
.bikepanel .chip{background:transparent;border-color:#56606A;color:#E9ECEF}
.bikepanel .chip:hover,.bikepanel .chip.is-on{background:var(--red);border-color:var(--red);color:#fff}

/* sections */
.sec{padding:1.75rem 0 2rem}
.sec-h{display:flex;justify-content:space-between;align-items:end;gap:1rem;margin-bottom:1.25rem}
.sec-h h2{font-size:2.2rem}
.sec-h p{margin-top:.25rem;color:var(--steel)}
.brands{display:grid;grid-template-columns:repeat(5,1fr);background:var(--card);border:1px solid var(--line);border-radius:6px;overflow:hidden}
.brand{padding:1.1rem 1.1rem;background:none;border:0;border-right:1px solid var(--line);text-align:left}
.brand:last-child{border-right:0}
.brand strong{display:block;font-family:var(--display);font-size:1.9rem;line-height:1.05}
.brand span{color:var(--steel);font-size:.9rem}
.brand:hover{background:var(--paper)}
.promises{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--ink);margin-top:1rem;padding-top:1.5rem}
.promises>div{padding-right:2rem}
.promises h3{font-size:1.5rem;margin-bottom:.4rem}
.promises p{color:var(--steel);max-width:22rem}
.band{display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap;background:var(--ink);color:#fff;border-radius:8px;padding:2rem;margin:1.5rem 0 3rem}
.band h2{font-size:2rem}
.band p{color:#B7C0C8;margin-top:.3rem}

/* cards and grid */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.25rem}
.card{background:var(--card);border:1px solid var(--line);border-radius:6px;overflow:hidden;display:flex;flex-direction:column}
.card:hover{border-color:#9AA4AD}
.card-art{display:block;width:100%;padding:0;border:0;background:var(--tile);aspect-ratio:10/7}
.card-art svg,.detail-art svg,.line-thumb svg{width:100%;height:100%;display:block}
.card-body{padding:1rem;display:flex;flex-direction:column;gap:.3rem;flex:1}
.brandline{color:var(--steel);font-size:.9rem}
.card h3{font-size:1.35rem;line-height:1.1}
.card-foot{margin-top:auto;padding-top:.8rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem}
.price{font-family:var(--display);font-size:1.7rem;font-weight:700;line-height:1}
.price.big{font-size:2.4rem;margin:.6rem 0 .3rem}
.stock{display:inline-flex;align-items:center;gap:.4rem;font-size:.88rem;font-weight:500}
.stock::before{content:"";width:.55rem;height:.55rem;border-radius:50%;background:currentColor}
.stock.in{color:var(--ok)}
.stock.low{color:var(--warn)}
.stock.out{color:var(--steel)}
.stock.out::before{background:transparent;border:2px solid currentColor}

/* inner pages */
.page{padding:1.75rem 0 3rem}
.page.narrow{max-width:46rem}
.page-h{font-size:clamp(2.4rem,4.5vw,3.4rem)}
.crumbs{display:flex;flex-wrap:wrap;gap:.4rem;font-size:.9rem;color:var(--steel);margin-bottom:.75rem}
.crumbs button{background:none;border:0;padding:0;color:var(--steel);text-decoration:underline}
.crumbs button:hover{color:var(--red)}
.toolbar{display:flex;gap:.75rem;flex-wrap:wrap;margin:1.25rem 0 .5rem}
.toolbar .field{flex:1 1 260px;margin:0}
.toolbar .field.sort{flex:0 1 210px}
.filters{display:grid;gap:.6rem;margin:1rem 0 1.25rem}
.frow{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center}
.frow-l{font-weight:600;min-width:4.5rem}
.count{color:var(--steel);margin-bottom:1rem}
.empty{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:2.5rem;text-align:center}
.empty h3{font-size:1.7rem;margin-bottom:.4rem}
.empty p{color:var(--steel);max-width:32rem;margin:0 auto 1.25rem}
.row{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}

.back{margin-bottom:1.25rem}
.detail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2.5rem;align-items:start;background:var(--card);
  border:1px solid var(--line);border-radius:8px;padding:1.75rem}
.detail-art{background:var(--tile);border-radius:6px;aspect-ratio:10/7;position:sticky;top:5.5rem}
.detail h1{font-size:clamp(2rem,3.4vw,2.9rem);margin-top:.2rem}
.desc{color:#39424B;margin:1rem 0;max-width:34rem}
.specs{margin:1.25rem 0;border-top:1px solid var(--line)}
.specs div{display:flex;justify-content:space-between;gap:1rem;padding:.6rem 0;border-bottom:1px solid var(--line)}
.specs dt{color:var(--steel)}
.specs dd{margin:0;font-weight:600;text-align:right}
.fits{margin-bottom:1.5rem}
.fits-l{font-weight:600;margin-bottom:.4rem}
.fits ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem}
.fits li{padding:.25rem .7rem;border:1px solid var(--line);border-radius:4px;background:var(--paper);font-size:.92rem}
.buy{display:flex;gap:.75rem;align-items:stretch}
.buy .grow{flex:1}
.wa{display:flex;margin-top:.75rem}
.qty{display:inline-flex;align-items:center;border:1px solid #9AA4AD;border-radius:4px;background:#fff}
.qty button{width:2.5rem;min-height:2.6rem;background:none;border:0;font-size:1.2rem}
.qty button:hover{background:var(--paper)}
.qty output{min-width:2rem;text-align:center;font-weight:600}
.qty.sm button{width:2rem;min-height:2.1rem}

.facts{margin:2rem 0}
.facts div{display:grid;grid-template-columns:13rem 1fr;gap:1rem;padding:1rem 0;border-top:1px solid var(--line)}
.facts div:last-child{border-bottom:1px solid var(--line)}
.facts dt{font-family:var(--display);font-size:1.4rem;font-weight:700;line-height:1.15}
.facts dd{margin:0;color:#39424B}

.contact{display:grid;grid-template-columns:1.3fr 1fr;gap:1.5rem;margin-top:1.5rem}
.panel{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:1.5rem}
.side{display:grid;gap:1rem;align-content:start}
.panel h3{font-size:1.5rem;margin-bottom:.4rem}
.panel p{color:var(--steel);margin-bottom:.9rem}
.ok h3{font-size:1.7rem;margin-bottom:.4rem}
.ok p{color:var(--steel);margin-bottom:1rem}

/* drawer + toast */
.scrim{position:fixed;inset:0;background:rgba(21,24,28,.5);z-index:60}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(430px,100%);background:var(--card);z-index:61;display:flex;flex-direction:column;
  box-shadow:-12px 0 32px rgba(0,0,0,.22);animation:slide .22s ease-out}
@keyframes slide{from{transform:translateX(28px);opacity:0}}
.drawer-h{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;border-bottom:1px solid var(--line)}
.drawer-h h2{font-size:1.8rem}
.drawer-form{display:flex;flex-direction:column;flex:1;min-height:0}
.drawer-b{flex:1;overflow:auto;padding:1rem 1.25rem}
.drawer-f{padding:1rem 1.25rem;border-top:1px solid var(--line)}
.drawer-f .btn{margin:0}
.line-item{display:grid;grid-template-columns:72px 1fr auto;gap:.75rem;padding:.75rem 0;border-bottom:1px solid var(--line);align-items:center}
.line-thumb{width:72px;height:50px;background:var(--tile);border-radius:4px}
.li-name{font-weight:600;line-height:1.25}
.li-meta{color:var(--steel);font-size:.88rem}
.total{display:flex;justify-content:space-between;align-items:baseline;padding:1rem 0 .2rem}
.total strong{font-family:var(--display);font-size:1.8rem}
.note{color:var(--steel);font-size:.88rem;margin-bottom:1.25rem}
.toast{position:fixed;left:50%;bottom:1.25rem;transform:translateX(-50%);z-index:70;background:var(--ink);color:#fff;padding:.7rem 1rem;
  border-radius:6px;display:flex;gap:1rem;align-items:center;max-width:calc(100% - 2rem);box-shadow:0 10px 24px rgba(0,0,0,.25)}
.toast button{background:none;border:0;text-decoration:underline;font-weight:600;white-space:nowrap}

/* footer */
.ftr{background:var(--ink);color:#fff;padding:2.5rem 1.25rem 1rem}
.ftr-in{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:2rem;padding-bottom:1.75rem;border-bottom:1px solid #2E353C}
.ftr h3{font-size:1.2rem;margin-bottom:.6rem}
.ftr ul{list-style:none;margin:0;padding:0;display:grid;gap:.3rem}
.ftr li button{background:none;border:0;padding:0;color:#C6CDD4}
.ftr li button:hover{color:#fff;text-decoration:underline}
.muted{color:#A7B0B9;font-size:.92rem}
.ftr-b{max-width:1180px;margin:1rem auto 0;text-align:center;font-size:.85rem;color:#8B95A0}

/* responsive */
@media (max-width:900px){
  .burger{display:inline-flex}
  .tag{display:none}
  .hdr-actions{margin-left:auto}
  .nav{display:none;position:absolute;left:0;right:0;top:100%;margin:0;background:var(--card);border-bottom:1px solid var(--line);
    flex-direction:column;align-items:stretch;padding:.5rem 1.25rem 1rem;box-shadow:0 12px 20px rgba(0,0,0,.08)}
  .nav.open{display:flex}
  .nav-btn{text-align:left;width:100%}
  .has-mega{position:static}
  .mega{position:static;box-shadow:none;border:1px solid var(--line);grid-template-columns:1fr 1fr}
  .hero{grid-template-columns:1fr;gap:2rem;padding-top:1.75rem}
  .brands{grid-template-columns:repeat(2,1fr)}
  .brand{border-bottom:1px solid var(--line)}
  .promises{grid-template-columns:1fr;gap:1.5rem}
  .detail{grid-template-columns:1fr;padding:1.25rem}
  .detail-art{position:static}
  .contact{grid-template-columns:1fr}
  .ftr-in{grid-template-columns:1fr 1fr}
  .facts div{grid-template-columns:1fr;gap:.25rem}
}
@media (max-width:520px){
  .finder{grid-template-columns:1fr}
  .mega{grid-template-columns:1fr}
  .mega-brands{border-left:0;border-top:1px solid var(--line)}
  .buy{flex-wrap:wrap}
  .sec-h{align-items:start;flex-direction:column}
  .readout{flex-direction:column;align-items:start}
}
@media (prefers-reduced-motion:reduce){
  .rd *{animation:none!important;transition:none!important}
  .draw{stroke-dashoffset:0}
}
`;
