import React, { useMemo } from "react";
import { buildTree, TreeItem } from "@/utils/tree";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// This component is now ONLY for Views
interface ViewNode extends Omit<API.System.View, "children" | "id">, TreeItem<ViewNode> {
  id: string;
  children?: ViewNode[];
}

interface ViewTreeProps {
  allViews: API.System.View[];
  checkedIds?: string[];
  onToggle: (id: string, checked: boolean) => void;
}

interface RecursiveNodeProps {
  node: ViewNode;
  level: number;
  checkedIds?: string[];
  onToggle: (id: string, checked: boolean) => void;
}

// Recursive component to render a tree with checkboxes
const RecursiveNode = ({ node, level = 0, checkedIds, onToggle }: RecursiveNodeProps) => {
  const [isOpen, setIsOpen] = React.useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ paddingLeft: `${level}rem` }}>
      <div className='flex items-center space-x-2 p-1 rounded-md'>
        {hasChildren ? (
          <button
            type='button' // Add type="button" to prevent form submission
            onClick={() => setIsOpen(!isOpen)}
            className='p-0.5 rounded-sm hover:bg-muted-foreground/20'
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className='w-5' />
        )}
        <Checkbox
          id={`view-${node.id}`}
          checked={checkedIds?.includes(node.id)}
          onCheckedChange={(checked) => onToggle(node.id, !!checked)}
        />
        <label htmlFor={`view-${node.id}`} className='flex-grow cursor-pointer'>
          {node.name}
        </label>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <RecursiveNode
              key={child.id}
              node={child}
              level={level + 1}
              checkedIds={checkedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function ViewTree({ allViews, checkedIds, onToggle }: ViewTreeProps) {
  const viewTree = useMemo(() => {
    if (!allViews) return [];
    const safeViews = allViews.filter((item): item is ViewNode => typeof item.id === "string");
    return buildTree<ViewNode>(safeViews);
  }, [allViews]);

  return (
    <ScrollArea className='h-full w-full rounded-md border p-2'>
      <div className='px-2'>
        {viewTree.map((node) => (
          <RecursiveNode
            key={node.id}
            node={node}
            level={0}
            checkedIds={checkedIds}
            onToggle={onToggle}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
