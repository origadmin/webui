import { mockUsers } from "@/mocks/mockSidebar.ts";
import { Pagination } from "@/utils";
import { fetchRequest } from "@/utils/service";


/** Query user list GET /api/v1/sys/users */
export async function listUser(params: API.Params, options?: API.RequestOptions) {
  if (process.env.NODE_ENV === "development") {
    // 返回 mock 数据
    return Promise.resolve({
      data: mockUsers,
    });
  }
  params = Pagination.parseParams(params);
  return fetchRequest<API.User[]>("/api/v1/sys/users", "GET", undefined, options, params);
}

/** Create user record POST /api/v1/sys/users */
export async function addUser(body: API.User, options?: API.RequestOptions) {
  return fetchRequest<API.Result<API.User>>("/api/v1/sys/users", "POST", body, options);
}

/** Get user record by ID GET /api/v1/sys/users/${id} */
export async function getUser(id: string, options?: API.RequestOptions) {
  return fetchRequest<API.Result<API.User>>(`/api/v1/sys/users/${id}`, "GET", undefined, options);
}

/** Update user record by ID PUT /api/v1/sys/users/${id} */
export async function updateUser(id: string, body: API.User, options?: API.RequestOptions) {
  return fetchRequest<API.Result<any>>(`/api/v1/sys/users/${id}`, "PUT", body, options);
}

/** Delete user record by ID DELETE /api/v1/sys/users/${id} */
export async function deleteUser(id: string, options?: API.RequestOptions) {
  return fetchRequest<API.Result<any>>(`/api/v1/sys/users/${id}`, "DELETE", undefined, options);
}

/** Reset user password by ID PATCH /api/v1/sys/users/${id}/reset */
export async function resetUserPassword(id: string, options?: API.RequestOptions) {
  return fetchRequest<API.Result<any>>(`/api/v1/sys/users/${id}/reset`, "PATCH", undefined, options);
}
