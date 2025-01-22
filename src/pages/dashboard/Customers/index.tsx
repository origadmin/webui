import PageContainer from "@/components/page-container";
import { CustomerPagination } from "./components/CustomerPagination";
import CustomerSearch from "./components/CustomerSearch";
import CustomerTable from "./components/CustomerTable";

export default function CustomersPage() {
  return (
    <PageContainer>
      <div className='mb-2 flex items-center justify-between space-y-2'>
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
