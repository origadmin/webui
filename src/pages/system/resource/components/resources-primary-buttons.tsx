import { useSyncResources } from "@/api/system/resource";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useResourceTable } from "./resources-table-provider";

export function ResourcesPrimaryButtons() {
  const { setOpen } = useResourceTable();
  const queryClient = useQueryClient();
  const { mutate: syncResources, isPending: isSyncing } = useSyncResources(queryClient);

  const handleAdd = () => {
    setOpen("add");
  };

  const handleSync = () => {
    syncResources(undefined, {
      onSuccess: () => {
        toast({
          title: "Sync Started",
          description: "Resource synchronization process has been initiated.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Sync Failed",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={handleSync}
        disabled={isSyncing}
        className='ml-auto hidden h-8 lg:flex'
      >
        <span>{isSyncing ? "Syncing..." : "Sync from Code"}</span>{" "}
        <IconRefresh size={18} className={isSyncing ? "animate-spin" : ""} />
      </Button>
      <Button variant='secondary' size='sm' onClick={handleAdd} className='ml-auto hidden h-8 lg:flex'>
        <span>Add New Resource</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
