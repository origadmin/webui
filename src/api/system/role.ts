import { get, post, put, del } from "@/utils/request";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

/** Query role list GET /sys/roles */
export async function listRole(params: API.SearchParams, options?: API.RequestOptions) {
  options = {
    params,
    ...options,
  };
  return get<API.System.Role[]>("/sys/roles", options);
}

/** Create role record POST /sys/roles */
export async function addRole(body: API.System.Role, options?: API.RequestOptions) {
  return post<API.System.Role>("/sys/roles", body, options);
}

/** Get role record by ID GET /sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  return get<API.System.Role>(`/sys/roles/${id}`, options);
}

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRole(id: string, body: API.System.Role, options?: API.RequestOptions) {
  return put<never>(`/sys/roles/${id}`, body, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

export const rolesQueryOptions = (opts?: API.SearchParams) =>
  queryOptions({
    queryKey: ["/sys/roles", { ...opts }],
    queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listRole({ ...opts }),
    placeholderData: keepPreviousData,
  });

export const roleQueryOptions = (roleID: string) =>
  queryOptions({
    queryKey: ["roles", roleID],
    queryFn: () => getRole(roleID),
  });
