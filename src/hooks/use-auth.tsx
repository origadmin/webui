import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Storage, noop } from "@/utils";
import { clearStorage } from "@/utils/storage";
import { getProfile } from "@/api/system/personal";

type AuthState = {
  user: API.System.User | null;
  permissions: API.System.Resource[] | null;
  token: string | null;
  loading: boolean;
};

type AuthActions = {
  login: (token: string) => Promise<void>;
  logout: () => void;
};

type AuthContextType = AuthState & AuthActions;

const AuthContext = createContext<AuthContextType>({
  user: null,
  permissions: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: noop,
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    permissions: null,
    token: Storage.getAccessToken(),
    loading: true,
  });

  const initialize = useCallback(async () => {
    const token = Storage.getAccessToken();
    if (!token) {
      setAuthState((s) => ({ ...s, loading: false, user: null, token: null, permissions: null }));
      return;
    }

    try {
      const profileRes = await getProfile();
      const { user, resources } = profileRes.data;

      setAuthState((s) => ({
        ...s,
        user,
        permissions: resources,
        loading: false,
        token,
      }));
    } catch (error) {
      console.error("Initialization failed:", error);
      clearStorage();
      setAuthState({ user: null, token: null, permissions: null, loading: false });
    }
  }, []); // <-- The dependency array MUST be empty to run only once.

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (token: string) => {
    Storage.setAccessToken(token);
    // Set loading to true and token, then let the effect re-run initialize
    setAuthState((s) => ({ ...s, token, loading: true, user: null, permissions: null }));
    await initialize();
  };

  const logout = () => {
    clearStorage();
    setAuthState({
      user: null,
      permissions: null,
      token: null,
      loading: false,
    });
    // After logout, we might need to redirect. The router guard will handle this.
  };

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState, login, logout] // Add login and logout to dependency array
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;
