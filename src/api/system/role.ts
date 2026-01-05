import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query role list GET /sys/roles
 * This is the "smart adapter" function. It adapts params and transforms the response.
 */
export async function listRole(params: API.DataTableParams, options?: API.RequestOptions) {
  // 1. Translate frontend params to backend params.
  const backendParams: API.SearchParams = {
    ...params,
    page: (params.page || 0) + 1,
    page_size: params.pageSize,
  };

  // 2. Call the fetcher with backend-compatible params.
  const rawResponse = await get<API.System.ListRolesResponse>("/sys/roles", backendParams, options);

  // 3. Transform the raw response into the standardized structure.
  return {
    data: rawResponse?.roles || [],
    total: rawResponse?.total || 0,
    page: rawResponse?.page || 1,
    pageSize: rawResponse?.page_size || 0,
  };
}

/** Get role record by ID GET /sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetRoleResponse>(`/sys/roles/${id}`, undefined, options);
  return rawResponse?.role;
}

/** Create role record POST /sys/roles */
export async function addRole(body: Omit<API.System.Role, "id">, options?: API.RequestOptions) {
  const rawResponse = await post<API.System.CreateRoleResponse>("/sys/roles", body, options);
  return rawResponse?.role;
}

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRole(id: string, body: Omit<API.System.Role, "id">, options?: API.RequestOptions) {
  return put<never>(`/sys/roles/${id}`, body, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

// --- React Query hooks remain the same ---

export const useRolesQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listRole(opts),
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
