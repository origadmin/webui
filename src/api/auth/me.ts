import { get } from "@/utils/request";

const API_ME_URL = "/me";

/**
 * Fetches the profile of the currently authenticated user.
 * @returns A promise that resolves with the user's profile information.
 */
export const getMyProfile = () => {
  // According to openapi.yaml, the response is GetProfileResponse which contains a User object.
  return get<API.System.PersonalProfileResponse>(`${API_ME_URL}/profile`);
};
