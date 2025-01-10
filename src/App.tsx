import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';

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
