const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const mockRoles = [
  {
    id: 'role-1',
    name: 'Admin',
    description: 'Full system access',
    permissions: { manage_users: true, manage_roles: true, view_logs: true, manage_settings: true, manage_groups: true, manage_invitations: true }
  },
  {
    id: 'role-2',
    name: 'Moderator',
    description: 'Can manage content and moderate users',
    permissions: { view_users: true, edit_users: true, manage_groups: true, view_logs: true, manage_users: false, manage_roles: false, manage_settings: false, manage_invitations: false }
  },
  {
    id: 'role-3',
    name: 'Member',
    description: 'Standard user access',
    permissions: { view_users: true, edit_users: false, manage_groups: false, view_logs: false, manage_users: false, manage_roles: false, manage_settings: false, manage_invitations: false }
  },
  {
    id: 'role-4',
    name: 'Guest',
    description: 'Read-only restricted access',
    permissions: { view_users: false, edit_users: false, manage_groups: false, view_logs: false, manage_users: false, manage_roles: false, manage_settings: false, manage_invitations: false }
  }
];

export const mockPermissions = [
  { id: 'perm-1', key: 'view_community', label: 'View Community', description: 'Can view community resources', domain: 'Community' },
  { id: 'perm-2', key: 'create_community', label: 'Create Community', description: 'Can create community resources', domain: 'Community' },
  { id: 'perm-3', key: 'edit_community', label: 'Edit Community', description: 'Can edit community resources', domain: 'Community' },
  { id: 'perm-4', key: 'delete_community', label: 'Delete Community', description: 'Can delete community resources', domain: 'Community' },
  
  { id: 'perm-5', key: 'view_economy', label: 'View Economy', description: 'Can view economic data', domain: 'Economy' },
  { id: 'perm-6', key: 'manage_economy', label: 'Manage Economy', description: 'Can manage economic settings', domain: 'Economy' },
  { id: 'perm-7', key: 'view_transactions', label: 'View Transactions', description: 'Can view transactions', domain: 'Economy' },
  { id: 'perm-8', key: 'manage_transactions', label: 'Manage Transactions', description: 'Can manage transactions', domain: 'Economy' },
  
  { id: 'perm-9', key: 'view_health', label: 'View Health', description: 'Can view health data', domain: 'Health' },
  { id: 'perm-10', key: 'manage_health', label: 'Manage Health', description: 'Can manage health settings', domain: 'Health' },
  { id: 'perm-11', key: 'view_records', label: 'View Records', description: 'Can view health records', domain: 'Health' },
  { id: 'perm-12', key: 'manage_records', label: 'Manage Records', description: 'Can manage health records', domain: 'Health' },
  
  { id: 'perm-13', key: 'manage_users', label: 'Manage Users', description: 'Can manage system users', domain: 'Platform' },
  { id: 'perm-14', key: 'manage_roles', label: 'Manage Roles', description: 'Can manage system roles', domain: 'Platform' },
  { id: 'perm-15', key: 'view_logs', label: 'View Logs', description: 'Can view system activity logs', domain: 'Platform' },
  { id: 'perm-16', key: 'manage_settings', label: 'Manage Settings', description: 'Can manage system settings', domain: 'Platform' },
  { id: 'perm-17', key: 'manage_groups', label: 'Manage Groups', description: 'Can manage user groups', domain: 'Platform' },
  { id: 'perm-18', key: 'manage_invitations', label: 'Manage Invitations', description: 'Can manage user invitations', domain: 'Platform' }
];

export const mockGroups = [
  { id: 'group-1', name: 'Admins', description: 'System administrators', memberIds: ['user-1', 'user-2', 'user-3'], permissionOverrides: { manage_users: true, manage_roles: true, manage_settings: true } },
  { id: 'group-2', name: 'Moderators', description: 'Content moderators', memberIds: ['user-4', 'user-5', 'user-6', 'user-7'], permissionOverrides: { edit_community: true, delete_community: true } },
  { id: 'group-3', name: 'Content Team', description: 'Content creators', memberIds: ['user-8', 'user-9', 'user-10', 'user-11', 'user-12'], permissionOverrides: { create_community: true } },
  { id: 'group-4', name: 'Support Team', description: 'Customer support', memberIds: ['user-13', 'user-14', 'user-15', 'user-16'], permissionOverrides: { view_logs: true, manage_users: true } },
  { id: 'group-5', name: 'Health Providers', description: 'Health professionals', memberIds: ['user-17', 'user-18', 'user-19', 'user-20', 'user-21', 'user-22'], permissionOverrides: { view_health: true, manage_health: true, view_records: true } }
];

