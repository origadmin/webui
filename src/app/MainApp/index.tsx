import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

/**
 * This is the root component for the authenticated part of the app.
 * It assumes it is rendered within an AuthProvider and all data is ready.
 * Its sole responsibility is to provide the router to the application.
 */
function MainApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default MainApp;
