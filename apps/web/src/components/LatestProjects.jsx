import React from 'react';
import { Rocket } from 'lucide-react';
import ProjectCard from './ProjectCard';
import SectionHeader from './sections/SectionHeader';
import ItemGrid from './sections/ItemGrid';
import { MOCK_PROJECTS } from '@/constants/mockDataConfig';

function LatestProjects() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Featured Projects" 
          icon={Rocket} 
          viewAllLink="/projects" 
        />
        <ItemGrid 
          items={MOCK_PROJECTS} 
          renderItem={(project) => <ProjectCard project={project} />} 
        />
      </div>
    </section>
  );
}

export default LatestProjects;