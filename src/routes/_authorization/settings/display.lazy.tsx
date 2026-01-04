import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings/display")({
  component: DisplaySettingsPage,
});

function DisplaySettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Display</h3>
        <p className='text-sm text-muted-foreground'>
          Turn items on or off to control what's displayed in the app.
        </p>
      </div>
    </div>
  );
}
