import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { buildTree, TreeItem } from "@/utils/tree";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Define a recursive type for view tree items, ensuring 'id' is mandatory.
interface ViewTreeItem extends TreeItem<ViewTreeItem> {
  name?: string;
}

interface ViewTreeSelectProps {
  allViews: (API.System.View & { id: string; name?: string })[];
  value?: string[];
  onChange?: (ids: string[]) => void;
}

export interface ViewTreeSelectRef {
  expandAll: () => void;
  collapseAll: () => void;
}

interface RecursiveNodeProps {
  node: ViewTreeItem;
  level?: number;
  onToggle: (nodeId: string, checked: boolean) => void;
  expandedNodeIds: Set<string>;
  onToggleExpand: (nodeId: string) => void;
  getCheckedState: (node: ViewTreeItem) => boolean | "indeterminate";
}

const RecursiveNode = ({
  node,
  level = 0,
  onToggle,
  expandedNodeIds,
  onToggleExpand,
  getCheckedState,
}: RecursiveNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isCurrentNodeExpanded = expandedNodeIds.has(node.id);
  const checkedState = getCheckedState(node);

  return (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div className='flex items-center space-x-2 p-1 rounded-md'>
        {hasChildren ? (
          <button
            type='button'
            onClick={() => onToggleExpand(node.id)}
            className='p-0.5 rounded-sm hover:bg-muted-foreground/20'
          >
            {isCurrentNodeExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className='w-5' />
        )}
        <Checkbox
          id={`view-checkbox-${node.id}`}
          checked={checkedState}
          onCheckedChange={(checked) => onToggle(node.id, !!checked)}
        />
        <label htmlFor={`view-checkbox-${node.id}`} className='flex-grow cursor-pointer'>
          {node.name}
        </label>
      </div>
      {isCurrentNodeExpanded && hasChildren && (
        <div>
          {node.children?.map((child) => (
            <RecursiveNode
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              expandedNodeIds={expandedNodeIds}
              onToggleExpand={onToggleExpand}
              getCheckedState={getCheckedState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ViewTreeSelect = forwardRef<ViewTreeSelectRef, ViewTreeSelectProps>(
  ({ allViews, value, onChange }, ref) => {
    const [expandedNodeIds, setExpandedNodeIds] = React.useState<Set<string>>(new Set());

    const { viewTree, nodesMap, parentMap } = useMemo(() => {
      if (!allViews) {
        return { viewTree: [], nodesMap: new Map<string, ViewTreeItem>(), parentMap: new Map<string, string>() };
      }

      const safeViews = allViews.filter(
        (item): item is API.System.View & { id: string } => typeof item.id === "string",
      );

      const tree = buildTree<ViewTreeItem>(safeViews as unknown as ViewTreeItem[]);

      const nodesMap = new Map<string, ViewTreeItem>();
      const parentMap = new Map<string, string>();

      const traverse = (nodes: ViewTreeItem[], parentId?: string) => {
        nodes.forEach((node) => {
          nodesMap.set(node.id, node);
          if (parentId) {
            parentMap.set(node.id, parentId);
          }
          if (node.children) {
            traverse(node.children, node.id);
          }
        });
      };

      traverse(tree);

      return { viewTree: tree, nodesMap, parentMap };
    }, [allViews]);

    const getAllChildIds = useMemo(
      () => (nodeId: string) => {
        const childrenIds: string[] = [];
        const node = nodesMap.get(nodeId);
        const stack = node ? [node] : [];
        while (stack.length > 0) {
          const currentNode = stack.pop();
          if (currentNode?.children) {
            for (const child of currentNode.children) {
              childrenIds.push(child.id);
              stack.push(child);
            }
          }
        }
        return childrenIds;
      },
      [nodesMap],
    );

    const handleToggle = (viewId: string, checked: boolean) => {
      const newCheckedIds = new Set(value || []);
      const childIds = getAllChildIds(viewId);

      if (checked) {
        newCheckedIds.add(viewId);
        childIds.forEach((id) => newCheckedIds.add(id));

        let parentId = parentMap.get(viewId);
        while (parentId) {
          newCheckedIds.add(parentId);
          parentId = parentMap.get(parentId);
        }
      } else {
        newCheckedIds.delete(viewId);
        childIds.forEach((id) => newCheckedIds.delete(id));

        let parentId = parentMap.get(viewId);
        while (parentId) {
          const parentNode = nodesMap.get(parentId);
          const parentChildrenIds = parentNode?.children?.map((c) => c.id) || [];
          const allChildrenUnchecked = parentChildrenIds.every((childId) => !newCheckedIds.has(childId));

          if (allChildrenUnchecked) {
            newCheckedIds.delete(parentId);
          }

          parentId = parentMap.get(parentId);
        }
      }

      onChange?.(Array.from(newCheckedIds));
    };

    const getCheckedStateForNode = (node: ViewTreeItem): boolean | "indeterminate" => {
      const checkedIdsSet = new Set(value || []);
      if (checkedIdsSet.has(node.id)) {
        return true;
      }

      const allChildIds = getAllChildIds(node.id);
      if (allChildIds.length === 0) {
        return false;
      }

      const anyChildChecked = allChildIds.some((childId) => checkedIdsSet.has(childId));
      return anyChildChecked ? "indeterminate" : false;
    };

    const handleToggleExpand = (nodeId: string) => {
      setExpandedNodeIds((prev) => {
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
      const collectExpandableIds = (nodes: ViewTreeItem[]) => {
        nodes.forEach((node) => {
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

    useImperativeHandle(ref, () => ({
      expandAll,
      collapseAll,
    }));

    React.useEffect(() => {
      if (viewTree.length > 0) {
        const topLevelIds = viewTree.map((node) => node.id);
        setExpandedNodeIds(new Set(topLevelIds));
      }
    }, [viewTree]);

    return (
      <div className='border rounded-md p-2'>
        <div className='p-2'>
          {viewTree.map((node) => (
            <RecursiveNode
              key={node.id}
              node={node}
              onToggle={handleToggle}
              expandedNodeIds={expandedNodeIds}
              onToggleExpand={handleToggleExpand}
              getCheckedState={getCheckedStateForNode}
            />
          ))}
        </div>
      </div>
    );
  },
);

ViewTreeSelect.displayName = "ViewTreeSelect";
