import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useCrudTable } from "../hooks/use-crud-table";

export function PrimaryButtons() {
  const { setOpen } = useCrudTable();
  return (
    <div className='flex gap-2'>
      <Button variant='secondary' size='sm' className='ml-auto hidden h-8 lg:flex' onClick={() => setOpen("add")}>
        <span>Add Item</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
