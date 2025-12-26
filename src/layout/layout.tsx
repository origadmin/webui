import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./sidebar";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/Sidebar";

/**
 * This is the root layout component.
 * It defines the main structure and wraps the entire layout with the necessary SidebarProvider
 * to make the sidebar context available to all its children.
 */
export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className='flex bg-background overflow-x-hidden'>
        <AppSidebar />
        <div className='flex flex-1 flex-col min-w-0 min-h-screen'>
          <AppHeader />
          <main className='p-4 sm:p-6'>
            <Outlet />
          </main>
          <div className='flex-1' />
          <AppFooter />
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
