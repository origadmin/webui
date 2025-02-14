import { Search } from "@/utils";
import { get, post, put, del } from "@/utils/request";

/** Query role list GET /api/v1/sys/roles */
export async function listRole(params: API.SearchParams, options?: API.RequestOptions) {
  options = {
    params: Search.parseParams(params),
    ...options,
  };
  return get<API.System.Role[]>("/api/v1/sys/roles", options);
}

/** Create role record POST /api/v1/sys/roles */
export async function addRole(body: API.System.Role, options?: API.RequestOptions) {
  return post<API.System.Role>("/api/v1/sys/roles", body, options);
}

/** Get role record by ID GET /api/v1/sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  return get<API.System.Role>(`/api/v1/sys/roles/${id}`, options);
}

/** Update role record by ID PUT /api/v1/sys/roles/${id} */
export async function updateRole(id: string, body: API.System.Role, options?: API.RequestOptions) {
  return put<never>(`/api/v1/sys/roles/${id}`, body, options);
}

/** Delete role record by ID DELETE /api/v1/sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/api/v1/sys/roles/${id}`, options);
}
