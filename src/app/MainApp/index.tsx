import { Suspense } from "react";
import { usePersonalResourcesQuery } from "@/api/system/personal";
import { mockSidebar, mockTopNav, mockFooter, mockSecondItems } from "@/mocks/mock-sidebar";
import { router } from "@/router";
import { SIGN_IN_URL, SIGN_OUT_URL, SIGN_UP_URL } from "@/types";
import { refreshToken } from "@/utils/auth";
import { buildMenuTree } from "@/utils/menu";
import { getAccessToken, getUserID } from "@/utils/storage";
import { RouterProvider } from "@tanstack/react-router";
import AuthProvider, { AuthProviderProps, useAuth } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/Loading";
import { SidebarProps } from "@/components/Sidebar";

type UserResource = {
  user?: API.System.User;
  // menus?: Record<string, API.MenuItem>;
};

type InitialStateProps = {
  fetch?: () => Promise<UserResource>;
  // routePathCodeMap?: Record<string, string>;
  user?: API.System.User;
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

  const accesses = new Map<string, boolean>();
  accesses.set("*", true);
  // const id = getUserID() || "";
  const { data: resources, isLoading } = usePersonalResourcesQuery({ page_size: 1000 });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const menusItems = buildMenuTree(resources?.data);
  console.log("menu tree", menusItems);
  const getMockData = (): SidebarProps => {
    return {
      header: {
        teams: mockSidebar.teams,
      },
      content: {
        items: menusItems,
        seconds: {
          items: mockSecondItems,
        },
      },
      footer: {
        user: mockSidebar.user,
      },
    };
  };

  const initialData: AuthProviderProps<InitialDataConfig> = {
    // const [initialData, setInitialData] = useState<AuthProviderProps<InitialDataConfig>>({
    refresh: () => {
      return refreshToken();
    },
    getUserId: () => {
      return getUserID() || "";
    },
    isAuthenticated: () => {
      return !!getAccessToken();
    },
    token: getAccessToken(),
    access: accesses,
    initialData: {
      sidebar: getMockData(),
      menus: menusItems,
      topNav: {
        menus: mockTopNav,
      },
      footer: {
        links: mockFooter,
      },
      watermark: {
        content: "OrigAdmin",
        fontWeight: "bold",
        fontFamily: "Arial",
        opacity: 0.3,
        rotate: 45,
        width: 100, // Reduce the width of a single watermark
        height: 100, // Reduce the height of a single watermark
        x: 0,
        y: 0,
        zIndex: 1,
        position: "absolute",
        top: 0, // Adjust to the top
        left: 0, // Adjust to the left
      },
    },
    signInPath: SIGN_IN_URL,
    signUpPath: SIGN_UP_URL,
    signOutPath: SIGN_OUT_URL,
  };
  // });

  // useEffect(() => {
  //   setInitialData((prev) => {
  //     return {
  //       ...prev,
  //       initialData: {
  //         ...prev.initialData,
  //         sidebar: getMockData(),
  //         menus: menusItems,
  //       },
  //     };
  //   });
  // }, [getMockData, menusItems]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider<InitialDataConfig> {...initialData}>
        <AuthApp />
      </AuthProvider>
      <Toaster />
    </Suspense>
  );
}

export default MainApp;
