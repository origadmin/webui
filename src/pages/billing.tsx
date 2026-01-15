import PageContainer from "@/components/PageContainer";

export default function BillingPage() {
  return (
    <PageContainer>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>Billing</h1>
        <p className='text-muted-foreground'>
          This is the placeholder for the billing page. Users will be able to manage their subscription and payment
          methods here.
        </p>
      </div>
    </PageContainer>
  );
}
