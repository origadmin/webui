import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { TablerIcon } from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10",
);

const selectedTreeVariants = cva("before:opacity-100 before:bg-accent/70 text-accent-foreground");

function walkTreeItems(ids: string[], items: TreeDataItem[] | TreeDataItem, targetId: string, expandAll?: boolean) {
  if (Array.isArray(items)) {
    for (let i = 0; i < items.length; i++) {
      ids.push(items[i]!.id);
      if (walkTreeItems(ids, items[i]!, targetId) && !expandAll) {
        return ids;
      }
      if (!expandAll) ids.pop();
    }
  } else if (!expandAll && items.id === targetId) {
    return ids;
  } else if (items.children) {
    return walkTreeItems(ids, items.children, targetId, expandAll);
  }
  return ids;
}

type IconType = LucideIcon | TablerIcon | ForwardRefExoticComponent<Omit<unknown, "ref"> & RefAttributes<unknown>>;

interface TreeDataItem {
  id: string;
  name: string;
  icon?: IconType;
  selectedIcon?: IconType;
  openIcon?: IconType;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: IconType;
  defaultLeafIcon?: IconType;
};

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    { data, initialSelectedItemId, onSelectChange, expandAll, defaultLeafIcon, defaultNodeIcon, className, ...props },
    ref,
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);

    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange],
    );

    const expandedItemIds = React.useMemo(() => {
      if (!initialSelectedItemId) {
        return [] as string[];
      }

      const ids: string[] = [];
      return walkTreeItems(ids, data, initialSelectedItemId, expandAll);
    }, [data, expandAll, initialSelectedItemId]);

    return (
      <div className={cn("overflow-hidden relative p-2", className)}>
        <TreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          defaultLeafIcon={defaultLeafIcon}
          defaultNodeIcon={defaultNodeIcon}
          {...props}
        />
      </div>
    );
  },
);
TreeView.displayName = "TreeView";

type TreeItemProps = TreeProps & {
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  defaultNodeIcon?: IconType;
  defaultLeafIcon?: IconType;
};

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      defaultNodeIcon,
      defaultLeafIcon,
      ...props
    },
    ref,
  ) => {
    if (!(data instanceof Array)) {
      data = [data];
    }
    return (
      <div ref={ref} role='tree' className={className} {...props}>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.children ? (
                <TreeNode
                  item={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                />
              ) : (
                <TreeLeaf
                  item={item}
                  selectedItemId={selectedItemId}
                  handleSelectChange={handleSelectChange}
                  defaultLeafIcon={defaultLeafIcon}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
TreeItem.displayName = "TreeItem";

const TreeNode = ({
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
}: {
  item: TreeDataItem;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: IconType;
  defaultLeafIcon?: IconType;
}) => {
  const [value, setValue] = React.useState(expandedItemIds.includes(item.id) ? [item.id] : []);
  return (
    <Accordion type='multiple' value={value} onValueChange={(s) => setValue(s)}>
      <AccordionItem value={item.id}>
        <AccordionTrigger
          className={cn(treeVariants(), selectedItemId === item.id && selectedTreeVariants())}
          onClick={() => {
            handleSelectChange(item);
            item.onClick?.();
          }}
        >
          <TreeIcon
            item={item}
            isSelected={selectedItemId === item.id}
            isOpen={value.includes(item.id)}
            default={defaultNodeIcon}
          />
          <span className='text-sm truncate'>{item.name}</span>
          <TreeActions isSelected={selectedItemId === item.id}>{item.actions}</TreeActions>
        </AccordionTrigger>
        <AccordionContent className='ml-4 pl-1 border-l'>
          <TreeItem
            data={item.children ? item.children : item}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const TreeLeaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem;
    selectedItemId?: string;
    handleSelectChange: (item: TreeDataItem | undefined) => void;
    defaultLeafIcon?: IconType;
  }
>(({ className, item, selectedItemId, handleSelectChange, defaultLeafIcon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "ml-5 flex text-left items-center py-2 cursor-pointer before:right-1",
        treeVariants(),
        className,
        selectedItemId === item.id && selectedTreeVariants(),
      )}
      onClick={() => {
        handleSelectChange(item);
        item.onClick?.();
      }}
      {...props}
    >
      <TreeIcon item={item} isSelected={selectedItemId === item.id} default={defaultLeafIcon} />
      <span className='flex-grow text-sm truncate'>{item.name}</span>
      <TreeActions isSelected={selectedItemId === item.id}>{item.actions}</TreeActions>
    </div>
  );
});
TreeLeaf.displayName = "TreeLeaf";

const TreeIcon = ({
  item,
  isOpen,
  isSelected,
  default: defaultIcon,
}: {
  item: TreeDataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  default?: IconType;
}) => {
  let Icon = defaultIcon;
  if (isSelected && item.selectedIcon) {
    Icon = item.selectedIcon;
  } else if (isOpen && item.openIcon) {
    Icon = item.openIcon;
  } else if (item.icon) {
    Icon = item.icon;
  }
  return Icon ? <Icon className='h-4 w-4 shrink-0 mr-2' /> : <></>;
};

const TreeActions = ({ children, isSelected }: { children: React.ReactNode; isSelected: boolean }) => {
  return <div className={cn(isSelected ? "block" : "hidden", "absolute right-3 group-hover:block")}>{children}</div>;
};

export { TreeView, type TreeDataItem };
