import { useEffect } from "react";
import { mockSidebar, mockTopNav, mockSecondItems, mockFooter } from "@/mocks/mock-sidebar";
import { Outlet } from "@tanstack/react-router";
import { useAuth, useInitialData } from "@/hooks/use-auth";
import { SidebarProps } from "@/components/Sidebar";
import { Layout, LayoutProps } from "@/components/layout";

const getMockData = (): SidebarProps => {
  return {
    header: {
      teams: mockSidebar.teams,
    },
    content: {
      items: mockSidebar.menuItems,
      seconds: {
        items: mockSecondItems,
      },
    },
    footer: {
      user: mockSidebar.user,
    },
  };
};

export default function MainLayout() {
  const sidebarData = getMockData();
  const { token } = useAuth();
  const { initialData } = useInitialData<InitialDataConfig>();

  if (initialData) {
    console.log("initialData is ", initialData);
  }
  useEffect(() => {
    if (token) {
      console.log("token is ", token);
    }
  }, [token]);
  const props: LayoutProps = {
    sidebarProps: sidebarData,
    topNavProps: { menus: mockTopNav },
    footerProps: {
      links: mockFooter,
    },
  };

  return (
    <Layout key={"main-layout"} {...props}>
      <Outlet />
    </Layout>
  );
}
