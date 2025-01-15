import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';

const invoices = [
  {
    product: 'Landing Page Template',
    status: 'Paid',
    sales: 1800,
  },
  {
    product: 'Dashboard UI Kit',
    status: 'Pending',
    sales: 1350,
  },
  {
    product: 'Icon Set',
    status: 'Paid',
    sales: 900,
  },
  {
    product: 'Marketing Templates',
    status: 'Paid',
    sales: 750,
  },
  {
    product: 'Font Collection',
    status: 'Pending',
    sales: 500,
  },
];

export default function AnalyticsContent() {
  return (

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.product}>
              <TableCell className='font-medium'>{invoice.product}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell className='text-right'>{invoice.sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
