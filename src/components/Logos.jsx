import React from 'react';

// Official Indian Railways Circular Emblem (Red Seal with Ashoka Emblem and Train Wheel)
export function IndianRailwaysLogo({ size = 44, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="Indian Railways Official Emblem"
    >
      {/* Outer Crimson Circle */}
      <circle cx="50" cy="50" r="48" fill="#B31B1B" stroke="#E6A100" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" />
      
      {/* Inner White Rim */}
      <circle cx="50" cy="50" r="38" fill="#991212" stroke="#ffffff" strokeWidth="1.5" />

      {/* Decorative Laurel Wreath / Grain Garland */}
      <path
        d="M 22 56 C 20 40, 30 26, 44 22 M 56 22 C 70 26, 80 40, 78 56"
        stroke="#F4D03F"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 24 64 C 28 78, 42 82, 50 82 C 58 82, 72 78, 76 64"
        stroke="#F4D03F"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ashoka Chakra / Railway Wheel at Center */}
      <circle cx="50" cy="54" r="16" fill="#1B365D" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="50" cy="54" r="5" fill="#ffffff" />
      
      {/* Spokes of the Railway Chakra Wheel */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={50 + 5 * Math.cos((angle * Math.PI) / 180)}
          y1={54 + 5 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 15 * Math.cos((angle * Math.PI) / 180)}
          y2={54 + 15 * Math.sin((angle * Math.PI) / 180)}
          stroke="#ffffff"
          strokeWidth="1.2"
        />
      ))}

      {/* Train Locomotive Front Profile on the Wheel */}
      <path
        d="M 44 57 L 44 49 C 44 46, 56 46, 56 49 L 56 57 Z"
        fill="#ffffff"
      />
      <rect x="46" y="48" width="8" height="4" rx="1" fill="#1B365D" />
      <circle cx="50" cy="55" r="1.5" fill="#B31B1B" />

      {/* Ashoka Lion Crest on Top */}
      <path
        d="M 47 24 C 47 22, 53 22, 53 24 L 53 34 L 47 34 Z"
        fill="#F4D03F"
      />
      <circle cx="50" cy="22" r="3.5" fill="#F4D03F" />
      <path d="M 43 26 C 43 23, 47 23, 47 25 L 47 34 L 43 34 Z" fill="#E6A100" />
      <path d="M 57 26 C 57 23, 53 23, 53 25 L 53 34 L 57 34 Z" fill="#E6A100" />
      <rect x="42" y="34" width="16" height="3" rx="1" fill="#F4D03F" />
      <circle cx="50" cy="35.5" r="1.2" fill="#1B365D" />

      {/* Indian Railways Text Arc (Stylized Dots) */}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        INDIAN RAILWAYS
      </text>
    </svg>
  );
}

// Official IRCTC Circular Logo
export function IRCTCLogo({ size = 44, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="IRCTC Official Logo"
    >
      {/* Outer Blue Circle */}
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#005494" strokeWidth="4" />
      <circle cx="50" cy="50" r="44" stroke="#005494" strokeWidth="1" strokeDasharray="3,2" />

      {/* Characteristic IRCTC Vibrant Swirl / Rings */}
      <path
        d="M 50 18 C 68 18, 82 32, 82 50 C 82 64, 72 76, 58 80 L 54 72 C 64 69, 72 60, 72 50 C 72 38, 62 28, 50 28 C 38 28, 28 38, 28 50 C 28 56, 30 62, 35 66 L 29 72 C 22 66, 18 58, 18 50 C 18 32, 32 18, 50 18 Z"
        fill="#005494"
      />

      {/* Orange Accent Curve */}
      <path
        d="M 50 28 C 62 28, 72 38, 72 50 L 64 50 C 64 42, 58 36, 50 36 Z"
        fill="#F2722B"
      />

      {/* Stylized Modern Train Wheel & Tracks */}
      <circle cx="50" cy="50" r="9" fill="#003366" />
      <circle cx="50" cy="50" r="4" fill="#ffffff" />
      
      {/* IRCTC Text */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fill="#005494"
        fontSize="9"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="0.5"
      >
        IRCTC
      </text>
    </svg>
  );
}

// CRIS (Centre for Railway Information Systems) Logo
export function CRISLogo({ size = 38, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="CRIS Designed & Hosted"
    >
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#003366" strokeWidth="3" />
      {/* Hexagonal / Orbit Tech Railway Grid */}
      <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="#005494" strokeWidth="2.5" fill="#f0f6fc" />
      {/* Railroad Cross Bars */}
      <line x1="30" y1="50" x2="70" y2="50" stroke="#F2722B" strokeWidth="4" strokeLinecap="round" />
      <line x1="38" y1="38" x2="62" y2="62" stroke="#005494" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="62" x2="62" y2="38" stroke="#005494" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="6" fill="#003366" />
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fill="#003366"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        CRIS
      </text>
    </svg>
  );
}
