import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// This would typically come from an API or database
const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", totalOrders: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", totalOrders: 3 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active", totalOrders: 7 },
  { id: 4, name: "Alice Brown", email: "alice@example.com", status: "Active", totalOrders: 2 },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", status: "Inactive", totalOrders: 0 },
];

export default function CustomerTable() {
  return (
    <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-right'>Total Orders</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className='font-medium'>
              <div className='flex items-center space-x-3'>
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${customer.name}`} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{customer.name}</span>
              </div>
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
              <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
            </TableCell>
            <TableCell className='text-right'>{customer.totalOrders}</TableCell>
            <TableCell className='text-right'>
              <Button variant='outline' size='sm'>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
