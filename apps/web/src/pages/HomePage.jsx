import React from 'react';
import { Helmet } from 'react-helmet';
import { Heart, BookOpen, Users, Briefcase, Palette } from 'lucide-react';
import { ZONES } from '@/config/zoneConfig';
import { getRealmsLabel } from '@/utils/realmLabels';
import SearchBar from '@/components/SearchBar';
import LatestLearning from '@/components/LatestLearning';
import LatestCommunities from '@/components/LatestCommunities';
import LatestJobs from '@/components/LatestJobs';
import LatestMarketplace from '@/components/LatestMarketplace';

const ZONE_ICONS = {
  health: Heart,
  knowledge: BookOpen,
  social: Users,
  economy: Briefcase,
  culture: Palette
};

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center">
      <Helmet>
        <title>Virtho Foundation - Human Development Realms</title>
        <meta name="description" content="Empowering global human development through integrated communities, decentralized economy, and holistic health." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="w-full bg-card border-b border-border py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            Explore the <span className="text-primary">Five Realms</span> of Human Development
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A fully integrated ecosystem covering health, knowledge, social connection, economic growth, and cultural expression.
          </p>
          <div className="flex justify-center w-full">
            <SearchBar className="max-w-2xl mx-auto shadow-lg shadow-primary/5" />
          </div>
        </div>
      </section>

      {/* Dynamic Realm Sections mapped over ZONES */}
      <main className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-20 space-y-20 md:space-y-32">
        {ZONES.map(zone => {
          const Icon = ZONE_ICONS[zone] || Palette;
          const label = getRealmsLabel(zone);
          
          return (
            <section key={zone} id={`section-${zone}`} className="w-full flex flex-col space-y-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: `hsla(var(--zone-${zone}), 0.15)` }}>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ 
                    backgroundColor: `hsl(var(--zone-${zone}-soft))`, 
                    color: `hsl(var(--zone-${zone}-ink))` 
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: `hsl(var(--zone-${zone}-ink))` }}
                  >
                    {label}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Discover latest updates and opportunities in {label.toLowerCase()}.</p>
                </div>
              </div>
              
              {/* Dynamic Section Content */}
              <div className="w-full pt-2">
                {zone === 'health' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-6 rounded-2xl border flex flex-col items-center justify-center text-center h-56 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderColor: `hsla(var(--zone-health), 0.2)` }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `hsla(var(--zone-health), 0.1)` }}>
                          <Heart className="w-8 h-8 opacity-70" style={{ color: `hsl(var(--zone-health-ink))` }} />
                        </div>
                        <p className="text-sm font-semibold" style={{ color: `hsl(var(--zone-health-ink))` }}>Health metrics & profiles<br/>coming soon</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {zone === 'knowledge' && <LatestLearning />}
                
                {zone === 'social' && <LatestCommunities />}
                
                {zone === 'economy' && (
                  <div className="space-y-16">
                    <LatestJobs />
                    <LatestMarketplace />
                  </div>
                )}
                
                {zone === 'culture' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-6 rounded-2xl border flex flex-col items-center justify-center text-center h-56 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderColor: `hsla(var(--zone-culture), 0.2)` }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `hsla(var(--zone-culture), 0.1)` }}>
                          <Palette className="w-8 h-8 opacity-70" style={{ color: `hsl(var(--zone-culture-ink))` }} />
                        </div>
                        <p className="text-sm font-semibold" style={{ color: `hsl(var(--zone-culture-ink))` }}>Games and creative projects<br/>coming soon</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}