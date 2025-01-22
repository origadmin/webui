import PageContainer from "@/components/page-container";
import { CustomerPagination } from "./components/CustomerPagination";
import CustomerSearch from "./components/CustomerSearch";
import CustomerTable from "./components/CustomerTable";

export default function CustomersPage() {
  return (
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Our Customers</h1>
      </div>
      <div className='space-y-4'>
        <CustomerSearch />
        <CustomerTable />
        <CustomerPagination />
      </div>
    </PageContainer>
  );
}
