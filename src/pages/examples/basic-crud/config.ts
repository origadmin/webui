import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { createColumns } from "@/templates/crud-page/components/columns";
import { DataTableRowActions } from "@/templates/crud-page/components/row-actions";
import { Checkbox } from "@/components/ui/checkbox";

// 1. Define the data shape
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "active" | "draft";
}

// 2. Define the form schema
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "draft"]).default("active"),
});

export type FormType = z.infer<typeof formSchema>;

// 3. Define columns
export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

// 4. Mock API Hooks (Replace with real API hooks in production)
export const apiHooks = {
  useQuery: (params: any) => {
    // Mock data
    return {
      data: {
        items: [
          { id: "1", name: "Laptop", price: 999, category: "Electronics", status: "active" },
          { id: "2", name: "Coffee Maker", price: 49, category: "Home", status: "active" },
          { id: "3", name: "Desk Chair", price: 150, category: "Furniture", status: "draft" },
        ] as Product[],
        total: 3,
      },
      isLoading: false,
    };
  },
  useCreate: () => ({ mutateAsync: async (data: any) => console.log("Create", data) }),
  useUpdate: () => ({ mutateAsync: async (data: any) => console.log("Update", data) }),
  useDelete: () => ({ mutateAsync: async (id: string) => console.log("Delete", id) }),
};

export const pageConfig = {
  title: "Products",
  description: "Manage your product inventory.",
};
