# CRUD Page Template

This directory contains a generic, reusable template for creating CRUD (Create, Read, Update, Delete) pages in the
application. It is designed to standardize the UI/UX and reduce boilerplate code.

## Directory Structure

```text
src/templates/crud-page/
├── components/         # Reusable UI components for the template
│   ├── action-dialog.tsx   # Generic dialog for Create/Update
│   ├── columns.tsx         # Base column definitions (selection, actions)
│   ├── delete-dialog.tsx   # Generic delete confirmation dialog
│   ├── dialogs.tsx         # Manager for all dialogs
│   ├── fields.tsx          # (Optional) Base fields component
│   ├── primary-buttons.tsx # Toolbar buttons (e.g., "Add Item")
│   └── row-actions.tsx     # Row action menu (Edit, Delete)
├── hooks/              # Custom hooks
│   └── use-crud-table.tsx  # Context and state management for the table
├── config.ts           # (Template) Example configuration file
├── index.tsx           # Main template component
├── types.ts            # Type definitions
└── README.md           # This documentation
```

## How to Use

To create a new CRUD page (e.g., for a `Post` module), follow these steps:

### 1. Create Directory

Create a new directory for your page: `src/pages/content/post`.

### 2. Define Configuration (`config.ts`)

Create a `config.ts` file in your new directory. This file will define the data model, validation schema, and API hooks.

```typescript
import {z} from "zod";
import {ColumnDef} from "@tanstack/react-table";
// Import your specific API hooks
import {usePostsQuery, usePostCreate, usePostUpdate, usePostDelete} from "@/api/content/post";

// 1. Define Form Schema
export const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    status: z.enum(["draft", "published"]),
});

export type FormType = z.infer<typeof formSchema>;

// 2. Define API Hooks Mapping
export const apiHooks = {
    useQuery: usePostsQuery,
    useCreate: usePostCreate,
    useUpdate: usePostUpdate,
    useDelete: usePostDelete,
};

// 3. Define Page Metadata
export const pageConfig = {
    title: "Post",
    description: "Manage your blog posts.",
};
```

### 3. Define Columns (`components/columns.tsx`)

Create a `components` folder and a `columns.tsx` file. Define your table columns here.

```typescript
import {ColumnDef} from "@tanstack/react-table";
import {createColumns} from "@/templates/crud-page/components/columns";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableRowActions} from "@/templates/crud-page/components/row-actions";

export const columns: ColumnDef<API.Content.Post>[] = [
    // Use the helper to get default selection and action columns, or define manually
    {
        id: "select",
        // ... (standard selection column)
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({row}) => <DataTableRowActions row = {row} />,
},
]
;
```

### 4. Define Form Fields (`components/fields.tsx`)

Create a `fields.tsx` file to render the form inputs inside the Create/Edit dialogs.

```typescript
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import {FormType} from "../config";

export function Fields({form}: { form: UseFormReturn<FormType> }) {
    return (
        <>
            <FormField
                control = {form.control}
    name = "title"
    render = {({field})
=>
    (
        <FormItem>
            <FormLabel>Title < /FormLabel>
        < FormControl > <Input {...field}
    /></
    FormControl >
    <FormMessage / >
    </FormItem>
)
}
    />
    {/* Add other fields... */
    }
    </>
)
    ;
}
```

### 5. Assemble the Page (`index.tsx`)

Create the `index.tsx` file to put everything together.

```typescript
import CrudPageTemplate from "@/templates/crud-page";
import {CrudTableProvider} from "@/templates/crud-page/hooks/use-crud-table";
import {Dialogs} from "@/templates/crud-page/components/dialogs";
import {apiHooks, formSchema, pageConfig} from "./config";
import {columns} from "./components/columns";
import {Fields} from "./components/fields";

export default function PostPage() {
    return (
        <CrudTableProvider>
            <CrudPageTemplate
                pageConfig = {pageConfig}
    apiHooks = {apiHooks}
    columns = {columns}
    />
    < Dialogs
    pageConfig = {pageConfig}
    formSchema = {formSchema}
    apiHooks = {apiHooks}
    renderFields = {(form)
=>
    <Fields form = {form}
    />}
    />
    < /CrudTableProvider>
)
    ;
}
```

## Standards & Conventions

* **Naming**: Use `kebab-case` for file names (e.g., `post-columns.tsx` or just `columns.tsx` if inside a dedicated
  folder).
* **Types**: Always define a Zod schema for your forms. This ensures type safety and automatic validation.
* **API**: API hooks should follow the `react-query` pattern used in the project.
* **Components**: Keep page-specific components in a `components` subdirectory within the page folder.
