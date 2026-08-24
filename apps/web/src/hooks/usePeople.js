import { useState, useCallback } from 'react';
import { 
  mockUsers, 
  mockRoles, 
  mockPermissions, 
  mockGroups, 
  mockInvitations, 
  mockActivityLog,
  mockOnboardingWorkflows,
  userOnboardingProgress as initialOnboardingProgress
} from '@/data/peopleData';

export function usePeople() {
  const [users, setUsers] = useState(mockUsers);
  const [roles, setRoles] = useState(mockRoles);
  const [permissions, setPermissions] = useState(mockPermissions);
  const [groups, setGroups] = useState(mockGroups);
  const [invitations, setInvitations] = useState(mockInvitations);
  const [activityLog, setActivityLog] = useState(mockActivityLog);
  
  const [onboardingWorkflows] = useState(mockOnboardingWorkflows);
  const [onboardingProgress, setOnboardingProgress] = useState(initialOnboardingProgress);

  const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const logActivity = useCallback((userId, action, targetType, targetId) => {
    const newEntry = {
      id: generateId('log'),
      userId,
      action,
      targetType,
      targetId,
      timestamp: new Date().toISOString(),
      ip: `10.0.0.${Math.floor(Math.random() * 255)}`
    };
    
    setActivityLog(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const addUser = useCallback((userData, actorId = 'system') => {
    const newUser = {
      ...userData,
      id: generateId('user'),
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    
    // Initialize onboarding progress
    setOnboardingProgress(prev => [...prev, {
      userId: newUser.id,
      roleId: newUser.role,
      completedSteps: [],
      startedAt: new Date().toISOString(),
      completedAt: null
    }]);

    logActivity(actorId, 'user_created', 'user', newUser.id);
    return newUser;
  }, [logActivity]);

  const updateUser = useCallback((userId, updates, actorId = 'system') => {
    let updatedUser = null;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        updatedUser = { ...user, ...updates };
        return updatedUser;
      }
      return user;
    }));
    
    if (updatedUser && updates.role) {
      // Update role in onboarding progress if role changed
      setOnboardingProgress(prev => prev.map(p => {
        if (p.userId === userId) {
          return { ...p, roleId: updates.role };
        }
        return p;
      }));
    }

    if (updatedUser) {
      logActivity(actorId, 'user_updated', 'user', userId);
    }
    return updatedUser;
  }, [logActivity]);

  const deactivateUser = useCallback((userId, actorId = 'system') => {
    let updatedUser = null;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        updatedUser = { ...user, status: 'inactive' };
        return updatedUser;
      }
      return user;
    }));
    if (updatedUser) {
      logActivity(actorId, 'user_deactivated', 'user', userId);
    }
    return updatedUser;
  }, [logActivity]);

  const verifyUser = useCallback((userId, actorId = 'system') => {
    let updatedUser = null;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        updatedUser = { ...user, verified: true };
        return updatedUser;
      }
      return user;
    }));
    if (updatedUser) {
      logActivity(actorId, 'user_verified', 'user', userId);
    }
    return updatedUser;
  }, [logActivity]);

  const addRole = useCallback((roleData, actorId = 'system') => {
    const newRole = {
      ...roleData,
      id: generateId('role'),
    };
    setRoles(prev => [...prev, newRole]);
    logActivity(actorId, 'role_created', 'role', newRole.id);
    return newRole;
  }, [logActivity]);

  const updateRolePermissions = useCallback((roleId, permissionUpdates, actorId = 'system') => {
    let updatedRole = null;
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        updatedRole = { 
          ...role, 
          permissions: { ...role.permissions, ...permissionUpdates } 
        };
        return updatedRole;
      }
      return role;
    }));
    if (updatedRole) {
      logActivity(actorId, 'role_updated', 'role', roleId);
    }
    return updatedRole;
  }, [logActivity]);

  const addGroup = useCallback((groupData, actorId = 'system') => {
    const newGroup = {
      memberIds: [],
      permissionOverrides: {},
      ...groupData,
      id: generateId('group'),
    };
    setGroups(prev => [...prev, newGroup]);
    logActivity(actorId, 'group_created', 'group', newGroup.id);
    return newGroup;
  }, [logActivity]);

  const updateGroup = useCallback((groupId, updates, actorId = 'system') => {
    let updatedGroup = null;
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        updatedGroup = { ...group, ...updates };
        return updatedGroup;
      }
      return group;
    }));
    if (updatedGroup) {
      logActivity(actorId, 'group_updated', 'group', groupId);
    }
    return updatedGroup;
  }, [logActivity]);

  const deleteGroup = useCallback((groupId, actorId = 'system') => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    logActivity(actorId, 'group_deleted', 'group', groupId);
  }, [logActivity]);

  const updateGroupMembers = useCallback((groupId, memberIds, actorId = 'system') => {
    let updatedGroup = null;
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        updatedGroup = { ...group, memberIds };
        return updatedGroup;
      }
      return group;
    }));
    if (updatedGroup) {
      logActivity(actorId, 'group_members_updated', 'group', groupId);
    }
    return updatedGroup;
  }, [logActivity]);

  const updateGroupPermissions = useCallback((groupId, permissionUpdates, actorId = 'system') => {
    let updatedGroup = null;
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        updatedGroup = {
          ...group,
          permissionOverrides: { ...group.permissionOverrides, ...permissionUpdates }
        };
        return updatedGroup;
      }
      return group;
    }));
    if (updatedGroup) {
      logActivity(actorId, 'group_permissions_updated', 'group', groupId);
    }
    return updatedGroup;
  }, [logActivity]);

  const addInvitation = useCallback((invitationData, actorId = 'system') => {
    const newInvitation = {
      ...invitationData,
      id: generateId('inv'),
      sentAt: new Date().toISOString(),
      status: 'pending'
    };
    setInvitations(prev => [...prev, newInvitation]);
    logActivity(actorId, 'invitation_sent', 'invitation', newInvitation.id);
    return newInvitation;
  }, [logActivity]);

  const updateInvitationStatus = useCallback((invitationId, newStatus, actorId = 'system') => {
    let updatedInvitation = null;
    setInvitations(prev => prev.map(inv => {
      if (inv.id === invitationId) {
        updatedInvitation = { ...inv, status: newStatus };
        return updatedInvitation;
      }
      return inv;
    }));
    if (updatedInvitation) {
      logActivity(actorId, `invitation_${newStatus}`, 'invitation', invitationId);
    }
    return updatedInvitation;
  }, [logActivity]);

  const updateUserOnboardingProgress = useCallback((userId, stepId, actorId = 'system') => {
    setOnboardingProgress(prev => prev.map(p => {
      if (p.userId === userId) {
        const isCompleted = p.completedSteps.includes(stepId);
        const newSteps = isCompleted 
          ? p.completedSteps.filter(id => id !== stepId)
          : [...p.completedSteps, stepId];
        
        return {
          ...p,
          completedSteps: newSteps,
          startedAt: p.startedAt || new Date().toISOString()
        };
      }
      return p;
    }));
    logActivity(actorId, 'onboarding_step_completed', 'user', userId);
  }, [logActivity]);

  const logOnboardingCompletion = useCallback((userId, actorId = 'system') => {
    setOnboardingProgress(prev => prev.map(p => {
      if (p.userId === userId) {
        return { ...p, completedAt: new Date().toISOString() };
      }
      return p;
    }));
    logActivity(actorId, 'onboarding_completed', 'user', userId);
  }, [logActivity]);

  return {
    users,
    roles,
    permissions,
    groups,
    invitations,
    activityLog,
    onboardingWorkflows,
    onboardingProgress,
    addUser,
    updateUser,
    deactivateUser,
    verifyUser,
    addRole,
    updateRolePermissions,
    addGroup,
    updateGroup,
    deleteGroup,
    updateGroupMembers,
    updateGroupPermissions,
    addInvitation,
    updateInvitationStatus,
    updateUserOnboardingProgress,
    logOnboardingCompletion,
    logActivity
  };
}