import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/constants';

function ProjectMicrositePage() {
  const { id } = useParams();
  
  return (
    <>
      <Helmet>
        <title>Microsite Settings - Virtho</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
            <ExternalLink className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Microsite Publisher</h1>
            <p className="text-gray-600 mb-8">This feature allows you to publish a standalone landing page for your project. Currently under construction.</p>
            <Link to={`/project/${id}`}>
                <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
                </Button>
            </Link>
        </div>
      </div>
    </>
  );
}

export default ProjectMicrositePage;