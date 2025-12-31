import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buildTree, TreeItem } from "@/utils/tree";

type ViewItem = TreeItem & API.System.View;

interface ViewTreeSelectProps {
  views?: ViewItem[];
  value?: string[];
  onChange?: (selectedIds: string[]) => void;
}

const ViewTreeNode: React.FC<{
  node: ViewItem;
  selectedIds: Set<string>;
  onSelectionChange: (id: string, checked: boolean) => void;
}> = ({ node, selectedIds, onSelectionChange }) => {
  const isSelected = selectedIds.has(node.id);

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    onSelectionChange(node.id, checked === true);
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
            <ViewTreeNode
              key={child.id}
              node={child as ViewItem}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ViewTreeSelect: React.FC<ViewTreeSelectProps> = ({
  views = [],
  value = [],
  onChange,
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set(value));

  const { treeData, nodeMap, parentMap } = useMemo(() => {
    const addDepth = (items: ViewItem[], depth = 0): ViewItem[] => {
      return items.map(item => ({
        ...item,
        depth,
        children: item.children ? addDepth(item.children as ViewItem[], depth + 1) : [],
      }));
    };
    
    const treeWithDepth = addDepth(buildTree(views));
    
    const nMap = new Map<string, ViewItem>();
    const pMap = new Map<string, string>();

    const traverseForMaps = (items: ViewItem[], parentId?: string) => {
        items.forEach(item => {
            nMap.set(item.id, item);
            if (parentId) {
                pMap.set(item.id, parentId);
            }
            if (item.children) {
                traverseForMaps(item.children as ViewItem[], item.id);
            }
        });
    };

    traverseForMaps(treeWithDepth);

    return { treeData: treeWithDepth, nodeMap: nMap, parentMap: pMap };
  }, [views]);

  useEffect(() => {
    setSelectedIds(new Set(value));
  }, [value]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedIds);

    const selectNodeAndParents = (nodeId: string) => {
      if (!nodeId || newSelectedIds.has(nodeId)) return;
      newSelectedIds.add(nodeId);
      const parentId = parentMap.get(nodeId);
      if (parentId) {
        selectNodeAndParents(parentId);
      }
    };

    const deselectNodeAndChildren = (nodeId: string) => {
      newSelectedIds.delete(nodeId);
      const node = nodeMap.get(nodeId);
      node?.children?.forEach(child => deselectNodeAndChildren(child.id));
    };

    if (checked) {
      selectNodeAndParents(id);
    } else {
      deselectNodeAndChildren(id);
    }

    setSelectedIds(newSelectedIds);
    onChange?.(Array.from(newSelectedIds));
  };

  const handleSelectAll = () => {
    const allIds = Array.from(nodeMap.keys());
    setSelectedIds(new Set(allIds));
    onChange?.(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
    onChange?.([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" type="button" onClick={handleSelectAll}>
          Select All
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={handleDeselectAll}>
          Deselect All
        </Button>
      </div>
      <ScrollArea className="h-64 w-full rounded-md border p-4">
        {treeData.map((node) => (
          <ViewTreeNode
            key={node.id}
            node={node}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
