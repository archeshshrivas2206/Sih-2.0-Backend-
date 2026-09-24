import React, { useState } from 'react';
import { IndianRailwaysLogo, CRISLogo } from '../components/Logos';
import './LoginPage.css';

export default function LoginPage({ onLogin, onNavigate }) {
  const [activeTab, setActiveTab] = useState('department'); // 'department' | 'pin'
  
  // Department Form State
  const [dept, setDept] = useState('Engineering (P-Way)');
  const [roleLevel, setRoleLevel] = useState('Senior Section Engineer (SSE)');
  const [officerName, setOfficerName] = useState('Er. R. K. Sharma');
  const [division, setDivision] = useState('Northern Railway / Delhi Division (DLI)');
  const [operationalDate, setOperationalDate] = useState('2026-09-25');

  // Controller PIN State
  const [scrCode, setScrCode] = useState('SCR-NR-DLI-104');
  const [pinToken, setPinToken] = useState('884102');

  const handleDeptSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: officerName,
      department: dept,
      role: roleLevel,
      division: division,
      date: operationalDate,
      authType: 'DEPARTMENT_SSO'
    };
    onLogin(userData);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: 'Chief Controller A. K. Verma',
      department: 'Operating (Traffic)',
      role: 'Section Controller (SCR)',
      division: division,
      scrCode: scrCode,
      authType: 'CONTROLLER_PIN'
    };
    onLogin(userData);
  };

  const handleQuickDemo = (profile) => {
    onLogin(profile);
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-card">
          {/* Card Header with official crests */}
          <div className="login-card-header">
            <div className="login-header-logos">
              <IndianRailwaysLogo size={52} />
              <CRISLogo size={46} />
            </div>
            <h1 className="login-card-title">
              Sahayak <span>Rail</span> SSO Gateway
            </h1>
            <div className="login-card-subtitle">
              MINISTRY OF RAILWAYS • SIH 2026 • CRIS E-OFFICE
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="login-tabs-nav" style={{ gridTemplateColumns: '1fr' }}>
            <button
              type="button"
              className={`login-tab-btn ${activeTab === 'department' ? 'active' : ''}`}
              onClick={() => setActiveTab('department')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Department & Officer Login
            </button>

            {/* Controller PIN action commented out for review
            <button
              type="button"
              className={`login-tab-btn ${activeTab === 'pin' ? 'active' : ''}`}
              onClick={() => setActiveTab('pin')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Controller PIN
            </button>
            */}
          </div>

          {/* Form Body */}
          <div className="login-form-body">
            {activeTab === 'department' ? (
              <form onSubmit={handleDeptSubmit}>
                <div className="login-field-group">
                  <label className="login-label">Department</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">🏢</span>
                    <select
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      className="login-select"
                      required
                    >
                      <option value="Engineering (P-Way)">Engineering (Permanent Way / Track)</option>
                      <option value="Signal & Telecom">Signal & Telecom (S&T / Interlocking)</option>
                      <option value="Electrical (TRD / OHE)">Electrical (Traction Distribution / 25kV OHE)</option>
                      <option value="Operating (Traffic)">Operating Department (Traffic & Punctuality)</option>
                      <option value="Safety Directorate">Safety Directorate / RDSO</option>
                    </select>
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="login-label">Designation / Role Level</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">🎖️</span>
                    <select
                      value={roleLevel}
                      onChange={(e) => setRoleLevel(e.target.value)}
                      className="login-select"
                      required
                    >
                      <option value="Senior Section Engineer (SSE)">Senior Section Engineer (SSE / In-Charge)</option>
                      <option value="Section Controller (SCR)">Section Controller (Operating Branch)</option>
                      <option value="Junior Engineer (JE)">Junior Engineer (Field Supervisor)</option>
                      <option value="Senior DOM / Operations">Senior DOM / Operations Officer</option>
                      <option value="DRM / ADRM Operations">Divisional Railway Manager (DRM / ADRM)</option>
                    </select>
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="login-label">Officer / Engineer Name</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">👤</span>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="e.g. Er. R. K. Sharma"
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="login-label">Division / Corridor Section</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">📍</span>
                    <input
                      type="text"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      placeholder="Division / Section"
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="login-btn-submit" id="btn-login-dept-submit">
                  Enter Operational Portal →
                </button>
              </form>
            /* Controller PIN form commented out for review
            ) : (
              <form onSubmit={handlePinSubmit}>
                <div className="login-field-group">
                  <label className="login-label">Section Controller Code (SCR)</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">🚂</span>
                    <input
                      type="text"
                      value={scrCode}
                      onChange={(e) => setScrCode(e.target.value)}
                      placeholder="e.g. SCR-NR-DLI-104"
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="login-label">6-Digit Cryptographic Private Token (PN)</label>
                  <div className="login-input-wrap">
                    <span className="login-input-icon">🔑</span>
                    <input
                      type="password"
                      value={pinToken}
                      onChange={(e) => setPinToken(e.target.value)}
                      placeholder="Enter 6-digit PIN"
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="login-btn-submit" id="btn-login-pin-submit">
                  Authorize Controller Command Deck →
                </button>
              </form>
            */
            )}

            {/* Quick 1-Click Role Profiles for SIH Evaluation */}
            <div className="login-demo-roles">
              <div className="login-demo-title">
                <span>Fast Evaluation Access</span>
                <span className="login-demo-badge">1-CLICK LOGIN</span>
              </div>

              <div className="login-demo-grid">
                <button
                  type="button"
                  className="login-demo-btn"
                  onClick={() => handleQuickDemo({
                    name: 'Chief Controller A. K. Verma',
                    department: 'Operating (Traffic)',
                    role: 'Section Controller',
                    division: 'Northern Railway / Delhi Div',
                    authType: 'CONTROLLER'
                  })}
                >
                  <span className="login-demo-icon">👨‍✈️</span>
                  <div>
                    <span className="login-demo-name">SCR Verma</span>
                    <span className="login-demo-dept">Section Controller</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="login-demo-btn"
                  onClick={() => handleQuickDemo({
                    name: 'SSE R. K. Sharma',
                    department: 'Engineering (P-Way)',
                    role: 'Senior Section Engineer',
                    division: 'Palwal – Mathura Section',
                    authType: 'PWAY'
                  })}
                >
                  <span className="login-demo-icon">🛤️</span>
                  <div>
                    <span className="login-demo-name">SSE Sharma</span>
                    <span className="login-demo-dept">P-Way Track Engg</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="login-demo-btn"
                  onClick={() => handleQuickDemo({
                    name: 'SSE M. Patel',
                    department: 'Signal & Telecom',
                    role: 'Senior Section Engineer',
                    division: 'Delhi – Agra Mainline',
                    authType: 'SNT'
                  })}
                >
                  <span className="login-demo-icon">🚦</span>
                  <div>
                    <span className="login-demo-name">SSE Patel</span>
                    <span className="login-demo-dept">Signal & Telecom</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="login-demo-btn"
                  onClick={() => handleQuickDemo({
                    name: 'SSE K. Deshmukh',
                    department: 'Electrical (TRD / OHE)',
                    role: 'Senior Section Engineer',
                    division: 'Okhla Traction Substation',
                    authType: 'TRD'
                  })}
                >
                  <span className="login-demo-icon">⚡</span>
                  <div>
                    <span className="login-demo-name">SSE Deshmukh</span>
                    <span className="login-demo-dept">25kV Catenary / TRD</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Back Link */}
          <div className="login-footer-nav">
            <span
              className="login-back-link"
              onClick={() => onNavigate('landing')}
              role="button"
              tabIndex={0}
            >
              ← Return to Public Information Portal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
