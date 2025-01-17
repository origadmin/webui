import { Pagination } from "@/utils";
import { request } from "@/utils/service";

/** Query role list GET /api/v1/sys/roles */
export async function listRole(params: API.Params, options?: { [key: string]: any }) {
  params = Pagination.parseParams(params);
  return request<API.Result<API.Role[]>>("/api/v1/sys/roles", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create role record POST /api/v1/sys/roles */
export async function addRole(body: API.Role, options?: { [key: string]: any }) {
  return request<API.Result<API.Role>>("/api/v1/sys/roles", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

/** Get role record by ID GET /api/v1/sys/roles/${id} */
export async function getRole(id: string, options?: { [key: string]: any }) {
  return request<API.Result<API.Role>>(`/api/v1/sys/roles/${id}`, {
    method: "GET",
    ...(options || {}),
  });
}

/** Update role record by ID PUT /api/v1/sys/roles/${id} */
export async function updateRole(id: string, body: API.Role, options?: { [key: string]: any }) {
  return request<API.Result<any>>(`/api/v1/sys/roles/${id}`, {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** Delete role record by ID DELETE /api/v1/sys/roles/${id} */
export async function deleteRole(id: string, options?: { [key: string]: any }) {
  return request<API.Result<any>>(`/api/v1/sys/roles/${id}`, {
    method: "DELETE",
    ...(options || {}),
  });
}
