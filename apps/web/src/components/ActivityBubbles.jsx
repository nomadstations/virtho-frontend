import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Sparkles, Folder, BookOpen, Calendar, Briefcase } from 'lucide-react';
import { extractCountryFromBubbleText } from '@/utils/countryMapping';
import '@/styles/ActivityBubbles.css';

/**
 * ActivityBubbles Component
 * 
 * Displays animated 3D spherical nodes mapped to locations, 
 * with floating activity cards connected by straight lines.
 */

const COUNTRIES = [
  { name: 'Afghanistan', lat: 33.9391, lng: 67.7100 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
  { name: 'Spain', lat: 40.4637, lng: -3.7492 },
  { name: 'Italy', lat: 41.8719, lng: 12.5674 },
  { name: 'Georgia', lat: 42.3154, lng: 43.3569 },
  { name: 'United States', lat: 37.0902, lng: -95.7129 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167 },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062 },
  { name: 'Egypt', lat: 26.8206, lng: 30.8025 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860 }
];

const ACTIVITY_TYPES = [
  { id: 'group', message: 'A new Community group was formed', icon: Users },
  { id: 'organization', message: 'New organization was created', icon: Building2 },
  { id: 'joined', message: 'Somebody just joined', icon: Sparkles },
  { id: 'project', message: 'Project launched successfully', icon: Folder },
  { id: 'course', message: 'Course completed by a member', icon: BookOpen },
  { id: 'event', message: 'Community event started', icon: Calendar },
  { id: 'job', message: 'A new Job was posted', icon: Briefcase }
];

const FADE_IN_DURATION = 300;
const DISPLAY_DURATION = 3000;
const FADE_OUT_DURATION = 250;
const INTERVAL_BETWEEN_BUBBLES = 600;
const TOTAL_CYCLE_TIME = FADE_IN_DURATION + DISPLAY_DURATION + FADE_OUT_DURATION + INTERVAL_BETWEEN_BUBBLES;

