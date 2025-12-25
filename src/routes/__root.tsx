import { Suspense } from "react";
import { Outlet, createRootRouteWithContext, redirect } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextType, useAuth } from "@/hooks/use-auth";
import { LocaleProvider } from "@/hooks/use-locale";
import { LoadingSpinner } from "@/components/Loading";
import { InternalServerError, NotFoundError } from "@/pages/errors";
import { SIGN_IN_URL, SIGN_UP_URL } from "@/types"; // Import all auth URLs

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
    if (token && isAuthPage) {
      throw redirect({
        to: "/",
      });
    }
  },
});
