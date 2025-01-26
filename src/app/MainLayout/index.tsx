import { mockSidebar, mockTopNav, mockSecondItems, mockFooter } from "@/mocks/mockSidebar";
import { Outlet } from "@tanstack/react-router";
import { Watermark } from "@/components/ui/watermark";
import { SidebarProps } from "@/components/Sidebar";
import Layout from "@/components/layout";

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
  fontColor: "#ffffff",
  fontWeight: "bold",
  fontFamily: "Arial",
  opacity: 0.3,
  rotate: 45,
  width: 100, // 减小单个水印的宽度
  height: 100, // 减小单个水印的高度
  x: 0,
  y: 0,
  zIndex: 1,
  position: "absolute",
  top: 0, // 调整到顶部
  left: 0, // 调整到左边
};

interface MainLayoutProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  children?: React.ReactNode;
}

export default function MainLayout() {
  const sidebarData = getMockData();

  return (
    <Layout
      sidebarProps={sidebarData}
      topNav={mockTopNav}
      footer={{
        links: mockFooter,
      }}
    >
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
