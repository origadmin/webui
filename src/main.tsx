import { StrictMode } from "react";
import { queryClient, router } from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import AuthProvider, { useAuth } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./main.css";

const rootElement = document.getElementById("root");

function App() {
  // Grab the auth context
  const auth = useAuth();

  // Pass the auth context to the router
  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
