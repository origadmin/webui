import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./sidebar";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/Sidebar";

/**
 * This is the root layout component, now correctly using the shadcn-ui-sidebar pattern.
 * The main content is wrapped in `<SidebarInset>`, which is a sibling to `<AppSidebar>`.
 * This allows the shadcn components to manage the layout automatically.
 */
export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
        <AppFooter />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
