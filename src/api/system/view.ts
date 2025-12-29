import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryClient } from "@tanstack/react-query";
import { get, post, put, del } from "@/utils/request";

type QueryParams = Record<string, any>;

// API function for listing views
export const listView = (params?: QueryParams): Promise<API.Result<API.System.View[]>> => {
  return get("/sys/views", params);
};

// Hook for listing views with data transformation
export const useViewsQuery = (
  params?: QueryParams,
  options?: Omit<UseQueryOptions<API.Result<API.System.View[]>, Error, API.Result<API.System.View[]>>, "queryKey" | "queryFn">
) => {
  return useQuery<API.Result<API.System.View[]>, Error, API.Result<API.System.View[]>>({
    queryKey: ["views", params],
    queryFn: () => listView(params),
    // The select function is no longer needed as the mock system and real API should align
    // on the generic { data, total } structure expected by useDataTable.
    // If the real API for this specific endpoint returns 'views', this is where the transformation should happen.
    // For now, we assume the generic structure is correct.
    ...options,
  });
};

// API function for creating a view
export const createView = (data: API.System.CreateViewRequest): Promise<API.System.CreateViewResponse> => {
  return post("/sys/views", data);
};

// Hook for creating a view
export const useViewCreate = (
  queryClient: QueryClient,
  options?: UseMutationOptions<API.System.CreateViewResponse, Error, API.System.CreateViewRequest>
) => {
  return useMutation<API.System.CreateViewResponse, Error, API.System.CreateViewRequest>({
    mutationFn: (data) => createView(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] });
    },
    ...options,
  });
};

// API function for updating a view
export const updateView = (id: string, data: API.System.View): Promise<API.System.UpdateViewResponse> => {
  return put(`/sys/views/${id}`, data);
};

// Hook for updating a view
export const useViewUpdate = (
  queryClient: QueryClient,
  id: string,
  options?: UseMutationOptions<API.System.UpdateViewResponse, Error, API.System.View>
) => {
  return useMutation<API.System.UpdateViewResponse, Error, API.System.View>({
    mutationFn: (data) => updateView(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] });
    },
    ...options,
  });
};

// API function for deleting a view
export const deleteView = (id: string): Promise<API.System.DeleteViewResponse> => {
  return del(`/sys/views/${id}`);
};

// Hook for deleting a view
export const useViewDelete = (
  queryClient: QueryClient,
  options?: UseMutationOptions<API.System.DeleteViewResponse, Error, string>
) => {
  return useMutation<API.System.DeleteViewResponse, Error, string>({
    mutationFn: (id) => deleteView(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] });
    },
    ...options,
  });
};

// API function for getting a single view
export const getView = (id: string): Promise<API.System.GetViewResponse> => {
  return get(`/sys/views/${id}`);
};

// API function for batch updating view sequences
export const updateViewSequence = (updates: { id: string; sequence: number }[]): Promise<any> => {
  const promises = updates.map(update => updateView(update.id, { sequence: update.sequence }));
  return Promise.all(promises);
};

// Hook for batch updating view sequences
export const useViewSequenceUpdate = (
  queryClient: QueryClient,
  options?: UseMutationOptions<any, Error, { id: string; sequence: number }[]>
) => {
  return useMutation<any, Error, { id: string; sequence: number }[]>({
    mutationFn: (updates) => updateViewSequence(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] });
    },
    ...options,
  });
};
