import { useUserTable } from "@/pages/system/users/components/users-table-provider";
import { IconMailPlus, IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function UsersPrimaryButtons() {
  const { setOpen } = useUserTable();
  return (
    <div className='flex gap-2'>
      <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("invite")}>
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
