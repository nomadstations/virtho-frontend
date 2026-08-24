import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/DashboardLayout';
import { EmptyState } from '@/components/SharedUI';
import { FolderOpen } from 'lucide-react';

function ProjectResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Project Resources - Virtho</title>
      </Helmet>
      
      <DashboardLayout>
        <div className="pt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Project Resources</h1>
            <EmptyState 
                icon={FolderOpen} 
                title="No Resources Yet" 
                description="Upload files, documents, and assets related to your project here."
                actionText="Upload File"
                onAction={() => {}}
            />
        </div>
      </DashboardLayout>
    </>
  );
}

export default ProjectResourcesPage;