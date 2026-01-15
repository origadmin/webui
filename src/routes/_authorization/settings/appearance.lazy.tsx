import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings/appearance")({
  component: AppearanceSettingsPage,
});

function AppearanceSettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <p className='text-sm text-muted-foreground'>
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
    </div>
  );
}
