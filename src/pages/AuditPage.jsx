import React, { useState } from 'react';
import './AuditPage.css';

export default function AuditPage({ onNavigate }) {
  const [selectedBlockId, setSelectedBlockId] = useState('BLK-101');

  const xaiDecisions = {
    'BLK-101': {
      title: 'Shadow Block #104 (Tamping + Point M/C + OHE Catenary)',
      location: 'NDLS–AGC KM 127.40 – 129.20 (UP Main)',
      timeSlot: '00:30 – 04:00 AM (3.5 Hours)',
      confidence: 96,
      reasoning: 'Multi-objective CP-SAT solver identified an optimal overlap between TMS track defect (TGI 52) and SMMS point machine wear at Palwal outer. Bundling averted 4.0 hours of separate closures.',
      shapFactors: [
        { name: 'TGI Track Defect Urgency', pct: 38, val: 'Score 52 (<55 threshold)', desc: 'IRPWM Para 808 mandates tamping within 72 hrs.' },
        { name: 'Corridor Traffic Gap Window', pct: 26, val: 'Night Low Density', desc: 'Fits between last express and morning Gatimaan.' },
        { name: 'OHE 25kV Safety Interlock', pct: 21, val: 'Single Power Block', desc: 'ACTM Vol II Para 2063: power cut applied once.' },
        { name: 'Machine & Crew Proximity', pct: 15, val: 'Palwal Yard Siding', desc: 'CSM-92 machine stationed 2.4 km away.' }
      ],
      regulations: [
        { manual: 'IRPWM Para 808', rule: 'Ultrasonic flaw & track geometry index maintenance frequencies on Group A high-density lines.' },
        { manual: 'ACTM Vol II Para 2063', rule: 'Permit-to-work and mandatory earthing procedures for 25kV traction equipment.' },
        { manual: 'IRSEM Para 14.3', rule: 'Station Master disconnection memo requirement before point machine rodding overhaul.' }
      ]
    },
    'BLK-102': {
      title: 'USFD Ultrasonic Rail Flaw Testing (Trolley)',
      location: 'NDLS–AGC KM 84.10 – 92.50',
      timeSlot: '09:00 – 11:30 AM (2.5 Hours)',
      confidence: 93,
      reasoning: 'Scheduled in daytime due to visual optical requirements for rail defect categorization. Placed in headway gap between Gatimaan and Vande Bharat Express.',
      shapFactors: [
        { name: 'Daylight Visibility Factor', pct: 42, val: 'Optical USFD requirement', desc: 'Manual flaw detection requires adequate illumination.' },
        { name: 'Express Train Headway Gap', pct: 32, val: '140-Minute Window', desc: 'Safe buffer following Train 12049 clearance.' },
        { name: 'Cumulative GMT Load Stress', pct: 26, val: '42 GMT Carried', desc: 'Approaching testing milestone on continuous welded rail.' }
      ],
      regulations: [
        { manual: 'USFD Manual Para 4.2', rule: 'Testing interval specifications for 60kg 90UTS rails on high-density freight trunks.' }
      ]
    }
  };

  const auditLedger = [
    {
      pn: 'PN-884102-DLI',
      blockId: 'BLK-101',
      section: 'NDLS–AGC (KM 127–129)',
      dept: 'MULTI (P-Way + S&T + TRD)',
      supervisor: 'SSE/P-Way R. K. Sharma',
      controller: 'Chief Controller A. K. Verma',
      grantedAt: '10-Sep-2026 00:28:15',
      clearedAt: '10-Sep-2026 03:52:10',
      status: 'VERIFIED & AUDITED'
    },
    {
      pn: 'PN-741982-AGC',
      blockId: 'BLK-102',
      section: 'NDLS–AGC (KM 84–92)',
      dept: 'P-WAY (USFD Scan)',
      supervisor: 'JE/USFD M. Patel',
      controller: 'Dy. Controller S. Sengupta',
      grantedAt: '09-Sep-2026 08:55:00',
      clearedAt: '09-Sep-2026 11:28:40',
      status: 'VERIFIED & AUDITED'
    },
    {
      pn: 'PN-632019-DLI',
      blockId: 'BLK-201',
      section: 'AGC–NDLS (KM 62–64)',
      dept: 'P-WAY (Rail Renewal)',
      supervisor: 'SSE/Works T. N. Rao',
      controller: 'Chief Controller A. K. Verma',
      grantedAt: '09-Sep-2026 00:52:30',
      clearedAt: '09-Sep-2026 04:10:00',
      status: 'VERIFIED & AUDITED'
    },
    {
      pn: 'PN-394821-PAL',
      blockId: 'BLK-202',
      section: 'AGC–NDLS (KM 110–114)',
      dept: 'TRD (OHE Stagger Check)',
      supervisor: 'SSE/TRD K. Deshmukh',
      controller: 'Traction Controller V. Joshi',
      grantedAt: '08-Sep-2026 10:50:00',
      clearedAt: '08-Sep-2026 13:05:22',
      status: 'VERIFIED & AUDITED'
    }
  ];

  const currentXai = xaiDecisions[selectedBlockId] || xaiDecisions['BLK-101'];

  return (
    <div className="audit-page">
      <header className="audit-header">
        <div className="audit-header__left">
          <div className="audit-header__badge">
            <span className="audit-header__dot"></span>
            EXPLAINABLE AI (XAI) & TAMPER-EVIDENT REGULATORY AUDIT
          </div>
          <h1 className="audit-header__title">
            Explainable AI & <span>Regulatory Compliance Inspector</span>
          </h1>
          <p className="audit-header__subtitle">
            Indian Railways controllers never accept an AI blackbox. Sahayak Rail breaks down the exact feature importance (SHAP values) behind every scheduling decision and maps all constraints to official Indian Railways safety manuals.
          </p>
        </div>

        <div className="audit-header__actions">
          <button className="audit-btn-secondary" onClick={() => onNavigate('dashboard')}>
            ← Return to Dashboard
          </button>
          <button className="audit-btn-primary" onClick={() => onNavigate('optimizer')}>
            Inspect Optimizer Constraints →
          </button>
        </div>
      </header>

      {/* Audit Stats Grid */}
      <section className="audit-stats-grid">
        <div className="audit-card">
          <span className="audit-card__label">Regulatory Compliance</span>
          <span className="audit-card__val text-emerald">100% Verified</span>
          <span className="audit-card__sub">IRPWM, ACTM Vol II & IRSEM rules</span>
        </div>

        <div className="audit-card">
          <span className="audit-card__label">Active Private Numbers</span>
          <span className="audit-card__val text-cyan">24 Tokens</span>
          <span className="audit-card__sub">Cryptographic hash interlocked</span>
        </div>

        <div className="audit-card">
          <span className="audit-card__label">Tamper-Proof Ledger</span>
          <span className="audit-card__val text-amber">1,420 Events</span>
          <span className="audit-card__sub">Zero unauthorized block overrides</span>
        </div>

        <div className="audit-card">
          <span className="audit-card__label">AI Decision Transparency</span>
          <span className="audit-card__val text-white">Full XAI (SHAP)</span>
          <span className="audit-card__sub">Mathematical attribution logged</span>
        </div>
      </section>

      {/* XAI Decision Inspector Section */}
      <section className="audit-xai-section">
        <div className="xai-header">
          <div>
            <h3>Explainable AI (XAI) Decision Breakdown</h3>
            <p>Select a maintenance block to inspect why the CP-SAT solver chose this specific window:</p>
          </div>
          <div className="xai-selector">
            <button
              className={`xai-select-btn ${selectedBlockId === 'BLK-101' ? 'active' : ''}`}
              onClick={() => setSelectedBlockId('BLK-101')}
            >
              Block #104 (Bundled Tamping)
            </button>
            <button
              className={`xai-select-btn ${selectedBlockId === 'BLK-102' ? 'active' : ''}`}
              onClick={() => setSelectedBlockId('BLK-102')}
            >
              Block #102 (USFD Scan)
            </button>
          </div>
        </div>

        <div className="xai-detail-box">
          <div className="xai-summary-header">
            <div>
              <span className="confidence-tag text-emerald">● Confidence Score: {currentXai.confidence}%</span>
              <h4>{currentXai.title}</h4>
              <span className="xai-meta">{currentXai.location} • Window: {currentXai.timeSlot}</span>
            </div>
          </div>

          <div className="xai-reasoning-quote">
            <strong>Solver Reasoning Summary:</strong> "{currentXai.reasoning}"
          </div>

          {/* SHAP Feature Importance Bars */}
          <div className="shap-factors-container">
            <h5>Feature Attribution (SHAP Decomposition):</h5>
            <div className="shap-grid">
              {currentXai.shapFactors.map((f, i) => (
                <div key={i} className="shap-card">
                  <div className="shap-top">
                    <span className="shap-name">{f.name}</span>
                    <span className="shap-pct">+{f.pct}%</span>
                  </div>
                  <div className="shap-bar-bg">
                    <div className="shap-bar-fill" style={{ width: `${f.pct}%` }}></div>
                  </div>
                  <div className="shap-val text-cyan font-mono">{f.val}</div>
                  <p className="shap-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Grounding Regulations */}
          <div className="regulations-container">
            <h5>Governing Indian Railways Regulatory Clauses:</h5>
            <div className="reg-list">
              {currentXai.regulations.map((r, i) => (
                <div key={i} className="reg-item">
                  <span className="reg-tag">{r.manual}</span>
                  <span className="reg-text">{r.rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cryptographic Private Number Audit Ledger */}
      <section className="audit-ledger-section">
        <div className="ledger-header">
          <div>
            <h3>Cryptographic Private Number (PN) Audit Ledger</h3>
            <p>Official immutable log of all block grants, transfers, and safety cancellations</p>
          </div>
        </div>

        <div className="ledger-table-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Private Number (PN)</th>
                <th>Block ID</th>
                <th>Section</th>
                <th>Department</th>
                <th>Field Supervisor (PWI)</th>
                <th>Section Controller</th>
                <th>Grant Timestamp</th>
                <th>Safety Clearance</th>
              </tr>
            </thead>
            <tbody>
              {auditLedger.map((row) => (
                <tr key={row.pn}>
                  <td className="font-mono text-cyan font-bold">{row.pn}</td>
                  <td className="font-mono">{row.blockId}</td>
                  <td><strong>{row.section}</strong></td>
                  <td><span className="dept-tag">{row.dept}</span></td>
                  <td>{row.supervisor}</td>
                  <td>{row.controller}</td>
                  <td className="font-mono text-muted">{row.grantedAt}</td>
                  <td>
                    <span className="audit-status-badge text-emerald">
                      ✓ {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
