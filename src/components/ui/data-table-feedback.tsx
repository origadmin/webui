import { IconMoodSad, IconLoader } from "@tabler/icons-react";
import { TableRow, TableCell } from "@/components/ui/table";

export const NoResults = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className='h-24 text-center text-muted-foreground font-medium'>
      <div className='flex flex-col items-center gap-2'>
        <IconMoodSad className='h-6 w-6' />
        <span>No records found</span>
      </div>
    </TableCell>
  </TableRow>
);

export const LoadingRow = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className='h-24 text-center'>
      <div className='flex justify-center items-center'>
        <IconLoader className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    </TableCell>
  </TableRow>
);
