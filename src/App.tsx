import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { userAuthenticated } from '@/utils/auth';
import {RouterProvider, useNavigate} from 'react-router-dom';
//
// type InitialStateProps = {
//   fetch?: () => Promise<{
//     currentUser?: API.User;
//     flatMenus?: Record<string, MenuDataItem>;
//   }>;
//   settings?: Partial<LayoutSettings>;
//   routePathCodeMap?: Record<string, string>;
//   currentUser?: API.User;
//   flatMenus?: Record<string, MenuDataItem>;
//   loading?: boolean;
// };
//
// export async function getInitialState(): Promise<InitialStateProps> {
//   return {
//     currentUser: await getCurrentUser(),
//     flatMenus: await getFlatMenus(),
//   };
// }

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
