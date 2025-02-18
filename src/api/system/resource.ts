import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient } from "@tanstack/react-query";


/** Query resource list GET /api/v1/sys/resources */
export async function listResource(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Resource[]>("/api/v1/sys/resources", params, options);
}

/** Create resource record POST /api/v1/sys/resources */
export async function addResource(body: API.Resource, options?: API.RequestOptions) {
  return post<API.System.Resource>("/api/v1/sys/resources", body, options);
}

/** Get resource record by ID GET /api/v1/sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  return get<API.System.Resource>(`/api/v1/sys/resources/${id}`, undefined, options);
}

/** Update resource record by ID PUT /api/v1/sys/resources/${id} */
export async function updateResource(id: string, body: API.Resource, options?: API.RequestOptions) {
  return put<never>(`/api/v1/sys/resources/${id}`, body, options);
}

/** Delete resource record by ID DELETE /api/v1/sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return del<never>(`/api/v1/sys/resources/${id}`, options);
}

export const resourcesQueryOptions = (opts?: API.SearchParams) =>
  Query.createQueryOptions(["/sys/resources", { ...opts }], listResource);

export const resourceQueryOptions = (id: string) => Query.createQueryOptions(["/sys/resources", id], getResource);

export const resourceCreateOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (resource: Omit<API.System.Resource, "id">) => addResource(resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  };
};

export const resourceUpdateOption = (queryClient: QueryClient, id: string) => {
  return {
    mutationFn: (resource: Omit<API.System.Resource, "id">) => updateResource(id, resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  };
};

export const resourceDeleteOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (id: string) => deleteResource(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  };
};
