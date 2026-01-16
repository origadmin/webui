import createTableContext from "@/components/DataTable/table-provider";


const { Provider, useTable } = createTableContext<API.System.Permission>();

export { Provider as PermissionTableProvider, useTable as usePermissionTable };
