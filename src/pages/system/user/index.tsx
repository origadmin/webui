import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/data-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

export default function SystemUser() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const columns = [
    { key: "name" as keyof User, label: "Name" },
    { key: "email" as keyof User, label: "Email" },
    { key: "role" as keyof User, label: "Role" },
  ];

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUser = {
      id: editingUser ? editingUser.id : users.length + 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)));
    } else {
      setUsers([...users, updatedUser]);
    }

    setIsDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Users Management</h1>
      <Button onClick={() => setIsDialogOpen(true)} className='mb-4'>
        Add User
      </Button>
      <DataTable data={users} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' defaultValue={editingUser?.name} required />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' type='email' defaultValue={editingUser?.email} required />
            </div>
            <div>
              <Label htmlFor='role'>Role</Label>
              <Input id='role' name='role' defaultValue={editingUser?.role} required />
            </div>
            <Button type='submit'>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
