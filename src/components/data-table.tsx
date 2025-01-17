import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type ColumnType<T> = {
  key: keyof T;
  label: string;
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({ data, columns, onEdit, onDelete }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  );
  return (
    <div>
      <Input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mb-4'
      />
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>{String(item[column.key])}</TableCell>
              ))}
              <TableCell>
                <Button onClick={() => onEdit(item)} className='mr-2'>
                  Edit
                </Button>
                <Button onClick={() => onDelete(item)} variant='destructive'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
