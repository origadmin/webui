import { Query } from "@/utils";
import { post, get, put, del, patch } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

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

export const formSchema = z
  .object({
    nickname: z.string().min(1, { message: "Nickname is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: "Role is required." }),
    role_ids: z.string().array(),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    allow_ip: z.string().min(1, { message: "IP is required." }),
    random_password: z.boolean().default(false),
    is_edit: z.boolean(),
  })
  .superRefine(({ is_edit, password, confirmPassword }, ctx) => {
    if (!is_edit || (is_edit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
          path: ["password"],
        });
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long.",
          path: ["password"],
        });
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter.",
          path: ["password"],
        });
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one number.",
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ["confirmPassword"],
        });
      }
    }
  });
export type UserForm = z.infer<typeof formSchema>;

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
    }),
  );
};

export const useUserCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id">) => addUser(user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useUserUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (user: Omit<API.System.User, "id">) => updateUser(id, user),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};

export const useUserDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/users"]),
  });
};
