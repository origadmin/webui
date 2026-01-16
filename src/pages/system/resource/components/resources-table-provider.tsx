import { API } from "@/api";
import createTableContext from "@/components/DataTable/table-provider";


const { Provider, useTable } = createTableContext<API.System.Resource>();

export { Provider as ResourceTableProvider, useTable as useResourceTable };
