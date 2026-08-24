import React from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_COMMUNITIES = [
  { id: '1', title: 'Web3 Innovators', members: 1240, description: 'Building the decentralized web together with open-source tools.' },
  { id: '2', title: 'Eco Warriors', members: 890, description: 'Sustainability, climate action, and green energy discussions.' },
  { id: '3', title: 'Health Tech Pioneers', members: 560, description: 'Intersection of modern medicine and software engineering.' },
  { id: '4', title: 'Creative Coders', members: 2100, description: 'Where art, design, and sophisticated code combined to make magic.' },
];

export default function LatestCommunities() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_COMMUNITIES.map(community => (
        <div key={community.id} className="p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-primary-lighter rounded-lg text-primary-dark group-hover:bg-primary group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground line-clamp-2">{community.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{community.description}</p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground">{community.members} members</span>
            <Link to={`/community/group/${community.id}`} className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              Join
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}