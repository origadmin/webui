import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { Navigate, Route, BrowserRouter as Router, RouterProvider, Routes } from 'react-router-dom';

function App() {
  console.log('Application Started');
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
