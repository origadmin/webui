import React, { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { MultiSelect, MultiSelectOption } from "@/components/MultiSelect";

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  roles?: API.System.Role[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function RoleMultiSelect({
  value = [],
  onChange,
  onOpenChange,
  roles = [],
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(value);

  // Sync internal state with prop value
  useEffect(() => {
    setSelectedRoles(value);
  }, [value]);

  const transformRoles = (roles: API.System.Role[]): MultiSelectOption[] => {
    return roles.map((role) => ({
      value: String(role.id), // Ensure ID is string
      label: role.name || "", // Ensure label is string
    }));
  };

  const handleRoleChange = (newValue: string[]) => {
    setSelectedRoles(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const roleTreeData = transformRoles(roles);
  const treeData = useMemo(() => roleTreeData, [roleTreeData]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      // Trigger fetch when near bottom (e.g., 50px)
      if (scrollHeight - scrollTop - clientHeight < 50 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  return (
    <div className='w-full flex col-span-12 flex-col overflow-y-hidden'>
      <MultiSelect
        placeholder='Select roles'
        options={treeData}
        defaultValue={selectedRoles}
        onChange={handleRoleChange}
        onOpenChange={onOpenChange}
        onListScroll={handleScroll}
        scrollRef={scrollRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
