import { ACCESS_TOKEN_KEY, EXPIRATION_TIME_KEY, REFRESH_TOKEN_KEY, USERNAME_KEY, USER_ID_KEY, USER_KEY } from "@/types";

/**
 * Remove the specified token from local storage
 * @param key name of the token
 */
export const removeToken = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * Remove the access token from the local storage
 */
export const removeAccessToken = () => {
  removeToken(ACCESS_TOKEN_KEY);
};

/**
 * Remove the refresh token from your local storage
 */
export const removeRefreshToken = () => {
  removeToken(REFRESH_TOKEN_KEY);
};

/**
 * The function `setUserID` sets the user ID in the local storage.
 * @param {string} id - A string representing the user ID that needs to be set.
 */
export function setUserID(id: string) {
  localStorage.setItem(USER_ID_KEY, id);
}

/**
 * The function `getUserID` returns the value of the 'user ID' key from the localStorage, or an empty string if it doesn't exist.
 * @returns a string value representing the user ID or an empty string.
 */
export function getUserID(): string {
  return localStorage.getItem(USER_ID_KEY) || "";
}

/**
 * The function `setUser` sets the user object in the local storage.
 * @param {API.User} user - The user object that needs to be set.
 */
export const setUser = (user: API.User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * The function `getUser` retrieves the user object from the local storage.
 * @returns The user object if it exists, otherwise returns null.
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as API.User) : null;
};

/**
 * The function sets the username in the local storage.
 * @param {string} username - A string representing the username that needs to be set.
 */
export function setUsername(username: string) {
  localStorage.setItem(USERNAME_KEY, username);
}

/**
 * The function `getUsername` returns the value of the 'username' key from the localStorage, or an empty string if it doesn't exist.
 * @returns a string value representing the username or an empty string.
 */
export function getUsername(): string {
  return localStorage.getItem(USERNAME_KEY) || "";
}

/**
 * The function `hasToken` checks if a token exists in the local storage based on the provided key.
 * @param {string} key - The key used to check for the existence of a token.
 * @returns a boolean value indicating whether the token exists.
 */
export const hasToken = (key: string) => {
  // Here you can add your permission checking logic
  // For example, check if there is a token in localStorage
  return !!localStorage.getItem(key);
};

/**
 * The function `getToken` retrieves the token from the local storage based on the provided key.
 * @param {string} key - The key used to retrieve the token.
 * @returns The token value if it exists, otherwise returns null.
 */
export const getToken = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * The function `setToken` sets a token in the local storage with the provided key.
 * @param {string} key - The key used to set the token.
 * @param {string} token - The token value that needs to be set.
 */
export const setToken = (key: string, token: string) => {
  // Here you can add your permission checking logic
  // For example, check if there is a token in localStorage
  localStorage.setItem(key, token);
};

/**
 * The function `hasRefreshToken` checks if a refresh token exists in the local storage.
 * @returns a boolean value indicating whether the refresh token exists.
 */
export const hasRefreshToken = () => {
  return hasToken(REFRESH_TOKEN_KEY);
};

/**
 * The function `getRefreshToken` retrieves the refresh token from the local storage.
 * @returns The refresh token value if it exists, otherwise returns null.
 */
export const getRefreshToken = () => {
  return getToken(REFRESH_TOKEN_KEY);
};

/**
 * The function `setRefreshToken` sets a refresh token in the local storage.
 * @param {string} refreshToken - The refresh token value that needs to be set.
 */
export const setRefreshToken = (refreshToken: string) => {
  setToken(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * The function `hasAccessToken` checks if an access token exists in the local storage.
 * @returns a boolean value indicating whether the access token exists.
 */
export const hasAccessToken = () => {
  return hasToken(ACCESS_TOKEN_KEY);
};

/**
 * The function `getAccessToken` retrieves the access token from the local storage.
 * @returns The access token value if it exists, otherwise returns null.
 */
export const getAccessToken = () => {
  return getToken(ACCESS_TOKEN_KEY);
};

/**
 * The function `setAccessToken` sets an access token in the local storage.
 * @param {string} accessToken - The access token value that needs to be set.
 */
export const setAccessToken = (accessToken: string) => {
  setToken(ACCESS_TOKEN_KEY, accessToken);
};

/**
 * The function `getExpirationTime` retrieves the expiration time from the local storage.
 * @returns The expiration time value if it exists, otherwise returns null.
 */
export const getExpirationTime = () => {
  return localStorage.getItem(EXPIRATION_TIME_KEY);
};

/**
 * The function `setExpirationTime` sets the expiration time in the local storage.
 * @param {string} expirationTime - The expiration time value that needs to be set.
 */
export const setExpirationTime = (expirationTime: string) => {
  localStorage.setItem(EXPIRATION_TIME_KEY, expirationTime);
};

/**
 * The function `IsExpired` checks if the current time is greater than the expiration time.
 * @returns a boolean value indicating whether the current time is greater than the expiration time.
 */
export const IsExpired = () => {
  const expirationTime = getExpirationTime();
  if (!expirationTime) {
    return true;
  }
  const currentTime = new Date().getTime();
  const expirationTimeInMilliseconds = parseInt(expirationTime, 10) * 1000;
  return currentTime > expirationTimeInMilliseconds;
};
