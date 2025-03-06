import { useMemo, useState } from "react";
import { resourceTypeValues } from "@/types/system/resource";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import { Tree, TreeNode } from "@/components/Tree";

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  resources?: API.System.Resource[];
  expandAll?: boolean;
}

export function RolesResourceSelect({ value = [], onChange, expandAll, resources = [] }: Props) {
  const [selectedResources, setSelectedResources] = useState<string[]>(value);
  const changeCallback = (newValue: string[]) => {
    console.log("newValue", newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleResourceSelect = (resourceId: string, checked: boolean) => {
    const getAllChildrenIds = (resources: API.System.Resource[]): string[] => {
      return resources.reduce((acc, curr) => {
        if (curr.children) {
          return [...acc, curr.id!, ...getAllChildrenIds(curr.children)];
        }
        return [...acc, curr.id!];
      }, [] as string[]);
    };

    const currentResource = resources.find((r) => r.id === resourceId);
    const childIds = currentResource?.children?.length ? getAllChildrenIds(currentResource.children) : [];

    const newSelected = checked
      ? [...new Set([resourceId, ...childIds, ...selectedResources])]
      : selectedResources.filter((id) => id !== resourceId && !childIds.includes(id));

    setSelectedResources(newSelected);
    changeCallback(newSelected);
  };
  const renderResourceNode = (resource: API.System.Resource) => {
    const isSelected = (resource && resource.id && selectedResources.includes(resource.id)) || false;
    return (
      <div className='flex col-span-12 grid-cols-subgrid items-center space-x-2'>
        <Checkbox
          id={resource.id}
          checked={isSelected}
          onCheckedChange={(state) => {
            // Handles three states：true/false/indeterminate
            const checked = state === "indeterminate" ? true : state;
            handleResourceSelect(resource.id || "", checked);
          }}
        />
        <div className='flex w-full items-center'>
          {resource.icon && <TablerIcon name={resource.icon} size={24} className='mr-2 w-4 h-4' />}
          <span className='text-sm font-medium'>{resource.name}</span>
          {resource.type && (
            <span className='ml-2 text-xs text-gray-500'>({resourceTypeValues.get(resource.type)})</span>
          )}
        </div>
        <div className='flex col-span-1 p-0.5 items-center justify-end text-nowrap'>
          {isSelected ? (
            <Badge
              variant='destructive'
              className='rounded-sm font-normal'
              onClick={() => {
                handleResourceSelect(resource.id || "", false);
              }}
            >
              关闭
            </Badge>
          ) : (
            <Badge
              variant='outline'
              className='rounded-sm font-normal'
              onClick={() => {
                handleResourceSelect(resource.id || "", true);
              }}
            >
              启用
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const transformResourcesToTreeData = (resources: API.System.Resource[]): TreeNode[] => {
    return resources.map((resource) => ({
      id: resource.id!,
      name: resource.name!,
      children: resource.children ? transformResourcesToTreeData(resource.children) : [],
      content: renderResourceNode(resource),
    }));
  };

  const resourceTreeData = transformResourcesToTreeData(resources);
  const treeData = useMemo(() => resourceTreeData, [resourceTreeData]);

  return (
    <div className='w-full flex col-span-12 flex-col overflow-y-hidden'>
      <Tree expandAll={expandAll} data={treeData} />
    </div>
  );
}
