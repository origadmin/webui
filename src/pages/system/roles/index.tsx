import { roles } from "@/mocks/role/roles";
import { roleListSchema } from "@/mocks/role/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/page-container";
import { columns } from "./components/roles-columns";
import { RolesDialogs } from "./components/roles-dialogs";
import { RoleTableProvider } from "./components/roles-table-provider";

export default function RolesPage() {
  // Parse role list
  const roleList = roleListSchema.parse(roles);

  return (
    <RoleTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Role List</CardTitle>
            <CardDescription>Manage your roles and their roles here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<API.Role> data={roleList} columns={columns} />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <RolesDialogs />
    </RoleTableProvider>
  );
}
