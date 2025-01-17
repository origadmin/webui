import { data, topNav } from "@/mocks/data";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { SidebarContentProps, SidebarFooterProps, SidebarHeaderProps, SidebarProps } from "@/components/Sidebar";
import Layout from "@/components/layout";

const getMockData = () => {
  return {
    header: {
      teams: data.teams,
    } as SidebarHeaderProps,
    content: {
      items: data.menuItems,
    } as SidebarContentProps,
    footer: {
      user: data.user,
    } as SidebarFooterProps,
  } as SidebarProps;
};

export default function MainPage() {
  const { token } = useAuth();

  // Determine whether a user has permissions
  if (!token) {
    // If you don't have permissions, you'll be redirected to the login page
    return <Navigate to='/login' replace />;
  }

  const sidebarData = getMockData();

  return (
    <Layout sidebarProps={sidebarData} topNav={topNav}>
      <Outlet />
    </Layout>
  );
}
