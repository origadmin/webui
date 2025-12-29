import { Button } from "@/components/ui/button";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useResourceTable } from "./resources-table-provider";
import { useSyncResources } from "@/api/system/resource";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

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
    <div className="flex items-center gap-2">
      <Button variant="default" size="sm" onClick={handleAdd}>
        <IconPlus className="mr-2 h-4 w-4" />
        Add New Resource
      </Button>
      <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
        <IconRefresh className="mr-2 h-4 w-4" />
        {isSyncing ? "Syncing..." : "Sync from Code"}
      </Button>
    </div>
  );
}
