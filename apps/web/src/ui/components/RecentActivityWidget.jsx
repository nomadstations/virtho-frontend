import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePeople } from '@/hooks/usePeople';

const formatRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return past.toLocaleDateString();
};

const formatActionLabel = (action) => {
  if (!action) return 'Unknown';
  return action.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const RecentActivityWidget = () => {
  const navigate = useNavigate();
  const { activityLog, users } = usePeople();

  const recentLogs = [...activityLog]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <Card className="flex flex-col h-full border-border shadow-sm">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system and user actions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        {recentLogs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6 text-sm text-muted-foreground">
            No recent activity
          </div>
        ) : (
          <div className="flex-1 flex flex-col divide-y divide-border/50">
            {recentLogs.map((log) => {
              const user = users.find(u => u.id === log.userId);
              const userName = user ? `${user.firstName} ${user.lastName}` : 'System';
              
              return (
                <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 bg-primary/10 p-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      <span className="font-medium">{userName}</span>
                      {' '}
                      <span className="text-muted-foreground">{formatActionLabel(log.action)}</span>
                      {' '}
                      <span className="font-medium text-foreground capitalize">{log.targetType}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatRelativeTime(log.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="p-3 border-t border-border/50 mt-auto bg-muted/20 rounded-b-xl">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-primary hover:text-primary-dark"
            onClick={() => navigate('/users/activity-log')}
          >
            View all activity
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityWidget;