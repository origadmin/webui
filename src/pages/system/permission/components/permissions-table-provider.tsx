import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.Permission>();

export { Provider as PermissionTableProvider, useTable as usePermissionTable };
