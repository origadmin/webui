import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.System.User>();

export { Provider as UserTableProvider, useTable as useUserTable };
