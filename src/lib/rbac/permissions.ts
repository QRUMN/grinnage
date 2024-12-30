export type Permission =
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'users.impersonate'
  | 'analytics.view'
  | 'analytics.export'
  | 'reports.generate'
  | 'reports.schedule'
  | 'files.upload'
  | 'files.download'
  | 'settings.view'
  | 'settings.edit'
  | 'roles.manage'
  | 'audit.view';

export type Role =
  | 'SUPER_ADMIN'
  | 'ADMINISTRATOR'
  | 'MANAGER'
  | 'SUPPORT'
  | 'USER'
  | 'GUEST';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'users.impersonate',
    'analytics.view',
    'analytics.export',
    'reports.generate',
    'reports.schedule',
    'files.upload',
    'files.download',
    'settings.view',
    'settings.edit',
    'roles.manage',
    'audit.view',
  ],
  ADMINISTRATOR: [
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'analytics.view',
    'analytics.export',
    'reports.generate',
    'files.upload',
    'files.download',
    'settings.view',
    'settings.edit',
    'audit.view',
  ],
  MANAGER: [
    'users.view',
    'users.create',
    'users.edit',
    'analytics.view',
    'reports.generate',
    'files.upload',
    'files.download',
    'settings.view',
  ],
  SUPPORT: [
    'users.view',
    'analytics.view',
    'files.download',
    'settings.view',
  ],
  USER: [
    'files.upload',
    'files.download',
  ],
  GUEST: [
    'users.view',
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
}

export function getAllowedActions(userRole: Role): Permission[] {
  return ROLE_PERMISSIONS[userRole] ?? [];
}
