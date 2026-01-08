import { transformListParams } from "@/utils/api";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation, UseQueryOptions } from "@tanstack/react-query";

/**
 * Query view list GET /sys/views
 */
export async function listViews(params: API.DataTableParams, options?: API.RequestOptions) {
  const backendParams = transformListParams(params);
  const rawResponse = await get<API.System.ListViewsResponse>("/sys/views", backendParams, options);
  return {
    items: rawResponse?.views || [],
    total: rawResponse?.total || 0,
  };
}

/** Get view record by ID GET /sys/views/${id} */
export async function getView(id: string, options?: API.RequestOptions) {
  const rawResponse = await get<API.System.GetViewResponse>(`/sys/views/${id}`, undefined, options);
  return rawResponse?.view;
}

/** Create view record POST /sys/views */
export async function addView(body: Omit<API.System.View, "id">, options?: API.RequestOptions) {
  const requestBody = {
    view: body,
  };
  const rawResponse = await post<API.System.CreateViewResponse>("/sys/views", requestBody, options);
  return rawResponse?.view;
}

/** Update view record by ID PUT /sys/views/${id} */
export async function updateView(id: string, body: Partial<API.System.View>, options?: API.RequestOptions) {
  const requestBody = {
    view: body,
  };
  return put<never>(`/sys/views/${id}`, requestBody, options);
}

/** Delete view record by ID DELETE /sys/views/${id} */
export async function deleteView(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/views/${id}`, options);
}

// --- React Query hooks ---

// Correctly typed options for the query hook
type UseViewsQueryOptions = Omit<UseQueryOptions<Awaited<ReturnType<typeof listViews>>>, "queryKey" | "queryFn">;

export const useViewsQuery = (params?: API.DataTableParams, options?: UseViewsQueryOptions) => {
  return useQuery({
    queryKey: ["/sys/views", { ...params }],
    queryFn: () => listViews(params || {}),
    ...options, // Spread the standard react-query options
  });
};

export const useViewQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/views", id],
      queryFn: ({ queryKey: [, id] }) => getView(id),
      enabled: !!id,
    }),
  );
};

export const useViewCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (view: Omit<API.System.View, "id">) => addView(view),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/views"] }),
  });
};

export const useViewUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (view: Partial<API.System.View>) => updateView(id, view),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/views"] }),
  });
};

export const useViewDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteView(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["/sys/views"] }),
  });
};
