import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import EnhancedProjectForm from '@/components/forms/EnhancedProjectForm';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';

export default function CreateProjectPage() {
  return (
    <>
      <Helmet>
        <title>Create New Project - Virtho</title>
        <meta name="description" content="Create a new project with detailed information and team assignment" />
      </Helmet>

      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <DashboardBreadcrumb />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
            <p className="text-gray-600">
              Fill in the details below to create a new project. All fields marked with{' '}
              <span className="text-red-500">*</span> are required.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <EnhancedProjectForm />
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
}