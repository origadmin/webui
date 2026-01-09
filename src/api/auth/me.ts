import { get } from "@/utils/request";

const API_ME_URL = "/me";
const API_RESOURCES_URL = `${API_ME_URL}/resources`;

/**
 * Fetches the profile of the currently authenticated user.
 * @returns A promise that resolves with the user's profile information.
 */
export const getMyProfile = () => {
  return get<API.System.User>(API_ME_URL);
};

/**
 * Fetches the resources (e.g., menus, permissions) available to the currently authenticated user.
 * @param params - Optional parameters to filter the resources, such as `type`.
 * @returns A promise that resolves with a list of resources.
 */
export const getMyResources = (params?: API.SearchParams) => {
  return get<API.System.ListUserResourcesResponse>(API_RESOURCES_URL, params);
};
