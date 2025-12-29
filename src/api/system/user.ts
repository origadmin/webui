import { Query } from "@/utils";
import { post, get, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/** Query user list GET /sys/users */
export async function listUser(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.User[]>("/sys/users", params, options);
}

/** Create user record POST /sys/users */
export async function addUser(body: API.System.User, options?: API.RequestOptions) {
  return post<API.System.User>("/sys/users", body, options);
}

/** Invite user record POST /sys/users/invite */
export async function inviteUser(body: { email: string; role_ids: string[] }, options?: API.RequestOptions) {
  return post<never>("/sys/users/invite", body, options);
}

/** Get user record by ID GET /sys/users/${id} */
export async function getUser(id: string, options?: API.RequestOptions) {
  return get<API.System.User>(`/sys/users/${id}`, options);
}

/** Get user resources by ID GET /sys/users/${id}/resources */
export async function getUserResources(id: string, options?: API.RequestOptions) {
  return get<API.System.Resource[]>(`/sys/users/${id}/resources`, options);
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
