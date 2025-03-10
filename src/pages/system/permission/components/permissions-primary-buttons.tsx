import { usePermissionTable } from "@/pages/system/permission/components/permissions-table-provider";
import { IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function PermissionsPrimaryButtons() {
  const { setOpen } = usePermissionTable();
  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add Permission</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