function ActivityBubbles({ selectedCountry, onCountrySelect, onHighlightCountry }) {
  const [currentBubble, setCurrentBubble] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const bubbleIdCounter = useRef(0);

  useEffect(() => {
    if (currentBubble && onHighlightCountry) {
      const fullText = `In ${currentBubble.country}: ${currentBubble.message}`;
      const mappedCountry = extractCountryFromBubbleText(fullText);
      onHighlightCountry(mappedCountry);
    } else if (!currentBubble && onHighlightCountry) {
      onHighlightCountry(null);
    }
  }, [currentBubble, onHighlightCountry]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({ 
          width: containerRef.current.offsetWidth, 
          height: containerRef.current.offsetHeight 
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getCoordinates = (lat, lng, mapWidth, mapHeight) => {
    const rawX = (lng + 180) / 360 * mapWidth;
    const rawY = (90 - lat) / 180 * mapHeight;
    return { x: rawX, y: rawY };
  };

  const calculateExactCountryTarget = (countryName, container) => {
    const mapSvg = container.closest('.home-map-wrapper')?.querySelector('svg');
    if (!mapSvg) return null;

    let targetPath = mapSvg.querySelector(`path[id="country-${countryName.replace(/\s+/g, '-')}"]`) ||
                     mapSvg.querySelector(`path[name="${countryName}"]`);

    if (!targetPath) {
      const paths = Array.from(mapSvg.querySelectorAll('path'));
      for (let p of paths) {
        const fiberKey = Object.keys(p).find(k => k.startsWith('__reactFiber'));
        if (fiberKey) {
          let current = p[fiberKey];
          let depth = 0;
          while (current && depth < 5) {
            const propsName = current.memoizedProps?.geography?.properties?.name;
            if (propsName === countryName) {
              targetPath = p;
              break;
            }
            current = current.return;
            depth++;
          }
        }
        if (targetPath) break;
      }
    }

    if (targetPath) {
      try {
        const bbox = targetPath.getBBox();
        const ctm = targetPath.getScreenCTM();
        const containerRect = container.getBoundingClientRect();
        
        const pt = mapSvg.createSVGPoint();
        pt.x = bbox.x + bbox.width / 2;
        pt.y = bbox.y + bbox.height / 2;
        
        const screenPt = pt.matrixTransform(ctm);
        return {
          x: screenPt.x - containerRect.left,
          y: screenPt.y - containerRect.top
        };
      } catch (e) {
        console.warn(`Could not calculate exact SVG bounds for ${countryName}`, e);
      }
    }
    return null;
  };

  const generateBubbleData = () => {
    if (!containerDimensions.width || !containerDimensions.height || !containerRef.current) return null;
    
    const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    
    const exactTarget = calculateExactCountryTarget(randomCountry.name, containerRef.current);
    const approxTarget = getCoordinates(
      randomCountry.lat, randomCountry.lng, 
      containerDimensions.width, containerDimensions.height
    );

    const targetPos = exactTarget || approxTarget;

    const bubbleOffset = 90;
    
    let bubbleX = targetPos.x;
    let bubbleY = targetPos.y;

    if (targetPos.x > containerDimensions.width / 2) {
      bubbleX -= bubbleOffset;
    } else {
      bubbleX += bubbleOffset;
    }

    if (targetPos.y > containerDimensions.height / 2) {
      bubbleY -= bubbleOffset;
    } else {
      bubbleY += bubbleOffset;
    }

    const margin = 140;
    bubbleX = Math.max(margin, Math.min(bubbleX, containerDimensions.width - margin));
    bubbleY = Math.max(margin, Math.min(bubbleY, containerDimensions.height - margin));

    const dx = targetPos.x - bubbleX;
    const dy = targetPos.y - bubbleY;
    let tailDir = "bottom";
    if (Math.abs(dx) > Math.abs(dy)) {
      tailDir = dx > 0 ? "right" : "left";
    } else {
      tailDir = dy > 0 ? "bottom" : "top";
    }

    const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
    
    return {
      id: bubbleIdCounter.current++,
      ...activityType,
      targetX: targetPos.x,
      targetY: targetPos.y,
      bubbleX,
      bubbleY,
      country: randomCountry.name,
      tailDir,
    };
  };

  const createBubbleCycle = () => {
    const data = generateBubbleData();
    if (!data) {
      cycleTimeoutRef.current = setTimeout(createBubbleCycle, 1000);
      return;
    }

    setCurrentBubble(data);

    setTimeout(() => {
      setCurrentBubble(null);
    }, FADE_IN_DURATION + DISPLAY_DURATION + FADE_OUT_DURATION);

    cycleTimeoutRef.current = setTimeout(() => {
      createBubbleCycle();
    }, TOTAL_CYCLE_TIME);
  };

  useEffect(() => {
    if (containerDimensions.width && containerDimensions.height) {
      createBubbleCycle();
    }
    return () => {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    };
  }, [containerDimensions]);

  const handleBubbleClick = (country) => {
    if (onCountrySelect) {
      onCountrySelect(selectedCountry === country ? null : country);
    }
  };

  const bubbleVariants = {
    initial: { opacity: 0, scale: 0.85, y: 15 },
    animate: { 
      opacity: 1, scale: 1, y: 0, 
      transition: { duration: 0.25, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, scale: 0.85, y: -15, 
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentBubble && (
          <React.Fragment key={currentBubble.id}>
            {/* SVG Connector Path & Target Sphere */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10, overflow: 'visible' }}>
              <defs>
                <radialGradient id="virthoSphereGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#C9F1E3" />
                  <stop offset="40%" stopColor="#7ED0B8" />
                  <stop offset="100%" stopColor="#2E9578" />
                </radialGradient>
                <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Straight connector line drawn behind the sphere */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                d={`M ${currentBubble.bubbleX} ${currentBubble.bubbleY} L ${currentBubble.targetX} ${currentBubble.targetY}`}
                fill="none"
                stroke="#B7E3D4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* 3D Sphere Node */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.15, type: "spring", stiffness: 300, damping: 20 } }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                style={{ transformOrigin: `${currentBubble.targetX}px ${currentBubble.targetY}px` }}
              >
                <circle 
                  cx={currentBubble.targetX} 
                  cy={currentBubble.targetY} 
                  r="4.5" 
                  fill="url(#virthoSphereGrad)" 
                  filter="url(#sphereShadow)"
                  stroke="none"
                />
              </motion.g>
            </svg>

            {/* Floating Activity Card container */}
            <motion.div
              className="absolute flex items-center justify-center pointer-events-auto"
              style={{ 
                left: currentBubble.bubbleX, 
                top: currentBubble.bubbleY,
                transform: 'translate(-50%, -50%)',
                zIndex: 20 
              }}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => handleBubbleClick(currentBubble.country)}
            >
              <div 
                className={`activity-bubble-box relative flex items-center gap-3 bg-white transition-all duration-200 hover:scale-105 cursor-pointer ${
                  selectedCountry === currentBubble.country ? 'ring-2 ring-[#B7E3D4]' : ''
                }`}
                data-tail={currentBubble.tailDir}
                style={{
                  borderRadius: '8px',
                  padding: '10px 16px',
                  maxWidth: '320px',
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                {/* Sphere dot icon before text */}
                <div className="shrink-0 flex items-center justify-center w-3 h-3 relative z-10">
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ overflow: 'visible' }}>
                    <circle cx="6" cy="6" r="6" fill="url(#virthoSphereGrad)" filter="url(#sphereShadow)" stroke="none" />
                  </svg>
                </div>
                <span className="leading-snug text-left relative z-10">
                  <strong className="text-gray-900">In {currentBubble.country}:</strong> {currentBubble.message}
                </span>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActivityBubbles;