import { transformListParams } from "@/utils/api";
import { del, get, post, put } from "@/utils/request";
import { QueryClient, queryOptions, useMutation, useQuery } from "@tanstack/react-query";


// #region User CRUD
/**
 * Query user list GET /sys/users
 */
export async function listUsers(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const rawResponse = await get<API.System.ListUsersResponse>("/sys/users", backendParams, options);
  return {
    items: rawResponse?.users || [],
    total: rawResponse?.total || 0,
  };
}

/** Get user record by ID GET /sys/users/${id} */
export async function getUser(id: string, params?: { with_roles?: boolean }, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetUserResponse>(`/sys/users/${id}`, params, options);
  return rawResponse?.user;
}

/** Create user record POST /sys/users */
export async function addUser(
  body: Omit<API.System.User, "id"> & { role_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { role_ids, ...userData } = body;
  const requestBody = {
    user: userData,
    role_ids: role_ids,
  };
  const rawResponse = await post<API.System.CreateUserResponse>("/sys/users", requestBody, options);
  return rawResponse?.user;
}

/** Update user record by ID PUT /sys/users/${id} */
export async function updateUser(
  id: string,
  body: Partial<API.System.User> & { role_ids?: string[] },
  options?: API.RequestOptions,
) {
  const { role_ids, ...userData } = body;
  const requestBody = {
    user: userData,
    role_ids: role_ids,
  };
  return put<never>(`/sys/users/${id}`, requestBody, options);
}

/** Delete user record by ID DELETE /sys/users/${id} */
export async function deleteUser(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/users/${id}`, options);
}
// #endregion

// #region User extended actions
/** Invite user POST /sys/users/invite */
export async function inviteUser(body: { email: string; role_ids: string[] }, options?: API.RequestOptions) {
  return post<never>("/sys/users/invite", body, options);
}

/** Reset user password (send email) POST /sys/users/${id}/reset-password */
export async function resetUserPassword(id: string, options?: API.RequestOptions) {
  return post<never>(`/sys/users/${id}/reset-password`, {}, options);
}

/** Admin reset user password (direct set) POST /sys/users/${id}/admin-reset-password */
export async function adminResetUserPassword(id: string, password: string, options?: API.RequestOptions) {
  return post<never>(`/sys/users/${id}/admin-reset-password`, { password }, options);
}

/**
 * Retrieves the list of resources associated with a specific user.
 * GET /sys/users/${id}/resources
 * @param id The ID of the user.
 * @param params Data table parameters for pagination, sorting, and filtering.
 * @param options Optional request options.
 * @returns A promise that resolves to the list of resources.
 */
export async function listUserResources(id: string, params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const rawResponse = await get<API.System.ListResourcesResponse>(`/sys/users/${id}/resources`, backendParams, options);
  return {
    items: rawResponse?.resources || [],
    total: rawResponse?.total || 0,
  };
}
// #endregion

// --- React Query hooks ---

export const useUsersQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listUsers(opts),
    }),
  );
};

export const useUserQuery = (id: string, params?: { with_roles?: boolean }) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", id, params],
      queryFn: () => getUser(id, params),
      enabled: !!id,
    }),
  );
};

/**
 * Hook for fetching resources associated with a user.
 * @param id The ID of the user.
 * @param opts Data table parameters.
 * @returns The result of the query.
 */
export const useUserResourcesQuery = (id: string, opts: API.DataTableParams = {}) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/users", id, "resources", { ...opts }],
      queryFn: () => listUserResources(id, opts),
      enabled: !!id,
    }),
  );
};

export const useUserCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id"> & { role_ids?: string[] }) => addUser(user),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useUserUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (user: Partial<API.System.User> & { role_ids?: string[] }) => updateUser(id, user),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useUpdateUserRoles = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (data: { role_ids: string[] }) => updateUser(id, data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useUserDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useInviteUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (data: { email: string; role_ids: string[] }) => inviteUser(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useResetUserPassword = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: () => resetUserPassword(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useAdminResetUserPassword = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (password: string) => adminResetUserPassword(id, password),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};
