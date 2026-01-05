import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Storage, noop } from "@/utils";
import { clearStorage, setAuth } from "@/utils/storage";
import { getProfile, listPersonalResources } from "@/api/system/personal";

type AuthState = {
  user: API.System.User | null;
  permissions: API.System.Resource[] | null;
  token: string | null;
  loading: boolean;
};

type AuthActions = {
  login: (token: API.Token) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

type AuthContextType = AuthState & AuthActions;

const AuthContext = createContext<AuthContextType>({
  user: null,
  permissions: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: noop,
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    permissions: [], // Default to an empty array to prevent render errors
    token: Storage.getAccessToken(),
    loading: true,
  });

  const initialize = useCallback(async () => {
    const token = Storage.getAccessToken();
    if (!token) {
      setAuthState((s) => ({ ...s, loading: false, user: null, token: null, permissions: [] }));
      return;
    }

    try {
      // Fetch user profile and resources in parallel
      // The API functions now handle unwrapping, so we get the data directly.
      const [user, permissions] = await Promise.all([
        getProfile(),
        listPersonalResources(),
      ]);

      setAuthState((s) => ({
        ...s,
        user: user || null,
        permissions: permissions || [],
        loading: false,
        token,
      }));
    } catch (error) {
      console.error("Initialization failed:", error);
      clearStorage();
      setAuthState({ user: null, token: null, permissions: [], loading: false });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (token: API.Token) => {
    setAuth(token);
    setAuthState((s) => ({
      ...s,
      token: token.access_token,
      loading: true, // Set loading to true while re-initializing
    }));
    await initialize(); // Re-fetch user data after login
  };

  const logout = () => {
    clearStorage();
    setAuthState({
      user: null,
      permissions: [],
      token: null,
      loading: false,
    });
  };

  const isAuthenticated = () => !!authState.token;

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      isAuthenticated,
    }),
    [authState]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;
