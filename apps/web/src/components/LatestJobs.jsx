import React from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_JOBS = [
  { id: '1', title: 'Senior Frontend Developer', company: 'TechFusion', location: 'Remote', salary: '$120k - $150k' },
  { id: '2', title: 'Product Manager', company: 'Innovate Labs', location: 'New York, NY', salary: '$110k - $130k' },
  { id: '3', title: 'Blockchain Engineer', company: 'DecentralX', location: 'London, UK', salary: '£90k - £120k' },
  { id: '4', title: 'UX/UI Designer', company: 'Creative Solutions', location: 'Remote', salary: '$85k - $105k' },
];

export default function LatestJobs() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground px-1">Featured Opportunities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_JOBS.map(job => (
          <div key={job.id} className="p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group hover:-translate-y-1" style={{ borderColor: 'hsla(var(--zone-economy), 0.2)' }}>
            <h4 className="font-bold text-foreground mb-1 line-clamp-1">{job.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{job.company}</p>
            
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <DollarSign className="w-3.5 h-3.5 mr-2" />
                {job.salary}
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-border">
              <Link to={`/jobs/${job.id}`} className="flex items-center justify-center w-full py-2 bg-primary-lighter text-primary-dark text-xs font-semibold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}