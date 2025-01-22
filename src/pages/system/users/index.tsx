import { userListSchema } from "@/mocks/user/schema";
import { users } from "@/mocks/user/users";
import PageContainer from "@/components/page-container";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersTable } from "./components/users-table";
import UsersProvider from "./context/users-context";

export default function UserPage() {
  // Parse user list
  const userList = userListSchema.parse(users);

  return (
    <UsersProvider>
      <PageContainer>
        <div className='p-4 md:px-4 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>Manage your users and their roles here.</p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <UsersTable data={userList} columns={columns} />
        </div>
      </PageContainer>
      <UsersDialogs />
    </UsersProvider>
  );
}
