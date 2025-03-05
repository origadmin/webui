import { useResourceTable } from "@/pages/system/resource/components/resources-table-provider";
import { IconUserPlus, IconUsers } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function ResourcesPrimaryButtons() {
  const { setOpen } = useResourceTable();
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        size='sm'
        className='ml-auto hidden h-8 lg:flex'
        onClick={() => setOpen("edit-permission")}
      >
        <span>Edit Permission</span> <IconUsers size={18} />
      </Button>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add Resource</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
