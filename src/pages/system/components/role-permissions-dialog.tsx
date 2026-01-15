import { useState } from "react";
import { usePermissionCreate, usePermissionsQuery } from "@/api/system/permission";
import { RolePermissionForm } from "@/pages/system/components/role-permission-form";
import { useQueryClient } from "@tanstack/react-query";
import { type Permission } from "@/types/system/permissions";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogContent, DialogFooter, Dialog } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RolePermissionsDialog({ open, onOpenChange }: Props) {
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const { data: permissions, refetch } = usePermissionsQuery();
  const queryClient = useQueryClient();
  const { mutate: createPermission } = usePermissionCreate(queryClient);

  const handleSubmit = async (formData: Permission) => {
    if (!editingPermission) {
      createPermission(formData as Omit<Permission, "id"> & { resource_ids?: string[]; view_ids?: string[] });
    }
    refetch();
    onOpenChange(false);
  };

  const handleDelete = async () => {
    // await deleteMutation.mutateAsync(id);
    refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{editingPermission ? "编辑权限" : "新建权限"}</DialogTitle>
        </DialogHeader>

        <RolePermissionForm
          initialValues={editingPermission || undefined}
          onSubmit={handleSubmit}
          onDelete={editingPermission ? () => handleDelete() : undefined}
        />

        <div className='mt-4 border-t pt-4'>
          <h3 className='text-lg font-semibold'>现有权限列表</h3>
          <div className='space-y-2 max-h-60 overflow-y-auto'>
            {(permissions?.items as Permission[])?.map((permission) => (
              <div key={permission.id} className='flex items-center justify-between p-2 border rounded'>
                <div>
                  <span className='font-medium'>{permission.name}</span>
                  <span className='text-sm text-muted-foreground ml-2'>({permission.keyword})</span>
                </div>
                <Button variant='ghost' size='sm' onClick={() => setEditingPermission(permission)}>
                  编辑
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              setEditingPermission(null);
              onOpenChange(false);
            }}
          >
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
