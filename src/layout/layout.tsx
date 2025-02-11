import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { useAuth, useInitialData } from "@/hooks/use-auth";
import { SidebarProps } from "@/components/Sidebar";
import { FooterProps } from "@/components/footer";
import { Layout, LayoutProps } from "@/components/layout";
import { TopNavProps } from "@/components/top-nav";

export default function MainLayout() {
  const { token } = useAuth();
  const { initialData } = useInitialData<InitialDataConfig>();

  useEffect(() => {
    console.log("layout: initialData is ", initialData);
  }, [initialData]);

  useEffect(() => {
    if (token) {
      console.log("layout: token is ", token);
    }
  }, [token]);
  const props: LayoutProps = {
    sidebarProps: initialData.sidebar ? (initialData.sidebar as SidebarProps) : {},
    topNavProps: initialData.topNav ? (initialData.topNav as TopNavProps) : {},
    footerProps: initialData.footer ? (initialData.footer as FooterProps) : {},
  };

  return (
    <Layout key={"main-layout"} {...props}>
      <Outlet />
    </Layout>
  );
}
