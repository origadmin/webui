import useIsCollapsed from '@/hooks/use-is-collapsed';
import { userAuthenticated } from '@/utils/auth';
import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from './sidebar';

export default function MainPage() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const isAuthenticated = userAuthenticated();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  } else {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  );
}
