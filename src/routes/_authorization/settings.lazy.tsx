import PageContainer from "@/components/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings")({
  component: UserSettingsPage,
});

function UserSettingsPage() {
  return (
    <PageContainer>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>User Settings</h1>
        <p className='text-muted-foreground'>
          This is the placeholder for the user settings page, where users can configure their personal preferences.
        </p>
      </div>
    </PageContainer>
  );
}
