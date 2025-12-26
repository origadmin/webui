import { Suspense } from "react";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/Loading";

const LoadingSpinnerPage: React.FC = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
};

/**
 * This is the true root component for the authenticated application.
 * It handles the loading state from AuthProvider and then renders the router.
 * The router's `beforeLoad` guard is now responsible for handling redirects.
 */
function AuthenticatedApp() {
  const { loading } = useAuth();
  const auth = useAuth(); // Pass the full auth context to the router

  // While the AuthProvider is initializing, show a global loading spinner.
  if (loading) {
    return (
      <Suspense fallback={<LoadingSpinnerPage />}>
        <LoadingSpinnerPage />
      </Suspense>
    );
  }

  // After loading is complete, the router takes over.
  // If not authenticated, the router's guard will redirect to the login page.
  // If authenticated, it will render the appropriate route.
  return <RouterProvider router={router} context={{ auth }} />;
}

export default AuthenticatedApp;
