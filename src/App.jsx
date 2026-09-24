import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import LoginSection from './components/LoginSection';
import RailConnectBanner from './components/RailConnectBanner';
import USPCards from './components/USPCards';
import IndiaMap from './components/IndiaMap';
import Footer from './components/Footer';

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
  const [currentRoute, setCurrentRoute] = useState(() => {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (['dashboard', 'optimizer', 'freight', 'field-dispatch', 'weather', 'audit'].includes(raw)) {
      return raw;
    }
    return 'overview';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace(/^#\/?/, '').trim();
      if (['dashboard', 'optimizer', 'freight', 'field-dispatch', 'weather', 'audit'].includes(raw)) {
        setCurrentRoute(raw);
      } else {
        setCurrentRoute('overview');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route) => {
    if (route === 'overview') {
      window.location.hash = '';
      setCurrentRoute('overview');
    } else {
      window.location.hash = route;
      setCurrentRoute(route);
    }
  };

  return (
    <div className="app">
      {/* Universal Official Indian Railways Header (Image 1 Theme) */}
      <Navbar 
        currentRoute={currentRoute} 
        onNavigate={navigate} 
        onOpenLogin={() => setIsLoginOpen(true)} 
      />

      {/* Official Department Login Modal (Image 2 + Image 5 Theme) */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onNavigate={navigate} 
      />

      {/* Dynamic Route View */}
      <main className="app-main-content">
        {currentRoute === 'dashboard' && (
          <DashboardPage onNavigate={navigate} />
        )}

        {currentRoute === 'optimizer' && (
          <OptimizerPage onNavigate={navigate} />
        )}

        {currentRoute === 'freight' && (
          <FreightForecastPage onNavigate={navigate} />
        )}

        {currentRoute === 'field-dispatch' && (
          <FieldDispatchPage onNavigate={navigate} />
        )}

        {currentRoute === 'weather' && (
          <WeatherPage onNavigate={navigate} />
        )}

        {currentRoute === 'audit' && (
          <AuditPage onNavigate={navigate} />
        )}

        {currentRoute === 'overview' && (
          <>
            <Hero onNavigate={navigate} />
            <RailConnectBanner onNavigate={navigate} />
            <USPCards onNavigate={navigate} />
            <LoginSection onNavigate={navigate} onOpenLogin={() => setIsLoginOpen(true)} />
            <IndiaMap />
            <Footer onNavigate={navigate} />
          </>
        )}
      </main>
    </div>
  );
}
