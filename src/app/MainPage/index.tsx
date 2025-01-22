import { mockSidebar, mockTopNav, mockSecondItems, mockFooter } from "@/mocks/mockSidebar.ts";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "@/hooks/use-auth";
import { Watermark } from "@/components/ui/watermark.tsx";
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

export default function MainPage() {
  const { token } = useToken();

  console.log("login token:", token);
  // Determine whether a user has permissions
  if (!token) {
    // If you don't have permissions, you'll be redirected to the login page
    return <Navigate to='/login' replace />;
  }

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
