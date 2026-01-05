import { Query } from "@/utils";
import { del, get, post, put } from "@/utils/request";
import { QueryClient, queryOptions, useMutation, useQuery } from "@tanstack/react-query";

/** Query view list GET /sys/views */
export async function listView(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.View[]>("/sys/views", params, options);
}

/** Create view record POST /sys/views */
export async function addView(body: Omit<API.System.View, "id">, options?: API.RequestOptions) {
  const requestBody = {
    view: body,
  };
  return post<API.System.View>("/sys/views", requestBody, options);
}

/** Get view record by ID GET /sys/views/${id} */
export async function getView(id: string, options?: API.RequestOptions) {
  return get<API.System.View>(`/sys/views/${id}`, undefined, options);
}

/** Update view record by ID PUT /sys/views/${id} */
export async function updateView(id: string, body: Omit<API.System.View, "id">, options?: API.RequestOptions) {
  const requestBody = {
    view: body,
  };
  return put<never>(`/sys/views/${id}`, requestBody, options);
}

/** Delete view record by ID DELETE /sys/views/${id} */
export async function deleteView(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/views/${id}`, options);
}

export const useViewsQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/views", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listView(opts),
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
