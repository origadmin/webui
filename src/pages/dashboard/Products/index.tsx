import ProductGrid from "./components/ProductGrid";
import { ProductPagination } from "./components/ProductPagination";
import ProductSearch from "./components/ProductSearch";

export default function ProductsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Our Products</h1>
      <ProductSearch />
      <ProductGrid />
      <ProductPagination />
    </div>
  );
}
