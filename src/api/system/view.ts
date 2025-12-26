import { Query } from "@/utils";
import { post, get, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

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
export async function updateView(id: string, body: Omit<API.System.View, "id">) {
  return put<never>(`/sys/views/${id}`, body);
}
export async function deleteView(id: string) {
  return del<never>(`/sys/views/${id}`);
}

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
    mutationFn: (view: Omit<API.System.View, "id">) => updateView(id, view),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/views"]),
  });
};

export const useViewDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteView(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/views"]),
  });
};
