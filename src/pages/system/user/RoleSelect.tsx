import React, { useEffect, useState } from "react";
import { listRole } from "@/services/system/role";
import { MultiSelect } from "@/components/ui/multi-select";

type UserRole = {
  created_at?: string;
  id?: string;
  role_id?: string;
  role_name?: string;
  updated_at?: string;
  user_id?: string;
};

type RoleSelectProps = {
  value?: UserRole[];
  onChange?: (value: UserRole[]) => void;
  className?: string;
};

export const RoleSelect: React.FC<RoleSelectProps> = ({ value, onChange, className }) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await listRole({ status: "enabled", resultType: "select" });
      if (res.data) {
        setOptions(res.data.map((item) => ({ label: item.name, value: item.id })));
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (selectedValues: string[]) => {
    if (onChange) {
      onChange(selectedValues.map((value) => ({ role_id: value })));
    }
  };

  return (
    <MultiSelect
      options={options}
      value={value?.map((item) => item.role_id!) || []}
      onChange={handleChange}
      className={className}
    />
  );
};
