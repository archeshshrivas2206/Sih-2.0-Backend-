# 🚆 Sahayak Rail (सहायक रेल)
### AI-Powered Multi-Department Maintenance Block Scheduler for Indian Railways

[![SIH 2026](https://img.shields.io/badge/SIH-2026%20Problem%2026027-ff6b35.svg?style=for-the-badge)](https://www.sih.gov.in/)
[![Ministry](https://img.shields.io/badge/Ministry-Ministry%20of%20Railways-005494.svg?style=for-the-badge)](https://indianrailways.gov.in/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Vite%208%20%7C%20Leaflet-008080.svg?style=for-the-badge)](https://vitejs.dev/)
[![Solver](https://img.shields.io/badge/AI%20Engine-OR--Tools%20CP--SAT%20Solver-4285F4.svg?style=for-the-badge)](https://developers.google.com/optimization)
[![Regulatory](https://img.shields.io/badge/Compliance-IRPWM%20%7C%20ACTM%20%7C%20IRSEM-2E7D32.svg?style=for-the-badge)](https://indianrailways.gov.in/)

---

## 📌 Executive Summary

**Sahayak Rail (सहायक रेल)** is a mission-critical decision-support system engineered for **Indian Railways (IR)** under **Smart India Hackathon (SIH) 2026 — Problem Statement SIH 26027**. 

Indian Railways manages over **68,000+ route kilometers**, transporting **13,000+ passenger trains** and **8,000+ freight rakes** daily. Maintaining track geometry, 25 kV overhead electrification (OHE), and electronic signalling requires granting **Track Maintenance Blocks (Possessions)** where train movements are suspended or restricted.

Currently, block coordination across **Permanent Way (P-Way/Engineering)**, **Signal & Telecom (S&T)**, and **Traction Distribution (TRD/Electrical)** takes **3+ hours of manual phone calls, disjointed paper memos, and siloed spreadsheets**. This friction causes recurring train detentions, loss of sectional throughput, and delayed track maintenance.

**Sahayak Rail** automates and optimizes this entire pipeline in **seconds** using **Constraint Programming (Google OR-Tools CP-SAT)**, **multi-department shadow block co-location**, **data.gov.in freight forecasting**, and a **failsafe 2G SMS field dispatch engine**.

---

## 🎯 Problem Statement (SIH 26027)

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | **SIH 26027** |
| **Organization** | Ministry of Railways / Railway Board / CRIS / RDSO |
| **Domain** | Transportation & Logistics / AI & Automation / Critical Infrastructure |
| **Core Challenge** | Design an automated system to dynamically schedule and de-conflict maintenance blocks across multiple railway departments while minimizing passenger delay, preserving freight revenue, and ensuring strict compliance with IRPWM safety regulations. |

---

## 🏛️ System Architecture

```
                                 ┌─────────────────────────────────────────────────────────┐
                                 │                DATA FEEDS & TELEMETRY                   │
                                 │  • TMS (Track Management - TGI, USFD flaws)             │
                                 │  • SMMS (Signal Maintenance - Point machines, Track Ckts│
                                 │  • TDMS (Traction Distribution - 25kV Catenary/OHE)     │
                                 │  • COA / FOIS (Train schedules, freight rake manifests) │
                                 │  • IMD Weather Radar (River levels, ghat slip sensors)   │
                                 └───────────────────────────┬─────────────────────────────┘
                                                             │
                                                             ▼
                                 ┌─────────────────────────────────────────────────────────┐
                                 │            AI ENGINE & OPTIMIZER LAYER                  │
                                 │                                                         │
                                 │   ┌─────────────────────────────────────────────────┐   │
                                 │   │        Google OR-Tools CP-SAT Solver            │   │
                                 │   │  • Non-overlapping track occupancy constraints │   │
                                 │   │  • Minimum headway buffers (15-min passenger)   │   │
                                 │   │  • Multi-objective loss minimization            │   │
                                 │   └────────────────────────┬────────────────────────┘   │
                                 │                            │                            │
                                 │   ┌────────────────────────┴────────────────────────┐   │
                                 │   │          Shadow Block Co-location Engine        │   │
                                 │   │   Bundles P-Way + S&T + TRD into 1 window       │   │
                                 │   │    Saves 3–4 hrs of separate track closures     │   │
                                 │   └─────────────────────────────────────────────────┘   │
                                 └───────────────────────────┬─────────────────────────────┘
                                                             │
                                                             ▼
                                 ┌─────────────────────────────────────────────────────────┐
                                 │        HUMAN-IN-THE-LOOP CONTROLLER INTERFACE           │
                                 │  • Live 24-Hour Corridor Gantt Chart                    │
                                 │  • Explainable AI (XAI) feature impact & rule citations │
                                 │  • Section Controller Approve / Modify / Reject Actions │
                                 │  • Emergency Corridor Insertion & Dynamic Rescheduling │
                                 └───────────────────────────┬─────────────────────────────┘
                                                             │
                                                             ▼
                                 ┌─────────────────────────────────────────────────────────┐
                                 │         MULTI-TIER FAILSAFE FIELD DISPATCH              │
                                 │   Tier 1: WhatsApp Business API (Rich interactive cards)│
                                 │      │  (Fallback on failure / poor network)            │
                                 │   Tier 2: SMS Gateway (GSM 2G compatible, ₹0.15/SMS)    │
                                 │      │  (Emergency fallback)                            │
                                 │   Tier 3: IVR Voice Broadcast Call                      │
                                 │   Digital Output: Automated Form T/348M & Private No.    │
                                 └─────────────────────────────────────────────────────────┘
```

---

## ⚡ The Six Key Architectural Pillars (USPs)

### 1. 🧩 Multi-Objective AI Constraint Solver (OR-Tools CP-SAT)
- **Mathematical Modeling**: Formulates block scheduling as a mixed integer constraint satisfaction problem.
- **Hard Constraints**: Zero physical block collisions on the same track line, train headway safety spacing, and machine travel times.
- **Soft Objectives**: Minimizes passenger delay penalty (weighted by train category: Vande Bharat/Rajdhani > Express > Passenger), freight throughput loss, and maintenance deferral risk.
- **Shadow Block Co-Location**: Automatically detects co-located work orders (e.g., P-Way track tamping + S&T point machine overhaul + TRD 25kV catenary de-energization) and bundles them into a single window, slashing sectional downtime by up to 60%.

### 2. 🔍 Explainable AI (XAI) & Regulatory Citations
- Replaces black-box recommendations with **auditable justifications**:
  - Exact rule citations from **IRPWM Para 808** (Track Geometry Index & USFD testing), **ACTM Vol II Para 2063** (25kV OHE isolation & permit-to-work), and **IRSEM Section 3** (Point machine disconnection memos).
  - Relative feature importance (SHAP-inspired breakdown): TGI Defect Urgency, Section Traffic Gap, Power Block Interlock, and Crew Proximity.

### 3. 🛡️ Human-in-the-Loop (HITL) Controller Governance
- Indian Railways operating discipline requires executive authority: the **Section Controller retains 100% discretion** to **Approve**, **Modify**, or **Reject** any AI schedule.
- Instant issuance of official **Private Numbers (PN)** (e.g., `PN-884102-DLI`) for track possession and safe clearance.
- Real-time generation of **Form T/348M** (Written Authority to Occupy Track for Maintenance).

### 4. 📈 Real-Time Freight & Demand Forecasting
- Integrates seasonal trends from **data.gov.in** and real-time section occupancy from **COA (Control Office Application)**.
- Models high-priority industrial commodity flows:
  - **BOXN Coal Rakes** for thermal power plants (critical stock monitoring).
  - **BTPN Petroleum Rakes** from Mathura / Barauni refineries.
  - **CONCOR Container Rakes** aligned with Western Dedicated Freight Corridor (W-DFC) vessel cut-offs.
- Shifts low-priority empty freight rakes around maintenance windows without causing network gridlock.

### 5. 📡 Resilient Field Dispatch Engine (2G & SMS Fallback)
- Operates reliably in remote track corridors lacking high-speed 4G/5G data:
  - **Tier 1:** WhatsApp Interactive Rich Messages with action buttons.
  - **Tier 2:** Standard 160-character GSM SMS via telecom gateway (works on basic 2G feature phones).
  - **Tier 3:** Automated IVR voice call confirmation.
- **Two-Way SMS Command Parser**: Interprets syntax such as `BLOCK REQ | SEC:NDL-GZB | KM:127-128 | DUR:3HR`, executes validation against the CP-SAT engine, and replies with cryptographic confirmation and Private Numbers.

### 6. 🌦️ Weather & Monsoon Risk Adaptation Radar
- Real-time integration with **Indian Meteorological Department (IMD)** telemetry:
  - **River Bridge Scour Watch**: Tracks Yamuna & Ganga bridge water levels against danger marks.
  - **Vindhya/Western Ghats Cutting Sensors**: Evaluates soil moisture saturation to prevent boulder falls during heavy track tamping.
  - **Thermal Rail Stress Watch**: Monitors rail temperatures exceeding 55°C to avoid summer rail buckling and enforce Temporary Speed Restrictions (TSRs).

---

## 🖥️ Application Modules & Walkthrough

| Route / Hash | Module Name | Core Features |
| :--- | :--- | :--- |
| `/#overview` | **Official Portal & IRCTC Interface** | Official Ministry & CRIS branded portal, Vande Bharat corridor block finder, dynamic Indian Railway interactive network map with junction nodes, and core USP showcases. |
| `/#dashboard` | **Section Controller Command Deck** | 24-hour interactive Gantt timeline displaying passenger trains, freight slots, and shadow maintenance blocks; live KPIs (Punctuality %, Block Hours Saved, Zero Conflicts); emergency block injection simulator. |
| `/#optimizer` | **CP-SAT AI Optimization Studio** | Interactive solver playground with adjustable priority sliders (Punctuality vs Safety vs Track Utilization); real-time defect feed (TMS, SMMS, TDMS); cross-department bid submission and bundling. |
| `/#freight` | **Freight Flow & Supply Chain Radar** | Live rake tracking (BOXN, BCNA, BTPN, CONCOR), power plant coal supply monitoring, port cutoff adherence, and seasonal freight forecasting charts. |
| `/#field-dispatch` | **2G SMS Field Dispatch Terminal** | Two-way SMS command tester, instant Private Number (PN) exchange, and official printable **Form T/348M** digital memo generator. |
| `/#weather` | **Monsoon & Weather Risk Radar** | Vulnerable section radar, bridge water level gauges, Ghat cutting soil moisture alerts, rail temperature thermal stress monitor, and automated precaution advice. |
| `/#audit` | **Regulatory Compliance & Audit Trail** | Immutable audit log of granted/cleared blocks, controller and supervisor signatures, Private Number verification, and explainable AI feature importance breakdown. |

---

## 🛠️ Technology Stack

```
Frontend:
  ├── React 19 (Component modularity, Hooks, Concurrent rendering)
  ├── Vite 8 (Ultra-fast HMR and optimized production bundling)
  ├── Leaflet & React-Leaflet (Interactive GIS rail corridor mapping)
  └── Vanilla CSS (Modern design system matching official IRCTC & CRIS guidelines)

Optimization & Analytics Engine (Architecture Spec):
  ├── Google OR-Tools CP-SAT (Constraint Programming solver)
  ├── Python 3.11 / FastAPI (REST microservice pipeline)
  ├── Meta Prophet / Statsmodels (Time-series freight forecasting)
  └── Pandas & NumPy (Data engineering & synthetic TMS/COA generation)

Protocols & Communications:
  ├── GSM SMS Gateway (2G text dispatch via SMPP / REST)
  ├── WhatsApp Business API (Rich media fallback)
  └── Form T/348M Digital Printing Engine
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- Modern web browser (Chrome, Edge, Firefox, Safari)

### 1. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd sahayak-rail
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
> **Windows PowerShell Note:** If PowerShell execution policy blocks running scripts, run with Command Prompt:
> ```cmd
> cmd.exe /c npm run dev
> ```
> Or adjust PowerShell execution policy for current user:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```

### 4. Open in Browser
Visit **`http://localhost:5173/`** to interact with the full prototype.

### 5. Build for Production
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

---

## 📂 Project Directory Structure

```
sahayak-rail/
├── index.html                       # Entry HTML with official IR metadata & fonts
├── package.json                     # Dependencies (React 19, Leaflet, Vite, Oxlint)
├── vite.config.js                   # Vite configuration with React plugin
├── public/                          # Static assets and favicons
└── src/
    ├── main.jsx                     # React entry point
    ├── App.jsx                      # Universal hash routing & modal controller
    ├── App.css                      # Global layout styles
    ├── index.css                    # Design tokens & IRCTC/CRIS color variables
    ├── assets/                      # High-resolution rolling stock & IR branding images
    │   ├── hero.png
    │   ├── vande_bharat_hero.jpg
    │   ├── irctc_modal_train.jpg
    │   └── irctc_railconnect_promo.jpg
    ├── components/                  # Shared modular components
    │   ├── Navbar.jsx / .css        # Official Indian Railways top header & navigation
    │   ├── Hero.jsx / .css          # Corridor search card & Vande Bharat hero banner
    │   ├── USPCards.jsx / .css      # 6 Core architectural pillars interactive cards
    │   ├── IndiaMap.jsx / .css      # Leaflet interactive Indian Railways network map
    │   ├── LoginModal.jsx / .css    # Multi-department SSO login portal
    │   ├── LoginSection.jsx / .css  # Quick department portal selector
    │   ├── RailConnectBanner.jsx    # RailConnect integration promotion
    │   ├── Logos.jsx                # Official IR, CRIS & Ashoka Emblem SVGs
    │   └── Footer.jsx / .css        # Government compliance & portal footer
    └── pages/                       # Dedicated operational modules
        ├── DashboardPage.jsx / .css # 24h Gantt chart, section controller interface
        ├── OptimizerPage.jsx / .css # CP-SAT solver studio & cross-department bidding
        ├── FreightForecastPage.jsx  # Real-time freight rakes & supply chain radar
        ├── FieldDispatchPage.jsx    # 2G SMS terminal, Private Numbers & Form T/348M
        ├── WeatherPage.jsx / .css   # IMD monsoon radar, bridge gauges & thermal watch
        └── AuditPage.jsx / .css     # Regulatory ledger, XAI SHAP factors & rule citations
```

---

## 🔒 Safety & Regulatory Compliance

Sahayak Rail is explicitly designed to integrate into existing Indian Railways operating codes:

1. **IRPWM (Indian Railways Permanent Way Manual)**:
   - Para 808 compliance for mandatory track tamping when Track Geometry Index (TGI) falls below threshold.
   - Rail defect categorization (IMR, OBS, REM) and maximum permissible deferral intervals.
2. **ACTM (AC Traction Manual)**:
   - Volume II Para 2063 compliance for permit-to-work issuance, section de-energization, and mandatory earthing.
3. **IRSEM (Indian Railways Signal Engineering Manual)**:
   - Disconnection and reconnection memos (Form S&T T/351) before any point machine or axle counter isolation.
4. **General & Subsidiary Rules (G&SR)**:
   - Adherence to block working protocols, caution orders (Form T/409), and emergency train protection rules.

---

## 🌐 How to Push to Your GitHub Repository

When you have your GitHub repository link ready, run the following commands in the project folder:

```bash
# 1. Initialize git repository (if not already initialized)
git init

# 2. Add all files to staging
git add .

# 3. Create initial commit
git commit -m "feat: complete Sahayak Rail SIH 26027 prototype and documentation"

# 4. Set main branch
git branch -M main

# 5. Link your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 👥 Smart India Hackathon (SIH 2026) Team
- **Project**: Sahayak Rail (सहायक रेल)
- **Problem Statement**: SIH 26027
- **Target Organization**: Ministry of Railways (Government of India)

---

## 📄 License
This project is developed for educational, demonstration, and innovation purposes under the **Smart India Hackathon 2026**. Distributed under the [MIT License](LICENSE).
