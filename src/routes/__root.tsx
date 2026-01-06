import { Suspense } from "react";
import { InternalServerError, NotFoundError } from "@/pages/errors";
import { DEFAULT_MAIN_PAGE, SIGN_IN_URL, SIGN_UP_URL } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextType, useAuth } from "@/hooks/use-auth";
import { LocaleProvider } from "@/hooks/use-locale";
import { LoadingSpinner } from "@/components/Loading";

// Import all auth URLs

interface MyRouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

const RootComponent = () => {
  const { loading } = useAuth();

  // While the AuthProvider is initializing, show a global loading spinner.
  if (loading) {
    return (
      <Suspense fallback={null}>
        <div className='flex h-screen w-screen items-center justify-center'>
          <LoadingSpinner />
        </div>
      </Suspense>
    );
  }

  return (
    <LocaleProvider>
      <Outlet />
      {import.meta.env.MODE === "development" && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </LocaleProvider>
  );
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  errorComponent: InternalServerError,
  notFoundComponent: NotFoundError,
  // This is the global authentication guard
  beforeLoad: ({ context, location }) => {
    const { token } = context.auth;
    const authRoutes = [SIGN_IN_URL, SIGN_UP_URL];
    const isAuthPage = authRoutes.includes(location.pathname);

    // If the user is not authenticated and is trying to access a protected page
    if (!token && !isAuthPage) {
      throw redirect({
        to: SIGN_IN_URL,
        search: {
          redirect: location.href,
        },
      });
    }

    // If the user is authenticated and is trying to access an auth page
    // Check if there's a redirect parameter and use it, otherwise go to DEFAULT_MAIN_PAGE
    if (token && isAuthPage) {
      const redirectParam = new URLSearchParams(location.search).get("redirect");
      throw redirect({
        to: redirectParam || DEFAULT_MAIN_PAGE,
      });
    }
  },
});
