import ProductsPage from "@/pages/dashboard/Products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductsPage />;
}
