import CustomersPage from "@/pages/dashboard/Customers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/customers")({
  component: RouteComponent,
});

function RouteComponent() {
  return CustomersPage();
}
