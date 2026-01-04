import { ProfileForm } from "@/pages/settings/profile-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings/")({
  component: SettingsProfilePage,
});

function SettingsProfilePage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
