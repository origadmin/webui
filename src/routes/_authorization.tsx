import MainLayout from "@/layout/layout";
import { createFileRoute } from "@tanstack/react-router";

/**
 * This route acts as a layout wrapper for all protected routes.
 * Its only responsibility is to render the MainLayout.
 * All authentication checks are now handled by the global `beforeLoad` in `__root.tsx`.
 */
export const Route = createFileRoute("/_authorization")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
