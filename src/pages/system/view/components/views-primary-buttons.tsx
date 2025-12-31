import { useViewTable } from "./views-table-provider";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function ViewsPrimaryButtons() {
  const { setOpen } = useViewTable();
  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add View</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
