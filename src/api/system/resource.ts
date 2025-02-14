import { get, post, put, del } from "@/utils/request";

/** Query resource list GET /api/v1/sys/resources */
export async function listResource(params: API.SearchParams, options?: API.RequestOptions) {
  options = {
    params,
    ...options,
  };
  return get<API.System.Resource[]>("/api/v1/sys/resources", options);
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
