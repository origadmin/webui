import { useState } from "react";
import { userListSchema } from "@/mocks/user/schema";
import { users } from "@/mocks/user/users";
import useDialogState from "@/hooks/use-dialog-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { OpenStateType } from "@/components/DataTable/row-actions";
import PageContainer from "@/components/page-container";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UserTableProvider } from "./components/users-table-provider";

export default function UsersPage() {
  const [open, setOpen] = useDialogState<OpenStateType>(null);
  const [currentRow, setCurrentRow] = useState<API.User | null>(null);
  // Parse user list
  const userList = userListSchema.parse(users);

  return (
    <UserTableProvider open={open} setOpen={setOpen} currentRow={currentRow} setCurrentRow={setCurrentRow}>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users and their roles here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable data={userList} columns={columns} />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <UsersDialogs />
    </UserTableProvider>
  );
}
