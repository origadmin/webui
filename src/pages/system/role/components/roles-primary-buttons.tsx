import { useRoleTable } from "@/pages/system/role/components/roles-table-provider";
import { IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function RolesPrimaryButtons() {
  const { setOpen } = useRoleTable();
  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add Role</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
