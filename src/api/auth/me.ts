import { get } from "@/utils/request";

const API_ME_URL = "/me";

/**
 * Fetches the profile of the currently authenticated user.
 * The backend returns a GetProfileResponse object containing the user.
 * This function unwraps the response to return the user object directly.
 * @returns A promise that resolves with the user's profile information.
 */
export const getProfile = async (): Promise<API.System.User | null> => {
  const response = await get<API.Auth.GetProfileResponse>(`${API_ME_URL}/profile`);
  return response?.user || null;
};

/**
 * Fetches the menu/view tree for the currently authenticated user.
 * The backend returns a ListMyViewsResponse object containing the views.
 * This function unwraps the response to return the views array directly.
 * @param params - The parameters for the request, including the 'scope'.
 * @returns A promise that resolves with the user's view tree.
 */
export const listMyViews = async (params?: API.SearchParams): Promise<API.System.View[]> => {
  const response = await get<API.Auth.ListMyViewsResponse>(`${API_ME_URL}/views`, params);
  return response?.views || [];
};
