import React from 'react';

export function VirthoPortalLogo({ 
  size = 40, 
  showText = true,
  hideTextOnMobile = true,
  showShadows = true,
  className = '',
  style = {},
  // Backwards compatibility
  width,
  height
}) {
  // Determine actual dimensions
  const actualHeight = size || height || 40;
  
  // If width is provided and size isn't, use legacy width logic
  const isShowingText = showText || (width && height && width > height * 1.5);
  
  const viewBoxWidth = isShowingText ? 180 : 40;
  const actualWidth = size ? (isShowingText ? (180 / 40) * size : size) : (width || 40);

  const spheres = [
    { id: 'fire', cx: 8, cy: 6, r: 5, fill: 'url(#gradientFire)' },
    { id: 'love', cx: 12, cy: 16, r: 3.5, fill: 'url(#gradientLove)' },
    { id: 'water', cx: 16, cy: 26, r: 2.5, fill: 'url(#gradientWater)' },
    { id: 'brand', cx: 20, cy: 35, r: 4.5, fill: 'url(#gradientBrand)' },
    { id: 'earth', cx: 24, cy: 26, r: 2.5, fill: 'url(#gradientEarth)' },
    { id: 'universe', cx: 28, cy: 16, r: 3.5, fill: 'url(#gradientUniverse)' },
    { id: 'air', cx: 32, cy: 6, r: 5, fill: 'url(#gradientAir)' },
  ];

  return (
    <svg 
      width={actualWidth} 
      height={actualHeight} 
      viewBox={`0 0 ${viewBoxWidth} 40`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`virtho-portal-logo ${className}`}
      style={style}
      role="img"
      aria-label="Virtho Brand Mark"
    >
      <defs>
        {/* Shadow Filter */}
        <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        {/* 1. FIRE (top-left) - Vivid Orange Update */}
        <radialGradient id="gradientFire" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFCF96" />
          <stop offset="50%" stopColor="#FF9640" />
          <stop offset="75%" stopColor="#E6690A" />
          <stop offset="100%" stopColor="#7E3A03" />
        </radialGradient>

        {/* 2. LOVE/STRAWBERRY (left-mid) */}
        <radialGradient id="gradientLove" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FF9AA6" />
          <stop offset="50%" stopColor="#F04C5D" />
          <stop offset="75%" stopColor="#DE2440" />
          <stop offset="100%" stopColor="#840E24" />
        </radialGradient>

        {/* 3. WATER (left-lower) */}
        <radialGradient id="gradientWater" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#8FE8F8" />
          <stop offset="50%" stopColor="#30B7D6" />
          <stop offset="75%" stopColor="#0E86A6" />
          <stop offset="100%" stopColor="#063F52" />
        </radialGradient>

        {/* 4. BRAND TURQUOISE (bottom vertex) */}
        <radialGradient id="gradientBrand" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#D6F7EA" />
          <stop offset="50%" stopColor="#8ADCC2" />
          <stop offset="75%" stopColor="#48B893" />
          <stop offset="100%" stopColor="#155C44" />
        </radialGradient>

        {/* 5. EARTH/ANTHRACITE (right-lower) */}
        <radialGradient id="gradientEarth" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#7E7871" />
          <stop offset="50%" stopColor="#4C4741" />
          <stop offset="75%" stopColor="#2E2A26" />
          <stop offset="100%" stopColor="#0C0A08" />
        </radialGradient>

        {/* 6. UNIVERSE (right-mid) */}
        <radialGradient id="gradientUniverse" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#CDABFF" />
          <stop offset="50%" stopColor="#9166F0" />
          <stop offset="75%" stopColor="#6A3BD8" />
          <stop offset="100%" stopColor="#2B1470" />
        </radialGradient>

        {/* 7. AIR/SILVER (top-right) */}
        <radialGradient id="gradientAir" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#F7FBFD" />
          <stop offset="50%" stopColor="#C2D2D9" />
          <stop offset="75%" stopColor="#8FA3AC" />
          <stop offset="100%" stopColor="#46565E" />
        </radialGradient>
      </defs>

      {/* CAST SHADOWS */}
      {showShadows && spheres.map(s => (
        <ellipse 
          key={`shadow-${s.id}`} 
          cx={s.cx} 
          cy={s.cy + s.r * 0.6} 
          rx={s.r * 1.1} 
          ry={s.r * 0.4} 
          fill="rgba(0,0,0,0.25)" 
          filter="url(#sphereShadow)" 
        />
      ))}

      {/* CONNECTING LINES */}
      <path 
        d="M 8 6 L 12 16 L 16 26 L 20 35 L 24 26 L 28 16 L 32 6" 
        fill="none" 
        stroke="#B7E3D4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.85" 
      />

      {/* SPHERES AND GLINTS */}
      {spheres.map(s => (
        <g key={`sphere-${s.id}`}>
          <circle cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} />
          {/* Specular Glint (upper-left) */}
          <circle 
            cx={s.cx - s.r * 0.35} 
            cy={s.cy - s.r * 0.35} 
            r={s.r * 0.2} 
            fill="#FFFFFF" 
            opacity="0.7" 
          />
        </g>
      ))}

      {/* WORDMARK & TAGLINE */}
      {isShowingText && (
        <g 
          transform="translate(44, 0)" 
          className={hideTextOnMobile ? "hidden md:block" : ""}
        >
          <text 
            x="0" 
            y="22" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontSize="21" 
            fontWeight="800" 
            fill="#14503F" 
            letterSpacing="1.5"
          >
            VIRTHO
          </text>
          <text 
            x="1.5" 
            y="34" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontSize="8.5" 
            fontWeight="600" 
            fill="#3FA184" 
            letterSpacing="0.5"
          >
            Human Development Hub
          </text>
        </g>
      )}
    </svg>
  );
}

export default VirthoPortalLogo;