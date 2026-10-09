import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchDepartmentProducts } from './catalog.js';
import { catalogSource, departments } from './data.js';

const CHAOS_POPUPS = [
  'THE SKELETON IS WATCHING YOU SCROLL.',
  'ERROR: Your bones have been re-arranged.',
  'UNSOLICITED OPINION: Nice clicking.',
  'WARNING: This page is legally a haunted house.',
  'YOUR CART IS FULL OF REGRET.',
  'A bone has gone missing. Please check your pockets.',
  'THE CHECKOUT BUTTON HAS RESIGNED.',
  'ALERT: The skeleton has filed a noise complaint.',
  'SYSTEM: We have lost track of your skeleton.',
  'NOTICE: The ribs have unionized.',
  'ERROR 404: Chill not found.',
  'YOUR CURSOR IS MOVING SUSPICIOUSLY.',
  'THE PELVIS HAS LEFT THE BUILDING.',
  'CRITICAL: Too many bones clicked. Limit is 0.',
  'UNSAVED BONES DETECTED.',
  'A ghost passed through your product grid.',
  'THE FEMUR WOULD LIKE A WORD.',
  'SECURITY ALERT: Something rattled.',
  'THIS POPUP IS ALSO A PRODUCT.',
  'CONGRATULATIONS! You are our 1,666th skeleton.',
  'ERROR: Gravity has been disabled for 3 seconds.',
  'The website is experiencing existential dread.',
  'YOUR DISCOUNT CODE IS: BONEZONE666',
  'STOP. The website needs a moment.',
  'AN INTERN DROPPED THE DATABASE.',
  'SKELETON LOADING... skeleton still loading...',
  'THIS IS FINE. (Nothing is fine.)',
  'THE CART IS HAUNTED. PLEASE CONTINUE.',
  'ALERT: Your address was sent to the underworld.',
  'TOO MUCH BONE. NOT ENOUGH TIME.',
  'The pixels are getting tired.',
  'ERROR: Left sock cannot be found. Right sock: also gone.',
  'CHAOS LEVEL: MAXIMUM (estimated)',
  'Please reload the skeleton. It has fallen over.',
  'MULTIPLE SKELETONS DETECTED ON YOUR DEVICE.',
  'YOUR BROWSER HISTORY HAS BEEN SEEN BY BONES.',
  'THE FONT HAS ESCAPED.',
  'ATTENTION: The footer wants to be the header.',
  'THIS MESSAGE WILL SELF-DESTRUCT. (It will not.)',
  'BONE STOCK CRITICALLY LOW. BUY NOW OR NEVER.',
];

const GLITCH_MESSAGES = [
  'B̷O̸N̵E̴ ̶A̷P̸P̵É̸T̴I̶T̷',
  'ER̵̡̈RO̸̠͒R̷̺͝',
  'ŞK̶͔̀Ȩ̸̛L̴̝͗E̷̦͝T̵̰̃O̷N̴',
  'C̵H̷A̶O̴S̸',
  '!̸!̷!̶!̵!̴',
];

