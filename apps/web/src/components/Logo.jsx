import React from 'react';
import { Droplet, User } from 'lucide-react';
import '@/styles/logo.css';

/**
 * Virtho Logo Component
 * 
 * A modern, glossy logo design combining a water droplet (symbolizing life, fluidity, adaptability)
 * with a human silhouette (representing human development and empowerment).
 * 
 * Features:
 * - Scalable vector design using Lucide React icons
 * - Glossy violet water droplet with gradient transition (darker to brighter violet)
 * - White human silhouette centered inside (reduced size for better balance)
 * - Glossy shine effect with radial gradient overlay
 * - Smooth hover effects and animations
 * - Dark mode support
 * - Fully accessible with focus states
 * - Responsive and mobile-friendly
 * 
 * @param {Object} props
 * @param {number} props.size - Size of the logo in pixels (default: 48)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * @param {boolean} props.animate - Enable/disable hover animations (default: true)
 */
function Logo({ 
  size = 48, 
  className = '', 
  style = {},
  animate = true 
}) {
  // Calculate icon sizes relative to container size
  const dropletSize = size;
  const userSize = size * 0.35; // Reduced from 0.5 to 0.35 (30% smaller human figure)

  return (
    <div 
      className={`logo-container ${className} ${!animate ? 'no-animate' : ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
      role="img"
      aria-label="Virtho Logo - Water drop with human silhouette"
    >
      <svg 
        width={dropletSize} 
        height={dropletSize} 
        viewBox="0 0 24 24" 
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradient: Darker Violet (left) to Brighter Violet (right) */}
          <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B46C1" stopOpacity="1" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="1" />
          </linearGradient>

          {/* Radial Gradient for Glossy Shine Effect */}
          <radialGradient id="glossyShine" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#E9D5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Water Droplet Background with Gradient */}
        <path
          d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
          fill="url(#violetGradient)"
          className="logo-droplet-path"
          strokeWidth="0"
        />

        {/* Glossy Shine Overlay */}
        <ellipse
          cx="9"
          cy="7"
          rx="6"
          ry="5"
          fill="url(#glossyShine)"
          className="logo-glossy-overlay"
          opacity="0.9"
        />
      </svg>

      {/* Human Silhouette Foreground (Reduced Size) */}
      <User 
        className="logo-user"
        size={userSize}
        strokeWidth={2.2}
        fill="currentColor"
        aria-hidden="true"
      />
    </div>
  );
}

export default Logo;