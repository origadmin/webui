import { Pagination } from "@/utils";
import { get, post, put, del } from "@/utils/request";

/** Query role list GET /api/v1/sys/roles */
export async function listRole(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return get<API.Result<API.System.Role[]>>("/api/v1/sys/roles", params, options);
}

/** Create role record POST /api/v1/sys/roles */
export async function addRole(body: API.System.Role, options?: API.RequestOptions) {
  return post<API.Result<API.System.Role>>("/api/v1/sys/roles", body, options);
}

/** Get role record by ID GET /api/v1/sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  return get<API.Result<API.System.Role>>(`/api/v1/sys/roles/${id}`, undefined, options);
}

/** Update role record by ID PUT /api/v1/sys/roles/${id} */
export async function updateRole(id: string, body: API.System.Role, options?: API.RequestOptions) {
  return put<API.Result<unknown>>(`/api/v1/sys/roles/${id}`, body, options);
}

/** Delete role record by ID DELETE /api/v1/sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<API.Result<unknown>>(`/api/v1/sys/roles/${id}`, options);
}
