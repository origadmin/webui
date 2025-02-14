import CustomersPage from "@/pages/dashboard/Customers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/customers")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CustomersPage />;
}
