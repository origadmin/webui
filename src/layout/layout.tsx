import { useEffect } from "react";
import { mockSidebar, mockTopNav, mockSecondItems, mockFooter } from "@/mocks/mock-sidebar";
import { Outlet } from "@tanstack/react-router";
import { useAuth, useInitialData } from "@/hooks/use-auth";
import { SidebarProps } from "@/components/Sidebar";
import Watermark from "@/components/Watermark";
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

const watermark = {
  content: "OrigAdmin",
  fontWeight: "bold",
  fontFamily: "Arial",
  opacity: 0.3,
  rotate: 45,
  width: 100, // Reduce the width of a single watermark
  height: 100, // Reduce the height of a single watermark
  x: 0,
  y: 0,
  zIndex: 1,
  position: "absolute",
  top: 0, // Adjust to the top
  left: 0, // Adjust to the left
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
      {watermark ? (
        <Watermark {...watermark}>
          <Outlet />
        </Watermark>
      ) : (
        <Outlet />
      )}
    </Layout>
  );
}
