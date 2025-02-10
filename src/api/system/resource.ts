import { Pagination } from "@/utils";
import { get, post, put, del } from "@/utils/request";

/** Query resource list GET /api/v1/sys/resources */
export async function listResource(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return get<API.Result<API.Resource[]>>("/api/v1/sys/resources", params, options);
}

/** Create resource record POST /api/v1/sys/resources */
export async function addResource(body: API.Resource, options?: API.RequestOptions) {
  return post<API.Result<API.Resource>>("/api/v1/sys/resources", body, options);
}

/** Get resource record by ID GET /api/v1/sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  return get<API.Result<API.Resource>>(`/api/v1/sys/resources/${id}`, undefined, options);
}

/** Update resource record by ID PUT /api/v1/sys/resources/${id} */
export async function updateResource(id: string, body: API.Resource, options?: API.RequestOptions) {
  return put<API.Result<unknown>>(`/api/v1/sys/resources/${id}`, body, options);
}

/** Delete resource record by ID DELETE /api/v1/sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return del<API.Result<unknown>>(`/api/v1/sys/resources/${id}`, options);
}