function SkeletonMap({ onSelect, selected, broken }) {
  const activate = (event, id) => {
    if (!broken && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onSelect(id);
    }
  };

  const hotspot = (id, label, children) => (
    <g
      key={id}
      className={`bone-hit${selected === id ? ' is-selected' : ''}`}
      role="button"
      tabIndex={broken ? -1 : 0}
      aria-label={`Shop ${label}`}
      aria-pressed={selected === id}
      aria-disabled={broken}
      onClick={() => { if (!broken) onSelect(id); }}
      onKeyDown={(event) => activate(event, id)}
    >
      <title>{label}?</title>
      {children}
    </g>
  );

  return (
    <svg className={`skeleton-art${broken ? ' is-broken' : ''}`} viewBox="0 0 420 700" role="group" aria-label="Clickable front-facing skeleton. Select a body part to shop.">
      <defs>
        <linearGradient id="bone-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff2c8" />
          <stop offset=".45" stopColor="#d8c69c" />
          <stop offset="1" stopColor="#8f805f" />
        </linearGradient>
        <linearGradient id="bone-stroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f7e8bd" />
          <stop offset="1" stopColor="#9b8b66" />
        </linearGradient>
        <filter id="bone-shadow" x="-.3" y="-.3" width="1.6" height="1.6">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#080906" floodOpacity=".85" />
        </filter>
      </defs>

      <ellipse cx="210" cy="672" rx="112" ry="13" fill="#080a08" opacity=".65" />
      <g className="skeleton-drawing" fill="none" stroke="url(#bone-stroke)" strokeLinecap="round" strokeLinejoin="round" filter="url(#bone-shadow)">
        {/* Arms and hands */}
        <g strokeWidth="13">
          <path d="M166 154 139 168 112 218 84 265" />
          <path d="M254 154 281 168 308 218 336 265" />
          <path d="M113 218 93 254M308 218 328 254" strokeWidth="9" />
          <path d="M84 265 64 288M84 265 74 300M84 265 86 304M84 265 98 299M84 265 108 289" strokeWidth="4" />
          <path d="M336 265 312 288M336 265 326 300M336 265 338 304M336 265 350 299M336 265 360 289" strokeWidth="4" />
        </g>
        <g fill="url(#bone-fill)" strokeWidth="2">
          <circle cx="139" cy="168" r="12" /><circle cx="281" cy="168" r="12" />
          <circle cx="112" cy="218" r="8" /><circle cx="308" cy="218" r="8" />
          <circle cx="84" cy="265" r="7" /><circle cx="336" cy="265" r="7" />
          <circle cx="64" cy="288" r="3" /><circle cx="74" cy="300" r="3" /><circle cx="86" cy="304" r="3" /><circle cx="98" cy="299" r="3" /><circle cx="108" cy="289" r="3" />
          <circle cx="312" cy="288" r="3" /><circle cx="326" cy="300" r="3" /><circle cx="338" cy="304" r="3" /><circle cx="350" cy="299" r="3" /><circle cx="360" cy="289" r="3" />
        </g>
        {/* Rib cage, clavicles and spine */}
        <g strokeWidth="7">
          <path d="M174 147 Q210 132 246 147" />
          <path d="M210 145 210 299" strokeWidth="9" />
          <path d="M181 162 Q210 171 239 162M177 176 Q210 187 243 176M174 191 Q210 203 246 191M173 207 Q210 220 247 207M176 223 Q210 237 244 223M181 239 Q210 253 239 239M187 255 Q210 269 233 255" strokeWidth="5" />
          <path d="M174 153 Q155 180 176 255M246 153 Q265 180 244 255" strokeWidth="6" />
          <path d="M174 148 155 143M174 148 193 153M246 148 265 143M246 148 227 153" strokeWidth="6" />
        </g>
        <g fill="url(#bone-fill)" strokeWidth="2">
          {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="210" cy={148 + i * 17} rx="8" ry="4" />)}
        </g>
        {/* Pelvis */}
        <path d="M210 298 Q182 297 165 316 Q156 328 174 343 L195 355 Q202 361 210 350 Q218 361 225 355 L246 343 Q264 328 255 316 Q238 297 210 298Z" fill="url(#bone-fill)" strokeWidth="6" />
        <path d="M182 320 Q197 309 210 323 Q223 309 238 320M193 340 Q210 330 227 340" strokeWidth="4" />
        {/* Legs and feet */}
        <g strokeWidth="15">
          <path d="M184 347 177 413 184 470 184 493 176 552 177 615" />
          <path d="M236 347 243 413 236 470 236 493 244 552 243 615" />
        </g>
        <g fill="url(#bone-fill)" strokeWidth="2">
          <ellipse cx="177" cy="414" rx="11" ry="13" /><ellipse cx="243" cy="414" rx="11" ry="13" />
          <ellipse cx="184" cy="482" rx="14" ry="13" /><ellipse cx="236" cy="482" rx="14" ry="13" />
          <circle cx="177" cy="615" r="8" /><circle cx="243" cy="615" r="8" />
        </g>
        <path d="M177 615 Q159 623 143 638 L126 646M177 615 157 642M177 615 170 650M243 615 Q261 623 277 638 L294 646M243 615 263 642M243 615 250 650" strokeWidth="6" />
        {/* Neck, skull and face */}
        <g strokeWidth="5">
          <path d="M196 117 196 146M224 117 224 146" />
          <path d="M194 123 226 123M194 131 226 131M194 139 226 139" strokeWidth="3" />
        </g>
        <path d="M210 28 Q238 28 244 52 L240 91 Q237 111 210 120 Q183 111 180 91 L176 53 Q182 28 210 28Z" fill="url(#bone-fill)" strokeWidth="5" />
        <path d="M182 76 Q210 83 238 76M189 96 Q210 104 231 96M194 108 226 108" strokeWidth="3" />
        <g className="jaw-rattle" strokeWidth="2">
          <path d="M191 105 194 116M200 108 201 119M210 109 210 121M220 108 219 119M229 105 226 116" />
        </g>
        <ellipse cx="198" cy="69" rx="7" ry="10" fill="#171913" stroke="none" />
        <ellipse cx="222" cy="69" rx="7" ry="10" fill="#171913" stroke="none" />
        <path d="M210 73 205 87 214 87" strokeWidth="3" />
        <path d="M179 69 Q169 72 178 86M241 69 Q251 72 242 86" strokeWidth="5" />
      </g>

      {/* Invisible hit areas keep each department easy to target without obscuring the illustration. */}
      {hotspot('skull', 'Head & Skull', <ellipse className="hit-area" cx="210" cy="43" rx="39" ry="24" />)}
      {hotspot('eyes', 'Eyes', <ellipse className="hit-area" cx="210" cy="69" rx="30" ry="12" />)}
      {hotspot('ears', 'Ears', <ellipse className="hit-area" cx="177" cy="77" rx="9" ry="17" />)}
      {hotspot('nose', 'Nose', <ellipse className="hit-area" cx="210" cy="87" rx="10" ry="12" />)}
      {hotspot('jaw', 'Lips & Jaw', <ellipse className="hit-area" cx="210" cy="105" rx="21" ry="12" />)}
      {hotspot('neck', 'Neck', <rect className="hit-area" x="190" y="119" width="40" height="27" rx="10" />)}
      {hotspot('torso', 'Upper Body', <rect className="hit-area" x="169" y="146" width="82" height="145" rx="30" />)}
      {hotspot('arms', 'Arms', <path className="hit-area" d="M155 150 178 161 117 231 90 269 75 261 102 211 132 163Z M265 150 242 161 303 231 330 269 345 261 318 211 288 163Z" />)}
      {hotspot('wrists', 'Wrists', <g><circle className="hit-area" cx="84" cy="265" r="13" /><circle className="hit-area" cx="336" cy="265" r="13" /></g>)}
      {hotspot('hands', 'Hands', <g><ellipse className="hit-area" cx="83" cy="291" rx="28" ry="20" /><ellipse className="hit-area" cx="337" cy="291" rx="28" ry="20" /></g>)}
      {hotspot('lowerBody', 'Lower Body', <path className="hit-area" d="M164 298 Q210 283 256 298 L260 347 Q210 367 160 347Z" />)}
      {hotspot('legs', 'Legs', <path className="hit-area" d="M165 351 194 351 198 490 193 619 163 619 165 490Z M226 351 255 351 257 490 257 619 227 619 222 490Z" />)}
      {hotspot('feet', 'Feet', <g><ellipse className="hit-area" cx="157" cy="640" rx="35" ry="18" /><ellipse className="hit-area" cx="263" cy="640" rx="35" ry="18" /></g>)}
    </svg>
  );
}

