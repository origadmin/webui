import React, { useMemo } from "react";
import { buildTree, TreeItem } from "@/utils/tree";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ViewResourceTreeProps {
  allViews: (API.System.View & { resources?: API.System.Resource[] })[];
  allResources: API.System.Resource[];
  value?: {
    view_ids?: string[];
    resource_ids?: string[];
  };
  onChange?: (value: { view_ids: string[]; resource_ids: string[] }) => void;
}

// Recursive component to render a tree with checkboxes
const RecursiveNode = ({ node, level = 0, checkedIds, onToggle, renderLabel }: any) => {
  const [isOpen, setIsOpen] = React.useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div className='flex items-center space-x-2 p-1 rounded-md'>
        {hasChildren ? (
          <button onClick={() => setIsOpen(!isOpen)} className='p-0.5 rounded-sm hover:bg-muted-foreground/20'>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className='w-5' />
        )}
        <Checkbox
          id={`${node.id}`}
          checked={checkedIds?.includes(node.id)}
          onCheckedChange={(checked) => onToggle(node.id, !!checked)}
        />
        <label htmlFor={`${node.id}`} className='flex-grow cursor-pointer'>
          {renderLabel ? renderLabel(node) : node.name}
        </label>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children.map((child: any) => (
            <RecursiveNode key={child.id} {...{ node: child, level: level + 1, checkedIds, onToggle, renderLabel }} />
          ))}
        </div>
      )}
    </div>
  );
};

export function ViewResourceTree({ allViews, allResources, value, onChange }: ViewResourceTreeProps) {
  const viewTree = useMemo(() => {
    if (!allViews) return [];
    const safeViews = allViews.filter((item): item is API.System.View & { id: string } => typeof item.id === "string");
    return buildTree(safeViews as TreeItem[]);
  }, [allViews]);

  const resourceTree = useMemo(() => {
    if (!allResources) return [];
    const safeResources = allResources.filter(
      (item): item is API.System.Resource & { id: string } => typeof item.id === "string",
    );
    return buildTree(safeResources as TreeItem[]);
  }, [allResources]);

  const viewMap = useMemo(() => new Map(allViews.map((v) => [v.id, v])), [allViews]);

  const handleViewToggle = (viewId: string, checked: boolean) => {
    const currentViewIds = value?.view_ids || [];
    const newViewIds = checked ? [...currentViewIds, viewId] : currentViewIds.filter((id) => id !== viewId);

    const view = viewMap.get(viewId);
    const associatedResourceIds = (view?.resources?.map((r) => r.id).filter(Boolean) as string[]) || [];
    const currentResourceIds = new Set(value?.resource_ids || []);

    if (checked) {
      associatedResourceIds.forEach((id) => currentResourceIds.add(id));
    } else {
      const otherSelectedViews = newViewIds.map((id) => viewMap.get(id)).filter(Boolean);
      const resourcesFromOtherViews = new Set<string>();
      otherSelectedViews.forEach((v) => {
        v?.resources?.forEach((r) => r.id && resourcesFromOtherViews.add(r.id));
      });
      associatedResourceIds.forEach((id) => {
        if (!resourcesFromOtherViews.has(id)) {
          currentResourceIds.delete(id);
        }
      });
    }

    onChange?.({
      view_ids: newViewIds,
      resource_ids: Array.from(currentResourceIds),
    });
  };

  const handleResourceToggle = (resourceId: string, checked: boolean) => {
    const currentResourceIds = value?.resource_ids || [];
    const newResourceIds = checked
      ? [...currentResourceIds, resourceId]
      : currentResourceIds.filter((id) => id !== resourceId);
    onChange?.({ ...value, resource_ids: newResourceIds });
  };

  return (
    <div className='flex flex-col h-[32rem] space-y-4'>
      {/* Views Section */}
      <div className='flex-1 border rounded-md p-2 flex flex-col'>
        <h3 className='text-lg font-medium mb-2 px-2'>Included Pages/Views</h3>
        <Separator className='mb-2' />
        <ScrollArea className='flex-grow'>
          <div className='px-2'>
            {viewTree.map((node) => (
              <RecursiveNode key={node.id} node={node} checkedIds={value?.view_ids} onToggle={handleViewToggle} />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Resources Section */}
      <div className='flex-1 border rounded-md p-2 flex flex-col'>
        <h3 className='text-lg font-medium mb-2 px-2'>Associated APIs (Resources)</h3>
        <Separator className='mb-2' />
        <ScrollArea className='flex-grow'>
          <div className='px-2'>
            {resourceTree.map((node) => (
              <RecursiveNode
                key={node.id}
                node={node}
                checkedIds={value?.resource_ids}
                onToggle={handleResourceToggle}
                renderLabel={(node: API.System.Resource) => (
                  <div className='flex flex-col'>
                    <span>{node.name}</span>
                    <span className='text-xs text-muted-foreground'>{node.path}</span>
                  </div>
                )}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
