import { Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { SidebarInset, SidebarProvider } from "@/components/Sidebar";
import { AppFooter } from "./footer";
import { AppHeader } from "./header";
import { AppSidebar } from "./sidebar";

/**
 * This is the root layout component, now correctly using the shadcn-ui-sidebar pattern.
 * The main content is wrapped in `<SidebarInset>`, which is a sibling to `<AppSidebar>`.
 * The nested <main> tag has been replaced with a <div> to ensure valid HTML.
 */
export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className='flex-1 p-4 sm:p-6'>
          <Outlet />
        </div>
        <AppFooter />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
