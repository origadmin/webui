import { Query } from "@/utils";
import { post, get, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

// API calls
export async function listView(params: API.SearchParams) {
  return get<API.System.View[]>("/sys/views", params);
}
export async function addView(body: API.System.View) {
  return post<API.System.View>("/sys/views", body);
}
export async function getView(id: string) {
  return get<API.System.View>(`/sys/views/${id}`);
}
export async function updateView(id: string, body: Partial<API.System.View>) {
  return put<never>(`/sys/views/${id}`, body);
}
export async function deleteView(id: string) {
  return del<never>(`/sys/views/${id}`);
}

// Zod Schema for form validation
export const formSchema = z.object({
  keyword: z.string().min(1, "Keyword is required."),
  name: z.string().min(1, "Name is required."),
  path: z.string().optional(),
  component: z.string().optional(),
  icon: z.string().optional(),
  sequence: z.number().default(0),
  status: z.number().default(1),
  visible: z.boolean().default(true),
  parent_id: z.string().optional(),
  type: z.string().default("MENU"),
});
export type ViewForm = z.infer<typeof formSchema>;

// React Query Hooks
export const useViewsQuery = (opts?: API.SearchParams) => {
  return useQuery(queryOptions({
    queryKey: ["/sys/views", { ...opts }],
    queryFn: () => listView(opts || {}),
  }));
};

export const useViewCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (view: API.System.View) => addView(view),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/views"]),
  });
};

export const useViewUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (view: Partial<API.System.View>) => updateView(id, view),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/views"]),
  });
};

export const useViewDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteView(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/views"]),
  });
};
