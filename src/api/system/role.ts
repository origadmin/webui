import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query role list GET /sys/roles
 */
export async function listRoles(params: API.DataTableParams, options?: API.RequestOptions) {
  const { pageSize, ...rest } = params;
  const backendParams: API.SearchParams = {
    ...rest,
    page: (params.page || 0) + 1,
    page_size: pageSize,
  };
  const rawResponse = await get<API.System.ListRolesResponse>("/sys/roles", backendParams, options);
  return {
    items: rawResponse?.roles || [],
    total: rawResponse?.total || 0,
  };
}

/** Get role record by ID GET /sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetRoleResponse>(`/sys/roles/${id}`, undefined, options);
  return rawResponse?.role;
}

/** Create role record POST /sys/roles */
export async function addRole(body: Omit<API.System.Role, "id">, options?: API.RequestOptions) {
  const requestBody = {
    role: body,
  };
  const rawResponse = await post<API.System.CreateRoleResponse>("/sys/roles", requestBody, options);
  return rawResponse?.role;
}

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRole(id: string, body: Partial<API.System.Role>, options?: API.RequestOptions) {
  const requestBody = {
    role: body,
  };
  return put<never>(`/sys/roles/${id}`, requestBody, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

// --- React Query hooks ---

export const useRolesQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listRoles(opts),
    }),
  );
};

export const useRoleQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", id],
      queryFn: ({ queryKey: [, id] }) => getRole(id),
      enabled: !!id,
    }),
  );
};

export const useRoleCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (role: Omit<API.System.Role, "id">) => addRole(role),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};

export const useRoleUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (role: Partial<API.System.Role>) => updateRole(id, role),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};

export const useRoleDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};
