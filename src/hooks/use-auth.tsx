import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, listMyViews } from "@/api/auth/me";
import { noop, Storage } from "@/utils";
import { clearStorage, setAuth } from "@/utils/storage";

type AuthState = {
  user: API.System.User | null;
  views: API.System.View[] | null;
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
  views: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: noop,
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    views: [],
    token: Storage.getAccessToken(),
    loading: true,
  });

  const initialize = useCallback(async () => {
    const token = Storage.getAccessToken();
    if (!token) {
      setAuthState((s) => ({ ...s, loading: false, user: null, token: null, views: [] }));
      return;
    }

    try {
      // Fetch user profile and views in parallel.
      // The API functions now return the data directly.
      const [user, views] = await Promise.all([
        getProfile(),
        listMyViews({ scope: "sidebar" }), // Fetch sidebar views by default
      ]);

      setAuthState((s) => ({
        ...s,
        user: user || null,
        views: views || [],
        loading: false,
        token,
      }));
    } catch (error) {
      console.error("Initialization failed:", error);
      clearStorage();
      setAuthState({ user: null, token: null, views: [], loading: false });
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
      views: [],
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
    [authState],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;
