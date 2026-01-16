import { transformListParams } from "@/utils/api";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

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
export async function getUser(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetUserResponse>(`/sys/users/${id}`, undefined, options);
  return rawResponse?.user;
}

/** Create user record POST /sys/users */
export async function addUser(body: Omit<API.System.User, "id">, options?: API.RequestOptions) {
  const requestBody = {
    user: body,
  };
  const rawResponse = await post<API.System.CreateUserResponse>("/sys/users", requestBody, options);
  return rawResponse?.user;
}

/** Update user record by ID PUT /sys/users/${id} */
export async function updateUser(id: string, body: Partial<API.System.User>, options?: API.RequestOptions) {
  const requestBody = {
    user: body,
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
export async function inviteUser(body: { email: string; roles: string[] }, options?: API.RequestOptions) {
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

/** Update user roles PUT /sys/users/${id}/roles */
export async function updateUserRoles(id: string, body: { role_ids: string[] }, options?: API.RequestOptions) {
  return put<never>(`/sys/users/${id}/roles`, body, options);
}

/** Get user resources GET /sys/users/${id}/resources */
export async function listUserResources(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.ListUserResourcesResponse>(`/sys/users/${id}/resources`, undefined, options);
  return rawResponse.resources;
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
      queryKey: ["/sys/users", id, "resources"],
      queryFn: () => listUserResources(id),
      enabled: !!id,
    }),
  );
};

export const useUserCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id">) => addUser(user),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};

export const useUserUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (user: Partial<API.System.User>) => updateUser(id, user),
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
    mutationFn: (data: { email: string; roles: string[] }) => inviteUser(data),
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

export const useUpdateUserRoles = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (data: { role_ids: string[] }) => updateUserRoles(id, data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/users"] }),
  });
};
