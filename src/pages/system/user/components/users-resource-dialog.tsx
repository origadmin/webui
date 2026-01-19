import { useUserResourcesQuery } from "@/api/system/user";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type UserResourceProps<T> = {
  currentRow?: T;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UsersResourceDialog = ({ open, onOpenChange, currentRow }: UserResourceProps<API.System.Resource>) => {
  const id = currentRow?.id ?? "";
  // Use the new hook with default pagination parameters (e.g., fetch all or first page)
  // Assuming we want to show a list, we might need pagination controls or just show the first batch.
  // For a simple dialog display, we'll request without specific pagination to get defaults.
  const { data, isLoading } = useUserResourcesQuery(id, { pageSize: 100 });
  const resources = data?.items || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[650px]'>
        <DialogHeader>
          <DialogTitle>Resource</DialogTitle>
          <DialogDescription>Select resources for this user.</DialogDescription>
        </DialogHeader>
        <div className='mt-3 min-h-[120px] max-h-[400px] overflow-y-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>Loading...</div>
          ) : (
            <div className='flex flex-wrap gap-2'>
              {resources.length > 0 ? (
                resources.map((resource) => <Badge key={resource.id}>{resource.name}</Badge>)
              ) : (
                <div className='text-muted-foreground text-sm'>No resources found.</div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
