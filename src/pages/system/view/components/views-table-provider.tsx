import createTableContext from "@/components/DataTable/table-privider";
import { API } from "@/api";

const { Provider, useTable } = createTableContext<API.System.View>();

export { Provider as ViewTableProvider, useTable as useViewTable };
