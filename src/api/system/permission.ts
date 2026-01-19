import { transformListParams } from "@/utils/api";
import { del, get, post, put } from "@/utils/request";
import {
  infiniteQueryOptions,
  QueryClient,
  QueryKey,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

/**
 * Query permission list GET /sys/permissions
 */
export async function listPermissions(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const finalParams = {
    ...backendParams,
    with_resources: true,
    with_views: true,
  };
  return get<API.System.ListPermissionsResponse>("/sys/permissions", finalParams, options);
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
      queryFn: async ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => {
        const rawResponse = await listPermissions(opts);
        return {
          items: rawResponse?.permissions || [],
          total: rawResponse?.total || 0,
        };
      },
    }),
  );
};

export const infinitePermissionsQueryOptions = (
  opts?: Omit<API.DataTableParams, "page" | "pageToken" | "pagingMode">,
) => {
  return infiniteQueryOptions<
    API.System.ListPermissionsResponse,
    Error,
    API.System.ListPermissionsResponse,
    QueryKey,
    string | null
  >({
    queryKey: ["/sys/permissions/infinite", opts],
    queryFn: ({ pageParam }) => {
      const params: API.DataTableParams = {
        ...opts,
        pagingMode: "cursor",
        pageToken: pageParam,
      };
      return listPermissions(params);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.next_page_token || undefined,
  });
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
