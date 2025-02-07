import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.Role>();

export { Provider as RoleTableProvider, useTable as useRoleTable };
