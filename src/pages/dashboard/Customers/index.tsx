import { CustomerPagination } from "./components/CustomerPagination";
import CustomerSearch from "./components/CustomerSearch";
import CustomerTable from "./components/CustomerTable";

export default function CustomersPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Our Customers</h1>
      <CustomerSearch />
      <CustomerTable />
      <CustomerPagination />
    </div>
  );
}
