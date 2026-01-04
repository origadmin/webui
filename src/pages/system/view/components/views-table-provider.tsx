import { API } from "@/api";
import createTableContext from "@/components/DataTable/table-privider";

const { Provider, useTable } = createTableContext<API.System.View>();

export { Provider as ViewTableProvider, useTable as useViewTable };
