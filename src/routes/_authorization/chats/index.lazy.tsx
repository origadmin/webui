import ChatPage from "@/pages/chats";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/chats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatPage />;
}
