import { Query } from "@/utils";
import { post, get, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query user list GET /sys/users
 * This is the "smart adapter" function. It:
 * 1. Receives frontend-idiomatic params (API.DataTableParams).
 * 2. Translates them into backend-idiomatic params (API.SearchParams).
 * 3. Calls the "dumb" fetcher.
 * 4. Transforms the backend response into a standardized frontend data structure.
 */
export async function listUser(params: API.DataTableParams, options?: API.RequestOptions) {
  // 1. Translate frontend params to backend params.
  const backendParams: API.SearchParams = {
    ...params,
    page: (params.page || 0) + 1, // Translate 0-based pageIndex to 1-based page number
    page_size: params.pageSize, // Translate pageSize to page_size
  };

  // 2. Call the fetcher with backend-compatible params.
  const rawResponse = await get<API.System.ListUsersResponse>("/sys/users", backendParams, options);

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
  const rawResponse = await get<API.System.GetUserResponse>(`/sys/users/${id}`, undefined, options);
  return rawResponse?.user;
}

/** Create user record POST /sys/users */
export async function addUser(body: API.System.User, options?: API.RequestOptions) {
  const rawResponse = await post<API.System.CreateUserResponse>("/sys/users", body, options);
  return rawResponse?.user;
}

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

export const useUsersQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listUser(opts),
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
