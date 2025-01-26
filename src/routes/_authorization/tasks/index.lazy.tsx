import { createLazyFileRoute } from "@tanstack/react-router";
import TasksPage from "@/pages/tasks";

export const Route = createLazyFileRoute("/_authorization/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return TasksPage();
}
