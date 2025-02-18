import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient } from "@tanstack/react-query";


/** Query role list GET /sys/roles */
export async function listRole(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Role[]>("/sys/roles", params, options);
}

/** Create role record POST /sys/roles */
export async function addRole(body: Omit<API.System.Role, "id">, options?: API.RequestOptions) {
  return post<API.System.Role>("/sys/roles", body, options);
}

/** Get role record by ID GET /sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  return get<API.System.Role>(`/sys/roles/${id}`, options);
}

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRole(id: string, body: Omit<API.System.Role, "id">, options?: API.RequestOptions) {
  return put<never>(`/sys/roles/${id}`, body, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

export const rolesQueryOptions = (opts?: API.SearchParams) =>
  Query.createQueryOptions(["/sys/roles", { ...opts }], listRole);
export const roleQueryOptions = (roleID: string) => Query.createQueryOptions(["/sys/roles", roleID], getRole);

export const roleCreateOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (role: Omit<API.System.Role, "id">) => addRole(role),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  };
};

export const roleUpdateOption = (queryClient: QueryClient, id: string) => {
  return {
    mutationFn: (role: Omit<API.System.Role, "id">) => updateRole(id, role),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  };
};

export const roleDeleteOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (id: string) => deleteRole(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  };
};
