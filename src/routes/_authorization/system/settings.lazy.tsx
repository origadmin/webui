import PageContainer from "@/components/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/settings")({
  component: SystemSettingsPage,
});

function SystemSettingsPage() {
  return (
    <PageContainer>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>System Settings</h1>
        <p className='text-muted-foreground'>
          This is the placeholder for system-wide settings. Configuration options for the entire application will be managed here.
        </p>
      </div>
    </PageContainer>
  );
}
