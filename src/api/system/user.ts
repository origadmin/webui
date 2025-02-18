import { Query } from "@/utils";
import { post, get, put, del, patch } from "@/utils/request";
import { QueryClient } from "@tanstack/react-query";


/** Query user list GET /sys/users */
export async function listUser(params: API.SearchParams, options?: API.RequestOptions) {
  console.log("listUser", params, options);
  return get<API.System.User[]>("/sys/users", params, options);
}

/** Create user record POST /sys/users */
export async function addUser(body: API.System.User, options?: API.RequestOptions) {
  return post<API.System.User>("/sys/users", body, options);
}

/** Get user record by ID GET /sys/users/${id} */
export async function getUser(id: string, options?: API.RequestOptions) {
  return get<API.System.User>(`/sys/users/${id}`, options);
}

/** Update user record by ID PUT /sys/users/${id} */
export async function updateUser(id: string, body: Omit<API.System.User, "id">, options?: API.RequestOptions) {
  return put<never>(`/sys/users/${id}`, body, options);
}

/** Delete user record by ID DELETE /sys/users/${id} */
export async function deleteUser(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/users/${id}`, options);
}

/** Reset user password by ID PATCH /sys/users/${id}/reset */
export async function resetUserPassword(id: string, options?: API.RequestOptions) {
  return patch<never>(`/sys/users/${id}/reset`, options);
}

export const usersQueryOptions = (opts?: API.SearchParams) =>
  Query.createQueryOptions(["/sys/users", { ...opts }], listUser);

export const userQueryOptions = (id: string) => Query.createQueryOptions(["/sys/users", id], getUser);

export const userCreateOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (user: Omit<API.System.User, "id">) => addUser(user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  };
};

export const userUpdateOption = (queryClient: QueryClient, id: string) => {
  return {
    mutationFn: (user: Omit<API.System.User, "id">) => updateUser(id, user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  };
};

export const userDeleteOption = (queryClient: QueryClient) => {
  return {
    mutationFn: (id: string) => deleteUser(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  };
};
