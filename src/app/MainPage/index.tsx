import { data, topNav } from "@/mocks/data";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Watermark } from "@/components/ui/watermark.tsx";
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

const watermark = {
  text: "OrigAdmin",
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
  const { token } = useAuth();

  // Determine whether a user has permissions
  if (!token) {
    // If you don't have permissions, you'll be redirected to the login page
    return <Navigate to='/login' replace />;
  }

  const sidebarData = getMockData();

  return (
    <Layout sidebarProps={sidebarData} topNav={topNav}>
      <Watermark {...watermark}>
        <Outlet />
      </Watermark>
    </Layout>
  );
}
