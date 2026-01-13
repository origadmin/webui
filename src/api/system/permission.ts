import { transformListParams } from "@/utils/api";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query permission list GET /sys/permissions
 */
export async function listPermissions(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const rawResponse = await get<API.System.ListPermissionsResponse>("/sys/permissions", backendParams, options);
  return {
    items: rawResponse?.permissions || [],
    total: rawResponse?.total || 0,
  };
}

/** Get permission record by ID GET /sys/permissions/${id} */
export async function getPermission(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetPermissionResponse>(`/sys/permissions/${id}`, undefined, options);
  return rawResponse?.permission;
}

/** Create permission record POST /sys/permissions */
export async function addPermission(
  body: Omit<API.System.Permission, "id"> & { resource_ids?: string[]; view_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { resource_ids, view_ids, ...permissionData } = body;
  const requestBody = {
    permission: permissionData,
    resource_ids: resource_ids,
    view_ids: view_ids,
  };
  const rawResponse = await post<API.System.CreatePermissionResponse>("/sys/permissions", requestBody, options);
  return rawResponse?.permission;
}

/** Update permission record by ID PUT /sys/permissions/${id} */
export async function updatePermission(
  id: string,
  body: Partial<API.System.Permission> & { resource_ids?: string[]; view_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { resource_ids, view_ids, ...permissionData } = body;
  const requestBody = {
    permission: permissionData,
    resource_ids: resource_ids,
    view_ids: view_ids,
  };
  return put<never>(`/sys/permissions/${id}`, requestBody, options);
}

/** Delete permission record by ID DELETE /sys/permissions/${id} */
export async function deletePermission(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/permissions/${id}`, options);
}

// --- React Query hooks ---

export const usePermissionsQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/permissions", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listPermissions(opts),
    }),
  );
};

export const usePermissionQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/permissions", id],
      queryFn: ({ queryKey: [, id] }) => getPermission(id),
      enabled: !!id,
    }),
  );
};

export const usePermissionCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (permission: Omit<API.System.Permission, "id"> & { resource_ids?: string[]; view_ids?: string[] }) =>
      addPermission(permission),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/permissions"] }),
  });
};

export const usePermissionUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (permission: Partial<API.System.Permission> & { resource_ids?: string[]; view_ids?: string[] }) =>
      updatePermission(id, permission),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/permissions"] }),
  });
};

export const usePermissionDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/permissions"] }),
  });
};
