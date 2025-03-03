import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

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

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRolePermissions(id: string, body: string[] | undefined, options?: API.RequestOptions) {
  return put<never>(`/sys/roles/${id}/permissions`, body, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

export const useRolesQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listRole(opts),
    }),
  );
};

export const useRoleQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", id],
      queryFn: ({ queryKey: [, id] }) => getRole(id),
    }),
  );
};

export const useRoleCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (role: Omit<API.System.Role, "id">) => addRole(role),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  });
};

export const useRoleUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (role: Omit<API.System.Role, "id">) => updateRole(id, role),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  });
};

export const useRoleDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  });
};

export const useUpdateRolePermissions = (_queryClient: QueryClient, id: string) =>
  useMutation({
    mutationFn: (params: any) => updateRolePermissions(id, params),
    // onSettled: () => Query.invalidateData(queryClient, ["/sys/roles"]),
  });

// 新增src/api/system/permission.ts
