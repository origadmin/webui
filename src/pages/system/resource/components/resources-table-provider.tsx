import { API } from "@/api";
import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.System.Resource>();

export { Provider as ResourceTableProvider, useTable as useResourceTable };
