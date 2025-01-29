import TasksPage from "@/pages/tasks";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return TasksPage();
}
