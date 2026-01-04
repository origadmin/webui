import BillingPage from "@/pages/billing";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/billing")({
  component: BillingPage,
});
