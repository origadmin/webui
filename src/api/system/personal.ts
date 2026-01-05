import { get } from "@/utils/request";
import { queryOptions, useQuery } from "@tanstack/react-query";

/** 
 * Query current user's profile (info and resources) GET /me/profile 
 * Returns the User object directly.
 */
export async function getProfile(options?: API.RequestOptions) {
  const response = await get<API.System.PersonalProfileResponse>("/me/profile", undefined, options);
  // Unwrapping: Return the user object directly, or null/undefined if missing
  return response?.user;
}

/**
 * Query personal resources (menus/permissions) GET /me/resources
 * Returns the Resource array directly.
 */
export async function listPersonalResources(params?: API.SearchParams, options?: API.RequestOptions) {
  const response = await get<API.System.PersonalResourcesResponse>("/me/resources", params, options);
  // Unwrapping: Return the resources array directly, or an empty array
  return response?.resources || [];
}

/**
 * @deprecated This is deprecated, use getProfile instead.
 */
export const usePersonalResourcesQuery = (opts?: API.SearchParams) => {
  return useQuery(
    queryOptions({
      queryKey: ["/me/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listPersonalResources(opts),
    }),
  );
};
