import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/ui/primitives/toaster';
import { CartProvider } from '@/hooks/useCart.jsx';
import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
import { ZoneProvider, useZone } from '@/context/ZoneContext.jsx';
import { OpenAppsProvider } from '@/ui/context/OpenAppsContext.jsx';
import useWorkspaceNavigation from '@/ui/hooks/useWorkspaceNavigation.jsx';
import { getSectionKeyFromLocation } from '@/utils/zoneUtils.js';
import { getZoneForKey, MODULE_ZONE_MAP } from '@/config/zoneConfig.js';
import { PROVIDER_APPS } from '@/config/providerApps.js';
import { ROUTES } from '@/constants';
import Layout from '@/ui/components/Layout.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';

if (typeof window !== 'undefined') {
  const sectionKey = getSectionKeyFromLocation(window.location);
  const resolvedZone = getZoneForKey(sectionKey, MODULE_ZONE_MAP);
  if (!resolvedZone) {
    document.documentElement.style.setProperty('--zone', 'var(--primary)');
    document.documentElement.style.setProperty('--zone-soft', 'var(--primary-lighter)');
    document.documentElement.style.setProperty('--zone-ink', 'var(--primary-dark)');
  } else {
    document.documentElement.style.setProperty('--zone', `var(--zone-${resolvedZone})`);
    document.documentElement.style.setProperty('--zone-soft', `var(--zone-${resolvedZone}-soft)`);
    document.documentElement.style.setProperty('--zone-ink', `var(--zone-${resolvedZone}-ink)`);
  }
}

import HomePage from '@/pages/HomePage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import CreateProjectPage from '@/pages/CreateProjectPage.jsx';
import ProjectDetailPage from '@/pages/ProjectDetailPage.jsx';
import ProjectResourcesPage from '@/pages/ProjectResourcesPage.jsx';
import ProjectMicrositePage from '@/pages/ProjectMicrositePage.jsx';
import ProjectsManagementPage from '@/pages/ProjectsManagementPage.jsx';
import JobsManagementPage from '@/pages/JobsManagementPage.jsx';
import LearningManagementPage from '@/pages/LearningManagementPage.jsx';
import BlogsPage from '@/pages/BlogsPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import TermsPage from '@/pages/TermsPage.jsx';
import PrivacyPage from '@/pages/PrivacyPage.jsx';
import ProjectsPage from '@/pages/ProjectsPage.jsx';
import CommunityPage from '@/pages/CommunityPage.jsx';
import HumanDetailPage from '@/pages/HumanDetailPage.jsx';
import GroupDetailPage from '@/pages/GroupDetailPage.jsx';
import OrganizationDetailPage from '@/pages/OrganizationDetailPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import SupportUsPage from '@/pages/SupportUsPage.jsx';
import MarketplacePage from '@/pages/MarketplacePage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import JobsPage from '@/pages/JobsPage.jsx';
import JobDetailsPage from '@/pages/JobDetailsPage.jsx';
import LearningPage from '@/pages/LearningPage.jsx';
import LearningDetailsPage from '@/pages/LearningDetailsPage.jsx';
import GalleryPage from '@/pages/GalleryPage.jsx';
import OrganizationsPage from '@/pages/OrganizationsPage.jsx';
import GroupsPage from '@/pages/GroupsPage.jsx';
import UsersPage from '@/pages/UsersPage.jsx';
import UserDirectory from '@/ui/components/UserDirectory.jsx';
import RolesPermissions from '@/ui/components/RolesPermissions.jsx';
import Groups from '@/components/Groups.jsx';
import Invitations from '@/components/Invitations.jsx';
import ActivityLog from '@/components/ActivityLog.jsx';
import TeamsPage from '@/pages/TeamsPage.jsx';
import WellnessPage from '@/pages/health/WellnessPage.jsx';
import HealthIDPage from '@/pages/health/HealthIDPage.jsx';
import LegalAndInsurancePage from '@/pages/health/LegalAndInsurancePage.jsx';
import WorkspacePage from '@/ui/pages/WorkspacePage.jsx';

// New Placeholder Pages
import LearningResourcesPage from '@/pages/LearningResourcesPage.jsx';
import EducationalProgramsPage from '@/pages/EducationalProgramsPage.jsx';
import FinancesPage from '@/pages/FinancesPage.jsx';
import LogisticsPage from '@/pages/LogisticsPage.jsx';
import GamesPage from '@/pages/GamesPage.jsx';
import EventsPage from '@/pages/EventsPage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

function ZoneSynchronizer() {
  const location = useLocation();
  const { setZone, moduleZoneMap } = useZone();

  useEffect(() => {
    let sectionKey = getSectionKeyFromLocation(location);
    
    if (location.pathname.startsWith('/workspace/')) {
      const matchedApp = PROVIDER_APPS.find(a => location.pathname.startsWith(a.targetRoute));
      if (matchedApp) {
        sectionKey = matchedApp.zone;
      }
    }
    
    const resolvedZone = getZoneForKey(sectionKey, moduleZoneMap);
    setZone(resolvedZone);
  }, [location, setZone, moduleZoneMap]);

  return null;
}

function NavigationTracker() {
  useWorkspaceNavigation();
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
};

function AnimatedRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path={ROUTES.HOME} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><HomePage /></motion.div>} />
        <Route path={ROUTES.ABOUT} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><AboutPage /></motion.div>} />
        
        {/* Health */}
        <Route path={ROUTES.HEALTH_WELLNESS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><WellnessPage /></motion.div>} />
        <Route path={ROUTES.HEALTH_ID} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><HealthIDPage /></motion.div>} />
        <Route path={ROUTES.HEALTH_LEGAL} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LegalAndInsurancePage /></motion.div>} />
        
        {/* New Realm Routes */}
        <Route path={ROUTES.LEARNING_RESOURCES} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LearningResourcesPage /></motion.div>} />
        <Route path={ROUTES.EDUCATIONAL_PROGRAMS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><EducationalProgramsPage /></motion.div>} />
        <Route path={ROUTES.FINANCES} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><FinancesPage /></motion.div>} />
        <Route path={ROUTES.LOGISTICS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LogisticsPage /></motion.div>} />
        <Route path={ROUTES.GAMES} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><GamesPage /></motion.div>} />
        <Route path={ROUTES.EVENTS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><EventsPage /></motion.div>} />

        {/* Existing Routes */}
        <Route path={ROUTES.PROJECTS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProjectsPage /></motion.div>} />
        <Route path="/project/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProjectDetailPage /></motion.div>} />
        <Route path="/project/:id/microsite" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProjectMicrositePage /></motion.div>} />
        
        <Route path={ROUTES.COMMUNITY} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><CommunityPage /></motion.div>} />
        <Route path="/communities" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><CommunityPage /></motion.div>} />
        <Route path="/community/human/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><HumanDetailPage /></motion.div>} />
        <Route path="/community/group/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><GroupDetailPage /></motion.div>} />
        <Route path="/community/organization/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><OrganizationDetailPage /></motion.div>} />
        
        <Route path={ROUTES.JOBS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><JobsPage /></motion.div>} />
        <Route path="/jobs/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><JobDetailsPage /></motion.div>} />
        
        <Route path={ROUTES.LEARNING} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LearningPage /></motion.div>} />
        <Route path="/learning/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LearningDetailsPage /></motion.div>} />
        
        <Route path={ROUTES.MARKETPLACE} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><MarketplacePage /></motion.div>} />
        <Route path="/product/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProductDetailPage /></motion.div>} />
        <Route path="/success" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><SuccessPage /></motion.div>} />
        
        <Route path={ROUTES.BLOGS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><BlogsPage /></motion.div>} />
        <Route path={ROUTES.BLOG_DETAIL} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><BlogDetailPage /></motion.div>} />
        
        <Route path={ROUTES.GALLERY} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><GalleryPage /></motion.div>} />
        <Route path={ROUTES.CONTACT} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ContactPage /></motion.div>} />
        <Route path={ROUTES.SUPPORT} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><SupportUsPage /></motion.div>} />
        <Route path={ROUTES.TERMS} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><TermsPage /></motion.div>} />
        <Route path={ROUTES.PRIVACY} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><PrivacyPage /></motion.div>} />
        
        <Route path={ROUTES.LOGIN} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LoginPage /></motion.div>} />
        <Route path={ROUTES.REGISTER} element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><RegisterPage /></motion.div>} />
        
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><DashboardPage /></motion.div></ProtectedRoute>} />
        <Route path="/workspace/:appKey" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><WorkspacePage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/organizations" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><OrganizationsPage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/groups" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><GroupsPage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/people" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><UsersPage /></motion.div></ProtectedRoute>} />
        <Route path="/users/directory" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><UserDirectory /></motion.div></ProtectedRoute>} />
        <Route path="/users/permissions" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><RolesPermissions /></motion.div></ProtectedRoute>} />
        <Route path="/users/groups" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><Groups /></motion.div></ProtectedRoute>} />
        <Route path="/users/invitations" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><Invitations /></motion.div></ProtectedRoute>} />
        <Route path="/users/activity-log" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ActivityLog /></motion.div></ProtectedRoute>} />
        <Route path="/users/roles" element={<ProtectedRoute><Navigate to="/users/permissions" replace /></ProtectedRoute>} />
        <Route path="/dashboard/teams" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><TeamsPage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/projects" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProjectsManagementPage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/jobs" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><JobsManagementPage /></motion.div></ProtectedRoute>} />
        <Route path="/dashboard/learning" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><LearningManagementPage /></motion.div></ProtectedRoute>} />
        <Route path="/project/:id/resources" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProjectResourcesPage /></motion.div></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><CreateProjectPage /></motion.div></ProtectedRoute>} />
        <Route path={ROUTES.PROFILE} element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><ProfilePage /></motion.div></ProtectedRoute>} />
        <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}><SettingsPage /></motion.div></ProtectedRoute>} />
        
        <Route path="/organizations" element={<ProtectedRoute><Navigate to="/dashboard/organizations" replace /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Navigate to="/dashboard/groups" replace /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Navigate to="/dashboard/people" replace /></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><Navigate to="/dashboard/teams" replace /></ProtectedRoute>} />
        <Route path="/projects-management" element={<ProtectedRoute><Navigate to="/dashboard/projects" replace /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ZoneProvider>
        <ZoneSynchronizer />
        <ThemeProvider>
          <AuthProvider>
            <OpenAppsProvider>
              <NavigationTracker />
              <CartProvider>
                <Layout setIsCartOpen={setIsCartOpen}>
                  <AnimatedRoutes />
                </Layout>

                <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <Toaster />
              </CartProvider>
            </OpenAppsProvider>
          </AuthProvider>
        </ThemeProvider>
      </ZoneProvider>
    </Router>
  );
}

export default App;