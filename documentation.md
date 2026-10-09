# Bone Appétit Mart™ — Technical Documentation

## 1. System Overview

**Bone Appétit Mart™** is a cyberpunk-themed, interactive anatomy-to-fashion storefront built with **React 18** and **Vite**. The interface reimagines e-commerce as a compromised "hacker panel" operating system (`BONE_OS_v6.6.6`).

Shoppers explore live fashion collections from [SNITCH India](https://www.snitch.co.in) by targeting specific anatomical zones on a responsive, keyboard-accessible SVG skeleton specimen. Simultaneously, an autonomous chaos engine subjects the user interface to progressive simulated system failures, terminal log streams, glitch overlays, digital matrix rain, and floating threat advisories.

---

## 2. Architecture & Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Build & Tooling** | Vite 6.x + ESBuild | Instant HMR development server & optimized production bundling |
| **UI Library** | React 18 | Declarative state management, component lifecycle, ref coordination |
| **Styling** | Vanilla CSS3 (Custom Properties) | Cyberpunk CRT aesthetic, scanline overlays, matrix canvas, micro-animations |
| **Typography** | Google Fonts (`VT323`, `Share Tech Mono`) | Phosphor CRT pixel headings & monospace terminal readouts |
| **External API** | Shopify Public Collection JSON Endpoints | Real-time catalog feed directly from SNITCH India |
| **Graphics** | Native HTML5 Canvas + Scalable Vector Graphics (SVG) | Real-time matrix digital rain simulation & interactive skeleton coordinate HUD |

---

## 3. Core Component Breakdown

### 3.1 Interactive Specimen: `SkeletonMap`
- **SVG Coordinate System**: Rendered within a `0 0 420 700` viewBox with realistic bone path contours and radial drop-shadow filters.
- **13 Interactive Anatomical Hotspots**:
  1. `skull` (Head & Skull)
  2. `eyes` (Eyes)
  3. `ears` (Ears)
  4. `nose` (Nose)
  5. `jaw` (Lips & Jaw)
  6. `neck` (Neck)
  7. `torso` (Upper Body)
  8. `arms` (Arms)
  9. `wrists` (Wrists)
  10. `hands` (Hands)
  11. `lowerBody` (Lower Body / Pelvis)
  12. `legs` (Legs)
  13. `feet` (Feet)
- **Accessibility**: Full keyboard navigation via `tabIndex`, `role="button"`, and `Enter`/`Space` key event handlers.
- **Physical Breakdown Effect (`.is-broken`)**: When a body part is targeted on the skeleton, the individual bone paths detach, displace, rotate, and reassemble over a 1.5-second reset timer before auto-scrolling to the fetched catalog department.

### 3.2 Matrix Digital Rain: `MatrixRain`
- **Canvas Pipeline**: High-performance `requestAnimationFrame` loop on a `<canvas>` element.
- **Character Pool**: Japanese Katakana, Kanji, and Latin hexadecimal characters (`0-9`, `A-F`, `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ`).
- **Phosphor Trail Rendering**: Fades previous frames using semi-transparent background clearing (`rgba(0, 3, 0, 0.08)`) with random bright phosphor white head drops.

### 3.3 Cyber Terminal: `TerminalPanel`
- **BONE_OS Kernel Log Stream**: Real-time ticker streaming system operations, firewall alerts, memory dumps (`0xDEADB0NE`, `0xCAFEFEMUR`), and security breaches.
- **Severity Tags**:
  - `[OK]` (Terminal green)
  - `[INFO]` (Cyan / blue)
  - `[WARN]` (Warning amber)
  - `[ERR]` (Breach red)
- **Auto-scroll Buffer**: Keeps the terminal pinned to the latest entries with a blinking terminal cursor prompt (`SYS awaiting input █`).

### 3.4 Live Telemetry: `SysMetricsBar`
- **Dynamic Load Counters**: Simulates CPU load, memory utilization, network saturation, and active threat counter.
- **Reactive Scaling**: Metric stress and threat counters scale proportionately with the site's escalating `chaosLevel`.

### 3.5 Autonomous Chaos Engine
Driven by timed intervals and randomized triggers within `App.jsx`:
- **Threat Level Escalation (`chaosLevel: 0-10`)**: Increases the frequency and severity of automated anomalies over user session time.
- **Screen Shake Tremor (`shakeActive`)**: CSS keyframe shake simulating physical terminal breach.
- **Signal Inversion (`invertActive`)**: Full-screen CSS filter inversion (`invert(1) hue-rotate(180deg)`).
- **Glitch Overlay (`glitchActive`)**: Chromatic RGB aberration and scanline interference.
- **Viewport Drift / Tilt (`tiltStyle`)**: Subtle dynamic angular tilts that spring back into place.
- **Reverse Data Stream (`tickerReversed`)**: Inverts ticker tape scroll directions.
- **Spontaneous Popups (`FloatingChaosPopup`)**: Detached security alerts that spawn at randomized screen coordinates, float, and auto-dismiss.

### 3.6 Chaos Portal & Demo PNR Sequence
- **Portal Trigger**: Clicking the chaotic "Unstable Portal" initiates simulated progressive system crashes (Stages 1 through 3).
- **Disorder Mode (`pageDisordered`)**: Applies an asymmetric CSS transformation matrix across layout containers for 10 seconds before self-healing.
- **PNR Gate**: At stage 3, prompts for a mock 10-digit Passenger Name Record (PNR). Submitting the form validates client-side, closes the crash modal, selects the `torso` department, and spotlights a featured product.

### 3.7 Cursed Cookies Compliance
- Persistent amber alert banner requiring user agreement: *"They remember the bones you clicked. We do not offer an alternative."*

---

## 4. Live Catalog Integration (`src/catalog.js` & `src/data.js`)

### 4.1 Data Pipeline
1. **Department Selection**: Triggered by hotspot click or department drawer navigation.
2. **Collection Resolving**: Retrieves associated collection handles from `departments[id].collections`.
3. **Shopify JSON Fetch**: Sends asynchronous HTTP requests to:
   ```
   https://www.snitch.co.in/collections/{handle}/products.json?limit=12
   ```
4. **Data Sanitization & Normalization**:
   - Strips malicious or unwanted HTML markup with `DOMParser`.
   - Filters out out-of-stock items, missing variant pricing, or products lacking primary imagery.
   - Formats prices in INR (₹) and builds direct links back to retailer checkout pages.
5. **Deduplication & Error Resilience**:
   - `Promise.allSettled` guarantees partial catalog rendering even if an individual collection endpoint fails.
   - Deduplicates items across overlapping collections.

---

## 5. Design System & CSS Architecture (`src/styles.css`)

### 5.1 CSS Custom Properties (Theme Tokens)
```css
:root {
  --bg: #030804;
  --bg-panel: #071008;
  --bg-card: #0a180c;
  --green: #00ff66;
  --green-bright: #39ff14;
  --green-dim: #008f39;
  --green-dark: #003b14;
  --amber: #ffaa00;
  --red: #ff003c;
  --cyan: #00e5ff;
  --text: #a8f0b8;
  --text-dim: #4d8258;
  --mono: 'Share Tech Mono', 'Courier New', monospace;
  --display: 'VT323', monospace;
  --glow-green: 0 0 10px rgba(0, 255, 102, 0.6), 0 0 20px rgba(0, 255, 102, 0.3);
  --glow-red: 0 0 10px rgba(255, 0, 60, 0.7);
  --glow-amber: 0 0 10px rgba(255, 170, 0, 0.6);
}
```

### 5.2 CRT & Screen Simulation Effects
- **Scanline Mask**: Repetitive 2px linear-gradient overlay creating authentic CRT cathode-ray monitor lines.
- **Cyber Grid**: Background radial and linear patterns representing tactical radar grids.
- **Glitch & Shake Keyframes**: High-frequency transforms (`glitch-anim`, `screen-shake`, `float-bob`).

---

## 6. Directory Structure

```
skeleton/
├── index.html               # HTML5 entry with VT323 & Share Tech Mono Google Fonts
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite development server configuration
├── documentation.md         # Full technical documentation & architectural guide
├── README.md                # Project overview and quickstart
└── src/
    ├── main.jsx             # React DOM root attachment
    ├── App.jsx              # Main hacker panel application & chaos state engine
    ├── catalog.js           # Live Shopify API client & sanitization pipeline
    ├── data.js              # Anatomy-to-department configuration & metadata
    └── styles.css           # Complete cyberpunk CRT stylesheet & animations
```

---

## 7. Development & Deployment

### 7.1 Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### 7.2 Installation
```bash
npm install
```

### 7.3 Running the Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5173/`.

### 7.4 Production Build & Verification
```bash
npm run build
npm run preview
```
Creates an optimized static bundle in the `dist/` directory and serves it locally.
