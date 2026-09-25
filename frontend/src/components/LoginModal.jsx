import React, { useState } from 'react';
import { IndianRailwaysLogo, IRCTCLogo } from './Logos';
import modalTrainImg from '../assets/irctc_modal_train.jpg';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('department'); // 'department' | 'agent'
  
  // Department Form state
  const [dept, setDept] = useState('Engineering (P-Way)');
  const [section, setSection] = useState('NR / Delhi Division');
  const [date, setDate] = useState('2026-09-10');
  const [level, setLevel] = useState('All Levels');
  const [category, setCategory] = useState('General');

  if (!isOpen) return null;

  const handleDepartmentLogin = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('dashboard');
    } else {
      window.location.hash = 'dashboard';
    }
    onClose();
  };

  return (
    <div className="irctc-modal-overlay" onClick={onClose}>
      <div className="irctc-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Graphic Header Banner */}
        <div className="irctc-modal-header">
          <div className="irctc-modal-header__train-wrapper">
            <img 
              src={modalTrainImg} 
              alt="Vande Bharat Express" 
              className="irctc-modal-header__train" 
            />
          </div>

          <div className="irctc-modal-header__logos">
            <div className="irctc-modal-header__crest">
              <IndianRailwaysLogo size={58} />
            </div>
            <div className="irctc-modal-header__irctc">
              <IRCTCLogo size={56} />
            </div>
          </div>

          <button 
            className="irctc-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Login Modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="irctc-modal-tabs">
          <button 
            type="button"
            className={`irctc-modal-tab ${activeTab === 'department' ? 'active' : ''}`}
            onClick={() => setActiveTab('department')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>DEPARTMENT LOGIN</span>
          </button>

          <button 
            type="button"
            className={`irctc-modal-tab ${activeTab === 'agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>CONTROLLER PIN</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="irctc-modal-body">
          {/* TAB 1: DEPARTMENT LOGIN */}
          {activeTab === 'department' && (
            <div className="irctc-dept-login">
              <h3 className="irctc-dept-title">DEPARTMENT LOGIN</h3>

              <form onSubmit={handleDepartmentLogin} className="irctc-dept-form">
                {/* Field 1: Department dropdown */}
                <div className="irctc-input-group">
                  <div className="irctc-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <select 
                    value={dept} 
                    onChange={(e) => setDept(e.target.value)}
                    className="irctc-select"
                  >
                    <option value="Engineering (P-Way)">Engineering (Permanent Way)</option>
                    <option value="Signal & Telecom">Signal & Telecom (S&T)</option>
                    <option value="Electrical (TRD / OHE)">Electrical (TRD / OHE)</option>
                    <option value="Operating (Traffic)">Operating Department (Traffic)</option>
                    <option value="Mechanical (Rolling Stock)">Mechanical (Rolling Stock)</option>
                    <option value="Safety Directorate">Safety Directorate</option>
                  </select>
                </div>

                {/* Field 2: Section / Division */}
                <div className="irctc-input-group">
                  <div className="irctc-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="Section / Division"
                    className="irctc-input"
                    required
                  />
                </div>

                {/* Field 3: Date */}
                <div className="irctc-input-group">
                  <div className="irctc-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="irctc-input"
                    required
                  />
                </div>

                {/* Field 4: All Levels dropdown */}
                <div className="irctc-input-group">
                  <div className="irctc-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="irctc-select"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Sr. DOM / Operating">Sr. DOM / Operating Controller</option>
                    <option value="DRM / ADRM">DRM / ADRM Operations</option>
                    <option value="SSE (P-Way)">Senior Section Engineer (SSE / P-Way)</option>
                    <option value="Section Controller">Section Controller (SCR)</option>
                    <option value="Station Superintendent">Station Superintendent (SS)</option>
                  </select>
                </div>

                {/* Field 5: General category dropdown */}
                <div className="irctc-input-group">
                  <div className="irctc-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="irctc-select"
                  >
                    <option value="General">General Maintenance</option>
                    <option value="Urgent Maintenance Block">Urgent Maintenance Block</option>
                    <option value="Traffic & Power Block">Traffic & Power Block</option>
                    <option value="Emergency Rail Fracture">Emergency Rail Fracture</option>
                    <option value="Integrated Mega Block">Integrated Mega Block</option>
                  </select>
                </div>

                {/* Action button */}
                <button type="submit" className="irctc-btn-primary">
                  LOGIN TO DASHBOARD
                </button>

                <div className="irctc-dept-footer">
                  <span className="irctc-muted">Sahayak Rail · Authorized Dept:</span>
                  <a href="#audit" onClick={onClose} className="irctc-link">Request access</a>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: CONTROLLER PIN */}
          {activeTab === 'agent' && (
            <div className="irctc-user-login">
              <form onSubmit={handleDepartmentLogin} className="irctc-form">
                <div className="irctc-floating-input">
                  <label className="irctc-label">Section Controller Code (SCR)</label>
                  <div className="irctc-input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. SCR-NR-DLI-104"
                      className="irctc-input"
                      required
                    />
                    <div className="irctc-trailing-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="irctc-floating-input">
                  <label className="irctc-label">Cryptographic Private Number (PN) PIN</label>
                  <div className="irctc-input-wrapper">
                    <input
                      type="password"
                      placeholder="Enter 6-digit Private Token"
                      className="irctc-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="irctc-btn-pill-blue" style={{ marginTop: '16px' }}>
                  AUTHORIZE CONTROLLER TERMINAL
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
