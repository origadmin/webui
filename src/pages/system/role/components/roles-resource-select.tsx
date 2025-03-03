import { useMemo, useState } from "react";
import { resourceTypeValues } from "@/types/system/resource";
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
    const newSelectedResources = checked
      ? [...selectedResources, resourceId]
      : selectedResources.filter((id) => id !== resourceId);
    setSelectedResources(newSelectedResources);
    changeCallback(newSelectedResources);
  };
  const renderResourceNode = (resource: API.System.Resource) => {
    const isSelected = (resource && resource.id && selectedResources.includes(resource.id)) || false;
    return (
      <div className='flex col-span-12 items-center space-x-2'>
        <Checkbox
          id={resource.id}
          checked={isSelected}
          onCheckedChange={(checked) => handleResourceSelect(resource.id || "", checked as boolean)}
        />
        <div className='flex items-center'>
          {resource.icon && <TablerIcon name={resource.icon} size={24} className='mr-2 w-4 h-4' />}
          <span className='text-sm font-medium'>{resource.name}</span>
          {resource.type && (
            <span className='ml-2 text-xs text-gray-500'>({resourceTypeValues.get(resource.type)})</span>
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
