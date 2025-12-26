import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Storage, noop } from "@/utils";
import { clearStorage, setAuth } from "@/utils/storage";
import { getProfile } from "@/api/system/personal";

type AuthState = {
  user: API.System.User | null;
  permissions: API.System.Resource[] | null;
  token: string | null;
  loading: boolean;
  initialData: Record<string, any> | null; // Add initialData to store the whole profile
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
  initialData: null, // Default value for initialData
  login: async () => {},
  logout: noop,
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    permissions: null,
    token: Storage.getAccessToken(),
    loading: true,
    initialData: null, // Initialize initialData
  });

  const initialize = useCallback(async () => {
    const token = Storage.getAccessToken();
    if (!token) {
      setAuthState((s) => ({ ...s, loading: false, user: null, token: null, permissions: null, initialData: null }));
      return;
    }

    try {
      const profileRes = await getProfile();
      const { user, resources, ...rest } = profileRes.data; // Destructure user, resources, and the rest

      setAuthState((s) => ({
        ...s,
        user,
        permissions: resources,
        initialData: { user, resources, ...rest }, // Store the whole data object
        loading: false,
        token,
      }));
    } catch (error) {
      console.error("Initialization failed:", error);
      clearStorage();
      setAuthState({ user: null, token: null, permissions: null, loading: false, initialData: null });
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
      loading: true,
    }));
    await initialize();
  };

  const logout = () => {
    clearStorage();
    setAuthState({
      user: null,
      permissions: null,
      token: null,
      loading: false,
      initialData: null,
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
