import createTableContext from "@/components/DataTable/table-privider";
import { API } from "@/api";

const { Provider, useTable } = createTableContext<API.System.Resource>();

export { Provider as ResourceTableProvider, useTable as useResourceTable };
