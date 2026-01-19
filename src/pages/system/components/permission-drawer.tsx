import { useUserResourcesQuery } from "@/api/system/user";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

export type PermissionDrawerProps<T> = {
  currentRow?: T;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PermissionDrawer = ({ currentRow, open, onOpenChange }: PermissionDrawerProps<API.System.User>) => {
  console.log("currentRow", currentRow);
  const id = currentRow?.id ?? "";
  const {
    data: resourceResult,
    isLoading,
  }: { data: { items: API.System.Resource[]; total: number } | undefined; isLoading: boolean } = useUserResourcesQuery(
    id,
    { enabled: !!id },
  );

  return (
    <Drawer direction='right' open={open} onOpenChange={onOpenChange}>
      <DrawerContent role='dialog'>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className='mt-3 h-[120px]'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {(resourceResult?.items || [])?.map((resource: API.System.Resource) => (
                <Badge key={resource.id}>{resource.name}</Badge>
              ))}
            </div>
          )}
        </div>
        <DrawerFooter>
          {/*<Button>Submit</Button>*/}
          {/*<DrawerClose asChild>*/}
          {/*  <Button variant='outline'>Cancel</Button>*/}
          {/*</DrawerClose>*/}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
