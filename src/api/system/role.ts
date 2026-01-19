import { transformListParams } from "@/utils/api";
import { del, get, post, put } from "@/utils/request";
import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

/**
 * Query role list GET /sys/roles
 */
export async function listRoles(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  return get<API.System.ListRolesResponse>("/sys/roles", backendParams, options);
}

/** Get role record by ID GET /sys/roles/${id} */
export async function getRole(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetRoleResponse>(`/sys/roles/${id}`, undefined, options);
  return rawResponse?.role;
}

/** Create role record POST /sys/roles */
export async function addRole(
  body: Omit<API.System.Role, "id"> & { permission_ids?: string[]; resource_ids?: string[]; view_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { permission_ids, resource_ids, view_ids, ...roleData } = body;
  const requestBody = {
    role: roleData,
    permission_ids: permission_ids,
    resource_ids: resource_ids,
    view_ids: view_ids,
  };
  const rawResponse = await post<API.System.CreateRoleResponse>("/sys/roles", requestBody, options);
  return rawResponse?.role;
}

/** Update role record by ID PUT /sys/roles/${id} */
export async function updateRole(
  id: string,
  body: Partial<API.System.Role> & { permission_ids?: string[]; resource_ids?: string[]; view_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { permission_ids, resource_ids, view_ids, ...roleData } = body;
  const requestBody = {
    role: roleData,
    permission_ids: permission_ids,
    resource_ids: resource_ids,
    view_ids: view_ids,
  };
  return put<never>(`/sys/roles/${id}`, requestBody, options);
}

/** Delete role record by ID DELETE /sys/roles/${id} */
export async function deleteRole(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/roles/${id}`, options);
}

// --- React Query hooks ---

export const useRolesQuery = (opts?: API.DataTableParams, options?: { enabled?: boolean }) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/roles", { ...opts }],
      queryFn: async ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => {
        const rawResponse = await listRoles(opts);
        return {
          items: rawResponse?.roles || [],
          total: rawResponse?.total || 0,
        };
      },
      enabled: options?.enabled,
    }),
  );
};

export const infiniteRolesQueryOptions = (opts?: Omit<API.DataTableParams, "page" | "pageToken" | "pagingMode">) => {
  return infiniteQueryOptions({
    queryKey: ["/sys/roles/infinite", opts],
    queryFn: ({ pageParam }) => {
      const params: API.DataTableParams = {
        ...opts,
        pagingMode: "cursor",
        pageToken: pageParam as string | undefined,
      };
      return listRoles(params);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next_page_token || undefined,
  });
};

export const useInfiniteRolesQuery = (
  opts?: Omit<API.DataTableParams, "page" | "pageToken" | "pagingMode">,
  options?: { enabled?: boolean },
): UseInfiniteQueryResult<InfiniteData<API.System.ListRolesResponse>, Error> => {
  return useInfiniteQuery({
    ...infiniteRolesQueryOptions(opts),
    enabled: options?.enabled,
  });
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
    mutationFn: (
      role: Omit<API.System.Role, "id"> & { permission_ids?: string[]; resource_ids?: string[]; view_ids?: string[] },
    ) => addRole(role),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};

export const useRoleUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (
      role: Partial<API.System.Role> & { permission_ids?: string[]; resource_ids?: string[]; view_ids?: string[] },
    ) => updateRole(id, role),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};

export const useRoleDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/roles"] }),
  });
};
