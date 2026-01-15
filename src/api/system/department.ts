import { get } from "@/utils/request";
import { queryOptions, useQuery } from "@tanstack/react-query";

export async function listDepartments(params?: API.SearchParams, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.ListDepartmentsResponse>("/sys/departments", params, options);
  return {
    items: rawResponse?.departments || [],
    total: rawResponse?.total || 0,
  };
}

export const useDepartmentsQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/departments", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => {
        return listDepartments(opts);
      },
    }),
  );
};
