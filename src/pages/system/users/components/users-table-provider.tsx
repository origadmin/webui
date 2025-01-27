import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.User>();

export { Provider as UserTableProvider, useTable as useUserTable };
