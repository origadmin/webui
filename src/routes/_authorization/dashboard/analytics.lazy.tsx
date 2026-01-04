import PageContainer from "@/components/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <PageContainer>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>Analytics Dashboard</h1>
        <p className='text-muted-foreground'>
          This is the placeholder for the analytics dashboard. Detailed charts and data visualizations will be implemented here.
        </p>
      </div>
    </PageContainer>
  );
}
