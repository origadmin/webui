import SignInPage from "@/pages/auth/SignIn";
import { createFileRoute } from "@tanstack/react-router";

// The route path is automatically inferred from the file path: /sign-in
export const Route = createFileRoute("/(Auth)/sign-in")({
  component: RouteComponent,
  // All authentication logic is now handled by the global guard in `__root.tsx`.
  // This component no longer needs its own `beforeLoad` guard.
});

function RouteComponent() {
  return <SignInPage />;
}
