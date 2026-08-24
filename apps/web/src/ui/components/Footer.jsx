import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { ROUTES } from '@/constants';
import { VirthoPortalLogo } from '@/ui/components/VirthoPortalLogo';
import '@/styles/FooterMenu.css';

function Footer({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';
  const containerClass = isDark ? 'dark' : '';

  const footerSections = [
    {
      title: 'HEALTH',
      color: 'var(--zone-health)',
      links: [
        { name: 'Wellness', path: ROUTES.HEALTH_WELLNESS },
        { name: 'Health ID', path: ROUTES.HEALTH_ID },
        { name: 'Legal & Insurance', path: ROUTES.HEALTH_LEGAL },
      ]
    },
    {
      title: 'KNOWLEDGE',
      color: 'var(--zone-knowledge)',
      links: [
        { name: 'Learning Resources', path: ROUTES.LEARNING_RESOURCES },
        { name: 'Courses', path: ROUTES.LEARNING },
        { name: 'Educational Programs', path: ROUTES.EDUCATIONAL_PROGRAMS },
        { name: 'Blogs', path: '/blogs?realm=knowledge' },
        { name: 'Projects', path: '/projects?realm=knowledge' },
        { name: 'Events', path: '/events?realm=knowledge' },
      ]
    },
    {
      title: 'SOCIAL',
      color: 'var(--zone-social)',
      links: [
        { name: 'Communities', path: ROUTES.COMMUNITY },
        { name: 'Blogs', path: '/blogs?realm=social' },
        { name: 'Projects', path: '/projects?realm=social' },
        { name: 'Events', path: '/events?realm=social' },
      ]
    },
    {
      title: 'ECONOMY',
      color: 'var(--zone-economy)',
      links: [
        { name: 'Jobs', path: ROUTES.JOBS },
        { name: 'Marketplace', path: ROUTES.MARKETPLACE },
        { name: 'Finances', path: ROUTES.FINANCES },
        { name: 'Logistics', path: ROUTES.LOGISTICS },
        { name: 'Blogs', path: '/blogs?realm=economy' },
        { name: 'Projects', path: '/projects?realm=economy' },
        { name: 'Events', path: '/events?realm=economy' },
      ]
    },
    {
      title: 'CULTURE & ART',
      color: 'var(--zone-culture)',
      links: [
        { name: 'Games', path: ROUTES.GAMES },
        { name: 'Blogs', path: '/blogs?realm=culture' },
        { name: 'Projects', path: '/projects?realm=culture' },
        { name: 'Events', path: '/events?realm=culture' },
      ]
    }
  ];

  return (
    <footer className={`footer-master-container ${containerClass} ${className} bg-[hsl(var(--footer-bg))]`}>
      <div className="footer-content-wrapper max-w-[1400px] mx-auto w-full px-4 pt-12">
        
        <div className="footer-top-bar flex flex-col md:flex-row justify-between items-center md:items-start gap-6 pb-10 border-b border-[hsl(var(--footer-border))]">
          <div className="footer-branding text-center md:text-left flex flex-col items-center md:items-start gap-3">
            <VirthoPortalLogo size={40} showText={true} hideTextOnMobile={false} />
            <p className="text-[hsl(var(--footer-muted))] text-sm max-w-md mt-2">
              Empowering global human development through integrated communities, decentralized economy, and holistic health ecosystems.
            </p>
          </div>
          
          <div className="footer-socials flex gap-3 pt-2">
            {[
              { icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
              { icon: Instagram, label: 'Instagram', url: 'https://instagram.com' },
              { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
              { icon: Youtube, label: 'YouTube', url: 'https://youtube.com' },
              { icon: Send, label: 'Telegram', url: 'https://telegram.org' }
            ].map((Social, index) => (
              <a 
                key={index}
                href={Social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={Social.label}
                className="w-10 h-10 rounded-full bg-[hsl(var(--footer-border))] flex items-center justify-center text-[hsl(var(--footer-fg))] hover:bg-[hsl(var(--primary-dark))] hover:text-white transition-all duration-300 transform hover:-translate-y-1 focus-ring focus-visible:ring-offset-[hsl(var(--footer-bg))]"
              >
                <Social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 py-12">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4 className="font-bold mb-4 tracking-wider text-sm" style={{ color: `hsl(${section.color})` }}>{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.path} className="text-[hsl(var(--footer-muted))] hover:text-[hsl(var(--footer-fg))] transition-colors text-sm focus-ring rounded-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom-bar flex flex-col md:flex-row justify-between items-center gap-4 pt-8 pb-8 border-t border-[hsl(var(--footer-border))] text-xs text-[hsl(var(--footer-muted))]">
          <p>© {new Date().getFullYear()} Virtho Foundation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={ROUTES.ABOUT} className="hover:text-[hsl(var(--footer-fg))] focus-ring rounded-sm">About</a>
            <a href={ROUTES.TERMS} className="hover:text-[hsl(var(--footer-fg))] focus-ring rounded-sm">Terms</a>
            <a href={ROUTES.PRIVACY} className="hover:text-[hsl(var(--footer-fg))] focus-ring rounded-sm">Privacy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;