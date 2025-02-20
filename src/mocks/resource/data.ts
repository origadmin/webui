import { IconCash, IconShield, IconUsersGroup, IconUserShield } from "@tabler/icons-react";

export const resourceTypes = [
  {
    label: "Superadmin",
    value: "superadmin",
    icon: IconShield,
  },
  {
    label: "Admin",
    value: "admin",
    icon: IconUserShield,
  },
  {
    label: "Manager",
    value: "manager",
    icon: IconUsersGroup,
  },
  {
    label: "Cashier",
    value: "cashier",
    icon: IconCash,
  },
] as const;
