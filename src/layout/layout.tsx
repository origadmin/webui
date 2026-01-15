import { Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import KBar from "@/components/KBar";
import { SidebarInset, SidebarProvider } from "@/components/Sidebar";
import { AppFooter } from "./footer";
import { AppHeader } from "./header";
import { AppSidebar } from "./sidebar";

export default function MainLayout() {
  // This value can later be fetched from a config API
  const navbarLeftMode = "multi-tenant"; // or "default"

  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Pass the mode to the AppHeader */}
          <AppHeader navbarLeftMode={navbarLeftMode} />
          <div className='flex-1 p-4 sm:p-6'>
            <Outlet />
          </div>
          <AppFooter />
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </KBar>
  );
}
