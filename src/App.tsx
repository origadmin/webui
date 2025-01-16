import { Suspense } from "react";
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import { API } from "@/types/typings";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/Loading";

type UserResource = {
  user?: API.User;
  menus?: Record<string, API.MenuItem>;
};

type InitialStateProps = {
  fetch?: () => Promise<UserResource>;
  // routePathCodeMap?: Record<string, string>;
  user?: API.User;
  menus?: Record<string, API.MenuItem>;
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

// export const RuntimeLayoutConfig = ({ initialState, setInitialState }) => {
//   const loopMenuItems = (menus?: API.MenuItem[]): API.MenuItem[] => {
//     if (!menus || menus.length === 0) {
//       return [];
//     }
//
//     const result: API.MenuItem[] = [];
//     menus.forEach((menu) => {
//       if (!menu.path || !initialState || !initialState.routePathCodeMap || !initialState.flatMenus) {
//         return;
//       }
//
//       // const code = initialState.routePathCodeMap[menu.path];
//       if (menu.keyword && initialState.flatMenus.hasOwnProperty(menu.keyword)) {
//         const menuItem: API.MenuItem = {
//           ...menu,
//         };
//         const items = loopMenuItems(menu.items);
//         menuItem.items = items;
//         // menuItem.routes = items;
//         result.push(menuItem);
//       }
//     });
//     console.log(result);
//     return result;
//   };
//
//   return {
//     // actionsRender: () => [<Question key='doc' />, <SelectLang key='SelectLang' />],
//     avatarProps: {
//       src: initialState?.currentUser?.avatar,
//       // title: <AvatarName />,
//       // render: (_, avatarChildren) => {
//       //   return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
//       // },
//     },
//     waterMarkProps: {
//       content: initialState?.currentUser?.name,
//     },
//     // rightContentRender: () => <AvatarDropdown />,
//     // footerRender: () => <Footer />,
//     // onPageChange: () => {
//     //   const { location } = history;
//     //   // 如果没有登录，重定向到 login
//     //   if (!initialState?.currentUser && location.pathname !== loginPath) {
//     //     history.push(loginPath);
//     //   }
//     // },
//     menu: {
//       params: {
//         userId: initialState?.currentUser?.id,
//       },
//       // request: async () => {
//       //   const data = loopMenuItems(transformRoute(routes).menuData);
//       //   patchRoutes({ routes: data });
//       //   return data;
//       // },
//     },
//     // links: isDev
//     //   ? [
//     //       <Link key='openapi' to='/umi/plugin/openapi' target='_blank'>
//     //         <LinkOutlined />
//     //         <span>OpenAPI 文档</span>
//     //       </Link>,
//     //     ]
//     //   : [],
//     // menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <Forbidden/>,
//     // noFound: NoFoundPage,
//     // 增加一个 loading 的状态
//     childrenRender: (children: any) => {
//       if (initialState?.loading) return <LoadingSpinner />;
//       return <>{children}</>;
//     },
//     ...initialState?.settings,
//   };
// };

function App() {
  console.log("Application Started");
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
