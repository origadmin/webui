import TasksPage from "@/pages/tasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TasksPage />;
}
