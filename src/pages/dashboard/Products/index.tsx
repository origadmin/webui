import PageContainer from "@/components/page-container";
import ProductGrid from "./components/ProductGrid";
import { ProductPagination } from "./components/ProductPagination";
import ProductSearch from "./components/ProductSearch";

export default function ProductsPage() {
  return (
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Our Products</h1>
      </div>
      <ProductSearch />
      <ProductGrid />
      <ProductPagination />
    </PageContainer>
  );
}
