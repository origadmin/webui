import { useEffect, useMemo, useState, useCallback } from "react";
import { resourceTypeValues } from "@/types/system/resource";
import { Checkbox } from "@/components/ui/checkbox";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import { Tree, TreeNode } from "@/components/Tree";

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  resources?: API.System.Resource[];
}

export function RolesResourceSelect({ value = [], onChange, resources = [] }: Props) {
  const [selectedResources, setSelectedResources] = useState<string[]>(value);

  useEffect(() => {
    setSelectedResources(value);
  }, [value]);

  // useEffect(() => {
  //   if (onChange) {
  //     onChange(selectedResources);
  //   }
  // }, [onChange, selectedResources]);

  const handleResourceSelect = (resourceId: string, checked: boolean) => {
    const newSelectedResources = checked
      ? [...selectedResources, resourceId]
      : selectedResources.filter((id) => id !== resourceId);
    setSelectedResources(newSelectedResources);
    onChange?.(newSelectedResources);
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

  const transformResourcesToTreeData = useCallback(
    (resources: API.System.Resource[]): TreeNode[] => {
      return resources.map((resource) => ({
        id: resource.id!,
        name: resource.name!,
        children: resource.children ? transformResourcesToTreeData(resource.children) : [],
        content: renderResourceNode(resource),
      }));
    },
    [renderResourceNode],
  );

  const treeData = useMemo(() => transformResourcesToTreeData(resources), [resources, transformResourcesToTreeData]);

  return (
    <div className='w-full flex col-span-12 flex-col overflow-y-auto'>
      <Tree data={treeData} />
    </div>
  );
}
