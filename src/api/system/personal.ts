import { get } from "@/utils/request";
import { queryOptions, useQuery } from "@tanstack/react-query";

/** Query current user's profile (info and resources) GET /me/profile */
export async function getProfile(options?: API.RequestOptions) {
  return get<API.System.PersonalProfile>("/me/profile", undefined, options);
}

/**
 * @deprecated This is deprecated, use getProfile instead.
 */
export async function listPersonalResources(params?: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Resource[]>("/sys/personal/resources", params, options);
}

/**
 * @deprecated This is deprecated, use getProfile instead.
 */
export const usePersonalResourcesQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/personal/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listPersonalResources(opts),
    }),
  );
};
