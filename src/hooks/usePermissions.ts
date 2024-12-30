import { useSession } from 'next-auth/react';
import { Permission, hasPermission, Role } from '@/lib/rbac/permissions';

export function usePermissions() {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role;

  return {
    can: (permission: Permission) => hasPermission(userRole, permission),
    role: userRole,
  };
}
