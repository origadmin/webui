import KBar from '@/components/kbar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import Sidebar from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import useIsCollapsed from '@/hooks/use-is-collapsed';
import { Outlet } from 'react-router-dom';

type DashboardPageProps = {
  children: React.ReactNode;
};

export default function DashboardPage({ children }: DashboardPageProps) {
  // const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  // return (
  //   <div className='relative h-full overflow-hidden bg-background'>
  //     <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
  //     <main
  //       id='content'
  //       className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
  //     >
  //       <Outlet />
  //     </main>
  //   </div>
  // );

  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
