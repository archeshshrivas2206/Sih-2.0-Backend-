import { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './IndiaMap.css';

const junctions = [
  { id: 'ndls', name: 'New Delhi', code: 'NDLS', lat: 28.6419, lng: 77.2193, major: true, zone: 'Northern Railway' },
  { id: 'cstm', name: 'Mumbai CST', code: 'CSTM', lat: 18.9402, lng: 72.8356, major: true, zone: 'Central Railway' },
  { id: 'mas', name: 'Chennai Central', code: 'MAS', lat: 13.0827, lng: 80.2707, major: true, zone: 'Southern Railway' },
  { id: 'hwh', name: 'Howrah Junction', code: 'HWH', lat: 22.5839, lng: 88.3428, major: true, zone: 'Eastern Railway' },
  { id: 'sbc', name: 'Bengaluru', code: 'SBC', lat: 12.9716, lng: 77.5946, major: false, zone: 'South Western Rly' },
  { id: 'adi', name: 'Ahmedabad', code: 'ADI', lat: 23.0225, lng: 72.5714, major: false, zone: 'Western Railway' },
  { id: 'jp', name: 'Jaipur', code: 'JP', lat: 26.9196, lng: 75.7879, major: false, zone: 'North Western Rly' },
  { id: 'lko', name: 'Lucknow', code: 'LKO', lat: 26.8467, lng: 80.9462, major: false, zone: 'Northern Railway' },
  { id: 'bpl', name: 'Bhopal', code: 'BPL', lat: 23.2599, lng: 77.4126, major: false, zone: 'West Central Rly' },
  { id: 'sc', name: 'Secunderabad', code: 'SC', lat: 17.4344, lng: 78.5013, major: true, zone: 'South Central Rly' },
  { id: 'ngp', name: 'Nagpur', code: 'NGP', lat: 21.1458, lng: 79.0882, major: false, zone: 'Central Railway' },
  { id: 'pnbe', name: 'Patna', code: 'PNBE', lat: 25.6093, lng: 85.1376, major: false, zone: 'East Central Rly' },
  { id: 'ghy', name: 'Guwahati', code: 'GHY', lat: 26.1445, lng: 91.7362, major: false, zone: 'NF Railway' },
  { id: 'tvc', name: 'Thiruvananthapuram', code: 'TVC', lat: 8.4875, lng: 76.9525, major: false, zone: 'Southern Railway' },
  { id: 'agc', name: 'Agra Cantt', code: 'AGC', lat: 27.1631, lng: 78.0081, major: false, zone: 'North Central Rly' },
  { id: 'bsb', name: 'Varanasi', code: 'BSB', lat: 25.3176, lng: 83.0064, major: false, zone: 'NE Railway' },
  { id: 'brc', name: 'Vadodara', code: 'BRC', lat: 22.3072, lng: 73.1812, major: false, zone: 'Western Railway' },
  { id: 'cbe', name: 'Coimbatore', code: 'CBE', lat: 11.0168, lng: 76.9558, major: false, zone: 'Southern Railway' },
  { id: 'rnc', name: 'Ranchi', code: 'RNC', lat: 23.3441, lng: 85.3096, major: false, zone: 'South Eastern Rly' },
  { id: 'bbs', name: 'Bhubaneswar', code: 'BBS', lat: 20.2961, lng: 85.8245, major: false, zone: 'East Coast Rly' },
  { id: 'gwl', name: 'Gwalior', code: 'GWL', lat: 26.2183, lng: 78.1828, major: false, zone: 'North Central Rly' },
  { id: 'kgp', name: 'Kharagpur', code: 'KGP', lat: 22.3460, lng: 87.3320, major: false, zone: 'South Eastern Rly' },
  { id: 'ald', name: 'Prayagraj', code: 'ALD', lat: 25.4358, lng: 81.8463, major: false, zone: 'North Central Rly' },
  { id: 'jodhpur', name: 'Jodhpur', code: 'JU', lat: 26.2389, lng: 73.0243, major: false, zone: 'North Western Rly' },
  { id: 'vsg', name: 'Vasco da Gama', code: 'VSG', lat: 15.3982, lng: 73.8113, major: false, zone: 'South Western Rly' },
  { id: 'sby', name: 'Sambhalpur', code: 'SBP', lat: 21.4669, lng: 83.9812, major: false, zone: 'East Coast Rly' },
];

function getCoords(id) {
  const j = junctions.find(j => j.id === id);
  return j ? [j.lat, j.lng] : [0, 0];
}

const routes = [
  { points: [getCoords('ndls'), getCoords('jp'), getCoords('adi'), getCoords('brc'), getCoords('cstm')], trunk: true },
  { points: [getCoords('ndls'), getCoords('agc'), getCoords('gwl'), getCoords('bpl')], trunk: false },
  { points: [getCoords('ndls'), getCoords('lko'), getCoords('ald'), getCoords('bsb'), getCoords('pnbe'), getCoords('hwh')], trunk: true },
  { points: [getCoords('bpl'), getCoords('ngp'), getCoords('sc'), getCoords('mas')], trunk: true },
  { points: [getCoords('hwh'), getCoords('kgp'), getCoords('bbs'), getCoords('mas')], trunk: false },
  { points: [getCoords('mas'), getCoords('sbc'), getCoords('cbe'), getCoords('tvc')], trunk: false },
  { points: [getCoords('cstm'), [17.68, 75.90], getCoords('sbc')], trunk: false },
  { points: [getCoords('sc'), getCoords('sbc')], trunk: true },
  { points: [getCoords('pnbe'), getCoords('ghy')], trunk: true },
  { points: [getCoords('cstm'), [19.88, 75.34], getCoords('ngp')], trunk: false },
  { points: [getCoords('hwh'), getCoords('rnc')], trunk: false },
  { points: [getCoords('jp'), getCoords('jodhpur')], trunk: false },
  { points: [getCoords('ngp'), getCoords('sby'), getCoords('bbs')], trunk: false },
  { points: [getCoords('cstm'), [16.99, 73.31], getCoords('vsg')], trunk: false },
];

const majorIcon = L.divIcon({
  className: 'ds-marker ds-marker--major',
  html: '<div class="ds-marker__outer"><div class="ds-marker__inner"></div></div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const minorIcon = L.divIcon({
  className: 'ds-marker ds-marker--minor',
  html: '<div class="ds-marker__outer"><div class="ds-marker__inner"></div></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function MapControls() {
  const map = useMap();
  return (
    <div className="ds-controls">
      <div className="ds-controls__group">
        <button className="ds-controls__btn" aria-label="Zoom in" onClick={() => map.zoomIn()}>+</button>
        <div className="ds-controls__divider"></div>
        <button className="ds-controls__btn" aria-label="Zoom out" onClick={() => map.zoomOut()}>−</button>
      </div>
      <div className="ds-controls__group">
        <div className="ds-controls__legend-dot ds-controls__legend-dot--pink"></div>
        <div className="ds-controls__legend-dot ds-controls__legend-dot--blue"></div>
        <div className="ds-controls__legend-dot ds-controls__legend-dot--mixed">
          <div className="ds-controls__legend-dot-half"></div>
        </div>
      </div>
    </div>
  );
}

export default function IndiaMap() {
  const [showTrunk, setShowTrunk] = useState(true);
  const [showJunctions, setShowJunctions] = useState(true);

  const indiaCenter = [22.5, 82.0];

  return (
    <section className="ds-map-section" id="map">
      <div className="ds-map-section__container container">
        
        {/* Left Panel */}
        <div className="ds-map-panel">
          <h2 className="ds-map-panel__heading">
            Discover the Indian Railway Network
          </h2>
          <p className="ds-map-panel__text">
            Sahayak Rail optimizes maintenance block scheduling across India's <strong>68,000+ route kilometres</strong> of track. The map shows trunk routes and major junctions where AI-powered scheduling eliminates conflicts between maintenance, freight, and passenger operations.
          </p>
          <p className="ds-map-panel__text">
            Our system covers all <strong>17 zonal railways</strong> with over <strong>13,000 daily train services</strong>. Click through the map and explore the network.
          </p>

          <div className="ds-map-panel__legend">
            <div
              className="ds-legend-item"
              onClick={() => setShowTrunk(!showTrunk)}
            >
              <div className={`ds-legend-checkbox ${showTrunk ? 'ds-legend-checkbox--checked-blue' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span className="ds-legend-dot ds-legend-dot--blue"></span>
              <span className="ds-legend-text">Trunk Routes</span>
            </div>
            
            <div
              className="ds-legend-item"
              onClick={() => setShowJunctions(!showJunctions)}
            >
              <div className={`ds-legend-checkbox ${showJunctions ? 'ds-legend-checkbox--checked-pink' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span className="ds-legend-dot ds-legend-dot--pink"></span>
              <span className="ds-legend-text">Major Junctions</span>
            </div>
          </div>

          <a href="#" className="ds-map-panel__cta">
            All Zonal Railways
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Right — Circular Leaflet Map */}
        <div className="ds-map-canvas-container">
          <div className="ds-map-circular-wrapper">
            <MapContainer
              center={indiaCenter}
              zoom={5}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapControls />

              {/* Railway routes */}
              {routes.map((route, i) => {
                if (!showTrunk && route.trunk) return null;
                
                return (
                  <div key={`route-wrapper-${i}`}>
                    <Polyline
                      positions={route.points}
                      pathOptions={{
                        color: '#ffffff',
                        weight: route.trunk ? 9 : 5,
                        opacity: 1,
                        lineCap: 'round',
                        lineJoin: 'round',
                      }}
                    />
                    <Polyline
                      positions={route.points}
                      pathOptions={{
                        color: route.trunk ? '#4da2ff' : '#99caff',
                        weight: route.trunk ? 5 : 2,
                        opacity: 1,
                        dashArray: route.trunk ? null : '6 6',
                        lineCap: 'round',
                        lineJoin: 'round',
                      }}
                    />
                  </div>
                );
              })}

              {/* Junction markers */}
              {showJunctions && junctions.map((junction) => (
                <Marker
                  key={junction.id}
                  position={[junction.lat, junction.lng]}
                  icon={junction.major ? majorIcon : minorIcon}
                >
                  <Popup className="ds-popup">
                    <div className="ds-popup__name">{junction.name}</div>
                    <div className="ds-popup__zone">{junction.code} · {junction.zone}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        
      </div>
    </section>
  );
}
