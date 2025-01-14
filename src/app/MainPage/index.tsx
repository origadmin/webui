import { SidebarContentProps, SidebarFooterProps, SidebarHeaderProps, SidebarProps } from '@/components/Sidebar';
import Layout from '@/components/layout';
import { data, topNav } from '@/mocks/sidebar-data';
import { userAuthenticated } from '@/utils/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const getSidebarMockData = () => {
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

export default function MainPage(title: string) {
  console.log(title);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = userAuthenticated();
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });

  const sidebarData = getSidebarMockData();

  return (
    <Layout sidebarProps={sidebarData} topNav={topNav}>
      <Outlet />
    </Layout>
  );
}
