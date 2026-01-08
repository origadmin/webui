import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/**
 * Query view list GET /sys/views
 * This is the "smart adapter" function. It adapts params and transforms the response.
 */
export async function listViews(params: API.DataTableParams, options?: API.RequestOptions) {
  // 1. Translate frontend params to backend params.
  const { pageSize, ...rest } = params;
  const backendParams: API.SearchParams = {
    ...rest,
    page: (params.page || 0) + 1,
    page_size: pageSize,
  };

  // 2. Call the fetcher with backend-compatible params.
  const rawResponse = await get<API.System.ListViewsResponse>("/sys/views", backendParams, options);

  // 3. Transform the raw response into the standardized structure.
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

export const useViewsQuery = (opts?: API.DataTableParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/views", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.DataTableParams] }) => listViews(opts),
    }),
  );
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
