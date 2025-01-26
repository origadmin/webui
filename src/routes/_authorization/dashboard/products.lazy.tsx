import ProductsPage from "@/pages/dashboard/Products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return ProductsPage();
}
