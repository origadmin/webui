import { ACCESS_TOKEN_KEY, EXPIRATION_TIME_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY, USER_KEY, USERNAME_KEY, AUTHORIZATION_KEY, LOCALE_KEY, defaultLocale } from "@/types";


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
export const setUserID = (id: string) => {
  localStorage.setItem(USER_ID_KEY, id);
};

/**
 * The function `getUserID` returns the value of the 'user ID' key from the localStorage, or an empty string if it doesn't exist.
 * @returns a string value representing the user ID or an empty string.
 */
export const getUserID = () => {
  const auth = getAuthorization();
  if (auth && auth.user_id) {
    return auth.user_id;
  }
  return localStorage.getItem(USER_ID_KEY);
};

/**
 * The function `setUser` sets the user object in the local storage.
 * @param {API.System.User} user - The user object that needs to be set.
 */
export const setUser = (user: API.System.User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * The function `getUser` retrieves the user object from the local storage.
 * @returns The user object if it exists, otherwise returns null.
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as API.System.User) : null;
};

/**
 * The function sets the username in the local storage.
 * @param {string} username - A string representing the username that needs to be set.
 */
export const setUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};

/**
 * The function `getUsername` returns the value of the 'username' key from the localStorage, or an empty string if it doesn't exist.
 * @returns a string value representing the username or an empty string.
 */
export const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};

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
  const auth = getAuthorization();
  if (auth && auth.refresh_token) {
    return auth.refresh_token;
  }
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
  const auth = getAuthorization();
  if (auth && auth.access_token) {
    return auth.access_token;
  }
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
export const getExpirationTimeString = () => {
  const auth = getAuthorization();
  // for unknown json type
  // if (auth &&
  // "expiration_time" in auth &&
  // auth.expiration_time !== "" &&
  // typeof auth.expiration_time === "string") {
  //   return parseInt(auth.expiration_time, 10);
  // }
  if (auth && auth.expiration_time) {
    return auth.expiration_time;
  }
  return localStorage.getItem(EXPIRATION_TIME_KEY);
};

/**
 * The function `getExpirationTime` retrieves the expiration time from the local storage.
 * @returns The expiration time value if it exists, otherwise returns null.
 */
export const getExpirationTime = () => {
  const expire = getExpirationTimeString();
  // for unknown json type
  // if (auth &&
  // "expiration_time" in auth &&
  // auth.expiration_time !== "" &&
  // typeof auth.expiration_time === "string") {
  //   return parseInt(auth.expiration_time, 10);
  // }
  if (expire) {
    return parseInt(expire, 10);
  }
  return undefined;
};

/**
 * The function `setExpirationTime` sets the expiration time in the local storage.
 * @param {string} expirationTime - The expiration time value that needs to be set.
 */
export const setExpirationTime = (expirationTime: string) => {
  localStorage.setItem(EXPIRATION_TIME_KEY, expirationTime);
};

export const clearStorage = () => {
  localStorage.clear();
};

const setAuthorization = (token: string) => {
  localStorage.setItem(AUTHORIZATION_KEY, token);
};

const getAuthorization = () => {
  const tokenStr = localStorage.getItem(AUTHORIZATION_KEY);
  if (tokenStr) {
    return JSON.parse(tokenStr) as API.Token;
  }
  return null;
};

export const setAuth = (token: API.Token, split: boolean = false) => {
  setAuthorization(JSON.stringify(token));
  if (!split) {
    return;
  }
  setAccessToken(token.access_token);
  if (token.user_id) {
    setUserID(token.user_id);
  }
  if (token.refresh_token) {
    setRefreshToken(token.refresh_token);
  }
  if (token.expiration_time) {
    setExpirationTime(token.expiration_time);
  }
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
  const expirationTimeInMilliseconds = expirationTime * 1000;
  return currentTime > expirationTimeInMilliseconds;
};

export const getLocaleLanguage = () => {
  const locale = localStorage.getItem(LOCALE_KEY);
  if (locale) {
    return locale;
  }
  return navigator?.language || defaultLocale;
};

export const setLocaleLanguage = (locale: string) => {
  localStorage.setItem(LOCALE_KEY, locale);
};
