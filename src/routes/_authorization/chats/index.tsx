import ChatPage from "@/pages/chats";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/chats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatPage />;
}
