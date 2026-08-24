import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin } from 'lucide-react';
import RealmChipsFilter from '@/components/RealmChipsFilter';
import { getRealmsLabel } from '@/utils/realmLabels';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Global Health & Tech Summit',
    date: '2026-08-15',
    location: 'Virtual',
    realms: ['health', 'economy'],
    description: 'Exploring the intersection of digital economy and universal health access.'
  },
  {
    id: '2',
    title: 'Creative Coding Workshop',
    date: '2026-09-02',
    location: 'London, UK',
    realms: ['knowledge', 'culture'],
    description: 'Learn to build artistic web experiences in this hands-on intensive course.'
  },
  {
    id: '3',
    title: 'Social Town Hall',
    date: '2026-07-28',
    location: 'New York, USA',
    realms: ['social'],
    description: 'Monthly gathering for all community builders and social organizers.'
  },
  {
    id: '4',
    title: 'Future of Logistics Expo',
    date: '2026-10-10',
    location: 'Berlin, UK',
    realms: ['economy'],
    description: 'Discover the latest innovations in decentralized supply chains.'
  }
];

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeRealm = searchParams.get('realm');

  const filteredEvents = activeRealm 
    ? MOCK_EVENTS.filter(e => e.realms.includes(activeRealm))
    : MOCK_EVENTS;

  const handleRealmChange = (newRealm) => {
    if (newRealm) {
      searchParams.set('realm', newRealm);
    } else {
      searchParams.delete('realm');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      <Helmet>
        <title>Events - Virtho</title>
        <meta name="description" content="Upcoming cross-realm events and gatherings." />
      </Helmet>
      
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {activeRealm ? `${getRealmsLabel(activeRealm)} Events` : 'All Events'}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Discover upcoming cross-realm gatherings and summits.</p>
      </div>

      <RealmChipsFilter currentRealm={activeRealm} onRealmChange={handleRealmChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.realms.map(realm => (
                <span 
                  key={realm}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `hsl(var(--zone-${realm}-soft))`,
                    color: `hsl(var(--zone-${realm}-ink))`,
                    border: `1px solid hsla(var(--zone-${realm}), 0.3)`
                  }}
                >
                  {getRealmsLabel(realm)}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{event.description}</p>
            
            <div className="space-y-3 mt-auto pt-5 border-t border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-muted rounded-md"><Calendar className="w-4 h-4 text-foreground" /></div>
                <span className="font-medium text-foreground">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-muted rounded-md"><MapPin className="w-4 h-4 text-foreground" /></div>
                <span className="font-medium text-foreground">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No events scheduled</h3>
            <p className="text-muted-foreground">We couldn't find any events for the selected realm at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}