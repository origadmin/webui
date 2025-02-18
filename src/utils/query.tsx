import { Query } from "@/utils/index";
import { QueryClient, queryOptions } from "@tanstack/react-query";

const createQueryOptions = <T extends object, TParam>(
  queryKey: [string, TParam],
  queryFn: (params: TParam) => Promise<T>,
) =>
  queryOptions({
    queryKey,
    queryFn: ({ queryKey: [, params] }) => queryFn(params),
  });

const invalidateData = <TParam,>(queryClient: QueryClient, queryKey: [string, TParam?]) => {
  queryClient.invalidateQueries({ queryKey: queryKey });
};

const createMutationOption = <T extends object, TParam = undefined>(
  queryClient: QueryClient,
  fn: (body: Omit<T, "id">, options?: API.RequestOptions) => Promise<T>,
  params: [string, TParam?],
  options?: API.RequestOptions,
) => {
  return {
    mutationFn: (body: Omit<T, "id">) => fn(body, options),
    onSettled: () => Query.invalidateData(queryClient, params),
  };
};

const updateMutationOption = <T extends object, TParam>(
  queryClient: QueryClient,
  id: string,
  fn: (id: string, t: Omit<T, "id">) => Promise<T>,
  params: [string, TParam?],
) => {
  return {
    mutationFn: (t: Omit<T, "id">) => fn(id, t),
    onSettled: () => Query.invalidateData(queryClient, params),
  };
};

const deleteMutationOption = <TParam,>(
  queryClient: QueryClient,
  fn: (id: string) => Promise<never>,
  params: [string, TParam?],
) => {
  return {
    mutationFn: (id: string) => fn(id),
    onSettled: () => Query.invalidateData(queryClient, params),
  };
};

export { createQueryOptions, invalidateData, createMutationOption, updateMutationOption, deleteMutationOption };
