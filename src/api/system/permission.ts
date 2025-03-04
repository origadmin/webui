import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/** Query permission list GET /sys/permissions */
export async function listPermission(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Permission[]>("/sys/permissions", params, options);
}

/** Create permission record POST /sys/permissions */
export async function addPermission(body: Omit<API.System.Permission, "id">, options?: API.RequestOptions) {
  return post<API.System.Permission>("/sys/permissions", body, options);
}

/** Get permission record by ID GET /sys/permissions/${id} */
export async function getPermission(id: string, options?: API.RequestOptions) {
  return get<API.System.Permission>(`/sys/permissions/${id}`, options);
}

/** Update permission record by ID PUT /sys/permissions/${id} */
export async function updatePermission(
  id: string,
  body: Omit<API.System.Permission, "id">,
  options?: API.RequestOptions,
) {
  return put<never>(`/sys/permissions/${id}`, body, options);
}

/** Update permission record by ID PUT /sys/permissions/${id} */
export async function updatePermissionPermissions(
  id: string,
  body: string[] | undefined,
  options?: API.RequestOptions,
) {
  return put<never>(`/sys/permissions/${id}/permissions`, body, options);
}

/** Delete permission record by ID DELETE /sys/permissions/${id} */
export async function deletePermission(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/permissions/${id}`, options);
}

export const usePermissionsQuery = (opts?: API.SearchParams) => {
  console.log("usePermissionsQuery", opts);
  return useQuery(
    queryOptions({
      queryKey: ["/sys/permissions", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listPermission(opts),
    }),
  );
};

export const usePermissionQuery = (id: string) => {
  console.log("usePermissionQuery", id);
  return useQuery(
    queryOptions({
      queryKey: ["/sys/permissions", id],
      queryFn: ({ queryKey: [, id] }) => getPermission(id),
    }),
  );
};

export const usePermissionCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (permission: Omit<API.System.Permission, "id">) => addPermission(permission),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/permissions"]),
  });
};

export const usePermissionUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (permission: Omit<API.System.Permission, "id">) => updatePermission(id, permission),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/permissions"]),
  });
};

export const usePermissionDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/permissions"]),
  });
};

export const useUpdatePermissionPermissions = (_queryClient: QueryClient, id: string) =>
  useMutation({
    mutationFn: (params: any) => updatePermissionPermissions(id, params),
    // onSettled: () => Query.invalidateData(queryClient, ["/sys/permissions"]),
  });
