import { Pagination } from "@/utils";
import { post, get, put, del, patch } from "@/utils/service";


/** Query user list GET /api/v1/sys/users */
export async function listUser(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return get<API.System.User[]>("/api/v1/sys/users", params, options);
}

/** Create user record POST /api/v1/sys/users */
export async function addUser(body: API.System.User, options?: API.RequestOptions) {
  return post<API.Result<API.System.User>>("/api/v1/sys/users", body, options);
}

/** Get user record by ID GET /api/v1/sys/users/${id} */
export async function getUser(id: string, options?: API.RequestOptions) {
  return get<API.Result<API.System.User>>(`/api/v1/sys/users/${id}`, undefined, options);
}

/** Update user record by ID PUT /api/v1/sys/users/${id} */
export async function updateUser(id: string, body: API.System.User, options?: API.RequestOptions) {
  return put<API.Result<unknown>>(`/api/v1/sys/users/${id}`, body, options);
}

/** Delete user record by ID DELETE /api/v1/sys/users/${id} */
export async function deleteUser(id: string, options?: API.RequestOptions) {
  return del<API.Result<unknown>>(`/api/v1/sys/users/${id}`, options);
}

/** Reset user password by ID PATCH /api/v1/sys/users/${id}/reset */
export async function resetUserPassword(id: string, options?: API.RequestOptions) {
  return patch<API.Result<unknown>>(`/api/v1/sys/users/${id}/reset`, undefined, options);
}
