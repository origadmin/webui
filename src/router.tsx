import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/app/login/page';
import DashboardPage from '@/app/dashboard/page';
import NotFoundError from './pages/errors/not-found-error';
import GeneralError from '@/pages/errors/general-error';
import MaintenanceError from '@/pages/errors/maintenance-error';

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/',
    element: <Navigate to="/dashborad" replace />,
  },
  {
    path: '/dashboard',
    lazy: async () => ({
      Component: (await import('@/app/dashboard/page')).default,
    }),
  },
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('@/app/login/page')).default,
    }),
  },
  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]);

export default router;
