export interface PermissionTemplate {
  label: string;
  value: string;
  description: string;
  // Use keywords for matching, as IDs might change across environments
  viewKeywords: string[];
  resourceKeywords: string[];
}

// These are example templates. In a real application, you might fetch these from an API
// or configure them based on your actual system keywords.
export const PRESET_TEMPLATES: PermissionTemplate[] = [
  {
    label: "User Management - Full Access",
    value: "user_full",
    description: "Full access to user management pages, including create, edit, and delete.",
    viewKeywords: ["system", "system:user"],
    resourceKeywords: [
      "user:list",
      "user:get",
      "user:create",
      "user:update",
      "user:delete",
      "user:status",
      "user:password",
    ],
  },
  {
    label: "User Management - Read Only",
    value: "user_readonly",
    description: "View-only access to user lists and details. No modification allowed.",
    viewKeywords: ["system", "system:user"],
    resourceKeywords: ["user:list", "user:get"],
  },
  {
    label: "Role Management - Full Access",
    value: "role_full",
    description: "Full access to role management.",
    viewKeywords: ["system", "system:role"],
    resourceKeywords: ["role:list", "role:get", "role:create", "role:update", "role:delete"],
  },
];
