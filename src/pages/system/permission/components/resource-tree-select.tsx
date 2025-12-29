import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buildTree, TreeItem } from "@/utils/tree";

type ResourceItem = TreeItem & API.System.Resource;

interface ResourceTreeSelectProps {
  resources?: ResourceItem[];
  value?: string[];
  onChange?: (selectedIds: string[]) => void;
}

const ResourceTreeNode: React.FC<{
  node: ResourceItem;
  selectedIds: Set<string>;
  onSelectionChange: (id: string, checked: boolean) => void;
}> = ({ node, selectedIds, onSelectionChange }) => {
  const isSelected = selectedIds.has(node.id);

  const handleCheckedChange = (checked: boolean) => {
    onSelectionChange(node.id, checked);
  };

  return (
    <div style={{ marginLeft: `${node.depth || 0}rem` }}>
      <div className="flex items-center space-x-2 py-1">
        <Checkbox
          id={node.id}
          checked={isSelected}
          onCheckedChange={handleCheckedChange}
        />
        <label htmlFor={node.id} className="text-sm font-medium leading-none">
          {node.name} <span className="text-xs text-muted-foreground">({node.type})</span>
        </label>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="pl-4">
          {node.children.map((child) => (
            <ResourceTreeNode
              key={child.id}
              node={child as ResourceItem}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ResourceTreeSelect: React.FC<ResourceTreeSelectProps> = ({
  resources = [],
  value = [],
  onChange,
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set(value));

  const treeData = useMemo(() => {
    // Add depth to each item for indentation
    const addDepth = (items: ResourceItem[], depth = 0): ResourceItem[] => {
      return items.map(item => ({
        ...item,
        depth,
        children: item.children ? addDepth(item.children as ResourceItem[], depth + 1) : [],
      }));
    };
    return addDepth(buildTree(resources));
  }, [resources]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedIds);
    if (checked) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedIds(newSelectedIds);
    onChange?.(Array.from(newSelectedIds));
  };

  return (
    <ScrollArea className="h-64 w-full rounded-md border p-4">
      {treeData.map((node) => (
        <ResourceTreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
        />
      ))}
    </ScrollArea>
  );
};
