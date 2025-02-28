import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import TablerIcon from "@/components/IconPicker/tabler-icon";

interface ResourceTreeProps {
  resources: API.System.Resource[];
  selectedResources?: string[];
  onSelectedChange?: (resources: string[]) => void;
}

interface TreeNode extends API.System.Resource {
  children?: TreeNode[];
  checked?: boolean;
  indeterminate?: boolean;
  expanded?: boolean;
}

export function ResourceTree({ resources = [], selectedResources = [], onSelectedChange }: ResourceTreeProps) {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  // 构建树形结构
  const buildTree = (items: API.System.Resource[]) => {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    // 创建节点映射
    items.forEach((item) => {
      if (!item.id) return;
      map.set(item.id, { ...item, children: [], checked: selectedResources.includes(item.id) });
    });

    // 构建树形结构
    items.forEach((item) => {
      if (!item.id) return;
      const node = map.get(item.id);
      if (!node) return;

      if (!item.parent_id) {
        roots.push(node);
      } else {
        const parent = map.get(item.parent_id);
        if (parent && parent.children) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  };

  // 更新节点状态
  const updateNodeState = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        updateNodeState(node.children);
        const checkedChildren = node.children.filter((child) => child.checked);
        const indeterminateChildren = node.children.filter((child) => child.indeterminate);

        node.checked = checkedChildren.length === node.children.length;
        node.indeterminate =
          (checkedChildren.length > 0 && checkedChildren.length < node.children.length) ||
          indeterminateChildren.length > 0;
      }
    });
  };

  // 收集选中的资源ID
  const collectSelectedResources = (nodes: TreeNode[]): string[] => {
    let selected: string[] = [];
    nodes.forEach((node) => {
      if (node.checked && node.id) {
        selected.push(node.id);
      }
      if (node.children && node.children.length > 0) {
        selected = [...selected, ...collectSelectedResources(node.children)];
      }
    });
    return selected;
  };

  // 处理节点选中状态变化
  const handleNodeCheck = (node: TreeNode, checked: boolean) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            checked,
            indeterminate: false,
            children: n.children ? updateChildren(n.children, checked) : undefined,
          };
        }
        if (n.children && n.children.length > 0) {
          return {
            ...n,
            children: updateNode(n.children),
          };
        }
        return n;
      });
    };

    const updateChildren = (nodes: TreeNode[], checked: boolean): TreeNode[] => {
      return nodes.map((n) => ({
        ...n,
        checked,
        indeterminate: false,
        children: n.children ? updateChildren(n.children, checked) : undefined,
      }));
    };

    const newTreeData = updateNode(treeData);
    updateNodeState(newTreeData);
    setTreeData(newTreeData);

    if (onSelectedChange) {
      onSelectedChange(collectSelectedResources(newTreeData));
    }
  };

  // 处理节点展开/折叠
  const handleNodeExpand = (node: TreeNode) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((n) => {
        if (n.id === node.id) {
          return { ...n, expanded: !n.expanded };
        }
        if (n.children && n.children.length > 0) {
          return { ...n, children: updateNode(n.children) };
        }
        return n;
      });
    };

    setTreeData(updateNode(treeData));
  };

  // 渲染树节点
  const renderNode = (node: TreeNode, level = 0) => {
    return (
      <div key={node.id} className='w-full'>
        <div className={cn("flex items-center py-1 px-2 hover:bg-accent rounded-sm", level > 0 && "ml-6")}>
          <div className='flex items-center flex-1'>
            {node.children && node.children.length > 0 ? (
              <button onClick={() => handleNodeExpand(node)} className='w-4 h-4 mr-2 flex items-center justify-center'>
                {node.expanded ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
              </button>
            ) : (
              <span className='w-6' />
            )}
            <Checkbox
              id={node.id}
              checked={node.checked}
              onCheckedChange={(checked) => handleNodeCheck(node, checked as boolean)}
              className='mr-2'
            />
            {node.icon && <TablerIcon name={node.icon} className='mr-2' />}
            <span className='text-sm'>{node.name}</span>
          </div>
        </div>
        {node.expanded && node.children && node.children.length > 0 && (
          <div className='ml-4'>{node.children.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    );
  };

  // 初始化树形数据
  useEffect(() => {
    const tree = buildTree(resources);
    updateNodeState(tree);
    setTreeData(tree);
  }, [resources, selectedResources]);

  return (
    <ScrollArea className='h-[400px] w-full border rounded-md'>
      <div className='p-2'>{treeData.map((node) => renderNode(node))}</div>
    </ScrollArea>
  );
}
