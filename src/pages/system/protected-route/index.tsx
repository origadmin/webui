import { withPermission } from "@/components/with-permission";

function ProtectedPage() {
  return <div>This is a protected page</div>;
}

export default withPermission(ProtectedPage, ["view_protected_page"]);
