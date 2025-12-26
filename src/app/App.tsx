import { Suspense } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LoadingSpinner } from "@/components/Loading";
import MainApp from "./MainApp";

const LoadingSpinnerPage: React.FC = () => {
  // You can replace this with a more sophisticated loading page
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
};

/**
 * This is the new root component for the authenticated app.
 * Its only job is to wait for the authentication and initialization to complete,
 * then render the main application.
 */
function App() {
  const { loading, token } = useAuth();

  // While the AuthProvider is initializing, show a loading spinner.
  if (loading) {
    return (
      <Suspense fallback={<LoadingSpinnerPage />}>
        <LoadingSpinnerPage />
      </Suspense>
    );
  }

  // After initialization, if there's no token, the router will handle redirection.
  // If there is a token, render the main application layout.
  // The actual redirection logic should be in the router setup.
  if (!token) {
    // This part is crucial. The router should see there's no auth
    // and redirect to the login page. We render null here to prevent
    // rendering the app layout momentarily.
    // Or, more simply, the router's logic will kick in before this even renders.
    // For clarity, we can show a loading spinner while the redirect happens.
    return <LoadingSpinnerPage />;
  }

  return <MainApp />;
}

export default App;
