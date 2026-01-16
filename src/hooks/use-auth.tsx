import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, listMyViews } from "@/api/auth/me";
import { noop, Storage } from "@/utils";
import { t } from "@/utils/locale";
import { clearStorage, setAuth } from "@/utils/storage";
import { buildTree } from "@/utils/tree";

// Helper function to transform a backend View object into a frontend MenuItem object.
const transformViewToMenuItem = (view: API.System.View): API.MenuItem | null => {
  if (!view.id) {
    return null;
  }

  const title = view.i18n ? t(view.i18n, view.name || view.i18n) : view.name || "";

  return {
    id: view.id,
    title,
    path: view.path,
    type: view.type,
    scope: view.scope,
    parent_id: view.parent_id,
    icon: view.icon,
    children: view.children
      ? view.children.map(transformViewToMenuItem).filter((v): v is API.MenuItem => v !== null)
      : [],
  };
};

type AuthState = {
  user: API.System.User | null;
  views: API.MenuItem[]; // The single source of truth: the full, structured view tree.
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
  views: [],
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
      // const currentLang = Storage.getLanguage() || 'zh-CN';
      const [user, flatViews /*, remoteLocales */] = await Promise.all([
        getProfile(),
        listMyViews(),
        // getRemoteTranslations(currentLang)
      ]);

      // if (remoteLocales) {
      //   i18n.addResourceBundle(currentLang, 'translation', remoteLocales, true, true);
      // }

      let viewTree: API.MenuItem[] = [];
      if (flatViews) {
        const menuItems = flatViews.map(transformViewToMenuItem).filter((v): v is API.MenuItem => v !== null);
        viewTree = buildTree(menuItems);
      }

      setAuthState((s) => ({
        ...s,
        user: user || null,
        views: viewTree,
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

  const login = useCallback(
    async (token: API.Token) => {
      setAuth(token);
      setAuthState((s) => ({
        ...s,
        token: token.access_token,
        loading: true,
      }));
      await initialize();
    },
    [initialize],
  );

  const logout = useCallback(() => {
    clearStorage();
    setAuthState({
      user: null,
      views: [],
      token: null,
      loading: false,
    });
  }, []);

  const isAuthenticated = useCallback(() => !!authState.token, [authState.token]);

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      isAuthenticated,
    }),
    [authState, login, logout, isAuthenticated],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;
