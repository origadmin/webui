import {
  IconBrowserCheck,
  IconExclamationCircle,
  IconNotification,
  IconPalette,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import { Outlet } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/PageContainer";
import SidebarNav from "./components/sidebar-nav";

export default function Settings() {
  return (
    <PageContainer>
      <div className='p-4 md:px-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Settings</h1>
        <p className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: "/settings",
  },
  {
    title: "Account",
    icon: <IconTool size={18} />,
    href: "/settings/account",
  },
  {
    title: "Appearance",
    icon: <IconPalette size={18} />,
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    icon: <IconNotification size={18} />,
    href: "/settings/notifications",
  },
  {
    title: "Display",
    icon: <IconBrowserCheck size={18} />,
    href: "/settings/display",
  },
  {
    title: "Error Example",
    icon: <IconExclamationCircle size={18} />,
    href: "/settings/error-example",
  },
];
