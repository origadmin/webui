import { transformListParams } from "@/utils/api";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query resource list GET /sys/resources
 */
export async function listResource(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const rawResponse = await get<API.System.ListResourcesResponse>("/sys/resources", backendParams, options);
  return {
    items: rawResponse?.resources || [],
    total: rawResponse?.total || 0,
  };
}

/** Get resource record by ID GET /sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetResourceResponse>(`/sys/resources/${id}`, undefined, options);
  return rawResponse?.resource;
}

/** Create resource record POST /sys/resources */
export async function addResource(body: Omit<API.System.Resource, "id">, options?: API.RequestOptions) {
  const requestBody = {
    resource: body,
  };
  const rawResponse = await post<API.System.CreateResourceResponse>("/sys/resources", requestBody, options);
  return rawResponse?.resource;
}

/** Update resource record by ID PUT /sys/resources/${id} */
export async function updateResource(id: string, body: Partial<API.System.Resource>, options?: API.RequestOptions) {
  const requestBody = {
    resource: body,
  };
  return put<never>(`/sys/resources/${id}`, requestBody, options);
}

/** Delete resource record by ID DELETE /sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/resources/${id}`, options);
}

/** Sync resources from code POST /sys/resources/sync */
export async function syncResources(options?: API.RequestOptions) {
  return post<never>("/sys/resources/sync", {}, options);
}

// --- React Query hooks ---

export const useResourcesQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listResource(opts),
    }),
  );
};

export const useResourceQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", id],
      queryFn: ({ queryKey: [, id] }) => getResource(id),
      enabled: !!id,
    }),
  );
};

export const useResourceCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => addResource(resource),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/resources"] }),
  });
};

export const useResourceUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (resource: Partial<API.System.Resource>) => updateResource(id, resource),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/resources"] }),
  });
};

export const useResourceDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/resources"] }),
  });
};

export const useSyncResources = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => syncResources(),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/resources"] }),
  });
};
