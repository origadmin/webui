import { Suspense, useEffect } from "react";
import { mockSidebar } from "@/mocks/mockSidebar";
import { errorRoutes } from "@/pages/errors";
import { router } from "@/router";
import { refreshToken } from "@/utils/auth";
import { getAccessToken } from "@/utils/storage";
import { RouterProvider } from "@tanstack/react-router";
import { routes } from "config/route";
import AuthProvider, { useAuth } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/Loading";

type UserResource = {
  user?: API.User;
  // menus?: Record<string, API.MenuItem>;
};

type InitialStateProps = {
  fetch?: () => Promise<UserResource>;
  // routePathCodeMap?: Record<string, string>;
  user?: API.User;
  // menus?: Record<string, API.MenuItem>;
  loading?: boolean;
};

export async function getInitialState(): Promise<InitialStateProps> {
  const fetchInitData = async (): Promise<UserResource> => {
    // const convertToMenuItems = (menus?: API.MenuItem[], parent_code?: string): API.MenuItem[] | undefined => {
    //   if (!menus) {
    //     return undefined;
    //   }
    //   const result: API.MenuItem[] = [];
    //   menus.forEach((menu) => {
    //     if (!menu.keyword) {
    //       return;
    //     }
    //     const code = parent_code ? `${parent_code}.${menu.keyword}` : `${menu.keyword}`;
    //     const menuItem: API.MenuItem = {
    //       keyword: code,
    //       path: menu.path,
    //       title: menu.title,
    //       items: convertToMenuItems(menu.items, code),
    //     };
    //     result.push(menuItem);
    //   });
    //   return result;
    // };
    //   try {
    //     // const userRes = await queryCurrentUser();
    //     const currentUser = {};
    //     // currentUser.status_checked = !!currentUser.status && currentUser.status === 'activated';
    //
    //     // const menusRes = await listCurrentMenus();
    //     const menusData: API.MenuItem[] | undefined = [];
    //     const menuItems = convertToMenuItems(menusData);
    //     const flatMenus = getFlatMenus(menuItems);
    //     return { currentUser, flatMenus };
    //   } catch (error) {
    //     console.error(error);
    //     history.push(loginPath);
    //   }
    return {};
  };

  // 如果不是登录页面，执行
  // const { location } = history;
  // const flatRouteMenus = getFlatMenus(transformRoute(routes).menuData);
  // const routePathCodeMap: Record<string, string> = {};
  // Object.keys(flatRouteMenus).forEach((key) => {
  //   const menu = flatRouteMenus[key];
  //   let code = menu.code;
  //   if (menu.pro_layout_parentKeys) {
  //     const codes: string[] = [];
  //     menu.pro_layout_parentKeys.forEach((p) => {
  //       codes.push(flatRouteMenus[p].code);
  //     });
  //     if (codes.length > 0) {
  //       code = `${codes.join('.')}.${code}`;
  //     }
  //   }
  //   routePathCodeMap[menu.path!] = code;
  // });
  // if (![loginPath, '/user/register', '/user/register-result'].includes(location.pathname)) {
  //   const data = await fetchInitData();
  //
  //   return {
  //     fetchInitData: fetchInitData,
  //     settings: Settings as Partial<LayoutSettings>,
  //     routePathCodeMap,
  //     ...data,
  //   };
  // }
  return {
    fetch: fetchInitData,
    // settings: Settings as Partial<LayoutSettings>,
    // routePathCodeMap,
  };
}

function AuthApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

// const queryClient = useMemo(() => new QueryClient(), []);
function MainApp() {
  console.log("Application Started");
  // const location = useLocation();
  // const match = useMatch(location.pathname);
  // const [initRoutes, setInitRoutes] = useState<RouterConfig>(routes);
  // const { user, fetchMenus } = useRBAC();
  // const menus = mockSidebar.menuItems;

  // const currentRoute = router.routes.find((route) => route.id === match?.pathname);
  // console.log("route:", currentRoute?.id);

  const accesses = new Map<string, boolean>();
  accesses.set("*", true);

  const initState = {
    // fetch: fetchInitData,
    // settings: Settings as Partial<LayoutSettings>,
    // routePathCodeMap,
    refresh: () => {
      return refreshToken();
    },
    isAuthenticated: () => {
      return !!getAccessToken();
    },
    token: getAccessToken(),
    access: accesses,
    routes: routes,
    errorRoutes: errorRoutes,
    // signInPath: SIGN_IN_URL,
    menus: mockSidebar.menuItems,
  };

  useEffect(() => {
    // setInitRoutes(initRouter(routes));
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider {...initState}>
        <AuthApp />
      </AuthProvider>
      <Toaster />
    </Suspense>
  );
}

export default MainApp;
