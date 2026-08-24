import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon, Menu, X, LayoutGrid, ChevronDown, User, Building, Users, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useZone } from '@/context/ZoneContext.jsx';
import { Button } from '@/ui/primitives/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import ActingOnBehalfPopover from '@/ui/components/ActingOnBehalfPopover.jsx';
import { VirthoPortalLogo } from '@/ui/components/VirthoPortalLogo';

import QuickActionsPopover from '@/ui/components/QuickActionsPopover.jsx';
import CartPopover from '@/ui/components/CartPopover.jsx';
import ProfilePopover from '@/ui/components/ProfilePopover.jsx';

import { NAV_LINKS, ROUTES } from '@/constants';
import { REALM_DROPDOWN_CONFIG } from '@/config/zoneConfig';
import '@/styles/HeaderMenu.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);
  
  const [actingContext, setActingContext] = useState('person'); 
  const [actingEntity, setActingEntity] = useState('Alex Developer');
  const [isActingDropdownOpen, setIsActingDropdownOpen] = useState(false);
  
  const { cartItems } = useCart();
  const { isAuthenticated, currentUser } = useAuth();
  const { zone } = useZone();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getActiveRealm = () => {
    const realmParam = searchParams.get('realm');
    if (realmParam) return realmParam;
    for (const link of NAV_LINKS) {
      if (link.realm && link.subLinks) {
        if (link.subLinks.some(sub => sub.path === location.pathname || (sub.path.includes('?') && sub.path.split('?')[0] === location.pathname))) {
          return link.realm;
        }
      }
    }
    return null;
  };

  const activeRealm = getActiveRealm();
  
  const activeZoneColor = activeRealm ? `var(--zone-${activeRealm})` : 'var(--primary)';
  const activeZoneSoft = activeRealm ? `var(--zone-${activeRealm}-soft)` : 'var(--primary-lighter)';
  const activeZoneInk = activeRealm ? `var(--zone-${activeRealm}-ink)` : 'var(--primary-dark)';

  const isLinkActive = (link) => {
    if (link.path && link.path === location.pathname) return true;
    if (link.realm && link.realm === activeRealm) return true;
    return false;
  };

  const getNavLinkStyle = (isActive) => {
    if (!isActive) return {};
    return {
      backgroundColor: `hsl(${activeZoneSoft})`,
      color: `hsl(${activeZoneInk})`,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    };
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const getActingIcon = () => {
    switch (actingContext) {
      case 'organization': return Building;
      case 'group': return Users;
      case 'person': default: return User;
    }
  };

  const ActingIcon = getActingIcon();

  const handleContextChange = (data) => {
    setActingContext(data.type);
    setActingEntity(data.entity);
  };

  const renderDropdownItem = (subLink) => {
    const isSubActive = location.pathname === subLink.path || (subLink.path.includes('?') && subLink.path.split('?')[0] === location.pathname);
    return (
      <Link
        key={subLink.path}
        to={subLink.path}
        className={`block px-4 py-2 text-sm transition-colors ${!isSubActive ? 'text-foreground hover:bg-muted' : ''}`}
        style={getNavLinkStyle(isSubActive)}
        onClick={() => {
          setActiveDropdown(null);
          setIsMenuOpen(false);
        }}
      >
        {subLink.name}
      </Link>
    );
  };

  const renderMobileDropdownItem = (subLink) => {
    const isSubActive = location.pathname === subLink.path || (subLink.path.includes('?') && location.pathname + location.search === subLink.path);
    return (
      <Link
        key={subLink.path}
        to={subLink.path}
        onClick={() => setIsMenuOpen(false)}
        className={`block px-4 py-2 text-sm rounded-md transition-colors ${!isSubActive ? 'text-foreground hover:bg-muted' : ''}`}
        style={getNavLinkStyle(isSubActive)}
      >
        {subLink.name}
      </Link>
    );
  };

  return (
    <header className="header-full-width sticky top-0 w-full bg-background/95 backdrop-blur-md shadow-sm flex flex-col pb-[3px]" style={{ zIndex: 'var(--z-header)', position: 'relative' }}>
      <div className="header-content-wrapper relative">
        <div className="flex flex-row items-center justify-between h-20 md:h-24 w-full">
          
          <div className="flex items-center gap-2 xl:gap-6 shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 -ml-2 text-foreground hover:bg-muted rounded-md transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link 
              to={ROUTES.HOME} 
              className="flex items-center shrink-0 py-2 hover:opacity-90 transition-opacity"
              aria-label="Virtho Portal - Home"
            >
              <VirthoPortalLogo size={40} showText={true} hideTextOnMobile={true} />
            </Link>
          </div>

          <nav className="flex-1 mx-4 hidden xl:flex items-center justify-center min-w-0">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link, index) => {
                const isActive = isLinkActive(link);
                
                if (link.dropdown) {
                  const realmConfig = link.realm ? REALM_DROPDOWN_CONFIG[link.realm] : null;

                  return (
                    <div 
                      key={link.name} 
                      className="relative group header-dropdown"
                      style={{ zIndex: activeDropdown === index ? 'var(--z-dropdown)' : 'auto' }}
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button 
                        className={`header-dropdown-button px-3 py-2 rounded-md font-medium text-sm transition-all ${!isActive ? 'text-foreground hover:bg-muted hover:text-foreground' : ''}`}
                        style={getNavLinkStyle(isActive)}
                      >
                        {link.name} <ChevronDown className={`w-4 h-4 ml-1 inline-block transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="header-dropdown-menu bg-card border border-border shadow-md rounded-lg overflow-hidden absolute top-full left-0 min-w-[200px] mt-2 py-2"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {realmConfig ? (
                              <>
                                {realmConfig.nativeItems.map(renderDropdownItem)}
                                <div className="my-1 border-t border-border/60"></div>
                                <div className="px-4 py-1 mt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Content</div>
                                {realmConfig.contentItems.map(renderDropdownItem)}
                              </>
                            ) : (
                              link.subLinks.map(renderDropdownItem)
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    className={`rounded-md transition-all duration-200 font-medium whitespace-nowrap px-3 py-2 text-sm ${!isActive ? 'text-foreground hover:bg-muted hover:text-foreground' : ''}`}
                    style={getNavLinkStyle(isActive)}
                    end={link.path === ROUTES.HOME}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center shrink-0 flex-nowrap gap-2 xl:gap-4 pr-3 xl:pr-4">
            {isAuthenticated ? (
              <>
                {/* 1. Dashboard Nav (Grid Icon) */}
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => navigate(ROUTES.DASHBOARD)} 
                        className="relative p-1.5 xl:p-2.5 text-foreground hover:bg-muted rounded-full transition-colors group shrink-0" 
                        aria-label="Dashboard"
                      >
                        <LayoutGrid className="w-5 h-5 xl:w-6 xl:h-6 transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground border-border z-[150]">
                      <p className="text-sm font-semibold">Dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* 2. Quick Actions */}
                <div className="relative">
                  <button onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)} className="relative p-1.5 xl:p-2.5 text-foreground hover:bg-muted rounded-full transition-colors group shrink-0" aria-label="Quick Actions" title="Quick Actions">
                    <Zap className="w-5 h-5 xl:w-6 xl:h-6 transition-colors" />
                  </button>
                  <QuickActionsPopover isOpen={isQuickActionsOpen} onClose={() => setIsQuickActionsOpen(false)} />
                </div>

                {/* 3. Cart */}
                <div className="relative">
                  <button onClick={() => setIsCartPopoverOpen(!isCartPopoverOpen)} className="relative p-1.5 xl:p-2.5 text-foreground hover:bg-muted rounded-full transition-colors group shrink-0" aria-label="Open cart">
                    <ShoppingCartIcon className="w-5 h-5 xl:w-6 xl:h-6 transition-colors" />
                    {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 bg-secondary-dark text-secondary-foreground text-[10px] xl:text-[11px] font-bold rounded-full w-4 h-4 xl:w-5 xl:h-5 flex items-center justify-center shadow-sm border-2 border-background">{totalItems}</span>}
                  </button>
                  <CartPopover isOpen={isCartPopoverOpen} onClose={() => setIsCartPopoverOpen(false)} />
                </div>
                
                {/* 4. EN Selector */}
                <button className="flex rounded-full bg-muted border border-border hover:bg-gray-200 hover:border-border items-center justify-center font-bold text-foreground transition-all shrink-0 text-xs px-2 py-1 xl:text-sm xl:px-3 xl:py-1.5" aria-label="Switch Language">
                  EN
                </button>

                {/* 5. Acting On Behalf (Avatar Icon / Person Icon) */}
                <div className="relative shrink-0 flex items-center hidden xl:flex">
                  <button 
                    onClick={() => setIsActingDropdownOpen(true)} 
                    className="p-1.5 xl:p-2.5 text-foreground hover:bg-muted rounded-full transition-colors group" 
                    aria-label={`Acting as ${actingEntity}`} 
                    title={`Acting as ${actingEntity}`}
                  >
                    <ActingIcon className="w-5 h-5 xl:w-6 xl:h-6 transition-all duration-300" />
                  </button>
                </div>

                {/* 6. Account/Profile (Avatar circle with initials) - RIGHTMOST */}
                <div className="relative shrink-0 flex items-center">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold hover:bg-primary-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                  </button>
                  <ProfilePopover isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <Link to={ROUTES.LOGIN} className="hidden xl:block">
                  <Button variant="ghost" className="text-foreground hover:bg-muted font-semibold px-5 h-11">Login</Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button className="font-bold px-4 xl:px-6 h-9 xl:h-11 text-xs xl:text-sm shrink-0">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-[3px] max-w-none transition-colors duration-300 ease"
        style={{ backgroundColor: `hsl(${activeZoneColor})` }}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-card border-b border-border shadow-lg absolute w-full left-0 top-full"
            style={{ zIndex: 'var(--z-dropdown)' }}
          >
            <nav className="px-4 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_LINKS.map((link, index) => {
                const isActive = isLinkActive(link);
                
                if (link.dropdown) {
                  const realmConfig = link.realm ? REALM_DROPDOWN_CONFIG[link.realm] : null;

                  return (
                    <div key={link.name} className="space-y-1">
                      <button 
                        onClick={() => toggleDropdown(index)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-base font-medium rounded-md ${!isActive ? 'text-foreground hover:bg-muted' : ''}`}
                        style={getNavLinkStyle(isActive)}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 border-l-2 border-border ml-2 mt-1 space-y-1 overflow-hidden"
                          >
                            {realmConfig ? (
                              <>
                                {realmConfig.nativeItems.map(renderMobileDropdownItem)}
                                <div className="my-2 border-t border-border/50"></div>
                                <div className="px-4 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Content</div>
                                {realmConfig.contentItems.map(renderMobileDropdownItem)}
                              </>
                            ) : (
                              link.subLinks.map(renderMobileDropdownItem)
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md transition-all duration-200 font-medium ${!isActive ? 'text-foreground hover:bg-muted' : ''}`}
                    style={getNavLinkStyle(isActive)}
                    end={link.path === ROUTES.HOME}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              
              <div className="pt-6 mt-4 border-t border-border flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <div 
                      onClick={() => {
                        setIsActingDropdownOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-between bg-muted p-3 rounded-lg border border-border mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ActingIcon className="w-5 h-5 text-primary-dark" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Acting on behalf of:</span>
                          <span className="text-sm font-semibold text-foreground">{actingEntity}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center h-12 font-bold">Login</Button>
                    </Link>
                    <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center h-12 font-bold shadow-md">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ActingOnBehalfPopover 
        isOpen={isActingDropdownOpen} 
        onClose={() => setIsActingDropdownOpen(false)}
        actingContext={actingContext}
        actingEntity={actingEntity}
        onContextChange={handleContextChange}
      />
    </header>
  );
};

export default Header;