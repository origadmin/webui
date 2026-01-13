import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { buildTree, TreeItem } from "@/utils/tree";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewTreeSelectProps {
  allViews: API.System.View[];
  value?: string[];
  onChange?: (ids: string[]) => void;
}

interface RecursiveNodeProps {
  node: TreeItem;
  level?: number;
  checkedIds: string[];
  onToggle: (nodeId: string, checked: boolean) => void;
  expandedNodeIds: Set<string>;
  onToggleExpand: (nodeId: string) => void;
}

const RecursiveNode = ({ node, level = 0, checkedIds, onToggle, expandedNodeIds, onToggleExpand }: RecursiveNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isCurrentNodeExpanded = expandedNodeIds.has(node.id);

  return (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div className="flex items-center space-x-2 p-1 rounded-md">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggleExpand(node.id)}
            className="p-0.5 rounded-sm hover:bg-muted-foreground/20"
          >
            {isCurrentNodeExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-5" />
        )}
        <Checkbox
          id={`view-checkbox-${node.id}`}
          checked={checkedIds?.includes(node.id)}
          onCheckedChange={(checked) => onToggle(node.id, !!checked)}
        />
        <label htmlFor={`view-checkbox-${node.id}`} className="flex-grow cursor-pointer">
          {node.name}
        </label>
      </div>
      {isCurrentNodeExpanded && hasChildren && (
        <div>
          {node.children.map((child: TreeItem) => (
            <RecursiveNode
              key={child.id}
              node={child}
              level={level + 1}
              checkedIds={checkedIds}
              onToggle={onToggle}
              expandedNodeIds={expandedNodeIds}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function ViewTreeSelect({ allViews, value, onChange }: ViewTreeSelectProps) {
  const [expandedNodeIds, setExpandedNodeIds] = React.useState<Set<string>>(new Set());

  const viewTree = useMemo(() => {
    if (!allViews) return [];
    const safeViews = allViews.filter((item): item is API.System.View & { id: string } => typeof item.id === "string");
    return buildTree(safeViews as TreeItem[]);
  }, [allViews]);

  const handleToggle = (viewId: string, checked: boolean) => {
    const currentIds = value || [];
    const newIds = checked
      ? [...currentIds, viewId]
      : currentIds.filter(id => id !== viewId);
    onChange?.(newIds);
  };

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodeIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allExpandableIds = new Set<string>();
    const collectExpandableIds = (nodes: TreeItem[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allExpandableIds.add(node.id);
          collectExpandableIds(node.children);
        }
      });
    };
    collectExpandableIds(viewTree);
    setExpandedNodeIds(allExpandableIds);
  };

  const collapseAll = () => {
    setExpandedNodeIds(new Set());
  };

  React.useEffect(() => {
    const topLevelIds = viewTree.map(node => node.id);
    setExpandedNodeIds(new Set(topLevelIds));
  }, [viewTree]);

  return (
    <div className="border rounded-md p-2 h-64">
      <div className="flex justify-end space-x-2 mb-2">
        <Button type="button" variant="outline" size="sm" onClick={expandAll}>
          Expand All
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={collapseAll}>
          Collapse All
        </Button>
      </div>
      <ScrollArea className="h-full">
        <div className="p-2">
          {viewTree.map(node => (
            <RecursiveNode
              key={node.id}
              node={node}
              checkedIds={value || []}
              onToggle={handleToggle}
              expandedNodeIds={expandedNodeIds}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
