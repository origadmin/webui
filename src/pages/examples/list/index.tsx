import PageContainer from "@/components/PageContainer";
import VersatileList from "./versatile-list";

export default function ListPage() {
  return (
    <PageContainer>
      <div className='container mx-auto py-4'>
        <h1 className='mb-6 text-3xl font-bold'>Versatile List Page</h1>
        <VersatileList />
      </div>
    </PageContainer>
  );
}