export const mockInvitations = [
  { id: 'inv-1', email: 'new.admin@example.com', role: 'Admin', invitedBy: 'user-1', sentAt: daysAgo(2), status: 'pending' },
  { id: 'inv-2', email: 'mod.candidate@example.com', role: 'Moderator', invitedBy: 'user-2', sentAt: daysAgo(5), status: 'pending' },
  { id: 'inv-3', email: 'member.one@example.com', role: 'Member', invitedBy: 'user-1', sentAt: daysAgo(10), status: 'accepted' },
  { id: 'inv-4', email: 'member.two@example.com', role: 'Member', invitedBy: 'user-3', sentAt: daysAgo(15), status: 'accepted' },
  { id: 'inv-5', email: 'forgotten@example.com', role: 'Guest', invitedBy: 'user-1', sentAt: daysAgo(60), status: 'expired' },
  { id: 'inv-6', email: 'bad.actor@example.com', role: 'Member', invitedBy: 'user-2', sentAt: daysAgo(1), status: 'revoked' }
];

const generateUsers = () => {
  const users = [];
  const roles = ['Admin', 'Moderator', 'Member', 'Guest'];
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  for (let i = 1; i <= 25; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    
    let status = 'active';
    if (i > 15 && i <= 20) status = 'inactive';
    if (i > 20) status = 'pending';
    
    let verified = i <= 18;
    
    users.push({
      id: `user-${i}`,
      firstName: fn,
      lastName: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
      avatarInitials: `${fn[0]}${ln[0]}`,
      role: roles[i % 4],
      groups: [`group-${(i % 5) + 1}`],
      status: status,
      verified: verified,
      createdAt: daysAgo(30 + (i * 5)),
      lastLoginAt: status === 'inactive' || status === 'pending' ? null : daysAgo(i % 10)
    });
  }
  return users;
};

export const mockUsers = generateUsers();

export const mockOnboardingWorkflows = {
  Admin: [
    { id: 'admin_1', title: 'Review Security Policies', description: 'Read and accept security policies.', required: true },
    { id: 'admin_2', title: 'Setup MFA', description: 'Enable multi-factor authentication.', required: true },
    { id: 'admin_3', title: 'Review Audit Logs', description: 'Familiarize yourself with system logs.', required: false }
  ],
  Moderator: [
    { id: 'mod_1', title: 'Content Guidelines', description: 'Review the content moderation guidelines.', required: true },
    { id: 'mod_2', title: 'Join Moderator Group', description: 'Introduce yourself in the Mod group.', required: true }
  ],
  Member: [
    { id: 'mem_1', title: 'Complete Profile', description: 'Add your photo and bio.', required: true },
    { id: 'mem_2', title: 'Join a Group', description: 'Find and join at least one group.', required: false }
  ],
  Guest: [
    { id: 'guest_1', title: 'Read Terms', description: 'Accept the terms of service.', required: true }
  ]
};

const generateOnboardingProgress = () => {
  const progress = [];
  mockUsers.forEach((user, index) => {
    const workflow = mockOnboardingWorkflows[user.role];
    if (!workflow) return;

    let completedSteps = [];
    let completedAt = null;

    if (index % 3 === 0) {
      // Completed all
      completedSteps = workflow.map(s => s.id);
      completedAt = daysAgo(index % 10);
    } else if (index % 3 === 1) {
      // Completed some
      completedSteps = [workflow[0].id];
    }

    progress.push({
      userId: user.id,
      roleId: user.role,
      completedSteps,
      startedAt: user.createdAt,
      completedAt
    });
  });
  return progress;
};

export const userOnboardingProgress = generateOnboardingProgress();

const generateLogs = () => {
  const logs = [];
  const actions = ['user_created', 'user_updated', 'user_deactivated', 'user_verified', 'role_assigned', 'role_updated', 'permission_granted', 'permission_revoked', 'group_created', 'group_updated', 'invitation_sent', 'invitation_accepted', 'invitation_revoked'];
  const targetTypes = ['user', 'role', 'group', 'invitation', 'permission'];
  
  for (let i = 1; i <= 40; i++) {
    const action = actions[i % actions.length];
    const tType = targetTypes[i % targetTypes.length];
    
    logs.push({
      id: `log-${i}`,
      userId: `user-${(i % 5) + 1}`,
      action: action,
      targetType: tType,
      targetId: `${tType}-${(i % 10) + 1}`,
      timestamp: daysAgo(i % 14),
      ip: `192.168.1.${10 + i}`
    });
  }
  return logs;
};

export const mockActivityLog = generateLogs();