import { usePermissionsQuery } from "@/api/system/permission";
import { useUpdateRolePermissions } from "@/api/system/role";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tree } from "@/components/Tree";

interface Props {
  roleId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RolePermissionsDialog({ roleId, open, onOpenChange }: Props) {
  const { data: permissions, isLoading } = usePermissionsQuery();
  const queryClient = useQueryClient();
  const { mutate: updatePermissions } = useUpdateRolePermissions(queryClient, roleId);

  const handleSubmit = (selectedKeys: string[]) => {
    updatePermissions(selectedKeys);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>分配权限</DialogTitle>
        </DialogHeader>

        <Tree
          data={permissions}
          checkable
          defaultExpandAll
          fieldNames={{ key: "id", title: "name", children: "children" }}
        />

        <DialogFooter>
          <Button loading={isLoading} onClick={() => handleSubmit(/* 获取选中值 */)}>
            提交
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
