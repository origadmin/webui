import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";


/** Query resource list GET /sys/resources */
export async function listResource(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Resource[]>("/sys/resources", params, options);
}

/** Create resource record POST /sys/resources */
export async function addResource(body: API.Resource, options?: API.RequestOptions) {
  return post<API.System.Resource>("/sys/resources", body, options);
}

/** Get resource record by ID GET /sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  return get<API.System.Resource>(`/sys/resources/${id}`, undefined, options);
}

/** Update resource record by ID PUT /sys/resources/${id} */
export async function updateResource(id: string, body: API.Resource, options?: API.RequestOptions) {
  return put<never>(`/sys/resources/${id}`, body, options);
}

/** Delete resource record by ID DELETE /sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/resources/${id}`, options);
}

export const useResourcesQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listResource(opts),
    }),
  );
};

export const useResourceQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", id],
      queryFn: ({ queryKey: [, id] }) => getResource(id),
    }),
  );
};

export const useResourceCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => addResource(resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};

export const useResourceUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => updateResource(id, resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};

export const useResourceDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};
