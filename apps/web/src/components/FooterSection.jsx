import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = ({ title, links = [], className = '' }) => {
  return (
    <div className={`footer-section-wrapper flex flex-col gap-4 ${className}`}>
      {title && (
        <h3 className="footer-section-title text-lg font-semibold tracking-wide uppercase text-[hsl(var(--brand-purple))]">
          {title}
        </h3>
      )}
      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {links.map((link, idx) => (
          <li key={idx} className="m-0 p-0">
            <Link 
              to={link.path || link.href || '#'} 
              className="footer-link-item text-[hsl(var(--footer-fg))] opacity-80 hover:opacity-100 hover:text-[hsl(var(--brand-purple))] transition-all duration-200 inline-flex text-sm font-medium"
            >
              {link.name || link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;