function ProductCard({ product, featured }) {
  const [imageFailed, setImageFailed] = useState(false);
  const price = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(product.price);
  const compareAtPrice = product.compareAtPrice && product.compareAtPrice > product.price
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(product.compareAtPrice)
    : null;
  const shownVariants = product.availableVariants.slice(0, 5);
  const remainingVariants = product.availableVariants.length - shownVariants.length;

  return (
    <article className={`product-card${featured ? ' is-featured' : ''}`} id={`product-${product.id}`}>
      {featured && <span className="featured-ribbon">THE BONES HAVE CHOSEN</span>}
      <a className="product-image product-image-link" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${product.title} at ${product.vendor}`}>
        {imageFailed ? (
          <span className="image-unavailable">Product image unavailable</span>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {compareAtPrice && <span className="product-sale">ON SALE</span>}
        <span className="product-category">{product.category}</span>
      </a>
      <div className="product-info">
        <div className="product-vendor">{product.vendor} <span>· SOME OPTIONS IN STOCK</span></div>
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        {product.availableVariants.length > 0 && (
          <p className="product-sizes">
            Available: {shownVariants.join(', ')}{remainingVariants > 0 ? ` +${remainingVariants} more` : ''}
          </p>
        )}
        <div className="product-price-row">
          <strong>{price}</strong>
          {compareAtPrice && <del>{compareAtPrice}</del>}
          <span>Price may change</span>
        </div>
        <a className="buy-button" href={product.url} target="_blank" rel="noopener noreferrer">
          VIEW PRODUCT AT {product.vendor.toUpperCase()} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

// ─── MATRIX RAIN ──────────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:<>?骨肉血脈魂断';
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    const cols = Math.floor(w / 14);
    const drops = Array(cols).fill(1);
    let raf;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,3,0,0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = '12px Share Tech Mono, monospace';
      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.95;
        ctx.fillStyle = bright ? '#ffffff' : `rgba(0,${Math.floor(160 + Math.random()*95)},${Math.floor(Math.random()*40)},${0.5 + Math.random()*0.5})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14);
        if (drops[i] * 14 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}

// ─── SYS METRICS BAR ──────────────────────────────────────────────────────
function SysMetricsBar({ chaosLevel }) {
  const [metrics, setMetrics] = useState({ cpu: 12, mem: 38, net: 5, threats: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.min(99, Math.max(3, 12 + chaosLevel * 8 + (Math.random() - 0.3) * 20)),
        mem: Math.min(99, Math.max(20, 38 + chaosLevel * 5 + (Math.random() - 0.4) * 15)),
        net: Math.min(99, Math.max(1, 5 + chaosLevel * 6 + (Math.random() - 0.3) * 18)),
        threats: Math.floor(chaosLevel * 1.8 + Math.random() * 3),
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [chaosLevel]);
  const bar = (pct, color = 'var(--green)') => (
    <div className="metric-bar">
      <div className="metric-fill" style={{ width: `${pct}%`, background: pct > 80 ? 'var(--red)' : pct > 55 ? 'var(--amber)' : color }} />
    </div>
  );
  return (
    <div className="sys-metrics" aria-hidden="true">
      <div className="sys-metric"><span className="metric-label">CPU</span>{bar(metrics.cpu)}<span className="metric-value">{metrics.cpu.toFixed(0)}%</span></div>
      <div className="sys-metric"><span className="metric-label">MEM</span>{bar(metrics.mem)}<span className="metric-value">{metrics.mem.toFixed(0)}%</span></div>
      <div className="sys-metric"><span className="metric-label">NET</span>{bar(metrics.net)}<span className="metric-value">{metrics.net.toFixed(0)}%</span></div>
      <div className="sys-metric"><span className="metric-label" style={{ color: metrics.threats > 3 ? 'var(--red)' : 'var(--text-dim)' }}>THREATS</span><span className="metric-value" style={{ color: metrics.threats > 3 ? 'var(--red)' : 'var(--amber)', textShadow: metrics.threats > 3 ? 'var(--glow-red)' : 'var(--glow-amber)' }}>{metrics.threats}</span></div>
      <div className="sys-metric" style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>SYS:BONE_OS_v6.6.6</div>
      <div className="sys-metric"><span className="metric-label">UPTIME</span><span className="metric-value">∞</span></div>
    </div>
  );
}

// ─── TERMINAL LOG PANEL ────────────────────────────────────────────────────
const LOG_INIT = [
  { time: '00:00:01', tag: 'ok',   msg: 'BONE_OS kernel loaded. Marrow integrity: nominal.' },
  { time: '00:00:02', tag: 'info', msg: 'Skeleton daemon started. PID: 1337.' },
  { time: '00:00:03', tag: 'ok',   msg: 'Product catalog interface mounted.' },
  { time: '00:00:04', tag: 'warn', msg: 'Anomalous activity detected in femur sector.' },
  { time: '00:00:05', tag: 'info', msg: 'Connecting to BONEZONE_MARKETPLACE_v2...' },
  { time: '00:00:06', tag: 'ok',   msg: 'Session authenticated. Welcome, skeleton.' },
];

const LOG_POOL = [
  { tag: 'warn', msg: 'Unauthorized rib access attempt blocked.' },
  { tag: 'err',  msg: 'CRITICAL: Vertebrae stack overflow detected.' },
  { tag: 'info', msg: 'Scanning for anomalous bone activity...' },
  { tag: 'ok',   msg: 'Firewall updated. 0 new holes found (1 old hole kept).' },
  { tag: 'warn', msg: 'Unknown process "shopping_gremlin" consuming 666% CPU.' },
  { tag: 'err',  msg: 'Memory dump: 0xDEADB0NE 0xCAFEFEMUR 0x00PELVIS.' },
  { tag: 'info', msg: 'Pinging underworld gateway... timeout. Expected.' },
  { tag: 'ok',   msg: 'Skeleton integrity verified. Some bones optional.' },
  { tag: 'warn', msg: 'Root access requested by: the_pelvis@localhost.' },
  { tag: 'err',  msg: 'BREACH DETECTED: Someone clicked a bone.' },
  { tag: 'info', msg: 'Initiating countermeasures... countermeasures fled.' },
  { tag: 'warn', msg: 'Suspicious traffic from 666.0.0.1 (the underworld).' },
  { tag: 'ok',   msg: 'Catalog sync complete. 0 real results. All results real.' },
  { tag: 'err',  msg: 'NULL POINTER EXCEPTION in cart.jar:line 0.' },
  { tag: 'info', msg: 'Encrypting user data with ROT13 twice. Very secure.' },
  { tag: 'warn', msg: 'Jawbone daemon rattling excessively. Noise complaint filed.' },
  { tag: 'err',  msg: 'DNS resolution failed: bonezone.hell.local' },
  { tag: 'ok',   msg: 'Self-destruct sequence aborted (probably).' },
  { tag: 'warn', msg: 'System clock drifted 400 years into the past.' },
  { tag: 'info', msg: 'Running diagnostics... diagnostics refused to run.' },
];

function TerminalPanel({ logs }) {
  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return (
    <div className="terminal-panel">
      <div className="terminal-panel-header">
        <span className="tp-dot r" /><span className="tp-dot y" /><span className="tp-dot g" />
        <span>BONE_OS // SYSTEM TERMINAL</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>{ts}</span>
      </div>
      <div className="terminal-log" ref={logRef}>
        {logs.map((entry, i) => (
          <div className="log-line" key={i}>
            <span className="log-time">[{entry.time}]</span>
            <span className={`log-tag ${entry.tag}`}>{entry.tag.toUpperCase()}</span>
            <span className="log-msg">{entry.msg}</span>
          </div>
        ))}
        <div className="log-line">
          <span className="log-time">[{ts}]</span>
          <span className="log-tag info">SYS</span>
          <span className="log-msg">awaiting input<span className="log-cursor" /></span>
        </div>
      </div>
    </div>
  );
}

// Chaos floating popup component — lives outside the normal popup stack
function FloatingChaosPopup({ popup, onDismiss }) {
  const style = {
    position: 'fixed',
    left: `${popup.x}%`,
    top: `${popup.y}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 30 + popup.zOffset,
    maxWidth: '260px',
    minWidth: '160px',
    animation: 'float-popup-arrive .3s ease-out both',
  };
  return (
    <div className="chaos-popup floating-chaos-popup" role="alert" style={style}>
      <span className="popup-mark" aria-hidden="true">!</span>
      <p>{popup.message}</p>
      <button aria-label="Dismiss" onClick={onDismiss}>×</button>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [catalogRetry, setCatalogRetry] = useState(0);
  const [catalogState, setCatalogState] = useState({
    status: 'idle',
    products: [],
    errors: [],
    checkedAt: null,
    message: '',
  });
  const [curseAccepted, setCurseAccepted] = useState(false);
  const [skeletonBroken, setSkeletonBroken] = useState(false);
  const [pageDisordered, setPageDisordered] = useState(false);
  const [chaosAttempts, setChaosAttempts] = useState(0);
  const [crashScreen, setCrashScreen] = useState(null);
  const [pnr, setPnr] = useState('');
  const [popups, setPopups] = useState([]);
  const [featureNextProduct, setFeatureNextProduct] = useState(false);
  const [featuredProductId, setFeaturedProductId] = useState(null);
  const [floatingPopups, setFloatingPopups] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [invertActive, setInvertActive] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({});
  const [cursorChaos, setCursorChaos] = useState(false);
  const [headerGlitch, setHeaderGlitch] = useState(false);
  const [tickerReversed, setTickerReversed] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(LOG_INIT);
  const floatingPopupCounter = useRef(0);
  const chaosInterval = useRef(null);
  const glitchInterval = useRef(null);
  const logCounter = useRef(LOG_INIT.length);
  const skeletonTimer = React.useRef(null);
  const disorderTimer = React.useRef(null);
  const popupTimers = React.useRef(new Map());
  const skipSelectionScroll = React.useRef(false);
  const activeDepartment = selected ? departments[selected] : null;

  // Spawn a floating popup at a random screen position
  const spawnFloatingPopup = useCallback(() => {
    const id = `float-${Date.now()}-${floatingPopupCounter.current++}`;
    const msg = CHAOS_POPUPS[Math.floor(Math.random() * CHAOS_POPUPS.length)];
    // Keep away from edges
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 75;
    const zOffset = Math.floor(Math.random() * 10);
    const newPopup = { id, message: msg, x, y, zOffset };
    setFloatingPopups((cur) => [...cur, newPopup]);
    // Auto-dismiss after 4-8s
    const ttl = 4000 + Math.random() * 4000;
    const timer = window.setTimeout(() => {
      setFloatingPopups((cur) => cur.filter((p) => p.id !== id));
    }, ttl);
    popupTimers.current.set(id, timer);
  }, []);

  const dismissFloatingPopup = useCallback((id) => {
    window.clearTimeout(popupTimers.current.get(id));
    popupTimers.current.delete(id);
    setFloatingPopups((cur) => cur.filter((p) => p.id !== id));
  }, []);

  // Trigger a random chaos effect
  const triggerRandomChaosEffect = useCallback(() => {
    const roll = Math.random();
    if (roll < 0.3) {
      // Screen shake
      setShakeActive(true);
      window.setTimeout(() => setShakeActive(false), 600);
    } else if (roll < 0.45) {
      // Color invert flash
      setInvertActive(true);
      window.setTimeout(() => setInvertActive(false), 200 + Math.random() * 300);
    } else if (roll < 0.6) {
      // Glitch overlay
      setGlitchActive(true);
      window.setTimeout(() => setGlitchActive(false), 400 + Math.random() * 600);
    } else if (roll < 0.72) {
      // Page tilt
      const deg = (Math.random() - 0.5) * 6;
      setTiltStyle({ transform: `rotate(${deg}deg)`, transition: 'transform 0.2s' });
      window.setTimeout(() => setTiltStyle({ transform: 'rotate(0deg)', transition: 'transform 0.5s' }), 800);
    } else if (roll < 0.82) {
      // Header glitch
      setHeaderGlitch(true);
      window.setTimeout(() => setHeaderGlitch(false), 500);
    } else if (roll < 0.90) {
      // Ticker reversal
      setTickerReversed((v) => !v);
      window.setTimeout(() => setTickerReversed(false), 3000);
    } else {
      // Cursor chaos
      setCursorChaos(true);
      window.setTimeout(() => setCursorChaos(false), 2000);
    }
  }, []);

  // Autonomous chaos engine — escalates over time
  useEffect(() => {
    // Start spawning floating popups after a short delay
    const kickoffTimer = window.setTimeout(() => {
      spawnFloatingPopup();
    }, 2500);

    let popupInterval;
    let effectInterval;
    let logInterval;
    const startEngine = () => {
      const interval = Math.max(1800, 5000 - chaosLevel * 400);
      popupInterval = window.setInterval(() => {
        spawnFloatingPopup();
        setChaosLevel((l) => Math.min(l + 1, 10));
      }, interval);

      effectInterval = window.setInterval(() => {
        if (Math.random() < 0.65) triggerRandomChaosEffect();
      }, 2200);

      // Stream terminal log entries
      logInterval = window.setInterval(() => {
        const entry = LOG_POOL[logCounter.current % LOG_POOL.length];
        logCounter.current++;
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        setTerminalLogs((prev) => [...prev.slice(-40), { ...entry, time: ts }]);
      }, 1800 + Math.random() * 1200);
    };

    const engineStart = window.setTimeout(startEngine, 3000);
    chaosInterval.current = { popupInterval, effectInterval, logInterval };

    return () => {
      window.clearTimeout(kickoffTimer);
      window.clearTimeout(engineStart);
      if (chaosInterval.current) {
        window.clearInterval(chaosInterval.current.popupInterval);
        window.clearInterval(chaosInterval.current.effectInterval);
        window.clearInterval(chaosInterval.current.logInterval);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPopups = (messages) => {
    const newPopups = messages.map((message) => ({
      id: `${Date.now()}-${Math.random()}`,
      message,
    }));
    setPopups((current) => [...current.slice(-2), ...newPopups].slice(-3));
    newPopups.forEach(({ id }) => {
      const timer = window.setTimeout(() => {
        setPopups((current) => current.filter((popup) => popup.id !== id));
        popupTimers.current.delete(id);
      }, 5200);
      popupTimers.current.set(id, timer);
    });
  };

  const chooseDepartment = (id) => {
    window.clearTimeout(skeletonTimer.current);
    setSkeletonBroken(false);
    skipSelectionScroll.current = false;
    setFeatureNextProduct(false);
    setFeaturedProductId(null);
    setSelected(id);
  };

  const chooseSkeletonDepartment = (id) => {
    skipSelectionScroll.current = true;
    setFeatureNextProduct(false);
    setFeaturedProductId(null);
    setSelected(id);
    setSkeletonBroken(true);
    window.clearTimeout(skeletonTimer.current);
    addPopups([
      `${departments[id].name} selected. The skeleton regrets this.`,
      'Bone integrity has dropped below the recommended shopping level.',
      'Please remain calm. The bones are not remaining calm.',
    ]);
    skeletonTimer.current = window.setTimeout(() => {
      setSkeletonBroken(false);
      skipSelectionScroll.current = false;
      document.getElementById('shop')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 1500);
  };

  const openChaosPortal = () => {
    const attempt = Math.min(chaosAttempts + 1, 3);
    setChaosAttempts(attempt);
    setCrashScreen(attempt);
    setPageDisordered(true);
    window.clearTimeout(disorderTimer.current);
    disorderTimer.current = window.setTimeout(() => setPageDisordered(false), 10000);
    addPopups([
      'A shopping gremlin has opened a new window in your mind.',
      `Portal stability: ${Math.max(0, 100 - attempt * 37)}%. This is not a real measurement.`,
      attempt === 3 ? 'The website would like your PNR. Obviously.' : 'An intern has been notified. The intern is a skeleton.',
    ]);
  };

  const submitPnr = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setPnr('');
    setCrashScreen(null);
    setFeaturedProductId(null);
    setFeatureNextProduct(true);
    setSelected('torso');
    setCatalogRetry((attempt) => attempt + 1);
    addPopups([
      'PNR accepted by absolutely nobody.',
      'Your highly confidential number was immediately forgotten.',
      'A real shirt is being promoted as compensation.',
    ]);
  };

  const returnToBones = () => {
    window.clearTimeout(skeletonTimer.current);
    setSkeletonBroken(false);
    skipSelectionScroll.current = false;
    setFeatureNextProduct(false);
    setFeaturedProductId(null);
    setSelected(null);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  useEffect(() => {
    if (!selected) return undefined;
    const frame = window.requestAnimationFrame(() => {
      if (skipSelectionScroll.current) return;
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      document.getElementById('shop')?.scrollIntoView({ behavior, block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected]);

  useEffect(() => {
    if (featureNextProduct && catalogState.status === 'error') {
      setFeatureNextProduct(false);
      addPopups(['The product spotlight missed its cue. The retailer has been informed (no, it has not).']);
      return undefined;
    }
    if (!featureNextProduct || catalogState.status !== 'loaded' || !catalogState.products.length) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const firstProduct = catalogState.products[0];
      setFeaturedProductId(firstProduct.id);
      setFeatureNextProduct(false);
      document.getElementById(`product-${firstProduct.id}`)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [catalogState, featureNextProduct]);

  useEffect(() => {
    if (!selected) {
      setCatalogState({ status: 'idle', products: [], errors: [], checkedAt: null, message: '' });
      return undefined;
    }

    const controller = new AbortController();
    setCatalogState({ status: 'loading', products: [], errors: [], checkedAt: null, message: '' });
    fetchDepartmentProducts(departments[selected].collections, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setCatalogState({ status: 'loaded', ...result, message: '' });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setCatalogState({
          status: 'error',
          products: [],
          errors: [],
          checkedAt: null,
          message: error.message,
        });
      });

    return () => controller.abort();
  }, [selected, catalogRetry]);

  useEffect(() => () => {
    window.clearTimeout(skeletonTimer.current);
    window.clearTimeout(disorderTimer.current);
    popupTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const departmentList = Object.entries(departments);

  // Malfunctioning department chooser — sometimes picks wrong one
  const malfunctionChooser = (id) => {
    if (Math.random() < 0.18) {
      // Pick a random wrong department
      const keys = Object.keys(departments);
      const wrongId = keys[Math.floor(Math.random() * keys.length)];
      addPopups([`NAVIGATION ERROR: You asked for ${departments[id].name} but got ${departments[wrongId].name}. (Intended.)`]);
      chooseDepartment(wrongId);
    } else {
      chooseDepartment(id);
    }
  };

  const appClasses = [
    'app-shell',
    pageDisordered ? 'is-disordered' : '',
    glitchActive ? 'is-glitching' : '',
    shakeActive ? 'is-shaking' : '',
    invertActive ? 'is-inverted' : '',
    cursorChaos ? 'cursor-chaos' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={appClasses} style={tiltStyle}>
      <header className={`topbar${headerGlitch ? ' header-glitching' : ''}`}>
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); returnToBones(); }}>
          <span className="brand-mark" aria-hidden="true">{headerGlitch ? GLITCH_MESSAGES[Math.floor(Math.random() * GLITCH_MESSAGES.length)] : 'BA'}</span>
          <span>{headerGlitch ? 'B̷O̸N̵E̴ ̶A̷P̸P̵É̸T̴I̶T̷ M̷A̴R̵T̸' : <>BONE APP<small style={{fontSize:'8px',letterSpacing:'.2em',color:'var(--cyan)'}}>ÉTIT SYS</small></>}</span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> {glitchActive ? 'EVERYTHING IS FINE' : '// INTRUSION PANEL v6.6.6'}</div>
        <button className="market-status chaos-trigger" onClick={() => { openChaosPortal(); spawnFloatingPopup(); spawnFloatingPopup(); triggerRandomChaosEffect(); }}>
          <span className="status-dot" />
          <span>UNSTABLE SHOPPING PORTAL<small>PRESS UNTIL IT WORKS · {chaosAttempts}/3</small></span>
        </button>
      </header>
      <SysMetricsBar chaosLevel={chaosLevel} />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-kicker"><span>EST. 1666</span><span className="kicker-line" /><span>DEAD-STOCK ONLY</span></div>
            <h1>Shop by<br /><em>body part.</em></h1>
            <p className="hero-description">A department store for the dearly departed. Poke a bone to browse real products in a live Indian clothing catalog. The skeleton has excellent taste and absolutely no budget.</p>
            <div className="marketplace-proof"><span className="proof-icon" aria-hidden="true">↗</span><span>REAL PRODUCTS. REAL PRICES.<br /><b>FROM THE RETAILER, NOT US.</b></span></div>
            <div className="hero-foot"><span className="pulse-dot" /> LIVE CATALOG. PRICES CAN CHANGE.</div>
          </div>

          <div className="skeleton-stage">
            <MatrixRain />
            <div className="stage-label"><span>SPECIMEN № 013</span><span>FRONT / ???</span></div>
            <div className="stage-halo" />
            <SkeletonMap onSelect={chooseSkeletonDepartment} selected={selected} broken={skeletonBroken} />
            <span className="stage-caption">// TARGET ACQUIRED — CLICK TO BREACH //</span>
            <span className="stage-coordinate">X: 13° · Y: 0°</span>
          </div>

          <TerminalPanel logs={terminalLogs} />
        </section>

        <section className={`shop-section${activeDepartment ? ' has-selection' : ''}`} id="shop" aria-live="polite">
          {activeDepartment ? (
            <>
              <div className="shop-heading">
                <div><span className="eyebrow">{activeDepartment.eyebrow}</span><h2>{activeDepartment.name}<span className="title-period">.</span></h2><p>{activeDepartment.note}</p></div>
                <button className="back-button" onClick={returnToBones}>← BACK TO THE BODY</button>
              </div>
              <div className="live-search-note">
                <span className="live-indicator"><span className="status-dot" /> LIVE CATALOG · {catalogSource.name}</span>
                <p>Real products, photos, descriptions and prices loaded from the retailer’s catalog. We do not invent stock or pretend to check you out. Good luck, skeleton.</p>
              </div>
              <div className="catalog-meta">
                <span>{activeDepartment.collections.map((collection) => collection.label).join(' / ')}</span>
                {catalogState.checkedAt && <time dateTime={catalogState.checkedAt.toISOString()}>Catalog checked {catalogState.checkedAt.toLocaleTimeString()}</time>}
              </div>
              {catalogState.errors.length > 0 && (
                <p className="catalog-warning" role="status">Some catalog aisles could not be reached: {catalogState.errors.join(' ')}</p>
              )}
              {catalogState.status === 'loading' && (
                <div className="catalog-state" role="status"><span className="loading-indicator" /> Fetching real products from {catalogSource.name}…</div>
              )}
              {catalogState.status === 'error' && (
                <div className="catalog-state catalog-error" role="alert">
                  <p>We could not load the retailer’s live catalog. {catalogState.message}</p>
                  <button className="retry-button" onClick={() => setCatalogRetry((attempt) => attempt + 1)}>RETRY CATALOG ↻</button>
                </div>
              )}
              {catalogState.status === 'loaded' && catalogState.products.length > 0 && (
                <div className="product-grid">
                  {catalogState.products.map((product) => (
                    <ProductCard product={product} featured={featuredProductId === product.id} key={product.id} />
                  ))}
                </div>
              )}
              {catalogState.status === 'loaded' && catalogState.products.length === 0 && (
                <div className="catalog-state">No in-stock products with images are available in this retailer’s selected collections right now.</div>
              )}
              <p className="marketplace-disclaimer">Products, images, descriptions, availability and prices belong to {catalogSource.name}. Availability and prices can change; confirm them on the retailer’s product page before purchasing. Bone Appétit does not process orders.</p>
            </>
          ) : (
            <div className="shop-empty">
              <span className="empty-index">01 — 13</span>
              <p>Every bone leads somewhere.</p>
              <span>Tap a glowing spot or choose a department to begin your descent.</span>
              <span className="down-arrow" aria-hidden="true">↓</span>
            </div>
          )}
        </section>

        <section className={`ticker${tickerReversed ? ' ticker-reversed' : ''}`} aria-label="Store notices">
          <div style={tickerReversed ? { animationDirection: 'reverse', letterSpacing: '0.22em' } : {}}>
            {tickerReversed
              ? <>SDTUORP LAER <span>—</span> SECIAVRES RETSIH <span>—</span> REGRETTABLE PURCHASE CONFIRMED <span>—</span> EGNAHCXE ELPITS TON <span>—</span> SDTUORP LAER <span>—</span></>
              : <>REAL PRODUCTS <span>—</span> RETAILER PRICES <span>—</span> UNREAL CUSTOMER SERVICE <span>—</span> FREE SHIPPING TO THE UNDERWORLD (NOT GUARANTEED) <span>—</span> REAL PRODUCTS <span>—</span></>}
          </div>
        </section>
      </main>

      {pageDisordered && (
        <div className="disorder-notice" role="status">
          <span className="disorder-indicator" />
          <span>LAYOUT CRASHED · AUTO-ALIGNING IN 10 SECONDS</span>
        </div>
      )}

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="glitch-overlay" aria-hidden="true">
          <div className="glitch-bar" style={{ top: `${Math.random()*100}%` }} />
          <div className="glitch-bar" style={{ top: `${Math.random()*100}%`, opacity: 0.5 }} />
          <div className="glitch-text">{GLITCH_MESSAGES[Math.floor(Math.random() * GLITCH_MESSAGES.length)]}</div>
        </div>
      )}

      {/* Floating autonomous popups scattered across the screen */}
      {floatingPopups.map((popup) => (
        <FloatingChaosPopup
          key={popup.id}
          popup={popup}
          onDismiss={() => dismissFloatingPopup(popup.id)}
        />
      ))}

      {/* Chaos level indicator */}
      {chaosLevel > 2 && (
        <div className="chaos-level-badge" aria-hidden="true">
          CHAOS LVL {chaosLevel}
        </div>
      )}

      <footer className="site-footer">
        <a className="brand footer-brand" href="#" onClick={(event) => { event.preventDefault(); returnToBones(); }}>BA <span>BONE APPÉTIT MART™</span></a>
        <span>WE SEND YOU TO THE SHOP. THE SHOP TAKES YOUR MONEY.</span>
        <span>© 1666–FOREVER</span>
      </footer>

      {!curseAccepted && (
        <div className="cookie-banner">
          <span className="cookie-icon" aria-hidden="true">!</span>
          <p><strong>THIS SITE USES CURSED COOKIES.</strong><span>They remember the bones you clicked. We do not offer an alternative.</span></p>
          <button className="cookie-button" onClick={() => setCurseAccepted(true)}>I ACCEPT THE CURSE <span>↗</span></button>
        </div>
      )}

      {popups.length > 0 && (
        <div className="popup-stack" aria-label="Haunted shopping notifications">
          {popups.map((popup) => (
            <div className="chaos-popup" role="status" key={popup.id}>
              <span className="popup-mark" aria-hidden="true">!</span>
              <p>{popup.message}</p>
              <button
                aria-label="Dismiss message"
                onClick={() => {
                  window.clearTimeout(popupTimers.current.get(popup.id));
                  popupTimers.current.delete(popup.id);
                  setPopups((current) => current.filter((item) => item.id !== popup.id));
                }}
              >×</button>
            </div>
          ))}
        </div>
      )}

      {crashScreen !== null && (
        <div className="chaos-scrim">
          <section className="chaos-modal" role="dialog" aria-modal="true" aria-labelledby="crash-title">
            <div className="crash-topline"><span>CRITICAL SHOPPING INCIDENT</span><span>ERROR 666</span></div>
            <button className="crash-close" aria-label="Close fake crash screen" onClick={() => setCrashScreen(null)}>×</button>
            <div className="crash-symbol" aria-hidden="true">!</div>
            <p className="eyebrow">PORTAL FAILURE {crashScreen} / 3</p>
            <h2 id="crash-title">{crashScreen === 3 ? 'Page crashed. Obviously.' : 'The website has stopped shopping.'}</h2>
            <p className="crash-copy">
              {crashScreen === 3
                ? 'We have restored absolutely nothing. Before returning to your real products, the department of unnecessary questions requires your PNR.'
                : 'A totally simulated crash. Your browser, products, and unsaved tabs are safe. Our skeleton has fallen over in the server room.'}
            </p>
            <div className="crash-progress" aria-label={`${crashScreen} of 3 crashes`}>
              {[1, 2, 3].map((attempt) => <span className={attempt <= crashScreen ? 'filled' : ''} key={attempt} />)}
            </div>
            {crashScreen < 3 ? (
              <button className="crash-button" onClick={() => setCrashScreen(null)}>RETURN TO THE WEBSITE (ALLEGEDLY) ↻</button>
            ) : (
              <form className="pnr-form" onSubmit={submitPnr}>
                <label htmlFor="pnr-number">Enter your 10-digit PNR</label>
                <input
                  id="pnr-number"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={pnr}
                  onChange={(event) => setPnr(event.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="0000000000"
                  autoFocus
                  required
                />
                <p>This is a gag, not a railway lookup. Your number is not sent or saved.</p>
                <button className="crash-button" type="submit">SUBMIT AND RETURN TO THE REAL PRODUCTS ↗</button>
              </form>
            )}
          </section>
        </div>
      )}

      <span className="screen-reader-only" aria-live="polite">{selected ? `${departments[selected].name} department selected` : ''}</span>

      {/* Autonomous chaos popups triggered by interaction — extra burst */}
      {shakeActive && (
        <div className="shake-overlay" aria-hidden="true" />
      )}
    </div>
  );
}

export default App;
