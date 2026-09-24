import React from 'react';
import './LoginSection.css';

export default function LoginSection({ onNavigate, onOpenLogin }) {
  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else if (onNavigate) {
      onNavigate('dashboard');
    } else {
      window.location.hash = 'dashboard';
    }
  };

  return (
    <section className="login-section" id="login">
      <div className="login-section__blob login-section__blob--1"></div>
      <div className="login-section__blob login-section__blob--2"></div>

      <div className="login-section__inner">
        <div className="login-section__card">
          <div className="login-section__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <h2 className="login-section__heading">Section Controller & SSE Portal</h2>
          <p className="login-section__description">
            Official operational portal for Section Controllers, Senior Section Engineers (P-Way / S&T / TRD),
            and Operating Branch Officers to review AI-generated shadow blocks and authorize Track Possession Permits.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="login-section__btn" 
              id="login-btn"
              onClick={handleLoginClick}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Department Login
            </button>
          </div>

          <div className="login-section__hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Secured via CRIS RailNet / 2FA Biometric & e-Office SSO
          </div>
        </div>
      </div>
    </section>
  );
}
