import React, { useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import { usePeople } from '@/hooks/usePeople';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStep from './OnboardingStep';

const OnboardingChecklist = ({ user, isAdmin }) => {
  const { 
    onboardingWorkflows, 
    onboardingProgress, 
    updateUserOnboardingProgress,
    logOnboardingCompletion 
  } = usePeople();

  const workflow = onboardingWorkflows[user?.role] || [];
  const progressRecord = onboardingProgress.find(p => p.userId === user?.id) || { completedSteps: [] };
  
  const completedCount = workflow.filter(s => progressRecord.completedSteps.includes(s.id)).length;
  const isCompleted = workflow.length > 0 && completedCount === workflow.length;

  useEffect(() => {
    if (isCompleted && !progressRecord.completedAt) {
      logOnboardingCompletion(user.id);
    }
  }, [isCompleted, progressRecord.completedAt, logOnboardingCompletion, user?.id]);

  if (!workflow.length) {
    return (
      <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <CheckSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No Onboarding Workflow</h3>
        <p className="text-sm text-gray-500 mt-1">
          There is no predefined onboarding workflow for the role "{user?.role}".
        </p>
      </div>
    );
  }

  const handleToggleStep = (stepId) => {
    if (!isAdmin) return;
    updateUserOnboardingProgress(user.id, stepId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Onboarding Checklist</h3>
          <p className="text-sm text-gray-500">Track the progress of required startup tasks for this role.</p>
        </div>
        
        <OnboardingProgress 
          current={completedCount} 
          total={workflow.length} 
          isCompleted={isCompleted} 
        />
      </div>

      <div className="space-y-3">
        {workflow.map((step, index) => (
          <OnboardingStep
            key={step.id}
            step={step}
            index={index}
            isCompleted={progressRecord.completedSteps.includes(step.id)}
            isAdmin={isAdmin}
            onToggle={() => handleToggleStep(step.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;