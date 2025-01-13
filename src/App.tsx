import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import {authenticated} from "@/utils/auth";

function App() {
  console.log('Application Started');

  const isAuthenticated = authenticated();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
