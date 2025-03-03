import { ReactNode, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  content?: ReactNode;
}

interface TreeProps {
  data: TreeNode[];
  level?: number;
  className?: string;
}

export function Tree({ data, level = 0, className }: TreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (expandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  return (
    <ul className={cn("list-none", className)}>
      {data.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedNodes.has(node.id);

        return (
          <li key={node.id} className='pl-2'>
            <div className='flex items-center'>
              {hasChildren && (
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => toggleNode(node.id)}
                  className='h-4 w-4 px-4 border-0 hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  <IconChevronRight
                    className={cn("h-4 w-4 transition-transform", {
                      "transform rotate-90": isExpanded,
                    })}
                  />
                </Button>
              )}
              {!hasChildren && <div className='w-6' />}
              <div className='flex-1'>{node.content || node.name}</div>
            </div>
            {hasChildren && isExpanded && node.children && (
              <Tree data={node.children} level={level + 1} className='mt-1' />
            )}
          </li>
        );
      })}
    </ul>
  );
}
