import Layout from '@/components/layout';
import useIsCollapsed from '@/hooks/use-is-collapsed';
import { userAuthenticated } from '@/utils/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from './sidebar';

export default function MainPage() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = userAuthenticated();
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });

  // if (!isAuthenticated) {
  //   navigate('/login', { replace: true });
  //   return null;
  // } else {
  //   // navigate('/dashboard', { replace: true });
  // }

  return (
    <Layout>
      <div className='relative h-full overflow-hidden bg-background'>
        {/*<Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>*/}
        <Outlet />
      </div>
    </Layout>
  );
}
