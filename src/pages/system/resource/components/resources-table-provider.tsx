import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.Resource>();

export { Provider as ResourceTableProvider, useTable as useResourceTable };
