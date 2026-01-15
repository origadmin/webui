import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useViewTable } from "./views-table-provider";


export function ViewsPrimaryButtons() {
  const { setOpen } = useViewTable();

  const handleAdd = () => {
    // This button's intent is always to add a new view at the top level.
    // The logic to determine if it's a new Root or a child of the sidebar root
    // is now handled inside the action-dialog itself.
    setOpen("add");
  };

  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={handleAdd}>
        <span>Add View</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
