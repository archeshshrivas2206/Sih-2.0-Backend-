import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import LoginSection from './components/LoginSection';
import RailConnectBanner from './components/RailConnectBanner';
import USPCards from './components/USPCards';
import IndiaMap from './components/IndiaMap';
import Footer from './components/Footer';

// Public Dedicated Login Gateway
import LoginPage from './pages/LoginPage';

// Operational Pages
import DashboardPage from './pages/DashboardPage';
import OptimizerPage from './pages/OptimizerPage';
import FreightForecastPage from './pages/FreightForecastPage';
import FieldDispatchPage from './pages/FieldDispatchPage';
import WeatherPage from './pages/WeatherPage';
import AuditPage from './pages/AuditPage';

import './App.css';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Persistent Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sahayak_rail_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    const validOperational = ['dashboard', 'optimizer', 'freight', 'field-dispatch', 'weather', 'audit', 'overview'];

    try {
      const savedUser = localStorage.getItem('sahayak_rail_user');
      if (savedUser) {
        if (validOperational.includes(raw)) return raw;
        return 'dashboard'; // Directly show dashboard when logged in
      }
    } catch {
      // fallback
    }

    if (raw === 'login') return 'login';
    return 'landing'; // Home page acts as landing page before login
  });

  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace(/^#\/?/, '').trim();
      const validOperational = ['dashboard', 'optimizer', 'freight', 'field-dispatch', 'weather', 'audit', 'overview'];
      
      if (!currentUser) {
        if (raw === 'login') {
          setCurrentRoute('login');
        } else {
          setCurrentRoute('landing');
        }
      } else {
        if (raw === 'login') {
          setCurrentRoute('dashboard');
        } else if (validOperational.includes(raw)) {
          setCurrentRoute(raw);
        } else {
          setCurrentRoute('dashboard');
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const navigate = (route) => {
    if (!currentUser) {
      if (route === 'login') {
        window.location.hash = 'login';
        setCurrentRoute('login');
      } else {
        window.location.hash = '';
        setCurrentRoute('landing');
      }
    } else {
      if (route === 'landing') {
        window.location.hash = 'overview';
        setCurrentRoute('overview');
      } else {
        window.location.hash = route;
        setCurrentRoute(route);
      }
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('sahayak_rail_user', JSON.stringify(userData));
    } catch {
      // ignore
    }
    setIsLoginOpen(false);
    // Directly show dashboard after login as requested
    window.location.hash = 'dashboard';
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sahayak_rail_user');
    } catch {
      // ignore
    }
    window.location.hash = '';
    setCurrentRoute('landing');
  };

  return (
    <div className="app">
      {/* Universal Official Indian Railways Header */}
      <Navbar 
        currentRoute={currentRoute} 
        onNavigate={navigate} 
        onOpenLogin={() => navigate('login')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Official Department Login Modal (Optional quick modal) */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onNavigate={() => {
          handleLogin({
            name: 'Er. R. K. Sharma',
            department: 'Engineering (P-Way)',
            role: 'Senior Section Engineer',
            division: 'Northern Railway / Delhi Div'
          });
        }} 
      />

      {/* Dynamic Route View */}
      <main className="app-main-content">
        {/* Route 1: Dedicated Login Gateway */}
        {currentRoute === 'login' && (
          <LoginPage onLogin={handleLogin} onNavigate={navigate} />
        )}

        {/* Route 2: Pre-login Landing Page (The full Home page with buttons disabled and linkages removed) */}
        {!currentUser && currentRoute !== 'login' && (
          <>
            <Hero onNavigate={navigate} isLoggedIn={false} />
            <RailConnectBanner onNavigate={navigate} isLoggedIn={false} />
            <USPCards onNavigate={navigate} />
            <LoginSection onNavigate={navigate} onOpenLogin={() => navigate('login')} />
            <IndiaMap />
            <Footer onNavigate={navigate} />
          </>
        )}

        {/* Post-Login Operational Pages */}
        {currentUser && currentRoute === 'dashboard' && (
          <DashboardPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'optimizer' && (
          <OptimizerPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'freight' && (
          <FreightForecastPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'field-dispatch' && (
          <FieldDispatchPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'weather' && (
          <WeatherPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'audit' && (
          <AuditPage onNavigate={navigate} currentUser={currentUser} />
        )}

        {currentUser && currentRoute === 'overview' && (
          <>
            <Hero onNavigate={navigate} isLoggedIn={true} />
            <RailConnectBanner onNavigate={navigate} isLoggedIn={true} />
            <USPCards onNavigate={navigate} />
            <LoginSection onNavigate={navigate} onOpenLogin={() => navigate('login')} />
            <IndiaMap />
            <Footer onNavigate={navigate} />
          </>
        )}
      </main>
    </div>
  );
}
