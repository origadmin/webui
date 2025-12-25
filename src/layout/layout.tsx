import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./sidebar"; // We will create this
import { AppHeader } from "./header";   // We will create this
import { AppFooter } from "./footer";   // We will create this
import { Toaster } from "@/components/ui/toaster";

/**
 * This is the root layout component.
 * It defines the main structure of the application (sidebar, header, content, footer).
 * It does not manage any data, it only provides the layout "scaffolding".
 * Child components like AppSidebar are responsible for their own data.
 */
export default function MainLayout() {
  return (
    <div className='flex h-screen bg-background'>
      <AppSidebar />
      <div className='flex flex-1 flex-col'>
        <AppHeader />
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>
          <Outlet />
        </main>
        <AppFooter />
      </div>
      <Toaster />
    </div>
  );
}
