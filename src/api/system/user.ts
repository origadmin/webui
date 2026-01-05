import { Query } from "@/utils";
import { post, get, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/** 
 * Query user list GET /sys/users 
 * This is the "smart adapter" function. It:
 * 1. Adapts frontend pagination (0-based) to backend (1-based).
 * 2. Calls the "dumb" fetcher.
 * 3. Transforms the backend-specific response into a standardized frontend data structure,
 *    preserving pagination metadata.
 */
export async function listUser(params: API.SearchParams, options?: API.RequestOptions) {
  // 1. Adapt frontend params for the backend.
  const adaptedParams = {
    ...params,
    page: (params.page || 0) + 1, // Frontend is 0-based, Backend is 1-based
    page_size: params.pageSize,
  };

  // 2. Call the "dumb" fetcher, which returns the raw backend response.
  const rawResponse = await get<API.System.ListUsersResponse>("/sys/users", adaptedParams, options);

  // 3. Transform the raw response into the standardized structure for the frontend.
  return {
    data: rawResponse?.users || [],
    total: rawResponse?.total || 0,
    page: rawResponse?.page || 1,
    pageSize: rawResponse?.page_size || 0,
  };
}

/** Get user record by ID GET /sys/users/${id} */
export async function getUser(id: string, options?: API.RequestOptions) {
  // The `get` function returns the raw backend response. We unwrap the `user` field here.
  const rawResponse = await get<API.System.GetUserResponse>(`/sys/users/${id}`, undefined, options);
  return rawResponse?.user;
}

/** Create user record POST /sys/users */
export async function addUser(body: API.System.User, options?: API.RequestOptions) {
  const rawResponse = await post<API.System.CreateUserResponse>("/sys/users", body, options);
  return rawResponse?.user;
}

// --- Other functions remain largely the same as they don't handle list data ---

/** Invite user record POST /sys/users/invite */
export async function inviteUser(body: { email: string; role_ids: string[] }, options?: API.RequestOptions) {
  return post<never>("/sys/users/invite", body, options);
}

/** Get user resources by ID GET /sys/users/${id}/resources */
export async function getUserResources(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.ListUserResourcesResponse>(`/sys/users/${id}/resources`, undefined, options);
  return rawResponse?.resources || [];
}

/** Update user record by ID PUT /sys/users/${id} */
export async function updateUser(id: string, body: Omit<API.System.User, "id">, options?: API.RequestOptions) {
  return put<never>(`/sys/users/${id}`, body, options);
}

/** Update user roles by ID PUT /sys/users/${id}/roles */
export async function updateUserRoles(id: string, role_ids: string[], options?: API.RequestOptions) {
  return put<never>(`/sys/users/${id}/roles`, { role_ids }, options);
}

/** Delete user record by ID DELETE /sys/users/${id} */
export async function deleteUser(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/users/${id}`, options);
}

/** Reset user password by ID POST /sys/users/${id}/password/reset */
export async function resetUserPassword(id: string, options?: API.RequestOptions) {
  return post<never>(`/sys/users/${id}/password/reset`, {}, options);
}

// --- React Query hooks remain the same, consuming the now-standardized API functions ---

export const useUsersQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listUser(opts),
    }),
  );
};

export const useUserQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", id],
      queryFn: ({ queryKey: [, id] }) => getUser(id),
      enabled: !!id,
    }),
  );
};

export const useUserResourceQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users/{id}/resources", id],
      queryFn: ({ queryKey: [, id] }) => getUserResources(id),
      enabled: !!id,
    }),
  );
};

export const useUserCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id">) => addUser(user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useInviteUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (data: { email: string; role_ids: string[] }) => inviteUser(data),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useUserUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id">) => updateUser(id, user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useUpdateUserRoles = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (role_ids: string[]) => updateUserRoles(id, role_ids),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useUserDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useResetUserPassword = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: () => resetUserPassword(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};
