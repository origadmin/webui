import { IconMailPlus, IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { OpenStateType } from "@/components/DataTable/row-actions";

export function UsersPrimaryButtons({ onClick }: { onClick: (state: OpenStateType) => void }) {
  return (
    <div className='flex gap-2'>
      <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => onClick("invite")}>
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => onClick("add")}>
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
