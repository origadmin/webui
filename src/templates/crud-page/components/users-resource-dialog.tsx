import { useUserResourceQuery } from "@/api/system/user";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type UserResourceProps<T> = {
  currentRow?: T;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UsersResourceDialog = ({ open, onOpenChange, currentRow }: UserResourceProps<API.System.Resource>) => {
  console.log("currentRow", currentRow);
  const id = currentRow?.id ?? "";
  const { data: resources = {}, isLoading } = useUserResourceQuery(id);
  console.log("resources", resources);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[650px]'>
        <DialogHeader>
          <DialogTitle>Resource</DialogTitle>
          <DialogDescription>Select resources for this user.</DialogDescription>
        </DialogHeader>
        <div className='mt-3 h-[120px]'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {resources &&
                Array.isArray(resources.data) &&
                resources.data?.map((resource) => <Badge key={resource.id}>{resource.name}</Badge>)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
