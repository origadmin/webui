import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.System.Role>();

export { Provider as RoleTableProvider, useTable as useRoleTable };
