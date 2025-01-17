import resourcesData from "@/data/resources.json";
import { RBACManagement } from "@/components/RBACManagement";

export default function RBACPage() {
  return (
    <div>
      <RBACManagement initialResources={resourcesData} />
    </div>
  );
}
