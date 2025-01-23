import { useAuth } from "@/hooks/use-auth";

export function withPermission(WrappedComponent: React.ComponentType, requiredPermissions: string[]) {
  return function WithPermissionComponent(props: any) {
    const { permissions } = useAuth();

    const hasPermission = requiredPermissions.every((requiredPermission) =>
      permissions?.some((p) => p.id === requiredPermission),
    );

    if (!hasPermission) {
      return <div>You don't have permission to view this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
