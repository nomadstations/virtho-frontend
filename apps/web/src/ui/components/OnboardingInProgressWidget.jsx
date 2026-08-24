import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePeople } from '@/hooks/usePeople';
import OnboardingUserItem from './OnboardingUserItem';

const OnboardingInProgressWidget = ({ onViewProfile }) => {
  const { users, onboardingWorkflows, onboardingProgress } = usePeople();

  const incompleteUsers = users.map(user => {
    const workflow = onboardingWorkflows[user.role] || [];
    const progress = onboardingProgress.find(p => p.userId === user.id) || { completedSteps: [] };
    const isComplete = workflow.length > 0 && progress.completedSteps.length === workflow.length;
    
    return {
      user,
      workflow,
      progress,
      isComplete,
      completionRatio: workflow.length > 0 ? progress.completedSteps.length / workflow.length : 1
    };
  }).filter(item => !item.isComplete && item.workflow.length > 0);

  const sortedIncomplete = incompleteUsers.sort((a, b) => a.completionRatio - b.completionRatio);
  const displayList = sortedIncomplete.slice(0, 5);
  const count = incompleteUsers.length;

  return (
    <Card className="border-secondary hover:bg-gray-50/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Compass className="w-5 h-5 text-secondary-dark" />
              Onboarding Status
            </CardTitle>
            <CardDescription className="mt-1">
              Users currently in progress
            </CardDescription>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary-lighter/30 flex items-center justify-center text-secondary-dark font-bold text-lg">
            {count}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {count === 0 ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
            <p className="text-sm text-gray-500 font-medium">All users are fully onboarded!</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
              Needs Attention
            </p>
            {displayList.map(({ user, workflow, progress }) => (
              <OnboardingUserItem
                key={user.id}
                user={user}
                workflow={workflow}
                progress={progress}
                onClick={() => onViewProfile && onViewProfile(user.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingInProgressWidget;