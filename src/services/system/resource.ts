import { Pagination } from "@/utils";
import { request } from "@/utils/service.tsx";

/** Query resource list GET /api/v1/sys/resources */
export async function listResource(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return request<API.Result<API.Resource[]>>("/api/v1/sys/resources", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create resource record POST /api/v1/sys/resources */
export async function addResource(body: API.Resource, options?: API.RequestOptions) {
  return request<API.Result<API.Resource>>("/api/v1/sys/resources", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

/** Get resource record by ID GET /api/v1/sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  return request<API.Result<API.Resource>>(`/api/v1/sys/resources/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/** Update resource record by ID PUT /api/v1/sys/resources/${id} */
export async function updateResource(id: string, body: API.Resource, options?: API.RequestOptions) {
  return request<API.Result<any>>(`/api/v1/sys/resources/${id}`, {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** Delete resource record by ID DELETE /api/v1/sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return request<API.Result<any>>(`/api/v1/sys/resources/${id}`, {
    method: "DELETE",
    ...(options || {}),
  });
}
