import './USPCards.css';

export default function USPCards() {
  return (
    <section className="usp-section" id="features">
      <div className="usp-section__header">
        <div className="usp-section__label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Core Capabilities
        </div>
        <h2 className="usp-section__title">
          Six pillars of intelligent<br />rail maintenance
        </h2>
        <p className="usp-section__subtitle">
          Every feature is designed around the real workflow of Indian Railways controllers, from IRPWM rules to SMS-based field coordination.
        </p>
      </div>

      <div className="usp-cards">
        {/* Card 1 — AI Optimizer */}
        <div className="usp-card">
          <h3 className="usp-card__heading">AI-Optimized Block Scheduling</h3>
          <p className="usp-card__description">
            OR-Tools CP-SAT solver generates conflict-free maintenance blocks in seconds, replacing 3+ hours of manual coordination across divisions.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--optimizer">
              <div className="optimizer-demo">
                <div className="optimizer-demo__row">
                  <div className="optimizer-demo__icon optimizer-demo__icon--blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  </div>
                  <span className="optimizer-demo__text">GMT Block — Delhi Div</span>
                  <span className="optimizer-demo__badge optimizer-demo__badge--solved">Scheduled</span>
                </div>
                <div className="optimizer-demo__row">
                  <div className="optimizer-demo__icon optimizer-demo__icon--orange">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <span className="optimizer-demo__text">USFD Scan — Agra Sec</span>
                  <span className="optimizer-demo__badge optimizer-demo__badge--pending">Pending</span>
                </div>
                <div className="optimizer-demo__row">
                  <div className="optimizer-demo__icon optimizer-demo__icon--green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="optimizer-demo__text">Rail Renewal — Jhansi</span>
                  <span className="optimizer-demo__badge optimizer-demo__badge--solved">Approved</span>
                </div>
                <div className="optimizer-demo__result">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M13 2 L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Solved in 1.2s · 0 conflicts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Explainable AI */}
        <div className="usp-card">
          <h3 className="usp-card__heading">Explainable AI Transparency</h3>
          <p className="usp-card__description">
            Every recommendation shows WHY — feature importance scores, safety rules cited (IRPWM/ACTM), and impact calculation for full auditability.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--xai">
              <div className="xai-demo">
                <div className="xai-demo__rule">
                  <div className="xai-demo__rule-header">
                    <div className="xai-demo__rule-icon">📋</div>
                    <span className="xai-demo__rule-label">Safety Rule Cited</span>
                  </div>
                  <div className="xai-demo__rule-text">
                    IRPWM Para 808 — "USFD shall be carried out once in every 6 months on routes carrying more than 8 GMT."
                  </div>
                </div>
                <div className="xai-demo__bar-group">
                  <div className="xai-demo__bar">
                    <span className="xai-demo__bar-label">TGI Score</span>
                    <div className="xai-demo__bar-track"><div className="xai-demo__bar-fill xai-demo__bar-fill--high" style={{ width: '85%' }}></div></div>
                    <span className="xai-demo__bar-value">0.85</span>
                  </div>
                  <div className="xai-demo__bar">
                    <span className="xai-demo__bar-label">GMT Load</span>
                    <div className="xai-demo__bar-track"><div className="xai-demo__bar-fill xai-demo__bar-fill--med" style={{ width: '62%' }}></div></div>
                    <span className="xai-demo__bar-value">0.62</span>
                  </div>
                  <div className="xai-demo__bar">
                    <span className="xai-demo__bar-label">Last Block</span>
                    <div className="xai-demo__bar-track"><div className="xai-demo__bar-fill xai-demo__bar-fill--low" style={{ width: '41%' }}></div></div>
                    <span className="xai-demo__bar-value">0.41</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 — Human-in-the-Loop */}
        <div className="usp-card">
          <h3 className="usp-card__heading">Human-in-the-Loop Governance</h3>
          <p className="usp-card__description">
            Controller retains full Approve / Modify / Reject authority. AI recommends, never forces. Field staff notified via SMS/WhatsApp.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--hitl">
              <div className="hitl-demo">
                <div className="hitl-demo__recommendation">
                  <div className="hitl-demo__rec-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    AI Recommendation
                  </div>
                  <div className="hitl-demo__rec-text">
                    Schedule USFD block on Delhi–Agra section<br/>Slot: 09:00–12:00 · Confidence: 94%
                  </div>
                  <div className="hitl-demo__actions">
                    <div className="hitl-demo__btn hitl-demo__btn--approve">✓ Approve</div>
                    <div className="hitl-demo__btn hitl-demo__btn--modify">✎ Modify</div>
                    <div className="hitl-demo__btn hitl-demo__btn--reject">✕ Reject</div>
                  </div>
                </div>
                <div className="hitl-demo__sms">
                  <div className="hitl-demo__sms-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    SMS Dispatched
                  </div>
                  <div className="hitl-demo__sms-text">
                    PWI/DLI: Block APPROVED 09:00-12:00 Delhi-Agra for USFD. Reply OK to confirm.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 — Synthetic Data Generator */}
        <div className="usp-card">
          <h3 className="usp-card__heading">Synthetic Data Generator</h3>
          <p className="usp-card__description">
            Realistic data-gen module using actual IR parameters — GMT 5–50 range, TGI 40–180 thresholds, USFD flaw categories from IRPWM Manual.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--data">
              <div className="data-demo">
                <div className="data-demo__header">
                  <div className="data-demo__header-icon">🗄️</div>
                  <span className="data-demo__header-text">Generated Records</span>
                </div>
                <div className="data-demo__table">
                  <div className="data-demo__row data-demo__row--header">
                    <span>Source</span><span>Records</span><span>Status</span>
                  </div>
                  <div className="data-demo__row">
                    <span>TMS Data</span><span>2,400</span><span className="data-demo__status data-demo__status--done">✓</span>
                  </div>
                  <div className="data-demo__row">
                    <span>SMMS Data</span><span>1,850</span><span className="data-demo__status data-demo__status--done">✓</span>
                  </div>
                  <div className="data-demo__row">
                    <span>TDMS Data</span><span>3,200</span><span className="data-demo__status data-demo__status--done">✓</span>
                  </div>
                  <div className="data-demo__row">
                    <span>COA Records</span><span>5,100</span><span className="data-demo__status data-demo__status--done">✓</span>
                  </div>
                </div>
                <div className="data-demo__footer">
                  Production → CRIS API Integration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 — Multi-Channel Notifications */}
        <div className="usp-card">
          <h3 className="usp-card__heading">Multi-Channel Notification Fallback</h3>
          <p className="usp-card__description">
            System tries WhatsApp first → SMS → IVR voice call. At least one channel reaches field staff even in 2G coverage areas.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--notify">
              <div className="notify-demo">
                <div className="notify-demo__step notify-demo__step--active">
                  <div className="notify-demo__step-num">1</div>
                  <div className="notify-demo__step-content">
                    <div className="notify-demo__step-label">WhatsApp</div>
                    <div className="notify-demo__step-status notify-demo__step-status--success">Delivered ✓</div>
                  </div>
                </div>
                <div className="notify-demo__arrow">↓</div>
                <div className="notify-demo__step">
                  <div className="notify-demo__step-num">2</div>
                  <div className="notify-demo__step-content">
                    <div className="notify-demo__step-label">SMS Gateway</div>
                    <div className="notify-demo__step-status notify-demo__step-status--standby">Standby</div>
                  </div>
                </div>
                <div className="notify-demo__arrow">↓</div>
                <div className="notify-demo__step">
                  <div className="notify-demo__step-num">3</div>
                  <div className="notify-demo__step-content">
                    <div className="notify-demo__step-label">IVR Voice Call</div>
                    <div className="notify-demo__step-status notify-demo__step-status--standby">Standby</div>
                  </div>
                </div>
                <div className="notify-demo__badge">
                  Works on 2G · ₹0.15/SMS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6 — Real-time Freight Forecasting */}
        <div className="usp-card">
          <h3 className="usp-card__heading">Real-Time Freight Forecasting</h3>
          <p className="usp-card__description">
            Ensemble of data.gov.in seasonal trends + COA real-time section occupancy. Prophet captures coal & harvest season patterns with daily correction.
          </p>
          <div className="usp-card__visual">
            <div className="usp-visual--forecast">
              <div className="forecast-demo">
                <div className="forecast-demo__chart">
                  <svg viewBox="0 0 220 100" className="forecast-demo__svg">
                    {/* Grid lines */}
                    <line x1="30" y1="10" x2="30" y2="85" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="30" y1="85" x2="210" y2="85" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="30" y1="55" x2="210" y2="55" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3 3"/>
                    <line x1="30" y1="25" x2="210" y2="25" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3 3"/>
                    {/* Actual data line */}
                    <polyline fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      points="30,70 55,62 80,55 105,48 130,52 155,40 180,35"/>
                    {/* Forecast line (dashed) */}
                    <polyline fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"
                      points="180,35 195,30 210,28"/>
                    {/* Labels */}
                    <text x="10" y="14" fontSize="7" fill="#9ca3af">High</text>
                    <text x="10" y="58" fontSize="7" fill="#9ca3af">Med</text>
                    <text x="10" y="88" fontSize="7" fill="#9ca3af">Low</text>
                    <text x="30" y="96" fontSize="6" fill="#9ca3af">Jun</text>
                    <text x="80" y="96" fontSize="6" fill="#9ca3af">Aug</text>
                    <text x="130" y="96" fontSize="6" fill="#9ca3af">Oct</text>
                    <text x="180" y="96" fontSize="6" fill="#9ca3af">Dec</text>
                    {/* Dots */}
                    <circle cx="180" cy="35" r="3" fill="#1a73e8"/>
                    <circle cx="210" cy="28" r="3" fill="#FF6B35" stroke="#fff" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="forecast-demo__legend">
                  <span className="forecast-demo__legend-item"><span className="forecast-demo__legend-line forecast-demo__legend-line--actual"></span> Actual (COA)</span>
                  <span className="forecast-demo__legend-item"><span className="forecast-demo__legend-line forecast-demo__legend-line--forecast"></span> Prophet Forecast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
