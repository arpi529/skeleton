
https://skeleton.arpithimanshu277.workers.dev/


# Bone Appétit Mart™ // BONE_OS_v6.6.6

> **A Cyberpunk Anatomy Department Store & Autonomous Chaos Terminal**  
> Browse live clothing collections from [SNITCH India](https://www.snitch.co.in) by targeting body parts on a live interactive skeleton specimen while simulated system breaches and chaos anomalies erupt around you.

[![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/BONE__OS-BREACHED-red?style=flat-square)](#)
[![Catalog](https://img.shields.io/badge/Catalog-SNITCH%20Live-brightgreen?style=flat-square)](https://www.snitch.co.in)

---

## Quickstart

```bash
# Clone and install dependencies
npm install

# Start local dev server
npm run dev
```

Visit **`http://localhost:5173/`** to enter the terminal.

To produce a production bundle:
```bash
npm run build
npm run preview
```

---

## What is Bone Appétit Mart?

**Bone Appétit Mart™** is an experimental e-commerce web application that marries an interactive anatomy specimen with a live Indian menswear catalog, wrapped in a 90s phosphor-green cyberpunk terminal aesthetic.

Instead of generic category dropdowns, users interact with a custom SVG anatomical wireframe. Clicking any bone triggers real-time retrieval from live Shopify collection endpoints, bringing back real products, prices, and imagery.

### 💀 Key Highlights

- **Interactive Skeleton Anatomy Map**:
  - Hand-crafted front-facing vector skeleton with 13 clickable anatomical zones (`Skull`, `Eyes`, `Ears`, `Nose`, `Jaw`, `Neck`, `Upper Body`, `Arms`, `Wrists`, `Hands`, `Lower Body`, `Legs`, `Feet`).
  - Specimen breakdown physics: on selection, bone paths detach and scatter before smoothly reassembling.
  - Live cursor targeting reticle with real-time coordinate tracking (`X: 13° · Y: 8°`).
  - Full keyboard accessibility (`Tab`, `Enter`, `Space`).

- **Live E-Commerce Catalog Integration**:
  - Direct live feeds via public Shopify JSON endpoints from **SNITCH India**.
  - Dynamic stock, variant, and pricing verification in Indian Rupees (₹).
  - Sanitized product descriptions with direct checkout referral links.
  - Graceful resilience: `Promise.allSettled` ensures partial collection display even under network strain.

- **`BONE_OS` Hacker Panel & Terminal HUD**:
  - Phosphor CRT green aesthetic with scanlines, CRT flicker, and radar grid backdrop.
  - High-performance canvas-based **Matrix Digital Rain** behind the specimen.
  - Live streaming **System Kernel Terminal** (`[OK]`, `[INFO]`, `[WARN]`, `[ERR]`) with blinking command prompt.
  - Real-time **System Metrics HUD** (dynamic CPU, Memory, Network bandwidth, and Threat Level counters).

- **Autonomous Chaos Engine**:
  - Progressive **Threat Level** escalation over time.
  - Random tremors (screen shakes), signal inversions, and chromatic aberration glitch bars.
  - Viewport tilts, reverse data stream tickers, and cursor anomalies.
  - Detached, floating security warning popups with automated decay timers.
  - **Unstable Chaos Portal**: Triggers simulated multi-stage system crashes, 10-second disordered grid layouts, and an interactive PNR validation bypass.
  - **Cursed Cookie Agreement**: Mandatory dark-humor cookie compliance notice.

---

## Project Architecture

```
skeleton/
├── index.html               # Entry HTML with VT323 & Share Tech Mono font headers
├── documentation.md         # Comprehensive technical & architectural documentation
├── README.md                # Project overview and quickstart guide
├── package.json             # Dependencies and scripts
├── src/
│   ├── main.jsx             # React application entry point
│   ├── App.jsx              # Main hacker panel interface & chaos engine
│   ├── catalog.js           # Shopify API client & sanitization pipeline
│   ├── data.js              # Anatomy department mappings & collection handles
│   └── styles.css           # Complete design system, CRT tokens & animations
```

---

## In-Depth Documentation

For detailed architectural diagrams, component mechanics, CSS custom property references, and API pipelines, consult [documentation.md](file:///c:/Users/arpit/OneDrive/Desktop/skeleton/documentation.md).

---

## License & Disclaimer

This project is created for demonstration and portfolio purposes. Product information and imagery belong to **SNITCH**. No payment processing or credential harvesting is performed.
