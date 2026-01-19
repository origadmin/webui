import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { DataTableColumnType } from "@/components/DataTable";
import { ApiHooks } from "./types";

// =================================================================================
// INSTRUCTIONS:
// This is a simple, concrete example. To use it:
// 1. Find all instances of "Product" and replace them with your entity.
// 2. Update the schema, hooks, and columns with your actual logic.
// =================================================================================

/**
 * STEP 1: Define your data type.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  status: "active" | "draft";
}

/**
 * STEP 2: Define your form validation schema.
 */
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  status: z.enum(["active", "draft"]).default("active"),
});

export type FormType = z.infer<typeof formSchema>;

/**
 * STEP 3: Provide your API hooks.
 * This object explicitly implements the `ApiHooks` interface, ensuring type safety.
 */
export const apiHooks: ApiHooks<Product, FormType> = {
  useQuery: (params, options) => {
    return useQuery({
      queryKey: ["mock-products", params],
      queryFn: (): Promise<{ items: Product[]; total: number }> => {
        console.log("Fetching products with params:", params);
        return Promise.resolve({ items: [], total: 0 });
      },
      ...options,
    });
  },
  useItemQuery: (id) => {
    return useQuery({
      queryKey: ["mock-product", id],
      queryFn: (): Promise<Product | undefined> => {
        console.log("Fetching product with id:", id);
        return Promise.resolve(undefined);
      },
    });
  },
  useCreate: () =>
    useMutation({
      mutationFn: async (data: FormType) => {
        console.log("Creating item:", data);
        return Promise.resolve();
      },
    }),
  useUpdate: () =>
    useMutation({
      mutationFn: async (data: FormType & { id: string }) => {
        console.log("Updating item:", data);
        return Promise.resolve();
      },
    }),
  useDelete: () =>
    useMutation({
      mutationFn: async (id: string) => {
        console.log("Deleting item with id:", id);
        return Promise.resolve();
      },
    }),
};

/**
 * STEP 4: Define your table columns.
 */
export const columns: DataTableColumnType<Product>[] = [];

/**
 * STEP 5: Define your page's title and description.
 */
export const pageConfig = {
  title: "Products",
  description: "Manage your products here.",
};
