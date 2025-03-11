import { useMemo, useState } from "react";
import { MultiSelect, MultiSelectOption } from "@/components/MultiSelect";

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  permissions?: API.System.Permission[];
}

export function RolesPermissionSelect({ value = [], onChange, permissions = [] }: Props) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(value);
  const transformPermissions = (permissions: API.System.Permission[]): MultiSelectOption[] => {
    return permissions.map((permission) => ({
      value: permission.id!,
      label: permission.name!,
    }));
  };

  const handlePermissionChange = (value: string[]) => {
    setSelectedPermissions(value);
    if (onChange) {
      onChange(value);
    }
  };

  const permissionTreeData = transformPermissions(permissions);
  const treeData = useMemo(() => permissionTreeData, [permissionTreeData]);

  return (
    <div className='w-full flex col-span-12 flex-col overflow-y-hidden'>
      <MultiSelect
        // className={cn("w-full flex col-span-12 flex-col items-center overflow-y-hidden", className)}
        placeholder='Select permissions'
        options={treeData}
        defaultValue={treeData
          .map((option) => option.value)
          .filter((value) => Array.isArray(selectedPermissions) && selectedPermissions.includes(value))}
        onValueChange={handlePermissionChange}
      />
    </div>
  );
}
