import React, { useReducer, useState, useEffect } from "react";
import { deleteUser, listUser } from "@/services/system/user";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from "@/components/page-container";
import { UserModal } from "./UserModal";

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.User;
}

interface State {
  open: boolean;
  title: string;
  id?: string;
}

function SystemUser() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            open: true,
            title: "Add User",
          };
        case ActionTypeEnum.EDIT:
          return {
            open: true,
            title: "Edit User",
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            open: false,
            title: "",
            id: undefined,
          };
        default:
          return pre;
      }
    },
    { open: false, title: "" },
  );

  const [data, setData] = useState<API.User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await listUser({ pageSize });
      console.log("response", response);
      if (response && response.data) {
        setData(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageSize]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center py-4'>
            <Input placeholder='Search users...' className='max-w-sm' />
            <Button onClick={() => dispatch({ type: ActionTypeEnum.ADD })}>Add User</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {user.roles?.map((role) => (
                        <Badge key={role.role_id} variant='secondary'>
                          {role.role_name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "activated" ? "default" : "destructive"}>
                      {user.status === "activated" ? "Activated" : "Freezed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.created_at ? new Date(user.created_at!).toLocaleString() : "-"}</TableCell>
                  <TableCell>{user.updated_at ? new Date(user.updated_at!).toLocaleString() : "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id!)}>
                          Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => dispatch({ type: ActionTypeEnum.EDIT, payload: user })}>
                          <Pencil className='mr-2 h-4 w-4' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user.id!)}>
                          <Trash className='mr-2 h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select page size' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10 per page</SelectItem>
                <SelectItem value='20'>20 per page</SelectItem>
                <SelectItem value='50'>50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <UserModal
          open={state.open}
          title={state.title}
          id={state.id}
          onCancel={() => dispatch({ type: ActionTypeEnum.CANCEL })}
          onSuccess={() => {
            dispatch({ type: ActionTypeEnum.CANCEL });
            fetchData();
          }}
        />
      </Card>
    </PageContainer>
  );
}

export default SystemUser;
