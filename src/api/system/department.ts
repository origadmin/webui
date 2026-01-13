import { get } from "@/utils/request";
import { useQuery, queryOptions } from "@tanstack/react-query";

type DepartmentPath = paths["/sys/departments"]["get"]["parameters"]["query"];

export async function listDepartments(params: DepartmentPath, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.ListDepartmentsResponse>("/sys/departments", params, options);
  return rawResponse;
}

export const useDepartmentsQuery = (opts?: DepartmentPath) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/departments", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, DepartmentPath] }) => listDepartments(opts),
    })
  );
};
