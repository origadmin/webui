import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/** Query resource list GET /sys/resources */
export async function listPersonalResource(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Resource[]>("/sys/personal/resources", params, options);
}

/** Create resource record POST /sys/resources */
export async function addPersonalResource(body: API.System.Resource, options?: API.RequestOptions) {
  return post<API.System.Resource>("/sys/personal/resources", body, options);
}

/** Get resource record by ID GET /sys/personal/resources/${id} */
export async function getPersonalResource(id: string, options?: API.RequestOptions) {
  return get<API.System.Resource>(`/sys/personal/resources/${id}`, undefined, options);
}

/** Update resource record by ID PUT /sys/personal/resources/${id} */
export async function updatePersonalResource(id: string, body: API.System.Resource, options?: API.RequestOptions) {
  return put<never>(`/sys/personal/resources/${id}`, body, options);
}

/** Delete resource record by ID DELETE /sys/personal/resources/${id} */
export async function deletePersonalResource(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/personal/resources/${id}`, options);
}

export const usePersonalResourcesQuery = (opts?: API.SearchParams) => {
  console.log("usePersonalResourcesQuery", opts);
  return useQuery(
    queryOptions({
      queryKey: ["/sys/personal/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listPersonalResource(opts),
    }),
  );
};

export const usePersonalResourceQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/personal/resources", id],
      queryFn: ({ queryKey: [, id] }) => getPersonalResource(id),
    }),
  );
};

export const usePersonalResourceCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => addPersonalResource(resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/personal/resources"]),
  });
};

export const usePersonalResourceUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => updatePersonalResource(id, resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/personal/resources"]),
  });
};

export const usePersonalResourceDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deletePersonalResource(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/personal/resources"]),
  });
};
